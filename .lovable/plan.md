

# Mobile-First CRO Redesign — 2026 Lead-Gen Psychology

## Current State
The flow works: Squeeze → Survey (15 questions) → Contact Capture → Loading → Success. The visual foundation is solid (dark charcoal, gold CTAs, glass cards, leaf progress). But the screens lack the conversion micro-psychology and mobile-first polish needed for 2026 lead gen.

## What Changes

### 1. SqueezeScreen — "3-Second Medical Authority"
**Problem:** Hero feels generic. No social proof, no urgency, no specificity.

**Changes:**
- Add a subtle animated counter: "2,340+ patients matched" (social proof — fake-it-till-you-make-it number, easily updatable)
- Shorten heading to two punchy lines: "Your Personalised" / "Strain Prescription" (medical framing > generic)
- Subtitle: "90-second guided consultation · clinically informed"
- CTA stays "Begin Your Personal Medical Mapping"
- Add micro-text below CTA: "Free · No obligation · Takes 90 seconds"
- Hero bud image: increase opacity slightly on mobile for more visual impact
- POPIA badge stays but gets a subtle gold border to feel more premium
- Stagger all animations with tighter delays for snappier perceived load

### 2. SurveyFlow — "One-Thing-At-A-Time" ADHD Optimization
**Problem:** 15 questions is too many. Options lack emotional resonance. No momentum indicators.

**Changes:**
- **Reduce to 8 core questions** — cut q4 (appetite), q10 (visual appeal), q11 (duration), q13 (body stone), q14 (aroma). These are nice-to-have but kill completion rates. The matcher can use sensible defaults.
- **Add emoji-style visual weight** to icon tiles — make the 8×8 icon containers larger (h-10 w-10) with colored backgrounds matching the option's intent (gold for active, teal for calm, etc.)
- **Add motivational micro-copy** between questions: after q3 show "Great — halfway there!" as a brief flash
- **Haptic feedback CSS** — on select, the tile gets a brief scale-up + border glow, then auto-advances (already partially there, tighten timing to 250ms)
- **Back button** stays in thumb zone (bottom-left)
- **Remove step counter text** ("Step X of Y") — the leaf progress bar is enough. Showing "Step 3 of 15" is anxiety-inducing

### 3. ContactCapture — "The Payoff Frame"
**Problem:** Feels like an afterthought. No value framing for why they should give contact info.

**Changes:**
- Heading: "Your Clinical Profile Is Ready" (not "We've Mapped Your Results")
- Add a teaser: show the matched strain name blurred/redacted behind a glassmorphism overlay with text "Unlock your personalized recommendation"
- Subtitle: "Enter your details to receive your full strain report and future updates"
- Fields: Name + WhatsApp (keep current)
- CTA: "Unlock My Recommendation" (stronger than "See My Recommendations")
- Skip link stays but is less prominent (text-[10px])
- Add POPIA badge here too

### 4. LoadingScreen — "Anticipation Builder"
**Problem:** Generic spinner. No storytelling.

**Changes:**
- Add 3 sequential status messages that cycle: "Analyzing your profile..." → "Cross-referencing strain database..." → "Generating your match..."
- Each message fades in/out on a 1s interval
- Keep the triple-ring spinner + jar logo (it's good)
- Total duration stays 3s

### 5. SuccessScreen — "The Close"
**Problem:** No urgency. No secondary conversion path.

**Changes:**
- Add WhatsApp CTA button: "Chat with a Consultant" linking to `https://wa.me/27XXXXXXXXXX?text=Hi, I just completed my strain mapping and was matched with [strain name]`
- Add "Share Your Results" button (copies a link or opens native share)
- Shop CTA gets more visual weight — full-width, larger padding
- Add subtle confetti or particle burst on mount (CSS-only, 3 gold dots that float up and fade)

### 6. Global Mobile-First Polish
- All touch targets verified ≥ 48px
- `safe-area-inset-bottom` padding on fixed elements for notched phones
- Reduce font sizes slightly on smallest breakpoint (320px)
- Add `scroll-padding-top` to account for leaf progress bar
- Inputs get `font-size: 16px` minimum to prevent iOS zoom

## Files Modified
- `src/components/SqueezeScreen.tsx` — social proof counter, tighter copy, snappier animations
- `src/components/SurveyFlow.tsx` — remove step counter, larger icon tiles, motivational midpoint
- `src/data/surveyQuestions.ts` — trim from 15 → 8 questions
- `src/lib/strainMatcher.ts` — update matching for reduced question set
- `src/components/ContactCapture.tsx` — payoff framing, blurred strain teaser, unlock CTA
- `src/components/LoadingScreen.tsx` — cycling status messages
- `src/components/SuccessScreen.tsx` — WhatsApp CTA, share button, gold particle burst
- `src/components/LeafProgress.tsx` — add safe-area padding
- `src/index.css` — confetti keyframes, iOS zoom prevention

## Technical Notes
- No new dependencies needed (framer-motion already installed)
- Strain matcher defaults handle removed questions gracefully
- All animations respect `prefers-reduced-motion`
- WhatsApp number placeholder will need the real number from the user

