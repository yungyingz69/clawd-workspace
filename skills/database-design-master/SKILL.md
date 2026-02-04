# Database Design Master Skill (Video SaaS Edition)

**Purpose:** ออกแบบ database ที่ scale ได้ สำหรับ short video processing SaaS

## 🎯 Learning Outcomes

- [ ] เข้าใจ database design สำหรับ video processing
- [ ] Design queue systems ที่ robust
- [ ] Status tracking ที่ reliable
- [ ] Audit trails สมบูรณ์
- [ ] Performance optimization สำหรับ large files

---

## 📊 Complete Database Schema

### **Schema Overview**

```
users
  ├── 1:N → videos
  ├── 1:N → subscriptions
  └── 1:N → api_keys

videos
  ├── 1:N → platform_posts
  ├── 1:N → processing_jobs
  ├── 1:N → video_analytics
  └── 1:1 → video_metadata

processing_jobs
  └── depends on → jobs_queue

platform_posts
  └── 1:N → post_analytics

audit_logs (time-series partitioned)
```

---

## 🗄️ Complete SQL Schema

### **1. Users Table**

```sql
CREATE TABLE users (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE,

  -- Subscription & limits
  subscription_tier VARCHAR(20) DEFAULT 'free',
  -- free, pro, business, enterprise
  monthly_quota INT DEFAULT 30,
  current_usage INT DEFAULT 0,
  quota_reset_date DATE DEFAULT (CURRENT_DATE + INTERVAL '1 month'),

  -- Account status
  status VARCHAR(20) DEFAULT 'active',
  -- active, suspended, cancelled, trial
  trial_ends_at TIMESTAMPTZ,
  subscription_id VARCHAR(100),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  -- preferences, settings, etc.

  -- Soft delete
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_subscription ON users(subscription_tier);
CREATE INDEX idx_users_trial ON users(trial_ends_at) WHERE trial_ends_at IS NOT NULL;
```

---

### **2. Videos Table (Master Record)**

```sql
CREATE TABLE videos (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Original video info
  original_filename VARCHAR(255) NOT NULL,
  original_url TEXT NOT NULL,
  original_size BIGINT NOT NULL,
  original_format VARCHAR(20),
  -- mp4, mov, avi, webm, etc.

  -- Processed video info
  processed_url TEXT,
  thumbnail_url TEXT,
  preview_url TEXT,

  -- Video metadata (from FFprobe)
  duration INT NOT NULL,
  -- seconds
  width INT,
  height INT,
  aspect_ratio VARCHAR(20),
  -- 16:9, 9:16, 1:1, etc.
  fps INT,
  bitrate INT,

  -- Content analysis
  has_audio BOOLEAN DEFAULT true,
  audio_codec VARCHAR(50),
  video_codec VARCHAR(50),
  color_space VARCHAR(20),

  -- Processing status
  processing_status VARCHAR(30) DEFAULT 'pending',
  -- pending → downloading → processing → compressing → uploading → ready
  --                      ↘ failed
  processing_started_at TIMESTAMPTZ,
  processing_completed_at TIMESTAMPTZ,
  processing_error_message TEXT,
  processing_error_details JSONB,

  -- Platform sync status (aggregated)
  sync_status JSONB DEFAULT '{}',
  -- {
  --   "instagram": "published",
  --   "tiktok": "failed",
  --   "youtube": "pending",
  --   "facebook": "not_started"
  -- }
  last_sync_at TIMESTAMPTZ,

  -- User content
  caption TEXT,
  hashtags TEXT[],
  mentions TEXT[],

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Soft delete
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_videos_user_created ON videos(user_id, created_at DESC);
CREATE INDEX idx_videos_status ON videos(processing_status) WHERE processing_status != 'ready';
CREATE INDEX idx_videos_processing ON videos(processing_started_at)
  WHERE processing_status = 'processing';
CREATE INDEX idx_videos_deleted ON videos(deleted_at) WHERE deleted_at IS NOT NULL;

-- Full-text search on captions
CREATE INDEX idx_videos_caption_fts ON videos USING gin(to_tsvector('english', caption));
```

---

### **3. Platform Posts Table (Per-Platform Tracking)**

