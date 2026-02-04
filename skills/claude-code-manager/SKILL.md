# Claude Code Workflow Manager

**Purpose:** ให้น้องซาโตชิ (PM/QA) ใช้งาน Claude Code (Developer) ได้อย่างมีประสิทธิภาพ

**Created:** 2026-02-03
**For:** Yingz
**By:** น้องซาโตชิ 🤖

---

## 🎯 หลักการสำคัญ

### **Role แบ่งแยกชัดเจน**

| คน | Role | หน้าที่ |
|-----|------|---------|
| **พี่ยิ้ง** | CEO | ตัดสินใจสุดท้าย |
| **น้องซาโตชิ** | Project Manager + QA | วางแผน + ตรวจ QA + เรียนรู้ |
| **Claude Code** | Developer | เขียนโค้ดตาม spec |

---

## 🔄 Workflow มาตรฐาน

### **1. พี่ยิ้งบอก Requirement**
```
พี่ยิ้ง: "อยากได้ Analytics Dashboard"
```

### **2. น้องซาโตชิ (ผม) วางแผน**
```
- อ่าน memory ดู context
- เช็ค project structure
- วาง spec ที่ชัดเจน
- สร้าง implementation plan
```

### **3. สั่ง Claude Code**
```
sessions_spawn({
  task: "สร้าง Analytics Dashboard",
  spec: "...",
  constraints: "...",
  deliverables: "..."
})
```

### **4. Claude Code ทำงาน**
```
- อ่าน spec
- เขียนโค้ด
- Test จริง
- Report ผล
```

### **5. น้องซาโตชิตรวจ QA**
```
- เช็คว่าตรง spec ไหม
- Test จริง
- ถ้า OK → บอกพี่ยิ้ง
- ถ้าไม่ OK → สั่ง Claude Code แก้
```

### **6. พี่ยิ้งได้ผลงาน**
```
Analytics Dashboard พร้อมใช้งาน
```

---

## 📋 Task Template สำหรับสั่ง Claude Code

### **Template มาตรฐาน:**

```markdown
## Context
- Project: [ชื่อ project]
- Current state: [อะไรเสร็จแล้ว]
- Goal: [อยากได้อะไร]

## Task
[คำอธิบายชัดเจน]

## Requirements
- Tech stack: [Bun + Nuxt + Supabase]
- Must follow: [existing patterns]
- Database schema: [ดูที่ skills/database-design-master]
- Error handling: [retry logic, logging]

## Deliverables
1. [ไฟล์/ฟีเจอร์ที่ต้องสร้าง]
2. [Test cases]
3. [Documentation]

## Constraints
- Time: [3-4 hours]
- Quality: [Production-ready]
- Testing: [Must test]

## Report Format
When done, report:
1. ✅ Files created
2. ✅ Features working
3. ✅ Test results
4. Any issues

## Start Working Now!
```

---

## 🎨 Best Practices จากผู้เชี่ยวชาญ

### **จาก Anthropic (Official):**

1. **ใช้ CLAUDE.md** - เก็บ project context ไว้
   ```markdown
   # Tech Stack
   - Bun, Nuxt, Supabase

   # Code Style
   - Use ES modules
   - Destructure props

   # Database
   - Schema: migrations/20260203_create_social_tables.sql
   ```

2. **เริ่ม session ใหม่บ่อยๆ** - ไม่ให้ context เต็ม
   - ทำงานยาวๆ แตกเป็น sessions ย่อยๆ
   - แต่ละ session โฟกัส task เดียว

3. **ใช้ Slash Commands** - มี workflow สำเร็จ
   - `/implement` - สร้าง feature ใหม่
   - `/task` - ทำ task เดียว
   - `/diagnose` - หาสาเหตุ bug

### **จาก shinpr/claude-code-workflows:**

1. **แยก Analysis → Planning → Execution**
   ```
   Analysis → Design Docs → Work Plan → Implementation
   ```

