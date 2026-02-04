# UX/UI Dashboard Design Master

## 1. Overview

Skill สำหรับออกแบบ Dashboard UI/UX ที่สวย ใช้งานง่าย และ modern สำหรับปี 2024-2025

## 2. Core Principles

### 2.1 Design Philosophy
- **Mobile-First**: ออกแบบ mobile ก่อน แล้วขยายเป็น desktop
- **Progressive Disclosure**: แสดงข้อมูลสำคัญก่อน ซ่อนรายละเอียด
- **Consistency**: ใช้ pattern เดียวกันทั้งระบบ
- **Accessibility**: รองรับทุกคน (WCAG 2.1 AA)

### 2.2 Modern Trends 2024-2025
- Bento Grid Layout
- AI-Powered Adaptive UI
- Glassmorphism (subtle)
- Micro-interactions
- Dark mode first

## 3. Layout Patterns

### 3.1 Bento Grid
```
┌─────────┬─────────┬─────────┐
│  Card 1 │  Card 2 │  Card 3 │
├─────────┴─────────┤─────────┤
│     Chart         │  Card 4 │
├─────────┬─────────┴─────────┤
│ Table   │     Stats         │
└─────────┴───────────────────┘
```

**Best Practices:**
- Cards มีขนาดต่างกันได้ (1x1, 1x2, 2x1, 2x2)
- ใช้ gap 16-24px
- Rounded corners: 12-16px
- Shadow: subtle (0 1px 3px rgba(0,0,0,0.1))

### 3.2 Responsive Breakpoints
```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### 3.3 Navigation Patterns

**Desktop:**
- Left sidebar (fixed, 240-280px)
- Collapsible on hover
- Icons + labels

**Mobile:**
- Bottom navigation (fixed)
- 4-5 items max
- Icon + label (small)
- Hamburger สำหรับเมนูเพิ่มเติม

## 4. Color System

### 4.1 Dark Mode (Recommended)
```css
/* Background */
--bg-primary: #0a0a0a;      /* Main background */
--bg-secondary: #121212;     /* Cards, panels */
--bg-tertiary: #1a1a1a;      /* Elevated cards */
--bg-hover: #262626;         /* Hover states */

/* Text */
--text-primary: #ffffff;     /* 100% opacity */
--text-secondary: #a1a1aa;   /* 60% opacity */
--text-tertiary: #71717a;    /* 40% opacity */
--text-disabled: #52525b;    /* 30% opacity */

/* Borders */
--border-primary: #27272a;
--border-secondary: #3f3f46;

/* Brand Colors (Example: Rose) */
--brand-50: #fff1f2;
--brand-100: #ffe4e6;
--brand-200: #fecdd3;
--brand-300: #fda4af;
--brand-400: #fb7185;
--brand-500: #f43f5e;  /* Primary */
--brand-600: #e11d48;
--brand-700: #be123c;
--brand-800: #9f1239;
--brand-900: #881337;
```

### 4.2 Platform Colors (Video Creator)
```css
--youtube: #FF0000;
--facebook: #1877F2;
--instagram: #E4405F;
--tiktok: #000000;
--twitter: #1DA1F2;
```

### 4.3 Semantic Colors
```css
--success: #22c55e;    /* Green */
--warning: #f59e0b;    /* Amber */
--error: #ef4444;      /* Red */
--info: #3b82f6;       /* Blue */
```

### 4.4 Accessibility Requirements
- Contrast ratio: 4.5:1 minimum (WCAG AA)
- 7:1 for enhanced (WCAG AAA)
- ไม่ใช้ pure black (#000) หรือ pure white (#fff)
- Test with color blindness simulators

## 5. Typography

### 5.1 Font Stack
```css
/* Recommended */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Alternative */
font-family: 'Geist', 'Inter', system-ui, sans-serif;
```

### 5.2 Type Scale
```css
/* Display */
--text-display: 3rem;      /* 48px - Hero */

/* Headings */
--text-h1: 2rem;           /* 32px */
--text-h2: 1.5rem;         /* 24px */
--text-h3: 1.25rem;        /* 20px */
--text-h4: 1.125rem;       /* 18px */

/* Body */
--text-body: 1rem;         /* 16px */
--text-body-sm: 0.875rem;  /* 14px */
--text-caption: 0.75rem;   /* 12px */
```

### 5.3 Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 5.4 Line Heights
```css
--leading-tight: 1.25;     /* Headings */
--leading-normal: 1.5;     /* Body */
--leading-relaxed: 1.75;   /* Large text */
```

## 6. Spacing System

### 6.1 Base Unit: 4px
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 6.2 Common Patterns
```css
/* Card padding */
padding: var(--space-4) var(--space-5);  /* 16px 20px */

/* Section spacing */
margin-bottom: var(--space-8);  /* 32px */

