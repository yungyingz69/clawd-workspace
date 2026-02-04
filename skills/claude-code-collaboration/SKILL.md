# Claude Code Collaboration Master Skill (Video SaaS Edition)

**Purpose:** ใช้งานร่วมกับ Claude Code ให้มีประสิทธิภาพสูงสุด สำหรับ Video Processing SaaS

## 🎯 Learning Outcomes

- [ ] เข้าใจ Claude Code capabilities สำหรับ video projects
- [ ] Prompt engineering สำหรับ video processing
- [ ] Debug video encoding/uploading issues
- [ ] Work with FFmpeg, APIs, Database
- [ ] Build production-ready code

---

## 🤖 Claude Code คืออะไร?

Claude Code คือ AI pair programmer ที่:
- ✅ เขียนโค้ดได้หลายภาษา (JavaScript, Python, Rust)
- ✅ เข้าใจ context ของ project
- ✅ ช่วย debug, refactor, optimize
- ✅ Suggest best practices สำหรับ video processing
- ❌ ไม่ใช่ magic wand (ต้องให้ context ชัดเจน)

---

## 💬 Prompting Best Practices

### ❌ BAD Prompts
```
"Fix this"
"Make it work"
"Write Instagram API code"
```

### ✅ GOOD Prompts
```
"Fix Instagram Reel upload error. Getting IGApiException code 3.
 Check permissions in lib/social/instagram.js
 Reference: skills/api-integration-master/SKILL.md section 2"

"Optimize video compression in lib/video/processor.js
 Current: 30MB file → 5min processing
 Target: 30MB → 1min
 Use FFmpeg hardware acceleration"

"Add TikTok upload support. Use tiktok-uploader package.
 Follow the same pattern as Instagram uploader in lib/social/instagram.js
 Check: skills/api-integration-master/SKILL.md section 3"
```

---

## 📋 Prompt Template for Video SaaS

```markdown
## Context
- Project: Short Clip SaaS
- Current file: [path]
- Related files: [list]
- Error/Issue: [describe]

## Task
[Clear description of what you want]

## Requirements
- Use existing patterns from [reference files]
- Follow database schema from skills/database-design-master/SKILL.md
- Add error handling with retry logic
- Log everything for debugging

## Output Format
- Show diff of changes
- Explain why you made each change
- Note any breaking changes
- Suggest tests to add
```

---

## 🔄 Workflows สำหรับ Video SaaS

### **Workflow 1: Implement New Platform**

```javascript
// Step 1: Research
@Claude "I want to add TikTok upload. Current setup has Instagram, YouTube.
 Research tiktok-uploader package.
 Show me:
1. Installation command
2. Basic usage example
3. Authentication method
4. Rate limits"

// Step 2: Architecture discussion
@Claude "Based on the research, should I:
A) Create separate tiktok.js (like instagram.js)
B) Refactor to unified adapter pattern first
C) Add to existing files

Consider:
- Scalability (will add more platforms later)
- Code maintainability
- Testing complexity"

// Step 3: Implement incrementally
@Claude "Create lib/social/tiktok.js with:
1. TikTokUploader class
2. upload() method only (no error handling yet)
3. Basic structure

Don't add:
- Error handling
- Retry logic
- Status updates
I'll add those in next steps"

// Step 4: Test & iterate
@Claude "I got error: [paste error]
 The TikTokUploader class is created but upload() fails at authentication.
 Fix the authentication flow.

Current code: [paste]"
```

---

### **Workflow 2: Debug Video Processing**

