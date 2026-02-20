

## Rebrand Survey to Match healingbuds.co.za

The current survey uses a "recreational cannabis" aesthetic (bright emerald green, casual tone). The healingbuds.co.za website has a distinctly different brand identity: pharmaceutical-grade medical cannabis with a professional, clinical feel. Here is the plan to align them.

---

### 1. Color Palette Update (src/index.css)

Replace the current bright emerald green theme with colors extracted from healingbuds.co.za:

- **Primary**: Shift from bright emerald (`152 60% 40%`) to a muted teal-green (`168 40% 38%`) matching the site's teal buttons and accents
- **Accent/CTA**: Add an amber/gold accent (`40 55% 55%`) matching the "Check Eligibility" button on the main site
- **Background**: Keep dark but shift toward a cooler, more neutral dark (`180 15% 8%`) rather than the warm emerald-tinted dark
- **Surface colors**: Adjust card and elevated surfaces to match the cleaner, more clinical feel
- **Border/muted tones**: Cooler, less saturated greens

### 2. Typography Alignment (src/index.css + tailwind.config.ts)

- Replace **Space Grotesk** with **Inter** or **DM Sans** for the display font to match the clean, professional sans-serif used on healingbuds.co.za
- Keep **Outfit** for body text or swap to **Inter** for consistency
- Reduce text-glow intensity -- the main site doesn't use glowing text

### 3. Squeeze Screen Updates (src/components/SqueezeScreen.tsx)

- Replace the Lucide `Leaf` icon with the text-based "HEALING BUDS" logo mark styled to match the site (uppercase, tracked-out lettering)
- Update CTA button to use the amber/gold accent color instead of green-on-green
- Adjust copy tone to be more professional/medical:
  - Add a "Pharmaceutical-Grade" badge/tag above the headline (matching the site's pill-shaped badges)
  - Refine bullet text to reference "lab-tested" and "quality-controlled" strains
- Add trust badges below the form: "EU GMP Certified", "Lab Tested", "POPIA Compliant"

### 4. Survey Flow Updates (src/components/SurveyFlow.tsx)

- Update header logo to match the new branding
- Style the progress bar with the teal primary color
- Update option buttons: use a slightly rounded, bordered card style with the teal hover state (no glow effects)
- Keep the clean dark background consistent

### 5. Loading & Success Screens (LoadingScreen.tsx, SuccessScreen.tsx)

- Swap the Leaf icon for the styled "HB" or "HEALING BUDS" text mark
- Update spinner/animation colors to use the new teal primary
- Adjust success checkmark to use the amber accent for the icon

### 6. Global Style Refinements (src/index.css)

- Tone down the `leaf-pattern` background -- make it subtler, more like a soft radial gradient
- Reduce the `pulse-glow` animation intensity to feel more medical/premium and less "neon"
- Ensure the overall aesthetic reads as "pharmaceutical brand" not "dispensary marketing"

---

### Technical Details

**Files to modify:**
- `src/index.css` -- CSS variables, animations, background patterns
- `tailwind.config.ts` -- font family definitions
- `src/components/SqueezeScreen.tsx` -- logo, copy, trust badges, button styling
- `src/components/SurveyFlow.tsx` -- header logo, option hover colors
- `src/components/LoadingScreen.tsx` -- icon and color updates
- `src/components/SuccessScreen.tsx` -- icon and color updates

**No new dependencies required.** All changes use existing Tailwind utilities and CSS custom properties.

