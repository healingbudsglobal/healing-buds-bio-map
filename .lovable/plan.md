

# Re-add Hero Flower Backdrop to SqueezeScreen

## What's happening

Adding the hero flower image back as a cinematic backdrop on the squeeze screen, but with a cleaner, more professional treatment — heavier blur, lower opacity, and stronger vignette masking so it acts as atmospheric depth rather than a distracting foreground element.

## Changes

### `src/components/SqueezeScreen.tsx`
- Re-import `heroFlower` from `@/assets/hero-flower.jpg`
- Add the image as a `fixed inset-0` backdrop with:
  - `blur(40px)` — heavier blur than before for a smoother, less "noisy" look
  - `opacity: 0.12` — subtle enough to add atmosphere without competing with the form
  - `mix-blend-mode: soft-light` and `saturate(1.2)` for natural color integration
  - Slow Ken Burns animation (scale 1.0 → 1.05 over 20s) for cinematic movement
  - Strong radial vignette mask fading to the dark background at edges
  - Green tint overlay using `--primary-green` at low opacity for brand cohesion

This approach keeps the flower as a moody, atmospheric backdrop that adds premium depth without the grainy/poor quality appearance from before.

## Files Modified

| File | Change |
|------|--------|
| `src/components/SqueezeScreen.tsx` | Re-add hero flower backdrop with heavier blur and stronger vignette |