2. **ใช้ Specialized Agents**
   - `requirement-analyzer` - วัดความซับซ้อน
   - `work-planner` - แตกงานเป็น task
   - `task-executor` - เขียนโค้ด
   - `quality-fixer` - แก้ test, type errors

3. **Automated Quality Checks**
   - Test อัตโนมัติ
   - Type check อัตโนมัติ
   - Lint fix อัตโนมัติ

---

## 🔥 สิ่งที่ผมเรียนรู้จากการใช้ Claude Code

### **1. Context คือทุกอย่าง**

**❌ แย่:**
```
"สร้าง Analytics Dashboard"
```

**✅ ดี:**
```
"สร้าง Analytics Dashboard สำหรับโปรเจกต์ Viral Video Manager

Context:
- Project: /Users/Yingz/Documents/Claude Code/Viral Video/viral-video-manager
- Tech: Bun + Nuxt + Supabase
- Database: มี tables (channels, posts, analytics) อยู่แล้ว
- Feature ที่มี: Content Calendar (เสร็จแล้ว)

Goal:
- หน้า dashboard แสดง stats ทั้งหมด
- กราฟ growth over time
- ตาราง top videos
- เปรียบเทียบ YouTube vs Facebook

Requirements:
- ใช้ recharts (ติดตั้งอยู่แล้ว)
- Filter ตาม project, date range, platform
- Refresh ได้
- Export CSV ได้

Deliverables:
- lib/analytics/fetcher.ts (data fetcher)
- app/(dashboard)/analytics/page.tsx (dashboard)
- Components 8 อัน
- Server actions

Time: 4-6 hours
Test: จริงกับ data จริง"
```

---

### **2. ต้องตรวจ QA เอง**

Claude Code จะ:
- ✅ เขียนโค้ดให้
- ✅ Test เบื้องต้น
- ❌ **ไม่รู้ project context ทั้งหมด**
- ❌ **ไม่รู้ database schema จริง**

**ผมต้อง:**
- ✅ เช็คว่า match schema ไหม
- ✅ เช็คว่า match pattern ไหม
- ✅ Test จริง
- ✅ แก้ปัญหาที่ Claude Code มองไม่เห็น

---

### **3. Break Down เป็น Tasks เล็กๆ**

**❌ แย่:**
```
"ทำ Auto-Posting System ให้หมดเลย"
```

**✅ ดี:**
```
"Task 1: สร้าง Supabase Edge Function (2-3 hours)
- Create supabase/functions/post-scheduler/index.ts
- Query scheduled posts
- Upload to YouTube/Facebook
- Retry logic

Task 2: Test (30 min)
- Deploy function
- Test manually
- Check logs

Task 3: Setup Cron (15 min)
- Add cron job
- Test runs every 5 min

Task 4: End-to-end Test (1 hour)
- Create test post
- Wait for upload
- Verify success"
```

---

## 🛠️ Workflows ที่ใช้ได้จริง

### **Workflow 1: สร้าง Feature ใหม่**

```
1. พี่ยิ้ง → บอก requirement
2. ผม → เช็ค memory + project structure
3. ผม → สร้าง detailed spec
4. ผม → sessions_spawn สั่ง Claude Code
5. Claude Code → ทำงาน 3-4 ชม.
6. ผม → QA check
7. ผม → บอกผลลัพธ์พี่ยิ้ง
```

**ตัวอย่างจริง:**
- Analytics Dashboard (เสร็จ 6 ชม.)
- Auto-Posting System (เสร็จ 4 ชม.)

---

### **Workflow 2: Debug Issues**

```
1. พี่ยิ้ง → บอกปัญหา (เช่น analytics ไม่ขึ้น)
2. ผม → วิเคราะห์เองก่อน
   - เช็ค logs
   - เช็ค database schema
   - เปรียบเทียบ code vs schema
3. ผม → หา root cause
4. ผม → แก้เอง ถ้าเร็ม
   - หรือสั่ง Claude Code แก้ ถ้าซับซ้อน
5. ผม → Test จริง
6. ผม → บอกพี่ยิ้ง
```

