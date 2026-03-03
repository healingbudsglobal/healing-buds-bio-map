# Healing Buds — Brand Guidelines

> **Version:** 1.0 · **Updated:** March 2026
> **Domain:** healingbuds.co.za · **Survey:** mystrain.healingbuds.co.za

---

## 1. Brand Identity

### Mission
Healing Buds provides precision-matched, lab-tested medical cannabis strains to patients across South Africa, using data-driven bio-mapping to deliver personalised treatment recommendations.

### Brand Personality
- **Clinical** — pharmaceutical-grade credibility
- **Warm** — approachable wellness brand, not cold pharma
- **Premium** — luxury positioning in the medical cannabis space
- **Trustworthy** — EU GMP certified, SAHPRA compliant, POPIA adherent

### Tone of Voice
- Professional yet accessible
- Science-forward: reference lab testing, bio-mapping, strain analysis
- Empowering: focus on personalised medicine, individual results
- Avoid: recreational language, slang, unsubstantiated medical claims

---

## 2. Color Palette

### Primary Colors

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--brand-gold` | `40 85% 55%` | `#E5A31E` | **Primary CTA**, highlighted text, key accents |
| `--brand-gold-light` | `38 80% 65%` | `#D4B54A` | Gradient endpoints, hover states |
| `--brand-gold-dark` | `42 90% 42%` | `#C88A0A` | Active states, pressed buttons |

### Secondary Colors (Teal/Green Family)

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--primary-green` | `178 48% 21%` | `#1C4F4D` | Navbar, section backgrounds |
| `--secondary-green` | `178 48% 33%` | `#2C7D7A` | Secondary UI, badges |
| `--accent-green` | `164 48% 53%` | `#4DBFA1` | Trust badges, spinner rings, secondary indicators |
| `--deep-teal` | `180 84% 32%` | `#0D9488` | Deep accent |
| `--lime-green` | `84 81% 44%` | `#84CC16` | Tertiary accent (use sparingly) |

### Surface Colors

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--background` | `180 8% 7%` | `#101414` | Page background |
| `--foreground` | `150 8% 95%` | `#F0F3F2` | Primary text |
| `--card` | `175 6% 11%` | `#1A1D1C` | Card backgrounds |
| `--surface` | `175 6% 10%` | `#181B1A` | Sunken surfaces |
| `--surface-elevated` | `175 6% 13%` | `#1F2322` | Elevated surfaces, inputs |
| `--muted` | `175 6% 14%` | `#222625` | Muted backgrounds |
| `--muted-foreground` | `165 10% 55%` | `#7F958E` | Secondary text |
| `--border` | `170 8% 20%` | `#2F3633` | Borders, dividers |

### Semantic Colors

| Token | HSL | Usage |
|-------|-----|-------|
| `--destructive` | `18 60% 50%` | Error states, warnings |
| `--primary` | `168 38% 45%` | Interactive teal elements |
| `--accent` | `164 48% 53%` | Accent highlights (teal) |

---

## 3. Typography

### Font Stack

| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| **Display** | DM Sans | 600, 700, 800 | Headlines, CTAs, hero text |
| **Body** | Inter | 300, 400, 500, 600 | Body text, labels, UI elements |

### Scale

| Token | Size | Usage |
|-------|------|-------|
| `--font-size-xs` | 0.75rem (12px) | Captions, badges |
| `--font-size-sm` | 0.875rem (14px) | Small text, labels |
| `--font-size-base` | 1rem (16px) | Body text |
| `--font-size-lg` | 1.125rem (18px) | Emphasized body |
| `--font-size-xl` | 1.25rem (20px) | Subheadings |
| `--font-size-2xl` | 1.5rem (24px) | Section headings |
| `--font-size-3xl` | 1.875rem (30px) | Page headings |
| `--font-size-4xl` | 2.25rem (36px) | Hero text (mobile) |
| `--font-size-5xl` | 3rem (48px) | Hero text (desktop) |

### Tracking
- Display text: `tracking-[0.02em]`
- Badge/label text: `tracking-[0.15em] uppercase`
- Body text: default tracking

---

## 4. Gradients

| Name | Definition | Usage |
|------|-----------|-------|
| `--gradient-accent` | `linear-gradient(135deg, hsl(40 85% 55%), hsl(42 90% 42%))` | **Primary CTA buttons** |
| `--gradient-lime` | `linear-gradient(90deg, hsl(40 85% 55%), hsl(38 80% 65%))` | Progress bars, secondary CTAs |
| `--gradient-gold-teal` | `linear-gradient(135deg, hsl(40 85% 55%), hsl(164 48% 53%))` | Special accent blends |
| `--gradient-hero` | `linear-gradient(165deg, bg 0%, teal-tinted 40%, primary-green 70%, bg 100%)` | Hero section backgrounds |
| `--gradient-card` | `linear-gradient(145deg, surface-elevated → surface)` | Card backgrounds |

### Text Gradients
- Hero "Strain Match" text: `linear-gradient(135deg, hsl(40 85% 55%), hsl(38 80% 65%))`
- Apply via: `bg-clip-text text-transparent`

---

## 5. Shadows

