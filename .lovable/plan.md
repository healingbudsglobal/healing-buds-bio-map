

# Sincere Marketing + healingbuds.co.za Brand Alignment

## What's Wrong Now

Looking at the actual healingbuds.co.za site vs this survey app:

1. **Fake social proof counter** — the `2,284+ patients matched` counter that randomly increments every 4 seconds is manufactured nonsense. The main site doesn't do this. It undermines the pharmaceutical credibility the brand is built on.
2. **"Free · No obligation · Takes 90 seconds"** — screams lead-gen funnel, not medical consultation. The main site says "Pharmaceutical-Grade Medical Cannabis" with trust badges like EU GMP Certified, Lab Tested, Secure & Compliant.
3. **Copy tone mismatch** — the survey uses wellness-influencer language. The main site is clinical and confident without being pushy.

## What Changes

### 1. Remove fake counter, add real trust signals
- **Delete** the incrementing `counter` state and the "2,284+ patients matched" badge
- **Replace** with the same trust badges from healingbuds.co.za: `EU GMP Certified · Lab Tested` — these are real, verifiable claims
- Remove `"Free · No obligation · Takes 90 seconds"` line — replace with `"90-second clinical assessment"` (factual, no "free" bait)

### 2. Tighten copy across all screens
- SqueezeScreen headline: keep "Your Personalised Strain Prescription" (matches the clinical tone)
- CTA: "Begin Your Personal Medical Mapping" → **"Start Clinical Assessment"** (shorter, more authoritative, matches "Check Eligibility" tone on main site)
- ContactCapture CTA: "Unlock My Recommendation" → **"See My Recommendation"** (no "unlock" gating language)
- ContactCapture body: "Enter your details to unlock your full strain report" → **"Where should we send your clinical profile?"**
- SuccessScreen: Remove "In Stock / Currently Unavailable" indicator entirely (per earlier plan — only available strains shown)
- SuccessScreen: Add price prominently + "Limited availability" (honest — these are small-batch medical strains)
- SuccessScreen shop CTA: "Shop This Strain" → **"Order This Strain"** (direct, no browsing implied)

### 3. Filter matcher to available strains only
- In `strainMatcher.ts`: filter `strains` to `available: true` before scoring
- Remove the `-2 availability penalty` (no longer needed)
- Every result is now purchasable — no dead ends

### 4. Color/brand consistency check
- Colors already match healingbuds.co.za (gold CTAs, dark teal background, white text) — no changes needed
- Trust badge styling: match the horizontal icon row from healingbuds.co.za footer (EU GMP, Lab Tested, Secure & Compliant, Discreet Delivery)

## Files Modified
- `src/components/SqueezeScreen.tsx` — remove fake counter, add real trust badges, tighten copy
- `src/components/ContactCapture.tsx` — sincere copy, remove "unlock" language
- `src/components/SuccessScreen.tsx` — add price, remove stock indicator, stronger CTA, add "Limited availability"
- `src/lib/strainMatcher.ts` — filter to available strains only, remove availability penalty

