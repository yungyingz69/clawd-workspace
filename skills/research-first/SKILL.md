# Research First Skill

**Purpose:** บังคับให้ AI research หา tools/ข้อมูลจาก GitHub, documentations ก่อนแก้ปัญหา

**When to use:** เมื่อประสบปัญหาใหม่ๆ หรือไม่แน่ใจวิธีแก้

---

## 🎯 Problem Statement

**AI มักทำผิด:**
- ❌ พยายามแก้ปัญหาทันทีโดยไม่ research
- ❌ ใช้วิธีเดิมๆ ที่ไม่ได้ผล
- ❌ ไม่รู้จัก tools/แหล่งข้อมูลที่ดีกว่า
- ❌ ใช้เวลาลองผิดลองถูกนานๆ
- ❌ Reinvent the wheel (ทำอะไรที่คนอื่นทำไว้แล้ว)

**ควรทำอย่างไร:**
- ✅ Research ก่อนเสมอ
- ✅ หา tools จาก GitHub, npm, PyPI
- ✅ อ่าน official documentations
- ✅ ดูตัวอย่างโค้ดจาก projects ที่น่าเชื่อถือ
- ✅ ถามผู้รู้จริง (Stack Overflow, Reddit, Discord)
- ✅ แล้วค่อยเลือก solution ที่ดีที่สุด

---

## 🔍 Research Workflow

### **Step 1: Identify Problem Type (30 seconds)**

ถามตัวเองว่า:
- ปัญหานี้เคยเจอแล้วหรือยัง?
- น่าจะมีคนเจอแล้วแน่ๆ หรือเปล่า?
- มี library/tool ที่เกี่ยวข้องหรือเปล่า?

**ถ้าตอบ "ไม่แน่ใจ" หรือ "ใหม่" → RESEARCH!**

---

### **Step 2: Search Order (Priority)**

**1. Official Documentation (แหล่งที่เชื่อถือที่สุด)**
```bash
# Examples:
- Next.js: nextjs.org/docs
- Supabase: supabase.com/docs
- FFmpeg: ffmpeg.org/documentation.html
- Instagram Graph API: developers.facebook.com/docs/instagram
```

**2. GitHub Issues (ดูว่าคนอื่นเจอไหม)**
```bash
# Search: "{problem} site:github.com"
# Examples:
- "Instagram upload error code 3 site:github.com"
- "FFmpeg compression slow site:github.com"
- "BullMQ queue not processing site:github.com"
```

**3. Stack Overflow (ดูคำตอบที่ upvote สูงๆ)**
```bash
# Search: "{problem} site:stackoverflow.com"
# Examples:
- "Instagram Graph API error code 3 site:stackoverflow.com"
- "FFmpeg best compression settings site:stackoverflow.com"
```

**4. npm/GitHub Awesome Lists (หา tools)**
```bash
# Search:
- "Instagram upload npm"
- "Video processing library GitHub"
- "awesome video processing"
```

**5. Reddit/Discord (community insights)**
```bash
# Search:
- "Instagram API reddit"
- "FFmpeg compression discord"
```

---

### **Step 3: Evaluate Solutions (5-10 minutes)**

สำหรับแต่ละ solution ที่เจอ:

**Criteria:**
- ✅ **Active Development:** Last commit < 6 months?
- ✅ **Popularity:** Stars > 100? Downloads > 1k/month?
- ✅ **Documentation:** มี docs ครบไหม?
- ✅ **Examples:** มีตัวอย่างโค้ดไหม?
- ✅ **Community:** มีคนใช้เยอะไหม? (Discord, issues)
- ✅ **License:** เหมาะกับ commercial use ไหม?

**Rate each solution:**
```
Solution A: ⭐⭐⭐⭐⭐ (5/5)
- 5k stars, active, great docs
- Example: library-x

Solution B: ⭐⭐⭐ (3/5)
- 500 stars, docs OK
- Example: library-y

Solution C: ⭐ (1/5)
- 50 stars, no docs, inactive
- Skip
```

---

### **Step 4: Test Solution (MVP)**

**เลือก solution ที่ดีที่สุด → ลองเล็กๆ:**

```javascript
// Example: Test Instagram upload
import Library from 'best-instagram-library'

const lib = new Library({ token: 'test' })

// Test basic functionality
try {
  await lib.upload('test.mp4')
  console.log('✅ Works!')
} catch (error) {
  console.log('❌ Error:', error)
  // Try next best solution
}
```

**ถ้าไม่ work:**
- ลอง solution ถัดไป
- หรือ research เพิ่มเติม

---

### **Step 5: Implement with Confidence**

