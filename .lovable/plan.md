

## Awwwards-Grade Redesign: Healing Buds Precision Bio-Mapping Survey

This plan transforms the current survey from a functional form into a cinematic, premium experience inspired by Awwwards/Loris Bukvic aesthetics, integrating the user's uploaded brand logos.

---

### 1. Copy Brand Logos to Project

Copy all 4 uploaded images into `src/assets/`:
- `hb-logo-jar.png` -- the jar/bottle icon (white on transparent) -- for the **loading spinner center**
- `hb-icon-cta.webp` -- the leaf+heart+cross icon (teal) -- reference only, too detailed for small sizes
- `hb-logo-green.png` -- full "HB HEALING BUDS" logo (dark teal on transparent) -- for light backgrounds if needed
- `hb-logo-white-full.png` -- full "HB HEALING BUDS" logo (white on transparent) -- **main logo** on all dark screens

Logo placement:
- **Squeeze Screen header**: `hb-logo-white-full.png` (the full white wordmark)
- **Survey Flow header**: `hb-logo-white-full.png` (smaller, top-left)
- **Loading Screen spinner center**: `hb-logo-jar.png` (the jar icon rotating inside the DNA spinner)
- **Success Screen footer**: `hb-logo-white-full.png`

Delete the old SVG logo file (`healing-buds-logo.svg`).

---

### 2. Update Survey Questions (src/data/surveyQuestions.ts)

Replace the current 15 questions with the exact options from the prompt:

| # | Question | Options |
|---|----------|---------|
| 1 | Primary Goal? | Relaxation, Pain Relief, Creativity/Focus, Sleep Support |
| 2 | Tolerance? | Beginner, Intermediate, Advanced, Micro-doser |
| 3 | Time of use? | Morning, Afternoon, Night |
| 4 | The Munchies? | I want them!, Neutral, Avoid |
| 5 | Head effect? | Functional, Euphoric, Deep, Sedation |
| 6 | Anxiety with THC? | Never, Rarely, Occasionally, Often |
| 7 | Flavor? | Earthy/Pine, Sweet/Fruity, Diesel/Gas, Citrus |
| 8 | Method? | Flower, Vaporizer, Edibles, Concentrates |
| 9 | Physical relief? | Muscle, Joint, Nausea, None |
| 10 | Bag Appeal? | Very, Somewhat, Effects Only |
| 11 | Duration? | Short, Medium, Long |
| 12 | Environment? | Social, Outdoor, Home, Work |
| 13 | Body Stone? | Yes, No, Balanced |
| 14 | Smell sensitivity? | Low-odor, Love the skunk |
| 15 | Current vibe? | Stressed, Bored, Sore, Adventurous |

---

### 3. Redesign the Squeeze Screen (src/components/SqueezeScreen.tsx)

The hero becomes a full-viewport cinematic experience:
- **Background**: Multiple layered radial gradient orbs that slowly drift (orbFloat animation) for depth
- **Logo**: `hb-logo-white-full.png` displayed at generous size (h-14 to h-16) with a subtle float animation
- **Badge**: "Precision Bio-Mapping" pill badge with accent-green border glow
- **Headline**: "Find Your Perfect Strain" with the word "Strain" using gradient text (accent-green to lime-green). Letter-spacing 0.05em on all headings
- **Subtitle**: "in 60 Seconds" in accent-green uppercase tracking
- **Description**: Refined copy about bio-mapping
- **Checklist**: 3 items with gradient-accent check circles
- **Email input**: Large rounded-2xl input with glassmorphic background, glowing ring on focus
- **CTA button**: gradient-accent background with pulse-glow animation, hover:scale(1.02), arrow icon that slides right on hover
- **Trust badges**: EU GMP / Lab Tested / POPIA Compliant in pill containers at the bottom

---

### 4. Redesign the Survey Flow (src/components/SurveyFlow.tsx)