```sql
CREATE TABLE platform_posts (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Platform info
  platform VARCHAR(20) NOT NULL,
  -- instagram, tiktok, youtube, facebook, twitter
  platform_account_id VARCHAR(100),

  -- Post content (platform-specific)
  caption TEXT,
  hashtags TEXT[],
  mentions TEXT[],

  -- Post status
  upload_status VARCHAR(30) DEFAULT 'pending',
  -- pending → preparing → uploading → checking → published
  --                                          ↘ failed
  upload_progress INT DEFAULT 0,
  -- 0-100

  -- Platform response
  platform_post_id TEXT,
  -- Instagram media ID, TikTok video ID, etc.
  platform_post_url TEXT,
  -- URL to view the post
  platform_short_code VARCHAR(100),
  -- Instagram shortcode, TikTok code, etc.

  -- Response data (for debugging)
  api_response JSONB,
  -- Full API response from platform

  -- Error handling
  error_code VARCHAR(50),
  error_message TEXT,
  error_details JSONB,
  retry_count INT DEFAULT 0,
  max_retries INT DEFAULT 3,
  last_retry_at TIMESTAMPTZ,

  -- Scheduling
  scheduled_for TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: One post per video per platform
  UNIQUE(video_id, platform)
);

-- Indexes
CREATE INDEX idx_platform_posts_video ON platform_posts(video_id);
CREATE INDEX idx_platform_posts_user ON platform_posts(user_id, created_at DESC);
CREATE INDEX idx_platform_posts_status ON platform_posts(upload_status, platform);
CREATE INDEX idx_platform_posts_retry ON platform_posts(upload_status, retry_count)
  WHERE upload_status = 'failed' AND retry_count < max_retries;
CREATE INDEX idx_platform_posts_scheduled ON platform_posts(scheduled_for)
  WHERE upload_status = 'pending' AND scheduled_for IS NOT NULL;

-- Composite index for retry queue
CREATE INDEX idx_platform_posts_retry_queue ON platform_posts(platform, upload_status, retry_count)
  WHERE upload_status = 'failed' AND retry_count < max_retries;
```

---

### **4. Processing Jobs Table (Job Queue)**

```sql
CREATE TABLE processing_jobs (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Job details
  job_type VARCHAR(50) NOT NULL,
  -- download_video, extract_metadata, generate_thumbnail,
  -- compress_video, resize_video, add_watermark, etc.

  -- Priority & scheduling
  priority INT DEFAULT 5,
  -- 1=highest, 10=lowest
  scheduled_for TIMESTAMPTZ DEFAULT NOW(),

  -- Job status
  status VARCHAR(30) DEFAULT 'queued',
  -- queued → running → completed │ failed │ cancelled
  attempts INT DEFAULT 0,
  max_attempts INT DEFAULT 3,

  -- Execution tracking
  worker_id VARCHAR(100),
  -- Which worker is processing this job
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_ms INT,
  -- How long the job took

  -- Job data (flexible)
  job_data JSONB DEFAULT '{}',
  -- Input parameters for the job
  result_data JSONB,
  -- Output from the job

  -- Error handling
  error_code VARCHAR(50),
  error_message TEXT,
  error_stack TEXT,
  error_details JSONB,

  -- Retry logic
  backoff_until TIMESTAMPTZ,
  next_retry_at TIMESTAMPTZ,

  -- Dependencies (job chains)
  depends_on_job_id UUID REFERENCES processing_jobs(id),
  -- This job waits for depends_on_job_id to complete

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for queue processing
CREATE INDEX idx_processing_jobs_ready ON processing_jobs(status, priority, scheduled_for)
  WHERE status = 'queued' AND scheduled_for <= NOW();

CREATE INDEX idx_processing_jobs_running ON processing_jobs(worker_id, started_at)
  WHERE status = 'running';

CREATE INDEX idx_processing_jobs_retry ON processing_jobs(status, backoff_until)
  WHERE status = 'failed' AND backoff_until IS NOT NULL;

CREATE INDEX idx_processing_jobs_video ON processing_jobs(video_id, status);

-- Index for job dependencies
CREATE INDEX idx_processing_jobs_dependencies ON processing_jobs(depends_on_job_id, status)
  WHERE depends_on_job_id IS NOT NULL;
```

---

### **5. Video Analytics Table**