```javascript
// Step 1: Describe the problem clearly
@Claude "Video compression hangs at 73% progress.

Context:
- Using FFmpeg via fluent-ffmpeg
- Input: 100MB MP4, 1080p, 60fps
- Target: 10MB, 720p, 30fps
- Expected time: 2-3 minutes
- Actual: Hangs indefinitely at 73%

Code: [paste relevant code]
Logs: [paste FFmpeg output]
Error: [if any]

What I've tried:
1. ✅ FFmpeg version is latest
2. ✅ File exists and is readable
3. ❌ Haven't checked if it's a memory issue
4. ❌ Haven't tried different compression presets"

// Step 2: Get diagnosis
@Claude "Analyze this FFmpeg log:
[paste log]

What are the possible causes?
Rank them by likelihood (most likely first)
For each cause, show:
1. How to confirm it's the issue
2. How to fix it"

// Step 3: Apply fix
@Claude "The top cause is memory leak. FFmpeg is buffering entire file.
 Fix: Use stream-based processing with pipes.

Update lib/video/compressor.js to use streams instead of loading entire file.
 Keep the same interface (compress(inputPath, outputPath))"
```

---

### **Workflow 3: Optimize Database Queries**

```javascript
// Step 1: Identify slow query
@Claude "This query is slow (3-5 seconds):
SELECT v.*, p.*
FROM videos v
LEFT JOIN platform_posts p ON p.video_id = v.id
WHERE v.user_id = 'xyz'
ORDER BY v.created_at DESC
LIMIT 20;

Context:
- User has 500 videos
- Each video has 4 platform posts
- Indexes exist on user_id and created_at

Explain Analyze output: [paste]

Optimize this query to run under 100ms"

// Step 2: Get optimization
@Claude "The optimization you suggested is good (use CTE).
 But I need to paginate both videos AND platform_posts together.

Current pagination uses OFFSET which is slow.
Change to cursor-based pagination.

Requirements:
- Return videos + their posts in one query
- Support cursor-based pagination
- Maintain sorting by created_at DESC"

// Step 3: Verify optimization
@Claude "Review this optimized query:
[paste query]

Check:
1. Is it using indexes properly?
2. Will it scale to 10,000 videos?
3. Any edge cases I missed?
4. Should I add materialized views?"
```

---

## 🎨 การใช้งานกับ Video Processing

### **เมื่อเจอ FFmpeg issues:**

```javascript
// Provide full context
@Claude "FFmpeg is not encoding video correctly.

Input:
- Format: MP4 (H.264)
- Resolution: 1920x1080
- Framerate: 60fps
- Bitrate: 8000 kbps

Expected output:
- Format: MP4 (H.264)
- Resolution: 1080x1920 (9:16 for IG Reels)
- Framerate: 30fps
- Bitrate: 3500 kbps

Actual output:
- Resolution: 1920x1080 (wrong aspect ratio)
- Framerate: 60fps (not downsampled)
- Bitrate: 8000 kbps (not reduced)

FFmpeg command I'm using:
ffmpeg -i input.mp4 -vf scale=1080:1920 -r 30 -b:v 3500k output.mp4

Fix the FFmpeg command to produce correct output."
```

---

### **เมื่อทำ Video Upload UI:**

```javascript
// ❌ DON'T: Ask for too much at once
@Claude "Create beautiful upload page"

// ✅ DO: Provide references and iterate
@Claude "Create video upload page.

Reference: [link to similar UI]
Requirements:
- Drag & drop zone
- File size limit display (100MB)
- Format support (MP4, MOV, WebM)
- Progress bar during upload
- Preview after upload
- Error messages in Thai

Framework: Nuxt 3
Components: Use Nuxt UI
Start with just the drag & drop zone first"
```

---

### **เมื่อ Debug API Errors:**

```javascript
// Provide complete error info
@Claude "Instagram API returning error code 3.

Full error:
{
  "error": {
    "message": "Application does not have the capability to make this API call",
    "code": 3,
    "type": "IGApiException",
    "error_subcode": 2228054
  }
}

Current permissions (from Facebook App):
- instagram_basic
- instagram_content_publish
- pages_show_list
- pages_read_engagement

Code that triggered error:
[paste lib/social/instagram.js]

What permission am I missing?
How do I request it?
Will this require app review?"
```

---