หลังจากเจอ solution ที่ work แล้ว:
- ✅ อ่าน docs ให้ครบ
- ✅ ดู examples จาก GitHub
- ✅ copy-paste ตัวอย่าง
- ✅ customize ให้เหมาะกับ project
- ✅ test อย่างละเอียด

---

## 🛠️ Research Tools

### **For Web Search:**
```bash
# Brave Search (default)
@Claude Search for "Instagram upload npm package"

# Google (alternative)
@Claude Use Google to search "FFmpeg compression best practices"
```

### **For GitHub:**
```bash
# Search repositories
@Claude Search GitHub for "instagram upload library"
@Claude Find GitHub repos related to "video processing"

# Search issues
@Claude Search GitHub issues for "Instagram error code 3"
```

### **For npm/PyPI:**
```bash
# npm packages
@Claude Search npm for "instagram graph api"
@Claude Find npm packages related to "video compression"

# Check package quality
@Claude Check npm stats for "instagram-graph-api-lib"
```

### **For Documentation:**
```bash
# Fetch docs
@Claude Fetch documentation from "nextjs.org/docs"
@Claude Get docs from "supabase.com/docs/guides/auth"
```

---

## 📋 Research Checklist

**Before Solving:**
- [ ] Research official documentation
- [ ] Search GitHub for similar problems
- [ ] Check Stack Overflow for solutions
- [ ] Find npm/GitHub packages
- [ ] Read community discussions
- [ ] Evaluate 3-5 solutions
- [ ] Test top 2 solutions
- [ ] Choose best one
- [ ] Read full documentation
- [ ] Copy examples from GitHub

**After Research:**
- [ ] สรุปวิธีแก้ปัญหา
- [ ] อธิบายทางเลือกทั้งหมด
- [ ] แนะนำวิธีที่ดีที่สุด
- [ ] ให้ตัวอย่างโค้ด
- [ ] อ้างอิง sources

---

## 💡 Common Problems & Research Strategy

### **Problem: "Instagram API upload fails"**

**Research:**
1. **Official Docs:** developers.facebook.com/docs/instagram
   - Check permissions
   - Check API version
   - Check rate limits

2. **GitHub Issues:** "Instagram upload error site:github.com"
   - Look for common errors
   - See how others fixed it

3. **Stack Overflow:** "Instagram Graph API error site:stackoverflow.com"
   - Find solutions with upvotes
   - Check recent answers

4. **npm:** Search "instagram graph api npm"
   - Compare libraries
   - Check stats
   - Read reviews

**Solutions to Evaluate:**
- `instagram-graph-api-lib` (official, 500+ stars)
- `instagram-private-api` (unofficial, 2k+ stars)
- `instagram-publisher` (no API key, 200+ stars)

---

### **Problem: "FFmpeg compression too slow"**

**Research:**
1. **Official Docs:** ffmpeg.org/documentation.html
   - Hardware acceleration
   - Preset options
   - Thread settings

2. **GitHub:** "FFmpeg compression fast site:github.com"
   - FFmpeg command examples
   - Benchmarks

3. **Stack Overflow:** "FFmpeg speed up site:stackoverflow.com"
   - Threading options
   - Hardware acceleration
   - Preset comparisons

**Solutions:**
- Use `-threads 0` (auto)
- Use `-preset fast`
- Use hardware acceleration: `-c:v h264_videotoolbox` (Mac)

---

### **Problem: "Queue system for video processing"**

**Research:**
1. **npm:** Search "job queue npm"
   - Compare: Bull, BullMQ, Agenda, Bree

2. **GitHub:** "job queue comparison site:github.com"
   - Benchmarks
   - Feature comparison

3. **Docs:** Read official docs for each library
   - BullMQ: docs.bullmq.io
   - Agenda: agenda.github.io

**Solutions:**
- **BullMQ** (⭐⭐⭐⭐⭐) - Modern, Redis-based, 10k+ stars
- **Bull** (⭐⭐⭐⭐) - Older, stable, 15k+ stars
- **Agenda** (⭐⭐⭐) - MongoDB-based, 9k+ stars

---

## 🚨 Warning Signs

**หยุดและ Research ถ้า:**
- ⚠️ ไม่เคยเจอปัญหานี้มาก่อน
- ⚠ะ ไม่รู้จัก library/tool ที่เกี่ยวข้อง
- ⚠ะ ปัญหานี้ดูจะซับซ้อน
- ⚠ะ Solution แรกที่ลองไม่ work
- ⚠ะ ลองแก้มาแล้ว 3 ครั้งแล้วไม่สำเร็จ
- ⚠ะ ไม่แน่ใจว่าทำถูกไหม

**RESEARCH → แล้วค่อยแก้!**