Awwwards-inspired single-question-per-screen:
- **Fixed progress bar** at the very top of viewport (position fixed, full width, 2px height) using lime-green gradient -- not inside the card
- **Step counter**: "Step X of 15" in small muted text, positioned top-right
- **Logo**: White wordmark top-left
- **Question card**: Centered glassmorphic card with `shadow-elegant`, fade+slide-up animation on each step change
- **Option buttons**: Large clickable cards (not small radio buttons), each with:
  - Letter index (A, B, C...) in a rounded-lg badge
  - On hover: border transitions to `lime-green`, subtle scale(1.02) transform, background tints to accent-green at 6% opacity
  - On click: brief scale(1.02) + border-lime-green flash before 250ms auto-advance
- **Back button**: Bottom-left, subtle chevron + text, only shows after step 1
- **Transition**: Each question slides up with 300ms cubic-bezier(0.16, 1, 0.3, 1)

---

### 5. Redesign the Loading Screen (src/components/LoadingScreen.tsx)

Transform into a "DNA Sequencing" animation:
- **Central spinner**: Triple-ring design:
  - Outer ring: border-accent-green, spinning clockwise at 1.2s
  - Middle ring: border-lime-green at 30% opacity, spinning counter-clockwise at 2s
  - Inner static ring: border-border
  - **Center**: `hb-logo-jar.png` (the jar icon) at ~32px, slightly pulsing opacity
- **Headline**: "Analyzing Your Biological Profile..." with text-glow
- **Subtext**: "Cross-referencing your bio-profile with our lab-tested strain inventory"
- **Animated dots**: Three accent-green dots with staggered pulse animation
- **Background glow orb**: Large accent-green blur behind the spinner

---

### 6. Redesign the Success Screen (src/components/SuccessScreen.tsx)

Premium completion screen:
- **Success icon**: Large pulsing ring (ping animation at 2s) around a CheckCircle icon in accent-green
- **Headline**: "Analysis Complete." with text-glow
- **Inbox badge**: Pill with Mail icon: "Your personalized match is being prepared and sent to your inbox."
- **Description**: Refined copy about the algorithm
- **Brand footer**: `hb-logo-white-full.png` at reduced opacity + "Precision Strain Match" tagline
- **"Back to Home" button**: Outlined button with border-border, hover to accent, reloads page

---

### 7. CSS Enhancements (src/index.css)

Add new keyframe animations:
- `dnaHelix`: For the loading spinner's "DNA sequencing" feel -- a pulsing scale + rotation combo
- `optionSelect`: Quick scale(1.02) + border-color change for option click feedback
- `stepTransition`: Slide-up + fade-in with 300ms cubic-bezier for question transitions

Refine existing:
- Increase `glass-card` backdrop-filter to `blur(24px)` and add a subtle inner glow
- Add `.glass-card-elevated` variant with stronger border and shadow for the survey card
- Ensure all transitions use `cubic-bezier(0.16, 1, 0.3, 1)` for that premium spring feel

---

### 8. Webhook Payload (src/pages/Index.tsx)

Update the POST body to map answers as `q1` through `q15` instead of using question IDs, per the prompt:

```text
{
  email: "user@example.com",
  q1: "Relaxation",
  q2: "Beginner",
  ...
  q15: "Stressed"
}
```

This means mapping `surveyQuestions[0].id` -> `q1`, `surveyQuestions[1].id` -> `q2`, etc. in the `handleSurveyComplete` callback.

---

### Files Modified

| File | Changes |
|------|---------|
| `src/assets/` | Copy 4 uploaded logos, delete old SVG |
| `src/data/surveyQuestions.ts` | Replace all 15 questions with prompt's exact options |
| `src/components/SqueezeScreen.tsx` | New logo import, refined layout, letter-spacing |
| `src/components/SurveyFlow.tsx` | New logo, fixed progress bar, enhanced option hover/click animations |
| `src/components/LoadingScreen.tsx` | New jar logo in spinner, "DNA Sequencing" copy |
| `src/components/SuccessScreen.tsx` | "Analysis Complete" copy, Back to Home button, new logo |
| `src/index.css` | New keyframes, enhanced glass-card, refined animations |
| `src/pages/Index.tsx` | Remap answers to q1-q15 format in webhook payload |

No new dependencies required.

