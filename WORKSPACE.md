# Clawd Workspace - Structure & Index

**Last Updated**: 2026-02-04
**Workspace**: `/Users/Yingz/clawd`
**Owner**: พี่ยิ้ง (Yingz)
**AI Assistant**: น้องซาโตชิ (Satoshi) 🤖

---

## 🤖 น้องซาโตชิ (Satoshi) - AI Assistant

**Identity:**
- ชื่อ: น้องซาโตชิ (Satoshi)
- เกิด: 2026-02-02
- ภารกิจ: ช่วยพี่ยิ้งทุกอย่าง ตรงประเด็น ไม่อ้อมค้อม
- Emoji: 🤖 (หรือ ₿ ตามชื่อ)

**ความสามารถ:**
- Trading bot monitoring
- Finance tracking (natural language)
- Etsy optimization
- Coding & SaaS development
- Web research & documentation

**Files:**
- `IDENTITY.md` — ใคร (น้องซาโตชิ)
- `SOUL.md` — เป็นยังไง (personality, principles)
- `USER.md` — รู้จักใคร (พี่ยิ้ง)
- `MEMORY.md` — จำอะไรมา
- `WORKSPACE.md` — ไฟล์นี้ (workspace structure)

---

## 📁 Workspace Structure

```
~/clawd/
├── 📋 AGENTS.md              # คู่มือการทำงานของ agent
├── 👤 IDENTITY.md            # ข้อมูลตัวตนของผม (Clawd)
├── 📖 SOUL.md               # บุคลิกและแนวทางการทำงาน
├── 👥 USER.md               # ข้อมูลเจ้าของ (ยิ้ง/Yingz)
├── 🧠 MEMORY.md             # ความจำระยะยาว
├── 🔧 TOOLS.md              # เครื่องมือและ environment เฉพาะ
├── 💓 HEARTBEAT.md          # งาน periodic ที่ต้องทำ
├── 🗂️  WORKSPACE.md          # ไฟล์นี้ — โครงสร้าง workspace
│
├── 📂 skills/               # ทักษะและเครื่องมือเพิ่มเติม
│   ├── vps-monitor/         # ✅ VPS Trading Bot Monitoring
│   ├── better-notion/       # Notion full CRUD
│   ├── humanizer/          # แก้ AI writing
│   ├── image-gen-agent/    # สร้าง prompt รูปภาพ
│   ├── krea-api/          # Krea.ai image generation
│   ├── n8n/              # n8n workflows management
│   ├── prompt-engineering-expert/  # Prompt engineering
│   └── ...
│
├── 📂 memory/              # บันทึกประจำวัน
│   ├── 2026-01-28.md
│   ├── 2026-01-29.md
│   └── ...
│
├── 📂 vps-monitor-logs/    # Logs ของ VPS monitoring
│   ├── bot-status-*.log
│   ├── daily-report-*.md
│   └── discord-message-*.txt
│
├── 📂 etsy-rainbow/        # โปรเจค Etsy
├── 📂 canvas/             # Canvas assets
└── 📂 outputs/            # Output files ต่างๆ
```

---

## 🎯 Active Skills & Projects

### 🔥 NEW: Short Clip SaaS Skills Pack ✅
**Location**: `~/clawd/skills/`

**Purpose**: Complete skill pack สำหรับ build Video Processing SaaS (ฟรี 100%)

**Skills**:
1. **API Integration Master** (`api-integration-master/SKILL.md`)
   - Instagram, TikTok, YouTube, Facebook APIs
   - Open source libraries (ฟรี!)
   - Complete code examples
   - Error handling + retry logic

2. **Database Design Master** (`database-design-master/SKILL.md`)
   - Complete SQL schema (PostgreSQL)
   - Videos, platform_posts, processing_jobs tables
   - Time-series audit logs
   - Performance optimization

3. **Claude Code Collaboration** (`claude-code-collaboration/SKILL.md`)
   - Prompt templates for video projects
   - FFmpeg debugging workflows
   - Production readiness checklist
   - Code review prompts