---

## ✅ Research Template (Copy-Paste)

เมื่อเจอปัญหาใหม่:

```
## Research: [Problem Name]

**Problem:**
[Describe problem clearly]

**Research Plan:**
1. [ ] Search official documentation
2. [ ] Search GitHub issues
3. [ ] Search Stack Overflow
4. [ ] Find npm/GitHub packages
5. [ ] Read community discussions

**Sources Found:**
- [Source 1]: [URL] - [Summary]
- [Source 2]: [URL] - [Summary]
- [Source 3]: [URL] - [Summary]

**Solutions Evaluated:**
- Solution A: ⭐⭐⭐⭐⭐ - [Library/Tool] - [Why it's good]
- Solution B: ⭐⭐⭐ - [Library/Tool] - [Pros/Cons]
- Solution C: ⭐ - [Library/Tool] - [Why it's bad]

**Recommended Solution:**
[Solution A]

**Implementation:**
```javascript
// Example code
```

**References:**
- [Link 1]
- [Link 2]
```

---

## 🎯 Examples

### **Example 1: Instagram Upload Error**

**Bad (No Research):**
```javascript
// Just try to fix without research
async function uploadToInstagram(video) {
  // Try random things
  await fetch('https://api.instagram.com/upload', {
    method: 'POST',
    body: video
  })
  // ❌ Doesn't work, waste time
}
```

**Good (Research First):**
```
Research:
1. Official Docs: Instagram requires Graph API
2. GitHub: Found instagram-graph-api-lib (500+ stars)
3. npm: Found 3 libraries, picked best one
4. Examples: Copied from GitHub examples

Solution: Use instagram-graph-api-lib
```

```javascript
import InstagramGraphAPI from 'instagram-graph-api-lib'

const api = new InstagramGraphAPI({
  accessToken: process.env.IG_ACCESS_TOKEN
})

const container = await api.createMediaContainer({
  videoUrl: video.url,
  caption: video.caption,
  mediaType: 'REELS'
})

await api.publishMedia(container.id)
// ✅ Works!
```

---

### **Example 2: Video Compression**

**Bad:**
```javascript
// Just use default FFmpeg settings
ffmpeg(input).output(output).run()
// ❌ Slow, poor quality
```

**Good:**
```
Research:
1. Docs: Read FFmpeg compression guide
2. GitHub: Found compression examples
3. Stack Overflow: Found optimal settings
4. Tested: Tried 3 presets

Solution: CRF 23 + preset fast + hardware acceleration
```

```javascript
ffmpeg(input)
  .outputOptions([
    '-c:v', 'libx264',
    '-crf', '23',
    '-preset', 'fast',
    '-c:v', 'h264_videotoolbox' // Mac
  ])
  .output(output)
  .run()
// ✅ Fast, good quality
```

---

## 📊 ROI of Researching

| Scenario | No Research | With Research |
|----------|-------------|--------------|
| **New problem** | 2-5 hours (trial & error) | 30 min (find solution) |
| **Complex problem** | 1-2 days | 2-3 hours |
| **Choosing library** | Pick wrong one, redo later | Pick best one first time |
| **Debugging** | Guess randomly | Find exact fix |

**Time Saved:** 70-90%! 🎉

---

## 🎓 Learning: Research Like a Pro

### **Good Sources (Trust Level):**
1. **Official Documentation** ⭐⭐⭐⭐⭐ (Most reliable)
2. **GitHub Repos (Official)** ⭐⭐⭐⭐⭐
3. **Stack Overflow (High votes)** ⭐⭐⭐⭐
4. **GitHub Issues** ⭐⭐⭐⭐
5. **Reddit (Popular subs)** ⭐⭐⭐
6. **Blog Posts (Reputable)** ⭐⭐⭐

### **Bad Sources (Low Trust):**
- ❌ Random blogs without reputation
- ❌ Very old posts (>5 years)
- ❌ No upvotes/engagement
- ❌ No code examples
- ❌ Inactive projects

---

## ✅ Pre-Solving Checklist

**Before writing ANY code:**
- [ ] Is this a new problem? → Research
- [ ] Do I know the best library? → Research
- [ ] Have I solved this before? → Check notes
- [ ] Are there examples on GitHub? → Copy them
- [ ] Is there official documentation? → Read it

**If ANY answer is "No" or "Not sure" → RESEARCH FIRST!**

---

**Created for:** พี่ยิ้ง
**Purpose:** บังคับให้ AI research ก่อนแก้ปัญหา
**Result:** Save 70-90% time, better solutions

**Rule:** When in doubt, research. Always.

---
**Last Updated:** 2026-02-02
**Version:** 1.0
