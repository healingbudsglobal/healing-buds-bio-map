

# Visual Quality Upgrade: Hero Bud Image + Graphical Polish

## What's happening

The uploaded image is a stunning macro photograph of a cannabis bud with vivid red/purple hues and visible trichomes. We'll incorporate this as a hero visual element across the app — on the squeeze screen as an ambient background element, and enhance the overall graphical quality with refined glassmorphism, better depth layering, and cinematic visual effects.

## Changes

### 1. Add the uploaded bud image to the project
- Copy `WhatsApp_Image_2026-03-03_at_23.29.51-2.jpeg` to `src/assets/hero-flower.jpg`
- Use it as a decorative hero element — not a flat background, but a softly blurred, cropped botanical accent

### 2. SqueezeScreen — Ambient flower backdrop
- Add the bud image as a large, softly blurred (blur-3xl), low-opacity background element behind the form card, centered and scaled up
- Apply a radial gradient mask so it fades smoothly into the dark background
- Layer it beneath the existing glass card with `mix-blend-mode: luminosity` for a subtle, moody botanical vibe
- This creates an immediate "premium cannabis" first impression within 2 seconds

### 3. SuccessScreen — Enhanced strain card hero
- Replace the flat `h-44` image container with a taller `h-56` hero area
- Add a subtle parallax-like scale animation on mount (scale from 1.1 to 1.0)
- Add a vignette overlay (radial gradient dark edges) for a cinematic product-photography feel
- Add a subtle glow ring around the strain type badge

### 4. LoadingScreen — Flower pulse backdrop
- Add the bud image as a very subtle pulsing backdrop behind the spinner rings (opacity 0.06, blur-2xl, scale animation)
- Creates visual continuity between screens

### 5. ContactCapture — Blurred flower teaser
- Add small cropped bud image behind the blurred strain name teaser, reinforcing that something visually rich is waiting
- Very low opacity, heavily blurred — just enough to add depth

### 6. AmbientParticles — Richer depth layers
- Add a 5th radial glow using a warm purple/magenta tint (`330 40% 30%`) at very low opacity to complement the flower image's red-purple tones
- Slightly increase particle count and variance

### 7. CSS polish
- Add a new utility class `.flower-vignette` for the radial dark-edge mask
- Add `.flower-glow` for a subtle warm ambient glow effect

## Files Modified

| File | Change |
|------|--------|
| `src/assets/hero-flower.jpg` | New — copied from upload |
| `src/components/SqueezeScreen.tsx` | Add blurred flower backdrop behind form |
| `src/components/SuccessScreen.tsx` | Taller hero image, cinematic vignette, scale-in animation |
| `src/components/LoadingScreen.tsx` | Subtle flower pulse backdrop |
| `src/components/ContactCapture.tsx` | Flower image behind blurred teaser |
| `src/components/AmbientParticles.tsx` | Add warm purple glow layer |
| `src/index.css` | Add `.flower-vignette` and `.flower-glow` utilities |