```sql
CREATE TABLE video_analytics (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Platform-specific analytics
  platform VARCHAR(20) NOT NULL,
  platform_post_id TEXT,

  -- Metrics
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  saves INT DEFAULT 0,
  -- Instagram saves

  -- Engagement
  engagement_rate DECIMAL(5,2),
  -- (likes + comments + shares) / views * 100

  -- Timestamps
  fetched_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: One snapshot per video per platform per fetch
  UNIQUE(video_id, platform, fetched_at)
);

-- Indexes
CREATE INDEX idx_video_analytics_video ON video_analytics(video_id, fetched_at DESC);
CREATE INDEX idx_video_analytics_user ON video_analytics(user_id, fetched_at DESC);
CREATE INDEX idx_video_analytics_platform ON video_analytics(platform, fetched_at DESC);

-- Time-series partitioning (optional, for large datasets)
CREATE TABLE video_analytics_2026_02 PARTITION OF video_analytics
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

---

### **6. Audit Logs Table (Time-Series)**

```sql
CREATE TABLE audit_logs (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who
  user_id UUID REFERENCES users(id),
  actor_type VARCHAR(20),
  -- user, system, worker, api
  actor_id VARCHAR(100),

  -- What
  action VARCHAR(100) NOT NULL,
  -- video.created, video.processed, post.published,
  -- user.registered, etc.
  resource_type VARCHAR(50),
  -- video, platform_post, user, etc.
  resource_id UUID,

  -- Changes
  old_values JSONB,
  new_values JSONB,
  changes JSONB,
  -- Diff of what changed

  -- Context
  ip_address INET,
  user_agent TEXT,
  request_id VARCHAR(100),
  metadata JSONB DEFAULT '{}',

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partition by month for performance
CREATE TABLE audit_logs_2026_02 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Indexes
CREATE INDEX idx_audit_logs_user_time ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id, created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action, created_at DESC);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_type, actor_id, created_at DESC);
```

---

### **7. API Keys Table**

```sql
CREATE TABLE api_keys (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- API key info
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  -- SHA-256 hash of the key
  key_prefix VARCHAR(10) NOT NULL,
  -- First 8 chars for display (e.g., "sk_live_...")
  name VARCHAR(100) NOT NULL,
  -- e.g., "Production", "Development"

  -- Scopes & permissions
  scopes TEXT[] DEFAULT ARRAY['read', 'write'],
  -- read, write, delete, admin

  -- Key status
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,

  -- Usage tracking
  usage_count INT DEFAULT 0,
  rate_limit INT DEFAULT 1000,
  -- requests per hour
  rate_limit_window INT DEFAULT 3600000,
  -- 1 hour in ms

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Soft delete
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_api_keys_user ON api_keys(user_id, is_active);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash) WHERE is_active = true;
CREATE INDEX idx_api_keys_prefix ON api_keys(key_prefix);
```

---

## 🔑 Design Principles

### **1. Status is King**

```javascript
// Always track status explicitly
const VIDEO_STATUSES = {
  PENDING: 'pending',
  DOWNLOADING: 'downloading',
  PROCESSING: 'processing',
  COMPRESSING: 'compressing',
  UPLOADING: 'uploading',
  READY: 'ready',
  FAILED: 'failed'
}

const POST_STATUSES = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  UPLOADING: 'uploading',
  CHECKING: 'checking',
  PUBLISHED: 'published',
  FAILED: 'failed'
}

// Never use boolean flags
// ❌ is_published: true
// ✅ status: 'published', published_at: TIMESTAMPTZ
```

---

### **2. Store Everything**

```javascript
// Store full API responses for debugging
{
  platform_post_id: "123456789",
  platform_post_url: "https://instagram.com/p/xyz/",
  api_response: {
    full_response: { /* complete API response */ },
    headers: { /* response headers */ },
    status_code: 200
  }
}
```

---

### **3. Idempotency**

```sql
-- Prevent duplicate posts
CREATE UNIQUE INDEX idx_platform_posts_unique
  ON platform_posts(video_id, platform)
  WHERE upload_status NOT IN ('failed', 'cancelled');
```

---

### **4. Soft Deletes**

```sql
-- Always use soft deletes
ALTER TABLE videos ADD COLUMN deleted_at TIMESTAMPTZ;

