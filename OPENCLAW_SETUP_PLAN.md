# OpenClaw Multi-Machine Setup Plan

**สร้างวันที่:** 2026-02-04
**เจ้าของ:** พี่ยิ้ง (Yingz)
**วัตถุประสงค์:** ใช้ OpenClaw 2 เครื่อง (Mac + Windows/Ubuntu) พร้อม Auto-Sync

---

## 📋 Phase 1: Git + GitHub Setup ✅ (เสร็จตอนนี้)

### **ทำบน Mac:**

```bash
cd ~/clawd
git init
git add .
git commit -m "Initial: OpenClaw workspace + skills"
gh repo create clawd-workspace --public --source=. --remote=origin --push
```

**สถานะ:** ✅ รันแล้ว
**GitHub:** https://github.com/[username]/clawd-workspace

---

## 📋 Phase 2: Setup OpenClaw บน Windows

### **Step 1: Install Node.js**

```powershell
# Download และ install จาก:
# https://nodejs.org/

# เลือก LTS version
# รัน installer ปกติ
```

### **Step 2: Install OpenClaw**

```powershell
npm install -g openclaw
```

### **Step 3: Clone Workspace**

```powershell
# Clone จาก GitHub
git clone https://github.com/[username]/clawd-workspace.git C:\Users\Yingz\clawd

# หรือใช้ GitHub CLI:
gh repo clone [username]/clawd-workspace C:\Users\Yingz\clawd
```

### **Step 4: สร้าง State Directory**

```powershell
# สร้าง directories
mkdir C:\Users\Yingz\.openclaw
mkdir C:\Users\Yingz\.openclaw\config
mkdir C:\Users\Yingz\.openclaw\memory
mkdir C:\Users\Yingz\.openclaw\state
```

### **Step 5: Copy Config จาก Mac**

**Options:**

**A. USB Drive:**
```
Mac: Copy ~/.openclaw/config/ → USB
Windows: Copy USB → C:\Users\Yingz\.openclaw\config\
```

**B. Network Share:**
```powershell
# Mount Mac folder บน Windows
# แล้ว copy ไปยัง state directory
```

**C. SSH/SCP:**
```powershell
# บน Windows ใช้ Git Bash หรือ WSL
scp yingz@mac-ip:~/.openclaw/config/config.yaml ~/.openclaw/config/
```

### **Step 6: Install Chrome (สำหรับ Browser Extension)**

```powershell
# Download และ install:
# https://www.google.com/chrome/

# หรือใช้ Chrome ที่มีอยู่แล้ว
```

### **Step 7: Install Browser Extension**

```powershell
# Install extension ไปยัง local path
openclaw browser extension install

# ดู path ที่ติดตั้ง
openclaw browser extension path

# เปิด Chrome และ:
# 1. ไปที่ chrome://extensions
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select path จากคำสั่งก่อนหน้า
```

### **Step 8: Start Gateway**

```powershell
# Start OpenClaw Gateway
openclaw gateway start

# หรือรันเป็น service (Windows Service)
openclaw gateway install-service
```

### **Step 9: Verify Setup**

```powershell
# เช็คสถานะ
openclaw status

# เปิด Control UI
openclaw ui

# Test chat
openclaw chat "สวัสดีครับ น้องซาโตชิ"
```

**สถานะ:** ⏳ รอดำเนินการ (หลังจากติดตั้ง Windows)

---

## 📋 Phase 3: Setup Auto-Sync (Nightly)

### **Mac: Nightly Sync Script**

```bash
# สร้าง script
cat > ~/clawd/scripts/nightly-sync.sh <<'EOF'
#!/bin/bash
cd ~/clawd

# Add all changes
git add .

# Commit with timestamp
git commit -m "Nightly sync: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push

echo "✅ Sync completed at $(date)" >> ~/clawd/sync.log
EOF

# Make executable
chmod +x ~/clawd/scripts/nightly-sync.sh
```

### **Mac: Setup Cron**

```bash
# Open crontab
crontab -e

# เพิ่มบรรทัดนี้ (sync ทุกคืนเที่ยงคืน)
0 0 * * * /Users/Yingz/clawd/scripts/nightly-sync.sh >> ~/clawd/sync.log 2>&1
```

### **Windows: Nightly Sync Script**

```powershell
# สร้าง script ไฟล์: C:\Users\Yingz\clawd\scripts\nightly-sync.ps1

cd C:\Users\Yingz\clawd

git add .
git commit -m "Nightly sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push

Add-Content -Path "C:\Users\Yingz\clawd\sync.log" -Value "✅ Sync completed at $(Get-Date)"
```

### **Windows: Setup Task Scheduler**

```powershell
# 1. Open Task Scheduler
#    Win + R → taskschd.msc

# 2. Create Task:
#    - Name: OpenClaw Nightly Sync
#    - Trigger: Daily at 12:00 AM
#    - Action: Run PowerShell script
#    - Script: C:\Users\Yingz\clawd\scripts\nightly-sync.ps1
```

