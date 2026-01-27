# Etsy Shops - Master Reference

## Shop Overview

| # | ร้าน | ประเภท | สินค้า |
|---|------|--------|--------|
| 1 | **LittleInkNest** | Digital Wall Art | Printable art, arch frame style |
| 2 | **25HoursStudio** | Deskmat | Gaming/office deskmats |
| 3 | **SnuggleHaven** | Home Decor | Blanket, Towel |
| 4 | **OurMelodyStudio** | Personalize Music | Custom music art/prints |
| 5 | **KDP** | Kindle Direct Publishing | Books/journals |

---

## Shop 1: LittleInkNest (Digital Wall Art)

**Etsy URL:** https://www.etsy.com/shop/LittleInkNest

**Prompt Pattern:**
```
flat artwork style, [SUBJECT] in arch frame, [BACKGROUND] background, [COLORS], [STYLE] art, 5:7 aspect ratio, printable wall art
```

**Key Elements:**
- `flat artwork style` - prefix เสมอ
- `arch frame` - กรอบโค้ง
- `5:7 aspect ratio` - portrait สำหรับ print
- `printable wall art` - suffix เสมอ
- สี muted/pastel (ขายดีกว่าสีจัด)
- 3 รูป/set ที่เข้าชุดกัน

**Popular Themes:**
- Wildflower Meadow (botanical)
- Ocean Dreams (coastal)
- Mountain Sunrise (landscape)
- Celestial Magic (moon, stars)
- Japanese Garden (zen)
- Tropical Paradise (monstera, palm)
- Desert Sunset (southwestern)
- Boho Neutral (earth tones)
- Minimalist Line Art
- Nordic Winter

**File Naming:** WA25xxx (Wall Art 2025 + number)

**Output:** CSV file → ChatGPT gen รูป

---

## Shop 2: 25HoursStudio (Deskmat)

**Etsy URL:** https://www.etsy.com/shop/25HoursStudio

**Prompt Pattern:**
```
[SUBJECT/SCENE], [STYLE] design, seamless pattern OR full illustration, vibrant colors, high resolution, 16:9 aspect ratio, deskmat print ready
```

**Product Specs:**
- Aspect Ratio: **16:9** (landscape)
- Style: gaming, minimalist, artistic, anime
- Resolution: High (print quality)

---

## Shop 3: SnuggleHaven (Home Decor)

**Etsy URL:** https://www.etsy.com/shop/SnuggleHaven

**Products:**
- Blanket (4:5)
- Towel (TBD)

**Prompt Pattern (Blanket):**
```
[SUBJECT/PATTERN], cozy blanket design, [COLORS], soft aesthetic, 4:5 aspect ratio, print ready for fabric
```

**Product Specs:**
- Blanket Aspect Ratio: **4:5**
- Towel Aspect Ratio: TBD
- Style: cozy, soft, home decor

---

## Shop 4: OurMelodyStudio (Personalize Music)

**Etsy URL:** https://www.etsy.com/shop/OurMelodyStudio

**Products:**
- Custom music art/prints
- Personalized song lyrics
- Sound wave art

**Workflow:**
1. รับข้อมูลจากลูกค้า (ชื่อเพลง, ศิลปิน, lyrics)
2. สร้างเพลงใน **Suno AI**
3. Design artwork
4. Deliver to customer

**Note:** ต้องรอข้อมูลจากลูกค้าก่อนทำงาน

---

## Shop 5: KDP (Kindle Direct Publishing)

**Platform:** Amazon KDP

**Products:**
- Books
- Journals
- Planners

**Prompt Pattern:** [TBD - ต้องเพิ่ม]

---

## File Locations

- **Google Drive:** `~/Library/CloudStorage/GoogleDrive-mr.yingz@gmail.com/My Drive/Etsy/`
- **Prompts CSV:** `/Users/Yingz/clawd/outputs/`

---

*Updated: 2026-01-27*