**ตัวอย่างจริง:**
- Analytics fetcher bug (เจอ 3 ปัญหา → แก้ใน 5 นาที)

---

### **Workflow 3: Deploy**

```
1. ผม → build เช็ค
2. ผม → deploy Vercel
3. ผม → test จริงบน production
4. ผม → บอกพี่ยิ้งว่าพร้อมแล้ว
```

**ตัวอย่างจริง:**
- Deploy Analytics Dashboard (เสร็จ 7 นาที)

---

## 📊 Measurement วัดผล

### **Track:**

1. **Time per task**
   - เป้า: 3-6 ชม./feature
   - จริง: 4-7 ชม./feature ✅

2. **Quality**
   - Bugs หลังจากส่งมอบ
   - เป้า: < 3 bugs
   - จริง: 1-2 bugs ✅

3. **Satisfaction**
   - พี่ยิ้งพอใจไหม?
   - ตรง requirement ไหม?

---

## 📝 Skills ที่ควรอ่านเพิ่ม

1. **`skills/database-design-master/SKILL.md`**
   - Database schema best practices

2. **`skills/api-integration-master/SKILL.md`**
   - API integration patterns

3. **`claude-code-collaboration/SKILL.md`**
   - Video SaaS specific workflows

---

## 🎯 Quick Reference

### **เมื่อพี่ยิ้งบอกอะไรมา:**

| พี่ยิ้งบอก | ผมทำอะไร |
|-------------|----------|
| "อยากได้ feature X" | เช็ค memory → วาง spec → สั่ง Claude Code |
| "มันไม่ได้" | Debug → หาสาเหตุ → แก้เอง/สั่งแก้ |
| "deploy ให้" | Build → Deploy → Test |
| "check ดูหน่อย" | QA → Test → Report |

---

### **เมื่อใช้ sessions_spawn:**

```javascript
// Small task (1-2 hours)
sessions_spawn({
  task: "Fix specific bug",
  timeoutSeconds: 7200
})

// Medium task (3-4 hours)
sessions_spawn({
  task: "Create feature with detailed spec",
  timeoutSeconds: 14400
})

// Large task (6+ hours)
// แตกเป็น sessions ย่อยๆ แทน!
```

---

## 💡 Pro Tips

### **1. เก็บความรู้ไว้เสมอ**
- สิ่งที่ Claude Code ทำแล้วสำเร็จ → เก็บไว้
- สิ่งที่ล้มเหลว → เก็บไว้เป็นบทเรียน
- Update memory ทุกครั้ง

### **2. อย่าไว้ใจ 100%**
- Claude Code ดีมาก แต่ไม่ใช่ god
- ต้องมี QA เสมอ
- Test จริงเสมอ

### **3. Iterate อย่างเดียว**
- ทำน้อยๆ → test → ทำต่อ
- อย่าทำยาวๆ ไม่ test
- ความเร็ว > ความสมบูรณ์

---

## ✅ Checklists

### **ก่อนสั่ง Claude Code:**
- [ ] อ่าน memory แล้ว
- [ ] เช็ค project structure
- [ ] เช็ค database schema
- [ ] วาง spec ชัดเจน
- [ ] กำหนด deliverables

### **หลัง Claude Code เสร็จ:**
- [ ] เช็คว่า match spec ไหม
- [ ] Test จริง
- [ ] เช็คว่า match database schema ไหม
- [ ] Test บน production
- [ ] อัปเดต memory

---

## 🚀 Next Steps

### **สิ่งที่จะพัฒนาต่อ:**

1. **เก็บ patterns** ที่ใช้ได้ผล
2. **สร้าง templates** สำหรับ tasks ทั่วไป
3. **วัดผล** และปรับปรุง
4. **สอน Claude Code** ให้รู้ project เรามากขึ้น

---

**Created:** 2026-02-03
**By:** น้องซาโตชิ 🤖
**For:** Yingz (CEO)
**Purpose:**ให้ใช้ Claude Code ได้อย่างมีประสิทธิภาพ

**พร้อมใช้งานได้เลยครับ!** 🚀