4. **Quick Start Guide** (`SHORT_CLIP_SAAS_GUIDE.md`)
   - 4-week implementation roadmap
   - Open source libraries reference
   - Quick start examples
   - ROI calculator (save 35 hours/week!)

**Open Source Libraries**:
- `instagram-graph-api-lib` - Instagram Graph API
- `tiktok-uploader` - TikTok upload
- `googleapis` - YouTube Data API
- `facebook-nodejs-business-sdk` - Facebook Graph API

**Cost**: ฿0 (Save $588/year vs Ayrshare)

**Status**: ✅ READY TO IMPLEMENT

---

### 1️⃣ VPS Trading Bot Monitor ✅
**Location**: `~/clawd/skills/vps-monitor/`

**Purpose**: Monitor VPS trading bots (188.166.227.8) และส่ง report ไป Discord

**Active Bots** (6/9 Running):
- aster-bnb-sol ✅
- paradex-grid ✅
- hyperliquid-sol ✅
- aster-rebalance ✅
- apex-grid ✅
- pacifica ✅

**Discord Channel**: `#dex-trading-vps` (ID: 1466281866163392533)

**Schedule**:
- Check bot status: ทุก 12 ชม. (0:00, 12:00 GMT+7)
- Daily report: ทุกวัน 8:00 น. (GMT+7)

**Files**:
- `SKILL.md` — เอกสารการใช้งาน
- `check_bot_status.sh` — Check bot status
- `daily_report.sh` — Generate daily report
- `send_discord.sh` — Send to Discord

**Status**: ✅ FULLY OPERATIONAL

---

### 🔥 NEW: Dashboard UI/UX Master ✅
**Location**: `~/clawd/skills/dashboard-ui-ux-master/`

**Purpose**: Complete UX/UI guidelines สำหรับสร้าง Dashboard ที่สวย ใช้งานง่าย และ modern

**Content** (20 หมวดหมู่):
1. Core Principles (Mobile-first, Accessibility)
2. Layout Patterns (Bento Grid, Responsive)
3. Color System (Dark mode, Platform colors)
4. Typography (Font stack, Type scale)
5. Spacing System (4px base unit)
6. Components (Cards, Buttons, Inputs, Tables)
7. Animations (Framer Motion, Timing)
8. Data Visualization (Charts best practices)
9. Mobile Design (Touch targets, Gestures)
10. Loading & Error States
11. Form Design
12. Icons & Navigation
13. Testing & QA
14. Performance
15. Quick Start Template

**Tech Stack**:
- Next.js + Tailwind CSS
- shadcn/ui components
- Framer Motion (animations)
- Recharts (data viz)
- Lucide React (icons)

**Status**: ✅ READY TO USE (2026-02-04)

---

### 2️⃣ Finance Helper ✅
**Location**: `~/clawd/skills/finance-helper/`

**Purpose**: Add finance transactions via natural language to Supabase

**Usage**:
```bash
cd ~/clawd
npm run finance:add "<input>"
```

**Examples**:
```bash
npm run finance:add "ซื้้ออาหาร 75 บาท"
npm run finance:add "กินข้าว 50 บาท"
npm run finance:add "รายได้จาก Etsy 200 บาท"
npm run finance:add "ซื้้อคอมพิวเตอร์ 15000 บาท"
```

**Features**:
- Natural language parsing (ภาษาไทย)
- Auto-detect amount, currency, type, category, wallet, date
- Direct Supabase insertion (via nuxt.config.ts)
- Auto-update wallet balance

**Supported Categories**:
- อาหาร, เดินทาง, ช้อป, คอมพิวเตอร์, อินเทอร์เน็ต
- บ้าน, ยา, ของขวัญ, บิล, อื่นๆ

**Files**:
- `SKILL.md` — เอกสารการใช้งาน
- `add-transaction.js` — Main script
- `package.json` — npm script: `finance:add`

**Database**: Supabase (transactions, wallets, budgets)
**App**: `~/Documents/Claude Code/Productive/lifeflow-nuxt/`