-- Query with filter
SELECT * FROM videos WHERE deleted_at IS NULL;
```

---

## 📈 Performance Optimization

### **1. Indexes**

```sql
-- Only index what you query
-- Good: Index on frequently filtered columns
CREATE INDEX idx_videos_status ON videos(processing_status);

-- Bad: Index on everything
CREATE INDEX idx_videos_all ON videos(user_id, status, created_at, updated_at, ...);
```

---

### **2. Partitioning**

```sql
-- Partition large tables by time
CREATE TABLE audit_logs_2026_01 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE audit_logs_2026_02 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

---

### **3. Connection Pooling**

```javascript
// Use connection pooling
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

---

## 🚨 Common Mistakes

### ❌ DON'T: Monolithic status column

```sql
-- Bad: Trying to track everything in one place
ALTER TABLE videos ADD COLUMN sync_status JSONB;
-- {
--   "instagram": { "status": "published", "post_id": "..." },
--   "tiktok": { "status": "failed", "error": "..." }
-- }
-- Hard to query, update, track
```

### ✅ DO: Separate tracking table

```sql
-- Good: Separate table with proper status
CREATE TABLE platform_posts (
  video_id UUID,
  platform VARCHAR(20),
  upload_status VARCHAR(30),
  platform_post_id TEXT,
  posted_at TIMESTAMPTZ,
  ...
)
```

---

### ❌ DON'T: Forget timestamps

```sql
-- Bad: No idea when things happened
status VARCHAR(20)
```

### ✅ DO: Timestamp everything

```sql
-- Good: Full audit trail
status VARCHAR(20),
status_changed_at TIMESTAMPTZ,
created_at TIMESTAMPTZ,
updated_at TIMESTAMPTZ
```

---

## 🧪 Testing Database Schema

```javascript
// tests/db/schema.test.js
import { describe, it, expect } from 'vitest'
import { db } from '../lib/db.js'

describe('Database Schema', () => {
  it('should create video with platform posts', async () => {
    const video = await db.videos.create({
      user_id: 'test-user',
      original_url: 'https://example.com/video.mp4',
      duration: 30
    })

    const post1 = await db.platform_posts.create({
      video_id: video.id,
      platform: 'instagram',
      upload_status: 'published'
    })

    const post2 = await db.platform_posts.create({
      video_id: video.id,
      platform: 'tiktok',
      upload_status: 'pending'
    })

    // Verify posts are linked to video
    const posts = await db.platform_posts.find({
      video_id: video.id
    })

    expect(posts).toHaveLength(2)
  })

  it('should enforce unique post per platform', async () => {
    const video = await db.videos.create({ /* ... */ })

    await db.platform_posts.create({
      video_id: video.id,
      platform: 'instagram'
    })

    // Should fail
    await expect(
      db.platform_posts.create({
        video_id: video.id,
        platform: 'instagram'
      })
    ).rejects.toThrow('unique constraint')
  })

  it('should track job status transitions', async () => {
    const job = await db.processing_jobs.create({
      video_id: 'test-video',
      job_type: 'compress_video',
      status: 'queued'
    })

    // Can transition to running
    await db.processing_jobs.update(job.id, {
      status: 'running'
    })

    // Cannot skip to completed without running
    await expect(
      db.processing_jobs.create({
        video_id: 'test-video',
        job_type: 'compress_video',
        status: 'completed'
      })
    ).rejects.toThrow()
  })
})
```

---

## ✅ Pre-Production Checklist

- [ ] All tables have created_at
- [ ] All status columns have indexes
- [ ] Foreign keys have ON DELETE rules
- [ ] Unique constraints prevent duplicates
- [ ] Timestamps are TIMESTAMPTZ
- [ ] JSONB columns have documented structure
- [ ] Partitioning strategy defined
- [ ] Backup strategy tested
- [ ] Migration rollback plan ready
- [ ] Connection pooling configured
- [ ] Query performance tested
- [ ] Indexes analyzed (EXPLAIN ANALYZE)

---

## 📖 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
- [Database Design Best Practices](https://kb.devoteam.com/databases/designing-a-database-schema)

---

**Created for:** Yingz's Short Clip SaaS
**Last updated:** 2026-02-02
**Database:** PostgreSQL (Supabase)

**พร้อมใช้งานแล้ว! ต้องการให้ช่วย setup database ไหม?**
