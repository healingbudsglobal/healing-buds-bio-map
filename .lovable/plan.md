

# Visual Simplification + Bud Hero Image — Mobile-First

## Changes

### 1. Copy uploaded bud image to assets
Save `user-uploads://WhatsApp_Image_2026-03-03_at_23.29.51.jpeg` as `src/assets/hero-bud.jpg` for use as the hero background visual.

### 2. Simplify `src/components/SqueezeScreen.tsx`
**Remove:** Ambient orbs (lines 54-60), "Precision Bio-Mapping" badge (lines 67-73), "in 60 Seconds" line (lines 83-85), trust badges section (lines 130-142), unused icon imports (Shield, FlaskConical, FileCheck, Sparkles).

**Add:** Hero bud image as a soft circular element behind the logo area — blurred with low opacity on mobile, slightly more visible on larger screens. Gives the page life without overwhelming the form.

**Simplify copy:**
- Heading: "Find Your Perfect Strain" with gold color (no gradient)
- Description: "Answer a few quick questions — we'll match you to your ideal strain."
- Button: "Find My Strain" (shorter)
- Remove floating logo animation, keep static

### 3. Simplify `src/components/SuccessScreen.tsx`
**Remove:** Ping animation on checkmark (line 22), price chip (lines 68-70), brand footer with logo + tagline (lines 134-140).

**Keep:** Strain card with THC/CBD, effects, flavours, availability, Shop CTA, email note, start over.

### 4. Simplify `src/components/LoadingScreen.tsx`
- Heading: "Finding Your Match..." (shorter)
- Description: "Matching your profile to our strains" (shorter)

### 5. Mobile-first spacing
- All screens already use `max-w-sm`/`max-w-md` — ensure consistent `px-5` base padding
- Button minimum height 48px (already met with `py-4`)
- Text starts at mobile sizes, scales with `sm:` breakpoints

## Files
- **New:** `src/assets/hero-bud.jpg`
- **Modified:** `SqueezeScreen.tsx`, `SuccessScreen.tsx`, `LoadingScreen.tsx`