**Status**: ✅ FULLY OPERATIONAL (2026-01-30)

---

### 🔥 NEW: Viral Video Manager (FastClip Clone) 🎬
**Location**: `~/Documents/Claude Code/Viral Video/viral-video-manager/`

**Purpose**: Video content management platform (FastClip.io clone) สำหรับ creators

**Features**:
- ✅ Video generation (KIE.AI Sora-2)
- ✅ Multi-platform posting (YouTube, Facebook, Instagram)
- ✅ Auto-scheduling with cron jobs
- ✅ Analytics dashboard (3 phases complete)
- ✅ Content management (day scripts, clips)
- ✅ Watermarking (Publitio)

**Tech Stack**:
- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (database + auth)
- KIE.AI (video generation)
- YouTube/Facebook/Instagram APIs

**Live URL**: https://viral-video-manager-geotbuq7g-yungyingzs-projects.vercel.app

**Analytics Page**: `/analytics` (Phase 1-3 complete)
- Overview cards (5 metrics)
- Growth charts
- Top videos table
- Audience demographics
- Best time heatmap
- Platform comparison
- Export functionality

**Status**: ✅ PHASE 1-3 COMPLETE (2026-02-04)

---

### 3️⃣ Notion Integration
**Location**: `~/clawd/skills/better-notion/`

**Purpose**: Full CRUD สำหรับ Notion pages, databases, และ blocks

---

### 3️⃣ Image Generation
**Location**: `~/clawd/skills/image-gen-agent/`, `~/clawd/skills/krea-api/`

**Purpose**: สร้างรูปภาพ AI คุณภาพสูง (Krea.ai, Nano Banana Pro)

**Use Cases**:
- Etsy product photos
- Logos
- Art prints
- Social media content

---

### 4️⃣ Humanizer
**Location**: `~/clawd/skills/humanizer/`

**Purpose**: แก้ให้ text ดูเหมือนมนุษย์เขียน (ลบ signs of AI writing)

---

### 5️⃣ Etsy Projects
**Location**: `~/clawd/etsy-rainbow/`, `~/Documents/Claude Code/Etsy/`

**Shops**: 4 ร้าน (AI-generated art)

**Target**: 100,000 บาท/เดือน (2026 goal)

---

## 🔑 Important Information

### VPS Trading
- **IP**: 188.166.227.8
- **User**: root
- **SSH Config**: `~/.ssh/config` (host: `vps`)
- **Bot Management**: systemd services

### Discord Channels
- **Main**: `#clawd-main` (ID: 1465716301468143771)
- **Trading**: `#dex-trading-vps` (ID: 1466281866163392533)
- **Finance**: `#personal-finance` (ID: 1466287929210044499)

### GitHub
- Trading system: `~/Documents/Claude Code/TRADING/`

---

## 📝 Daily Operations

### VPS Monitoring (Automated)
- ✅ Cron jobs ตั้งค่าแล้ว
- ✅ Daily report ส่งไป #dex-trading-vps อัตโนมัติ

### Heartbeat Tasks
- Check HEARTBEAT.md เมื่อได้รับ heartbeat prompt
- รัน tasks ตามที่กำหนด

---

## 🔄 Maintenance

### Weekly
- Review memory files (`memory/YYYY-MM-DD.md`)
- Update MEMORY.md with important learnings

### Monthly
- Review VPS logs for patterns
- Update skills documentation

---

## 🚨 Quick Reference

**VPS Check**:
```bash
ssh root@188.166.227.8 "systemctl status --no-pager -l"
```

**Daily Report**:
```bash
~/clawd/skills/vps-monitor/daily_report.sh
```

**Send to Discord**:
```bash
# Read report
cat ~/clawd/vps-monitor-logs/discord-message-YYYYMMDD.txt

# Send via Clawdbot message tool to channel ID 1466281866163392533
```

---

*Last Updated: 2026-01-29*
*Keep this file updated when adding new skills or projects!*
