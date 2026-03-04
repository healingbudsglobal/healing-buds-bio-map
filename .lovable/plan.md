

# More Greens + AI Strain Imagery

## What's Changing

The app is currently gold-heavy. The brand palette has rich teals and greens (`--primary-green`, `--secondary-green`, `--accent-green`, `--deep-teal`) that are barely used. We'll rebalance the palette and add AI-generated bud images for each strain on the success screen.

## 1. Rebalance Colors — Bring in Greens

Currently almost every accent is `--brand-gold`. We'll shift secondary elements to the green/teal palette:

- **Survey option icons**: Change default icon background from gold-tinted to teal/green tinted (`--accent-green`, `--primary`)
- **Progress bar (LeafProgress)**: Gradient from `--primary` (teal) to `--accent-green` instead of gold-to-teal
- **Trust badges**: Use `--accent-green` for icons instead of gold
- **Strain card effects badges**: Use teal/green tones (`--accent-green` bg) instead of all-gold
- **Confetti particles**: Mix green + gold instead of all gold
- **Ambient particles + orbs**: Increase green orb intensity, add a `--lime-green` particle layer
- **Loading spinner**: Second ring uses `--accent-green` instead of subtle primary
- **BotanicalAccent SVG**: Tint with `--accent-green` instead of all gold
- **Form card gold shimmer lines**: Change to a green-to-gold gradient
- **POPIA badge border**: Use `--accent-green` tint

Gold stays dominant on **CTAs only** (buttons, highlighted text, match percentage). Everything else gets the green treatment.

## 2. AI-Generated Strain Bud Images

Add a unique bud image for each strain displayed on the success screen result card.

### How it works:
- Add an `imageUrl` field to the `Strain` interface in `strains.ts`
- Pre-generate 7 strain images using the Lovable AI image API (Gemini flash-image) via a one-time generation approach — but since we can't run code at build time, we'll use **static placeholder bud photos** from the existing `hero-bud.jpg` asset as a base, then create a component that generates and caches strain-specific images client-side using the AI gateway.

**Simpler approach**: Since the project doesn't have Supabase/Cloud connected, we'll use the existing `hero-bud.jpg` and `hero-trichomes.jpg` assets creatively — showing them as styled product imagery on the strain card with a green-tinted overlay matching the strain type (indica=deep teal, sativa=lime-gold, hybrid=accent-green).

### Success screen strain card changes:
- Add a product image area at the top of the strain card using `hero-bud.jpg`
- Apply a colored overlay based on strain type (indica/sativa/hybrid)
- Round the image with the card, add a subtle gradient fade into the card content

## Files Modified

| File | Changes |
|------|---------|
| `src/components/SqueezeScreen.tsx` | Trust badge icons → green, radial spotlight → green tint |
| `src/components/SurveyFlow.tsx` | Option icon defaults → green/teal, gold accent line → green-gold gradient |
| `src/components/ContactCapture.tsx` | Lock icon → green, strain teaser border → green |
| `src/components/LoadingScreen.tsx` | Second/third spinner rings → green, progress bar starts green |
| `src/components/SuccessScreen.tsx` | Add hero bud image to strain card, effects badges → green, confetti → mixed green/gold |
| `src/components/BotanicalAccent.tsx` | SVG fill → `--accent-green` instead of all gold |
| `src/components/AmbientParticles.tsx` | Increase green orb presence, add lime particle |
| `src/components/LeafProgress.tsx` | Progress gradient → green-dominant |
| `src/index.css` | No changes needed — tokens already defined |