## 📁 Project Structure สำหรับ Video SaaS

```
short-clip-saas/
├── lib/
│   ├── social/
│   │   ├── adapter.js          # Unified social media adapter
│   │   ├── instagram.js        # Instagram Graph API
│   │   ├── tiktok.js           # TikTok API
│   │   ├── youtube.js          # YouTube Data API
│   │   └── facebook.js         # Facebook Graph API
│   ├── video/
│   │   ├── processor.js        # Video processing logic
│   │   ├── compressor.js       # FFmpeg compression
│   │   ├── thumbnail.js        # Generate thumbnails
│   │   └── validator.js        # Validate video format/size
│   ├── queue/
│   │   ├── processor.js        # Job processor
│   │   ├── worker.js           # Background worker
│   │   └── scheduler.js        # Job scheduler
│   ├── db/
│   │   ├── schema.sql          # Database schema
│   │   ├── migrations/         # Migration files
│   │   └── queries.js          # Common queries
│   └── utils/
│       ├── retry.js            # Retry logic
│       ├── logger.js           # Logging utility
│       └── errors.js           # Custom error classes
├── components/
│   ├── VideoUploader.vue       # Upload UI
│   ├── ProgressBar.vue         # Progress display
│   ├── PlatformSelector.vue    # Multi-platform selector
│   └── StatusTracker.vue       # Upload status tracking
├── pages/
│   ├── upload.vue              # Upload page
│   ├── dashboard.vue           # Dashboard
│   ├── history.vue             # Upload history
│   └── analytics.vue           # Analytics page
├── server/
│   └── api/
│       ├── upload/
│       │   └── index.post.js   # Upload endpoint
│       ├── videos/
│       │   └── [id]/
│       │       └── index.get.js  # Get video status
│       └── webhooks/
│           └── [platform]/
│               └── index.post.js  # Webhook handlers
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── skills/
    └── api-integration-master/
    └── database-design-master/
```

---

## 🐛 Debug Best Practices

### **1. Isolate the Problem First**

```javascript
// Before asking Claude, narrow down the issue

@Claude "I've isolated the problem:

✅ Video download works (tested with curl)
✅ FFmpeg works (tested manual command)
✅ Database insert works (tested directly)
❌ Job queue not processing jobs

Problem: Jobs are queued but worker doesn't pick them up.

Code: [paste lib/queue/worker.js]
Logs: [paste worker logs]
Queue status: SELECT * FROM processing_jobs WHERE status = 'queued'"

// This saves SO much time!
```

---

### **2. Show What You Tried**

```javascript
@Claude "Instagram upload fails with 400 Bad Request.

I've already tried:
1. ✅ Verified access token is valid (graph.facebook.com/debug_token)
2. ✅ Checked video URL is accessible (curl downloads it)
3. ✅ Tested with different videos (same error)
4. ✅ Verified Instagram Business account is linked
5. ❌ Haven't tried uploading via Graph API Explorer

Request I'm sending:
POST https://graph.facebook.com/v20.0/{user_id}/media
Body: [paste]

Response:
[paste full response]

What should I check next?"
```

---

### **3. Provide Minimal Reproducible Example**

```javascript
@Claude "Here's a minimal example that reproduces the bug:

```javascript
import { InstagramUploader } from './lib/social/instagram.js'

const uploader = new InstagramUploader({
  accessToken: 'test_token'
})

// This throws error
await uploader.uploadReel('https://example.com/video.mp4', 'test')
```

Error: "TypeError: Cannot read property 'id' of undefined"

Line that throws: [paste line]

Full stack trace: [paste]"
```

---

## 📝 Documentation ที่ควรมี

### **1. docs/ARCHITECTURE.md**