/* Gap in grid */
gap: var(--space-4);  /* 16px */
```

## 7. Components

### 7.1 Cards
```
Specs:
- Border radius: 12-16px
- Padding: 16-24px
- Background: bg-secondary
- Border: 1px solid border-primary
- Shadow: subtle or none in dark mode
- Hover: bg-hover + scale(1.01)
```

### 7.2 Buttons
```
Sizes:
- sm: height 32px, px 12px, text-sm
- md: height 40px, px 16px, text-base (default)
- lg: height 48px, px 24px, text-lg

Variants:
- Primary: brand-500 bg, white text
- Secondary: bg-secondary, border
- Ghost: transparent, hover bg
- Destructive: red bg

States:
- Default
- Hover (lighter/darker)
- Active (scale 0.98)
- Disabled (opacity 0.5)
- Loading (spinner)
```

### 7.3 Inputs
```
Specs:
- Height: 40px (standard)
- Border radius: 8px
- Border: 1px solid border-primary
- Focus: brand-500 border + ring
- Padding: 12px 16px
- Placeholder: text-tertiary
```

### 7.4 Tables
```
Specs:
- Header: bg-secondary, text-secondary, font-semibold
- Row: bg-primary, hover:bg-hover
- Border: border-primary (subtle)
- Cell padding: 12px 16px
- Sticky header on scroll
```

### 7.5 Charts
```
Line Chart:
- Smooth curves (tension: 0.4)
- Show dots on hover
- Tooltip follows cursor
- Grid lines: subtle (border-secondary)

Bar Chart:
- Border radius: 4px (top only)
- Spacing between bars: 8px
- Max 8-10 bars visible

Pie/Donut:
- Hole size: 60-70%
- Max 5-6 segments
- Legend outside
```

## 8. Animations & Interactions

### 8.1 Timing Functions
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 8.2 Duration Guidelines
```css
/* Micro-interactions */
--duration-fast: 150ms;    /* Hover, focus */
--duration-normal: 200ms;  /* Button clicks */
--duration-slow: 300ms;    /* Page transitions */

/* Complex animations */
--duration-complex: 500ms; /* Modals, drawers */
```

### 8.3 Common Animations

**Page Load:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Stagger children: 50-100ms delay each */
```

**Card Hover:**
```css
.card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}
```

**Number Count Up:**
```javascript
// Animate from 0 to target value
// Duration: 1000-1500ms
// Easing: ease-out
```

**Skeleton Loading:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
/* Gradient: linear-gradient(90deg, bg-secondary 25%, bg-hover 50%, bg-secondary 75%) */
/* Background size: 200% 100% */
/* Animation: shimmer 1.5s infinite */
```

### 8.4 Libraries
- **Framer Motion**: React animations (recommended)
- **GSAP**: Complex timeline animations
- **CSS Transitions**: Simple hover states

## 9. Data Visualization

### 9.1 Chart Best Practices

**Do:**
- ใช้สี consistent ตาม platform
- Label ชัดเจน
- Show grid lines (subtle)
- ใช้ tooltip on hover
- Responsive

**Don't:**
- 3D charts (hard to read)
- Too many colors
- Pie chart เกิน 6 slices
- Missing labels

### 9.2 Chart Types by Use Case

| Data Type | Chart Type | Example |
|-----------|------------|---------|
| Trends over time | Line chart | Views growth |
| Comparison | Bar chart | Platform comparison |
| Composition | Pie/Donut | Demographics |
| Distribution | Histogram | Audience age |
| Correlation | Scatter | Engagement vs views |
| Time pattern | Heatmap | Best time to post |

## 10. Mobile Design

### 10.1 Touch Targets
- Minimum: 44x44px (Apple), 48x48px (Google)
- Spacing between: 8px minimum

### 10.2 Typography Mobile
```css
/* Scale down 10-15% from desktop */
--text-h1-mobile: 1.75rem;   /* vs 2rem desktop */
--text-body-mobile: 0.9375rem; /* vs 1rem desktop */
```

### 10.3 Layout Mobile
```css
/* Single column stack */
grid-template-columns: 1fr;

/* Horizontal scroll for tables */
overflow-x: auto;
-webkit-overflow-scrolling: touch;

