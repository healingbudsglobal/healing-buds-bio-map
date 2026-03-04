

# Visual Overhaul — Kill the Dark Circle, Elevate Every Screen

## Problem
The squeeze screen has a massive 500px circular image (`hero-trichomes.jpg` with `rounded-full`) that looks like a dark, murky blob — not the premium medical-wellness vibe intended. The overall aesthetic is too dark and muddy. The webhook payload enrichment is already complete (effects, flavours, THC, CBD, price, shop URL are all being sent).

## What Changes

### 1. SqueezeScreen — Replace circle with elegant ambient glow
**Remove** the `heroTrichomes` circular image entirely. Replace with:
- Two subtle gradient orbs (gold + teal) positioned behind the content — floating, organic, no hard edges
- A very faint radial gradient "spotlight" effect centered on the card area for depth
- Slightly brighter input fields and form area — add a subtle glass card wrapper around the form section for visual containment
- Result: clean, modern, premium feel without the dark circle

### 2. SurveyFlow — Warmer glass card
- The `glass-card-elevated` background is too dark (`hsl(175 6% 11% / 0.75)`). Lighten to `hsl(175 6% 14% / 0.8)` with a stronger border
- Add a subtle gold gradient line at the top of the question card for premium feel
- Option tiles: increase border contrast slightly so they don't merge into the background

### 3. ContactCapture — More visual depth
- Add the same ambient glow orbs as the squeeze screen for consistency
- The blurred strain teaser card needs more contrast — brighter border, slightly lighter background
- Add a faint decorative ring/circle behind the lock icon for visual interest

### 4. LoadingScreen — Brighter, more alive
- The spinning rings are hard to see. Increase the gold ring's border width and opacity
- Add a very subtle radial glow behind the spinner to make it pop
- Status text slightly brighter

### 5. SuccessScreen — Polish
- Already has good structure but ensure the strain card has enough contrast against the dark background
- The confetti particles are invisible (they reference `--brand-gold` but are tiny). Make them slightly larger and add a second wave

### 6. Global CSS — Lift the darkness
- `--muted-foreground` is too dim (`165 10% 55%`) — raise to `165 10% 62%` so body text is more readable
- `--surface-elevated` from `175 6% 13%` → `175 6% 15%` for more visible cards
- Add a new `.ambient-glow` utility class for the floating orb effect reused across screens
- `--gradient-hero` background: add a subtle warm shift so the background isn't pure cold charcoal

## Files Modified
- `src/components/SqueezeScreen.tsx` — remove circle image, add ambient orbs + glass card wrapper
- `src/components/SurveyFlow.tsx` — warmer card, brighter option borders
- `src/components/ContactCapture.tsx` — add ambient orbs, brighter teaser card
- `src/components/LoadingScreen.tsx` — brighter spinner, glow behind it
- `src/components/SuccessScreen.tsx` — minor contrast improvements
- `src/index.css` — lighten muted-foreground, surface-elevated, add ambient-glow utility, warm hero gradient