```markdown
# System Architecture

## Video Processing Pipeline
1. User uploads video → Server stores in tmp/
2. Create processing jobs (download, validate, compress, thumbnail)
3. Jobs processed in queue (BullMQ)
4. Update status in database
5. User notified when ready

## Platform Upload Pipeline
1. User selects platforms + schedules posts
2. Create platform_posts records (status: pending)
3. Upload worker processes each post
4. Update platform_posts with API response
5. Webhooks update analytics
```

---

### **2. docs/API.md**

```markdown
# API Documentation

## POST /api/upload
Upload video for processing.

Request:
```json
{
  "file": "multipart/form-data",
  "platforms": ["instagram", "tiktok"],
  "caption": "My caption",
  "scheduled_for": "2026-02-03T10:00:00Z"
}
```

Response:
```json
{
  "video_id": "uuid",
  "status": "processing",
  "estimated_time": 180
}
```
```

---

### **3. docs/TROUBLESHOOTING.md**

```markdown
# Troubleshooting Guide

## Instagram upload fails with code 3
**Problem:** IGApiException code 3

**Solution:**
1. Check permissions in .env
2. Verify account type (Business/Creator)
3. Request review in Facebook App Dashboard

## FFmpeg hangs during compression
**Problem:** Compression freezes at random %

**Solution:**
1. Check available memory: `free -h`
2. Reduce thread count: `-threads 2`
3. Use hardware acceleration: `-c:v h264_videotoolbox`
```

---

## 🚀 Production Readiness Checklist

### **Before Deploying:**

- [ ] All .env values documented in .env.example
- [ ] Error logging configured (Sentry/LogRocket)
- [ ] Monitoring set up (Uptime, Performance)
- [ ] Database backups automated (daily)
- [ ] Video storage has CDN (Cloudflare R2)
- [ ] API rate limits tested
- [ ] FFmpeg performance optimized
- [ ] Queue workers have auto-restart (PM2)
- [ ] Webhook handlers tested
- [ ] Documentation complete
- [ ] Code reviewed by Claude
- [ ] Load tested (100 concurrent uploads)
- [ ] Security audit completed
- [ ] GDPR/privacy policy added

---

### **Questions to Ask Claude:**

```javascript
@Claude "Review this for production readiness:
[link to repo or paste code]

Check:
1. Security vulnerabilities (API keys, SQL injection, XSS)
2. Performance bottlenecks (slow queries, memory leaks)
3. Error handling gaps (uncaught exceptions, missing retries)
4. Breaking changes (API changes, schema migrations)
5. Missing documentation

Provide:
- Prioritized list of issues (P0, P1, P2)
- Estimated effort to fix each
- Code examples for fixes

Be strict. If you'd reject this PR, say so."
```

---

## 💡 Pro Tips

### **1. Use Claude as Code Reviewer**

```javascript
@Claude "Review this pull request:
[link or paste code]

Review focus:
1. FFmpeg command correctness
2. API error handling
3. Database query efficiency
4. Memory leaks (video processing)
5. Race conditions (async jobs)

Be critical. If you see issues, mark them:
[CRITICAL] Must fix before merge
[IMPORTANT] Should fix
[MINOR] Nice to have"
```

---

### **2. Generate Tests**

```javascript
@Claude "Generate integration test for Instagram upload.

Test scenarios:
1. Successful upload
2. Invalid token
3. Video too long
4. Network timeout
5. Rate limit hit

Use Vitest + Supabase test database.
Mock external API calls.
Aim for 80% code coverage."
```

---

### **3. Get Performance Improvements**

```javascript
@Claude "Optimize this video compression code:

Current:
- 100MB video → 5 minutes
- Uses 100% CPU (1 core)
- Memory usage: 2GB

Target:
- Same video → 1 minute
- Use all CPU cores
- Memory usage: <500MB

Code: [paste]

Constraints:
- Must maintain quality (CRF 23)
- Output format: MP4 H.264
- Audio: AAC 128kbps

Suggest:
1. FFmpeg command optimization
2. Code changes (if needed)
3. Hardware acceleration options (Mac M1/M2)"
```

---