**สถานะ:** ⏳ รอดำเนินการ (หลังจาก setup Windows เสร็จ)

---

## 📋 Phase 4: Workflow การใช้งาน

### **Mac (Main Machine):**

```bash
# ทำงานปกติ
cd ~/clawd

# สร้าง/แก้ไข skills
# ทดสอบ

# Sync ด้วยตัวเอง (ถ้าต้องการ)
git add .
git commit -m "Update: [message]"
git push

# หรือรอ auto-sync ทุกคืน
```

### **Windows (Secondary Machine):**

```powershell
# รอ auto-sync ทุกคืน
# หรือ pull ด้วยตัวเอง

cd C:\Users\Yingz\clawd
git pull

# ได้ update ล่าสุดแล้ว!
```

---

## 📊 Files ที่ Sync ผ่าน Git

```
~/clawd/  (Windows: C:\Users\Yingz\clawd\)
├─ AGENTS.md                 ✅ Sync
├─ SOUL.md                   ✅ Sync
├─ USER.md                   ✅ Sync
├─ MEMORY.md                 ✅ Sync
├─ WORKSPACE.md              ✅ Sync
├─ skills/                   ✅ Sync
│  ├─ optimizing-etsy-listings/
│  ├─ image-gen-agent/
│  └─ ...
├─ memory/                   ✅ Sync
│  └─ YYYY-MM-DD.md
└─ scripts/                  ✅ Sync
   └─ nightly-sync.sh
```

---

## 📊 Files ที่ไม่ Sync (Manual Copy)

```
~/.openclaw/  (Windows: C:\Users\Yingz\.openclaw\)
├─ config/
│  └─ config.yaml            ⚠️ Manual copy (ครั้งเดียว)
├─ memory/
│  └─ MEMORY.md              ⚠️ Manual copy (หรือ sync ผ่าน Git ก็ได้)
├─ state/                    ❌ ไม่ sync (machine-specific)
├─ logs/                     ❌ ไม่ sync
└─ run/                      ❌ ไม่ sync
```

---

## ✅ Checklist การติดตั้ง

### **Mac (เครื่องหลัก):**
- [x] Git init + GitHub repo
- [ ] สร้าง nightly-sync script
- [ ] ตั้งเวลา cron

### **Windows (เครื่องที่ 2):**
- [ ] Install Node.js
- [ ] Install OpenClaw
- [ ] Clone workspace จาก GitHub
- [ ] สร้าง state directories
- [ ] Copy config จาก Mac
- [ ] Install Chrome
- [ ] Install browser extension
- [ ] Start Gateway
- [ ] สร้าง nightly-sync script
- [ ] ตั้งเวลา Task Scheduler
- [ ] Test การใช้งาน

---

## 💡 Tips & Best Practices

### **Git Workflow:**
1. ทำงานบน Mac หลัก
2. Commit + push เมื่อเสร็จงาน
3. Windows pull ได้ทุกเมื่อ (หรือรอ nightly sync)

### **Conflict Resolution:**
```bash
# ถ้าเกิด conflict
git pull --rebase
# หรือ
git merge origin/main
```

### **Backup:**
- GitHub เป็น backup หลัก
- Nightly sync เป็น backup รอง
- สำคัญ: Push ก่อนปิดเครื่องทุกครั้ง!

### **Security:**
- อย่า commit secrets (API keys, passwords)
- ใช้ `.gitignore` สำหรับ sensitive files
- ใช้ private repo ถ้ามีข้อมูลสำคัญ

---

## 🆘 Troubleshooting

### **Git Push ไม่ได้:**
```bash
# เช็ค remote
git remote -v

# เช็ค branch
git branch -a

# Force push (ระวัง!)
git push --force
```

### **Windows Path Issues:**
```powershell
# ใช้ PowerShell หรือ Git Bash
# หลีกเลี่ยง path ที่มี space หรือภาษาไทย
```

### **OpenClaw Gateway ไม่ start:**
```powershell
# เช็ค logs
openclaw logs

# Restart
openclaw gateway restart
```

---

## 📞 วิธีให้น้องซาโตชิช่วย Setup

### **เมื่อพี่ยิ้งพร้อมที่ Windows:**

```
บอกน้องซาโตชิว่า:
"เข้าไป setup Windows ให้ผมหน่อย"
```

### **น้องซาโตชิจะ:**
1. เข้าใจว่าอยู่ Phase ไหน
2. สั่งคำสั่งทีละขั้น
3. รอ verify แต่ละ step
4. บันทึกสิ่งที่ผิดพลาด
5. อัปเดต plan นี้

---

**สถานะปัจจุบัน:** ✅ Phase 1 เสร็จ | ⏳ Phase 2 รอ Windows install | ⏳ Phase 3 รอ setup

**อัปเดตล่าสุด:** 2026-02-04 10:00 GMT+7

---

*Created by น้องซาโตชิ 🤖*
