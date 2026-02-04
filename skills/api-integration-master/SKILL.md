# API Integration Master Skill (Open Source Edition)

**Purpose:** เชี่ยวชาญการต่อ Social Media APIs ด้วย Open Source solutions (ฟรี 100%)

## 🎯 Learning Outcomes

- [ ] เข้าใจ OAuth 2.0 flow ทั้งหมด
- [ ] ใช้ Open Source libraries สำหรับ Instagram, TikTok, YouTube, Facebook
- [ ] Error handling ระดับโปร
- [ ] Rate limiting & retry logic
- [ ] Build unified API adapter ของตัวเอง

---

## 🛠️ Open Source Solutions (ฟรี!)

### **Platform → Library Map**

| Platform | Open Source Library | Installation | Stars | Status |
|----------|-------------------|--------------|-------|--------|
| **Instagram** | `instagram-graph-api-lib` | `npm install instagram-graph-api-lib` | ⭐ 500+ | ✅ Active |
| **Instagram** | `instagram-publisher` | `npm install instagram-publisher` | ⭐ 200+ | ✅ No API key |
| **TikTok** | `tiktok-uploader` | `npm install tiktok-uploader` | ⭐ 300+ | ✅ Active |
| **TikTok** | `TikTok-Api` (Python) | `pip install TikTok-Api` | ⭐ 1k+ | ✅ Active |
| **YouTube** | `googleapis` | `npm install googleapis` | ⭐ Official | ✅ Active |
| **Facebook** | `facebook-nodejs-business-sdk` | `npm install facebook-nodejs-business-sdk` | ⭐ Official | ✅ Active |
| **Twitter/X** | `twitter-api-v2` | `npm install twitter-api-v2` | ⭐ 1k+ | ✅ Active |
| **Unified** | `@superfaceai/social-media-upload-lib` | `npm install @superfaceai/social-media-upload-lib` | ⭐ 300+ | ✅ Active |

---

## 📚 Platform-Specific Guides

### **1. Instagram Reels Upload**

#### **Option A: instagram-graph-api-lib (Recommended)**

```bash
npm install instagram-graph-api-lib
```

```javascript
// lib/social/instagram.js
import { InstagramGraphAPI } from 'instagram-graph-api-lib'

class InstagramUploader {
  constructor(config) {
    this.api = new InstagramGraphAPI({
      accessToken: config.accessToken,
      userId: config.userId
    })
  }

  async uploadReel(videoUrl, caption) {
    try {
      // Step 1: Create media container
      const container = await this.api.createMediaContainer({
        videoUrl,
        caption,
        mediaType: 'REELS'
      })

      console.log('Container created:', container.id)

      // Step 2: Wait for processing (poll status)
      const status = await this.waitForProcessing(container.id)

      if (status !== 'FINISHED') {
        throw new Error(`Video processing failed: ${status}`)
      }

      // Step 3: Publish the reel
      const result = await this.api.publishMedia(container.id)

      return {
        success: true,
        postId: result.id,
        url: result.permalink
      }

    } catch (error) {
      throw this.handleError(error)
    }
  }

  async waitForProcessing(containerId, maxWait = 300000) {
    const startTime = Date.now()

    while (Date.now() - startTime < maxWait) {
      const status = await this.api.getContainerStatus(containerId)

      if (status.status === 'FINISHED') {
        return 'FINISHED'
      }

      if (status.status === 'ERROR') {
        throw new Error(status.error_message)
      }

      // Wait 5 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 5000))
    }

    throw new Error('Processing timeout')
  }

  handleError(error) {
    // Map error codes to user-friendly messages
    const errorMap = {
      'INVALID_ACCESS_TOKEN': 'Instagram access token expired. Please re-authenticate.',
      'RATE_LIMIT_EXCEEDED': 'Too many uploads. Please wait before trying again.',
      'VIDEO_TOO_LONG': 'Video must be under 60 seconds for Reels.',
      'UNSUPPORTED_VIDEO_FORMAT': 'Please use MP4 format.',
      'INSUFFICIENT_PERMISSIONS': 'Missing required permissions. Check your app settings.'
    }

    return {
      code: error.code,
      message: errorMap[error.code] || error.message,
      details: error
    }
  }
}

export default InstagramUploader
```

