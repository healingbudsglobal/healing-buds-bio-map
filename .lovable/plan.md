

# Rebrand Survey App to Match healingbuds.co.za + Create Branding Guide

## Analysis

From the healingbuds.co.za screenshot, the main site uses:
- **Dark teal-charcoal background** (already close in the survey app)
- **Gold/amber accent** for primary CTAs ("Check Eligibility" button) and highlighted text ("Medical Cannabis" in warm gold)
- **White text** on dark surfaces
- **Teal/green** for trust badges and secondary indicators
- **Clean sans-serif typography** (Plus Jakarta Sans, Inter)

The current survey app uses **lime-green/teal gradients** for CTAs, which doesn't match the **gold/amber** CTA style on the main site.

## Proposed Changes

### 1. Color Rebranding (`src/index.css`)
- Add a **gold/amber accent** CSS variable: `--brand-gold: 40 85% 55%` to match the CTA button color on healingbuds.co.za
- Update `--gradient-accent` and `--gradient-lime` to incorporate gold tones
- Keep the teal/green palette for badges and secondary elements (these already match)

### 2. Component Updates
- **SqueezeScreen.tsx**: Change the CTA button gradient from green→lime to a gold/amber gradient matching the main site's "Check Eligibility" button. Update the badge accent from green to gold where appropriate.
- **SurveyFlow.tsx**: Update selected-option highlight from lime-green to gold to match CTA branding.
- **LoadingScreen.tsx**: Keep teal spinner (matches secondary branding) but update accent dots to gold.
- **SuccessScreen.tsx**: Update the success icon accent to align with the gold brand.

### 3. Create Branding Markdown (`src/docs/BRANDING.md`)
A comprehensive branding guide document covering:
- Brand identity and mission statement
- Full color palette (hex, HSL) with usage guidelines
- Typography system (DM Sans for display, Inter for body)
- Gradient definitions
- Shadow system
- Component styling patterns (glassmorphism, badges, CTAs)
- Logo usage guidelines
- Tone of voice

### Technical Details
- The gold color extracted from the main site CTA is approximately `hsl(40 85% 55%)` / `#E5A31E`
- The highlighted "Medical Cannabis" text appears to use approximately `hsl(38 80% 60%)` / `#D4A34A`
- All existing teal tokens remain for trust badges and secondary UI
- Typography already uses DM Sans + Inter which matches the main site's clean sans-serif approach

