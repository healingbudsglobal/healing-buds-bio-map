

# Professional Polish: Remove Placeholders, Add Visual Interest, Optimize Lead Funnel

## Current Issues Found

1. **Placeholder WhatsApp number** — `27XXXXXXXXXX` in SuccessScreen is fake/broken data. Either needs the real number or removal.
2. **Generic shop URLs** — all strains link to `healingbuds.co.za/shop` instead of specific product pages.
3. **No visual imagery** — every screen is text + icons + glows. No product photography, botanical illustrations, or visual hooks to establish the cannabis/medical brand instantly.
4. **"Skip for now" leak** — the contact capture skip button is a 10px afterthought that still lets leads escape without providing any contact info. The email was already captured on screen 1, so the skip is fine — but it should be clearer that results will go to their email.
5. **No strain imagery on results** — the success screen strain card is pure text. A product photo or botanical illustration would make the recommendation feel tangible and worth ordering.

## Changes

### 1. Remove all placeholder/fake data
- **SuccessScreen**: Remove the WhatsApp "Chat with Consultant" button entirely (the number is fake). Replace with a "Questions? Email us" link pointing to a real email, or remove the row completely.
- **Strains data**: Keep shop URLs as-is (they do link to the real domain — specific product pages can be updated later by the user).

### 2. Add botanical hero imagery to SqueezeScreen
- Add a subtle, high-quality SVG botanical illustration (cannabis leaf silhouette or trichome pattern) rendered as a CSS/SVG background element behind the form card. Not a photo — a clean vector that reinforces "medical cannabis" within 3 seconds.
- Use a semi-transparent layered SVG with the brand gold/teal colors, positioned as a decorative element above or behind the headline.

### 3. Add strain type indicator with visual flair to SuccessScreen
- Add a strain type badge (Indica/Sativa/Hybrid) to each strain in `strains.ts` and display it as a colored pill on the result card — this is data users expect from a cannabis recommendation.
- Add a decorative botanical SVG element on the result card for visual richness.

### 4. Strengthen the contact capture conversion copy
- Change "Skip for now" to "Just send it to my email" — makes clear they still get results, reduces friction anxiety.
- Add micro-copy below the form: "Your results are also sent to {email}" — reassures they won't lose their recommendation.

### 5. Add a subtle botanical pattern to the survey flow
- Add a faint decorative SVG leaf in the corner of each question card — small touch that maintains the medical-cannabis brand identity throughout the flow.

## Files Modified
- `src/components/SqueezeScreen.tsx` — add botanical SVG hero element
- `src/components/SuccessScreen.tsx` — remove fake WhatsApp, add strain type badge, add botanical decoration
- `src/components/ContactCapture.tsx` — improve skip copy, add email reassurance
- `src/components/SurveyFlow.tsx` — add subtle botanical accent to question cards
- `src/data/strains.ts` — add `type: "indica" | "sativa" | "hybrid"` field to each strain