## ⚠️ Common Pitfalls

### ❌ DON'T: Trust Claude Blindly

```javascript
// Claude might suggest inefficient code
@Claude "Write video compressor"

// Better: Guide it
@Claude "Write video compressor using FFmpeg.

Requirements:
- Use fluent-ffmpeg npm package
- Must handle files up to 500MB
- Must preserve audio
- Must support CRF adjustment
- Must timeout after 5 minutes

After you write, I'll:
1. Test with sample videos
2. Check memory usage
3. Verify output quality
4. Ask you to fix issues"
```

---

### ✅ DO: Iterate and Verify

```javascript
// Small chunks, test frequently

@Claude "Step 1: Create InstagramUploader class with upload() method.
 Use instagram-graph-api-lib.
 Don't add error handling yet.
 Just return raw API response."

// Test it manually
@Claude "Step 2: Add error handling for common errors:
- Invalid token
- Video too long
- Unsupported format"

// Test error cases
@Claude "Step 3: Add retry logic with exponential backoff.
 Max 3 retries, initial delay 1s, max delay 30s"

// Test retries
@Claude "Step 4: Add logging for debugging"

// Test logs
```

---

## 📊 Measuring Success

Track improvements over time:

### **Week 1-2: Learning Phase**
- Focus: Understanding Claude's capabilities
- Practice: Prompts for video processing
- Build: Simple compressor

### **Week 3-4: Optimization Phase**
- Measure: Time saved per feature
- Track: Bug reduction
- Document: Patterns that work

### **Month 2-3: Scaling Phase**
- Handle: Platform integrations
- Refactor: Legacy code
- Improve: Architecture

---

## ✅ Quick Reference

### **When to Ask Claude:**
- ✅ Writing new video processing code
- ✅ Refactoring FFmpeg commands
- ✅ Debugging API errors
- ✅ Adding tests for upload flows
- ✅ Writing API documentation
- ✅ Code reviews before deploy

### **When NOT to Ask Claude:**
- ❌ FFmpeg parameters (research first, then ask)
- ❌ Platform-specific requirements (check docs)
- ❌ Production emergencies (act first)
- ❌ Database design without research

---

## 🎯 Example Session: Building TikTok Upload

```javascript
// Full workflow from start to finish

// Session 1: Setup
@Claude "I want to add TikTok upload.
 Current stack: Instagram (instagram-graph-api-lib), YouTube (googleapis)
 Database: Supabase
 Queue: BullMQ

Research tiktok-uploader package and show:
1. Installation
2. Authentication method
3. Basic usage
4. Rate limits

Timebox: 10 minutes"

// Session 2: Architecture
@Claude "Based on research, design TikTokUploader class.

Requirements:
- Match InstagramUploader interface
- Handle cookie-based auth
- Support scheduled uploads
- Return consistent response format

Show:
1. Class structure
2. Key methods
3. Error handling approach"

// Session 3: Implementation
@Claude "Implement TikTokUploader.upload() method.

Input:
- videoPath: string
- caption: string
- options: { privacy, scheduleTime }

Output:
- { success: boolean, postId: string, url: string }

Error handling:
- Map TikTok errors to our format
- Log full API response
- Suggest retry for rate limits"

// Session 4: Testing
@Claude "Write integration tests for TikTokUploader.

Test cases:
1. Successful upload
2. Invalid credentials
3. Video too long
4. Network timeout
5. Rate limit

Use Vitest + nock for API mocking."

// Session 5: Integration
@Claude "Integrate TikTokUploader into SocialMediaAdapter.

Current adapter: [paste code]
Add TikTok support following same pattern.

Ensure:
- Parallel uploads work
- Error aggregation works
- Status tracking works"
```

---

**Created for:** Yingz's Short Clip SaaS
**Last updated:** 2026-02-02
**Focus:** Video Processing + Social Media APIs

**พร้อมเริ่มงานได้เลยครับ!** 🚀