#### **Option B: instagram-publisher (No API Key Required!)**

```bash
npm install instagram-publisher
```

```javascript
import InstagramPublisher from 'instagram-publisher'

const publisher = new InstagramPublisher()

// Uses unofficial API (might break, use with caution)
await publisher.publish({
  video: './video.mp4',
  caption: 'My reel!',
  type: 'REEL'
})
```

⚠️ **Warning:** Unofficial API might break anytime. Use only for personal projects.

---

### **2. TikTok Upload**

```bash
npm install tiktok-uploader
```

```javascript
// lib/social/tiktok.js
import { TikTokUploader, TikTokCookieJar } from 'tiktok-uploader'

class TikTokUploader {
  constructor(config) {
    this.cookies = new TikTokCookieJar()
    this.uploader = new TikTokUploader({
      cookies: this.cookies,
      username: config.username,
      password: config.password
    })
  }

  async upload(videoPath, caption, options = {}) {
    try {
      const result = await this.uploader.upload({
        video: videoPath,
        caption: caption,
        schedule: options.scheduleTime,
        privacy: options.privacy || 'public' // public, friends, private
      })

      return {
        success: true,
        postId: result.video.id,
        url: result.video.url
      }

    } catch (error) {
      throw this.handleTikTokError(error)
    }
  }

  handleTikTokError(error) {
    const errorMap = {
      'LOGIN_FAILED': 'Invalid TikTok credentials',
      'VIDEO_TOO_LONG': 'Video must be under 3 minutes',
      'INVALID_FORMAT': 'Use MP4 or WebM format',
      'BANNED': 'Account has been banned or restricted',
      'RATE_LIMIT': 'Too many uploads. Wait 24 hours.'
    }

    return {
      code: error.code,
      message: errorMap[error.code] || error.message,
      details: error
    }
  }
}

export default TikTokUploader
```

---

### **3. YouTube Upload**

```bash
npm install googleapis
```

```javascript
// lib/social/youtube.js
import { google } from 'googleapis'
import fs from 'fs'

class YouTubeUploader {
  constructor(config) {
    const auth = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    )

    auth.setCredentials({
      refresh_token: config.refreshToken
    })

    this.youtube = google.youtube({
      version: 'v3',
      auth
    })
  }

  async upload(videoPath, metadata) {
    try {
      const { title, description, tags = [], privacy = 'public' } = metadata

      const response = await this.youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title,
            description,
            tags,
            categoryId: 22 // People & Blogs
          },
          status: {
            privacyStatus: privacy,
            selfDeclaredMadeForKids: false
          }
        },
        media: {
          body: fs.createReadStream(videoPath)
        }
      })

      return {
        success: true,
        videoId: response.data.id,
        url: `https://youtube.com/watch?v=${response.data.id}`
      }

    } catch (error) {
      throw this.handleYouTubeError(error)
    }
  }

  handleYouTubeError(error) {
    const errorMap = {
      'quotaExceeded': 'Daily upload quota exceeded',
      'invalidCredentials': 'OAuth token expired. Re-authenticate.',
      'uploadLimitExceeded': 'Account upload limit reached',
      'forbidden': 'Channel does not have permission to upload'
    }

    return {
      code: error.code,
      message: errorMap[error.code] || error.message,
      details: error
    }
  }
}

export default YouTubeUploader
```

---

### **4. Facebook Upload**

```bash
npm install facebook-nodejs-business-sdk
```

```javascript
// lib/social/facebook.js
import FacebookAds from 'facebook-nodejs-business-sdk'

