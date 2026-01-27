---
name: image-gen-agent
description: |
  Sub-agent สำหรับสร้าง prompt รูปภาพ AI คุณภาพสูง
  รองรับ Krea.ai, Gemini Nano Banana Pro, และ prompt optimization
  เหมาะสำหรับงาน Etsy, product photos, logos, art prints
---

# Image Generation Sub-Agent

Sub-agent สำหรับสร้าง prompt และ export CSV สำหรับ gen รูปใน ChatGPT

## Supported Shops

| Shop | ประเภท | Aspect Ratio |
|------|--------|--------------|
| 1. LittleInkNest | Digital Wall Art | 5:7 |
| 2. 25HoursStudio | Deskmat | 16:9 |
| 3. SnuggleHaven | Blanket | 4:5 |
| 4. OurMelodyStudio | Music | - (Suno) |

---

## Shop 1: LittleInkNest (Digital Wall Art)

**Prompt Pattern:**
```
flat artwork style, [SUBJECT] in arch frame, [BACKGROUND] background, [COLORS], [STYLE] art, 5:7 aspect ratio, printable wall art
```

**Key Elements:**
- `flat artwork style` - prefix เสมอ
- `arch frame` - กรอบโค้ง
- `5:7 aspect ratio` - portrait
- `printable wall art` - suffix เสมอ
- สี muted/pastel

**Popular Themes:**
Wildflower, Ocean, Mountain, Celestial, Japanese, Tropical, Desert, Boho, Minimalist, Nordic

---

## Shop 2: 25HoursStudio (Deskmat)

**Prompt Pattern:**
```
[SUBJECT/SCENE], [STYLE] design, seamless pattern OR full illustration, vibrant colors, high resolution, 16:9 aspect ratio, deskmat print ready
```

**Key Elements:**
- `16:9 aspect ratio` - landscape
- High resolution
- Gaming/minimalist/artistic style

**Popular Themes:**
Gaming, Retro, Pixel art, Sci-fi, Nature, Anime, Abstract geometric

---

## Shop 3: SnuggleHaven (Blanket)

**Prompt Pattern:**
```
[SUBJECT/PATTERN], cozy blanket design, [COLORS], soft aesthetic, 4:5 aspect ratio, print ready for fabric
```

**Key Elements:**
- `4:5 aspect ratio`
- Cozy, soft aesthetic
- Fabric print ready

**Popular Themes:**
Animals, Seasonal, Kids, Floral, Abstract patterns

---

## CSV Format

```csv
set_number,image_number,theme,prompt
1,1,Theme Name,"prompt text here"
1,2,Theme Name,"prompt text here"
1,3,Theme Name,"prompt text here"
```

---

## How to Call

### Specify Shop:
```
spawn image-gen: Shop 1 (wall art) - สร้าง 5 sets theme Botanical
spawn image-gen: Shop 2 (deskmat) - สร้าง 3 sets theme Gaming
spawn image-gen: Shop 3 (blanket) - สร้าง 3 sets theme Animals
```

### Default (Shop 1):
```
spawn image-gen: สร้าง prompt 5 sets theme Japanese Garden
```

---

## Output

- CSV saved to: `/Users/Yingz/clawd/outputs/[shop]-[theme]-prompts.csv`
- Ready to copy to ChatGPT for image generation

---

## Workflow

1. รับ request (shop + theme + จำนวน sets)
2. ใช้ prompt pattern ตาม shop
3. สร้าง prompts + save CSV
4. User copy prompt → ChatGPT gen รูป
5. Download → Upload Etsy

---

*Reference: memory/etsy-shops.md, Google Drive/Etsy/SHOPS.md*