| Token | Usage |
|-------|-------|
| `--shadow-xs` | Subtle depth for small elements |
| `--shadow-sm` | Buttons, inputs |
| `--shadow-md` | Cards, dropdowns |
| `--shadow-lg` | Modals, popovers |
| `--shadow-xl` | Elevated modals |
| `--shadow-elegant` | Premium card borders with soft glow |
| `--shadow-card` | Full card shadow system |
| `--shadow-glow` | Gold glow: `0 0 40px -10px hsl(40 85% 55% / 0.25)` |
| `--shadow-glow-gold` | Focused gold glow: `0 0 40px -10px hsl(40 85% 55% / 0.3)` |
| `--shadow-glow-teal` | Teal glow for secondary elements |

---

## 6. Component Patterns

### Glassmorphism Cards
```css
.glass-card {
  background: hsl(175 6% 11% / 0.7);
  backdrop-filter: blur(24px);
  border: 1px solid hsl(170 8% 20% / 0.5);
}

.glass-card-elevated {
  background: hsl(175 6% 11% / 0.75);
  backdrop-filter: blur(24px);
  border: 1px solid hsl(170 8% 25% / 0.6);
  box-shadow: var(--shadow-elegant);
}
```

### CTA Buttons
- Background: `var(--gradient-accent)` (gold gradient)
- Text: white, `font-display font-bold`
- Border radius: `rounded-2xl`
- Hover: `brightness-110`, `scale-[1.02]`
- Active: `scale-[0.98]`
- Glow: `animate-pulse-glow` (gold keyframe)

### Input Fields
- Background: `hsl(var(--surface-elevated))`
- Border: `border-border`
- Focus ring: `ring-[hsl(var(--brand-gold) / 0.4)]`
- Border radius: `rounded-2xl`
- Padding: `px-5 py-4`

### Badges / Pills
- Border: `border-[hsl(var(--brand-gold) / 0.3)]`
- Background: `bg-[hsl(var(--brand-gold) / 0.08)]`
- Text: `text-[hsl(var(--brand-gold))]`
- Typography: `text-xs font-semibold tracking-[0.15em] uppercase`

### Trust Badges
- Border: `border-border/50`
- Background: `bg-[hsl(var(--surface))]`
- Icon: `text-primary` (teal)
- Text: `text-muted-foreground font-medium`

### Survey Option Buttons
- Default: `border-border bg-surface`
- Hover: `border-[hsl(var(--brand-gold) / 0.5)]`, subtle gold background
- Selected: `border-[hsl(var(--brand-gold))]`, gold background tint, `scale-[1.02]`
- Letter indicators follow same gold pattern when active

---

## 7. Animation

| Class | Keyframes | Usage |
|-------|-----------|-------|
| `animate-pulse-glow` | Gold pulse shadow | CTA buttons |
| `animate-slide-up` | Translate Y + fade | Card entrances |
| `animate-fade-in` | Opacity 0→1 | Screen transitions |
| `animate-scale-in` | Scale 0.92→1 + fade | Success screen |
| `animate-float` | Y oscillation ±8px | Logo hover |
| `animate-shimmer` | Background position sweep | Loading states |
| `orbFloat` | Multi-axis translate + scale | Ambient orbs |

### Transitions
- Base: `0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- Smooth: `0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- Spring: `0.35s cubic-bezier(0.34, 1.15, 0.64, 1)`

---

## 8. Logo Usage

### Available Assets
| File | Format | Usage |
|------|--------|-------|
| `hb-logo-white-full.png` | PNG | Dark backgrounds — primary logo |
| `hb-logo-green.png` | PNG | Light backgrounds |
| `hb-logo-jar.png` | PNG | Icon/loading states |
| `healing-buds-logo.webp` | WebP | Web-optimised full logo |
| `healing-buds-logo-white.webp` | WebP | Web-optimised white logo |
| `hb-icon-cta.webp` | WebP | CTA icon accent |
| `healing-buds-favicon.ico` | ICO | Browser tab |

### Rules
- Minimum clear space: 1× the height of the "HB" mark
- Never distort, rotate, or recolour the logo
- On dark backgrounds: use white variant
- On light backgrounds: use green variant
- Minimum display height: 32px

---

## 9. Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 0.5rem (8px) | Tight gaps |
| `--spacing-sm` | 0.75rem (12px) | Small gaps |
| `--spacing-md` | 1rem (16px) | Default spacing |
| `--spacing-lg` | 1.5rem (24px) | Section gaps |
| `--spacing-xl` | 2rem (32px) | Large gaps |
| `--spacing-2xl` | 3rem (48px) | Section padding |
| `--spacing-3xl` | 4rem (64px) | Hero spacing |

### Border Radius
- Default: `0.75rem` (12px) via `--radius`
- Buttons/Inputs: `rounded-2xl` (1rem)
- Badges: `rounded-full`
- Cards: `rounded-2xl`

---

## 10. Accessibility

- **Contrast**: All text meets WCAG 2.1 AA minimum (4.5:1 for normal text, 3:1 for large text)
- **Focus indicators**: Visible focus rings using `--brand-gold` with 0.4 opacity
- **Motion**: Respect `prefers-reduced-motion` — all animations should be disableable
- **Touch targets**: Minimum 44×44px for interactive elements
- **Semantic HTML**: Use proper heading hierarchy, ARIA labels, alt text

---

## 11. Domain Architecture

| Subdomain | Purpose |
|-----------|---------|
| `healingbuds.co.za` | Main marketing site |
| `mystrain.healingbuds.co.za` | Strain Bio-Mapping survey app |

---

*© 2026 Healing Buds. All rights reserved.*