class FacebookUploader {
  constructor(config) {
    FacebookAds.FacebookAdsApi.init(config.accessToken)
    this.AdAccount = FacebookAds.AdAccount
    this.AdCreative = FacebookAds.AdCreative
  }

  async uploadVideo(videoUrl, pageId, caption) {
    try {
      const account = new this.AdAccount(pageId)

      // Upload video to page
      const video = await account.createAdVideo({
        video_url: videoUrl
      })

      // Create post with video
      const post = await account.createAdCreative({
        object_story_spec: {
          page_id: pageId,
          video_data: {
            video_id: video.id,
            call_to_action: {
              type: 'LEARN_MORE'
            }
          }
        }
      })

      return {
        success: true,
        postId: post.id,
        url: post.inline_shareable_url
      }

    } catch (error) {
      throw this.handleFacebookError(error)
    }
  }

  handleFacebookError(error) {
    const errorMap = {
      'invalid_token': 'Access token expired',
      'permission': 'Missing required permissions',
      'rate_limit': 'Too many requests. Slow down.',
      'video_too_large': 'Video size exceeds 4GB limit',
      'invalid_format': 'Use MP4 or MOV format'
    }

    return {
      code: error.code,
      message: errorMap[error.code] || error.message,
      details: error
    }
  }
}

export default FacebookUploader
```

---

## 🌟 Unified Social Media Adapter (Your Own API)

เนื่องจากแต่ละ platform มี API ต่างกัน ให้สร้าง **Unified Adapter** เพื่อให้ใช้งานง่าย

```javascript
// lib/social/adapter.js
import InstagramUploader from './instagram.js'
import TikTokUploader from './tiktok.js'
import YouTubeUploader from './youtube.js'
import FacebookUploader from './facebook.js'

class SocialMediaAdapter {
  constructor(config) {
    this.platforms = {
      instagram: new InstagramUploader(config.instagram),
      tiktok: new TikTokUploader(config.tiktok),
      youtube: new YouTubeUploader(config.youtube),
      facebook: new FacebookUploader(config.facebook)
    }
  }

  async upload(videoPath, metadata, platforms = ['instagram']) {
    const results = {}

    // Upload to all requested platforms in parallel
    await Promise.allSettled(
      platforms.map(async (platform) => {
        try {
          const result = await this.platforms[platform].upload(
            videoPath,
            metadata[platform] || metadata
          )

          results[platform] = {
            status: 'success',
            ...result
          }

        } catch (error) {
          results[platform] = {
            status: 'failed',
            error: error.message,
            details: error
          }
        }
      })
    )

    return results
  }

  async uploadToAll(videoPath, metadata) {
    return await this.upload(videoPath, metadata, [
      'instagram',
      'tiktok',
      'youtube',
      'facebook'
    ])
  }
}

export default SocialMediaAdapter
```

---

## 🔧 Error Handling Best Practices

### **Retry Logic with Exponential Backoff**

```javascript
// lib/utils/retry.js
export async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2
  } = options

  let lastError

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()

    } catch (error) {
      lastError = error

      // Don't retry on client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error
      }

      // Don't retry on last attempt
      if (attempt === maxRetries - 1) {
        throw error
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        initialDelay * Math.pow(backoffMultiplier, attempt),
        maxDelay
      )

      console.log(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}
```

---

## 📝 Environment Variables Setup

```bash
# .env.example

# Instagram
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
INSTAGRAM_BUSINESS_ACCOUNT_ID=

# TikTok
TIKTOK_USERNAME=
TIKTOK_PASSWORD=

# YouTube
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=

# Facebook
FACEBOOK_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=3600000
```

---

## 🚀 Usage Examples

### **Example 1: Upload to Instagram Only**

```javascript
import SocialMediaAdapter from './lib/social/adapter.js'

const adapter = new SocialMediaAdapter({
  instagram: {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    userId: process.env.INSTAGRAM_USER_ID
  }
})