/* Bottom nav fixed */
position: fixed;
bottom: 0;
height: 64px;
```

### 10.4 Gestures
- **Swipe**: Navigate between tabs
- **Pull down**: Refresh data
- **Pinch**: Zoom charts
- **Long press**: Context menu

## 11. Loading States

### 11.1 Types
1. **Skeleton**: Content placeholder (best for cards, lists)
2. **Spinner**: Circular loading (best for buttons, small areas)
3. **Progress**: Linear progress (best for uploads, long tasks)
4. **Pulse**: Subtle animation (best for text, numbers)

### 11.2 Skeleton Guidelines
- Match final layout exactly
- Use bg-secondary to bg-hover gradient
- Animate horizontally (shimmer effect)
- Duration: 1.5s loop

## 12. Error States

### 12.1 Design
- Friendly illustration (optional)
- Clear error message
- Action button (retry, go back)
- Don't blame user

### 12.2 Empty States
- Illustration or icon
- Helpful message
- CTA button to create/add
- Example data (optional)

## 13. Form Design

### 13.1 Best Practices
- Label อยู่ด้านบน (ไม่ใช่ placeholder)
- Error message ใต้ input
- Success state ด้วย checkmark
- Auto-focus ช่องแรก
- Tab order ตรงกับ visual order

### 13.2 Validation
- Real-time (after blur)
- ไม่ validate ตอน type
- Clear error messages
- บอก requirement ก่อน (password requirements)

## 14. Icons

### 14.1 Library
- **Lucide React**: Modern, consistent (recommended)
- **Heroicons**: Another great option
- **Phosphor Icons**: Weight variants

### 14.2 Usage
```tsx
// Size mapping
sm: 16px
md: 20px (default)
lg: 24px
xl: 32px
```

### 14.3 Guidelines
- ใช้ stroke width consistent
- ไม่ผสม filled และ outlined
- ใช้ icon เดียวกันแทน concept เดียวกัน

## 15. Navigation

### 15.1 Information Architecture
```
Level 1: Main Nav (always visible)
  - Dashboard
  - Analytics
  - Content
  - Settings

Level 2: Sub Nav (contextual)
  - Under Content: Videos, Posts, Drafts
  - Under Analytics: Overview, Audience, Revenue

Level 3: Actions (page level)
  - Buttons, dropdowns, filters
```

### 15.2 Breadcrumbs
- Use สำหรับ deep navigation (3+ levels)
- Home > Category > Page
- Clickable except current page

## 16. Testing & QA

### 16.1 Checklist
- [ ] Responsive ทุก breakpoint
- [ ] Dark mode สมบูรณ์
- [ ] Touch targets ขนาดพอ
- [ ] Animations smooth (60fps)
- [ ] Loading states ครบ
- [ ] Error states ครบ
- [ ] Contrast ratio ผ่าน
- [ ] Keyboard navigation ได้
- [ ] Screen reader อ่านได้

### 16.2 Tools
- **Lighthouse**: Performance, accessibility
- **Stark**: Contrast checker
- **Framer**: Prototyping
- **Figma**: Design system

## 17. Quick Start Template

### 17.1 Project Setup
```bash
# Install dependencies
bun add framer-motion lucide-react
bun add -D @types/node

# Tailwind config (already have)
# shadcn/ui components
npx shadcn add button card input table tabs
```

### 17.2 Layout Component
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="th" className="dark">
      <body className="bg-primary text-primary antialiased">
        <Sidebar />
        <main className="lg:pl-64">
          <Header />
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
        <BottomNav className="lg:hidden" />
      </body>
    </html>
  )
}
```

### 17.3 Card Component Pattern
```tsx
// components/ui/card.tsx
import { motion } from 'framer-motion'

export function StatCard({ title, value, trend, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-secondary border border-border rounded-xl p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <div className="p-3 bg-brand-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-brand-500" />
        </div>
      </div>
    </motion.div>
  )
}
```

## 18. Common Mistakes to Avoid

1. **Over-animating**: ทำให้ช้าและน่ารำคาญ
2. **Ignoring mobile**: 50%+ users ใช้ mobile
3. **Poor contrast**: อ่านยาก
4. **Inconsistent spacing**: ดูไม่ professional
5. **Too many fonts**: ใช้ 1-2 fonts พอ
6. **Missing loading states**: Users งงว่าทำงานอยู่ไหม
7. **No empty states**: Users ไม่รู้ต้องทำอะไร
8. **Small touch targets**: กดผิดบ่อย

## 19. Performance

### 19.1 Targets
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1

### 19.2 Optimization
- Lazy load components
- Optimize images (WebP, responsive)
- Code splitting
- Use system fonts
- Minimize animations on low-end devices

## 20. Resources

### Design Inspiration
- Dribbble (dribbble.com)
- Mobbin (mobbin.com)
- Behance (behance.net)
- Page Collective (pagecollective.com)

### Tools
- Figma: Design & prototyping
- Coolors: Color palette generator
- Fontjoy: Font pairing
- Radix UI: Accessible components

### Documentation
- Tailwind CSS: tailwindcss.com
- shadcn/ui: ui.shadcn.com
- Framer Motion: motion.dev
- Radix UI: radix-ui.com

---

**Version:** 1.0
**Updated:** 2026-02-04
**Author:** Claude Code + น้องซาโตชิ
**Usage:** Dashboard UI/UX สำหรับทุก web project