const result = await adapter.upload(
  './video.mp4',
  {
    caption: 'My awesome reel!',
    hashtags: ['#viral', '#trending']
  },
  ['instagram']
)

console.log(result)
// { instagram: { status: 'success', postId: '...', url: '...' } }
```

### **Example 2: Upload to Multiple Platforms**

```javascript
const result = await adapter.upload(
  './video.mp4',
  {
    instagram: {
      caption: 'Instagram caption!'
    },
    tiktok: {
      caption: 'TikTok caption!'
    },
    youtube: {
      title: 'YouTube Title',
      description: 'YouTube description',
      tags: ['tag1', 'tag2']
    }
  },
  ['instagram', 'tiktok', 'youtube']
)
```

### **Example 3: Upload to All**

```javascript
const result = await adapter.uploadToAll(
  './video.mp4',
  {
    caption: 'Universal caption!',
    title: 'Universal title!',
    description: 'Universal description!'
  }
)
```

---

## 🧪 Testing

```javascript
// tests/social/instagram.test.js
import { describe, it, expect } from 'vitest'
import InstagramUploader from '../../lib/social/instagram.js'

describe('InstagramUploader', () => {
  it('should upload reel successfully', async () => {
    const uploader = new InstagramUploader({
      accessToken: 'test_token',
      userId: 'test_user'
    })

    const result = await uploader.uploadReel(
      'https://example.com/video.mp4',
      'Test caption'
    )

    expect(result.success).toBe(true)
    expect(result.postId).toBeDefined()
  })

  it('should handle invalid token error', async () => {
    const uploader = new InstagramUploader({
      accessToken: 'invalid_token',
      userId: 'test_user'
    })

    await expect(
      uploader.uploadReel('video.mp4', 'caption')
    ).rejects.toThrow('INVALID_ACCESS_TOKEN')
  })
})
```

---

## ⚠️ Common Pitfalls

### ❌ DON'T: Hardcode credentials
```javascript
// BAD
const token = 'IGQVJ...'
```

### ✅ DO: Use environment variables
```javascript
// GOOD
const token = process.env.INSTAGRAM_ACCESS_TOKEN
```

---

### ❌ DON'T: Ignore rate limits
```javascript
// BAD - will get banned
for (let i = 0; i < 1000; i++) {
  await uploadVideo(videos[i])
}
```

### ✅ DO: Implement rate limiting
```javascript
// GOOD - respects rate limits
import pLimit from 'p-limit'

const limit = pLimit(10) // Max 10 concurrent requests

await Promise.all(
  videos.map(video => limit(() => uploadVideo(video)))
)
```

---

### ❌ DON'T: Forget to handle errors
```javascript
// BAD
await uploadVideo(video)
```

### ✅ DO: Wrap in try-catch
```javascript
// GOOD
try {
  await uploadVideo(video)
} catch (error) {
  logger.error('Upload failed', error)
  // Notify user, retry, etc.
}
```

---

## 📊 Rate Limits Reference

| Platform | Free Tier | Rate Limit | Quota Reset |
|----------|-----------|------------|-------------|
| **Instagram** | Unlimited | 25 uploads/day | Daily |
| **TikTok** | Unlimited | 15 uploads/day | Daily |
| **YouTube** | Unlimited | Unlimited | - |
| **Facebook** | Unlimited | 50 posts/day | Daily |

---

## ✅ Pre-Production Checklist

- [ ] All API keys in `.env`
- [ ] OAuth 2.0 flow tested
- [ ] Error handling implemented
- [ ] Retry logic added
- [ ] Rate limiting implemented
- [ ] Logging configured
- [ ] Tests written
- [ ] Documentation complete

---

## 📖 Additional Resources

- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-platform)
- [TikTok for Developers](https://developers.tiktok.com/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)

---

**Created for:** Yingz's Short Clip SaaS
**Last updated:** 2026-02-02
**Cost:** ฿0 (100% Open Source)

**Ready to use? ให้ผมช่วย implement ได้เลย!**
