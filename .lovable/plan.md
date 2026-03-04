

# Strain Matching with Hardcoded Data from healingbuds.co.za

## Summary

Hardcode all 7 strains scraped from the healingbuds.co.za shop page into a local data file. Build a scoring engine that matches survey answers to strains. Display the result on the success screen with a CTA back to the shop. Add frictionless email validation (disposable domain blocker). No external API needed.

## Strain Data (from shop page)

| Strain | Effects | Flavours | THC | CBD | Price | Available |
|---|---|---|---|---|---|---|
| BlockBerry | Relaxed, Sleepy, Hungry | Berry, Vanilla, Citrus | 23.0% | 0.1% | R191.20/g | Yes |
| Blue Zushi | Focused, Relaxed, Euphoric | Fruit, Mint, Diesel | 21.9% | 0.1% | R191.20/g | Yes |
| Candy Pave | Giggly, Euphoric, Uplifted | Candy, Floral, Creamy | 24.5% | 0.0% | R191.20/g | Yes |
| Caribbean Breeze | Energetic, Happy, Uplifted | Tropical, Citrus, Pineapple | 23.0% | 0.0% | R173.80/g | No |
| Femme Fatale | Relaxed, Happy, Sleepy | Grape, Tropical, Pear | 21.9% | 0.1% | R173.80/g | No |
| NFS 12 | Relaxed, Sleepy, Euphoric | Pine, Diesel, Spicy | 17.5% | 0.1% | R191.20/g | Yes |
| Peanut Butter Breath | Relaxed, Sleepy, Hungry | Nutty, Earthy, Herbal | 22.6% | 0.0% | R191.20/g | Yes |

## Implementation

### 1. New: `src/data/strains.ts`
Hardcoded array of all 7 strains with typed attributes (name, effects, flavours, thc, cbd, price, available, image URL from the shop).

### 2. New: `src/lib/strainMatcher.ts`
`matchStrain(answers)` — weighted scoring across 15 questions:
- **High weight**: Q1 (goal), Q5 (head effect), Q7 (flavour), Q13 (body stone)
- **Medium weight**: Q3 (timing), Q4 (munchies), Q6 (anxiety/THC sensitivity), Q9 (physical relief), Q15 (vibe)
- **Low weight**: remaining questions for tie-breaking
- Small penalty for out-of-stock strains
- Returns top match + compatibility percentage

### 3. New: `src/lib/emailValidation.ts`
Block ~80 disposable domains (mailinator, tempmail, etc.) + obvious fakes. Zero extra clicks — just smarter inline errors in the existing email field.

### 4. Modified: `src/components/SqueezeScreen.tsx`
Replace basic regex with `validateEmail()` for better fake-email blocking.

### 5. Modified: `src/pages/Index.tsx`
- Run `matchStrain(answers)` after survey completes
- Pass result to SuccessScreen as props
- Add matched strain name to webhook payload

### 6. Modified: `src/components/SuccessScreen.tsx`
- Accept strain result as props
- Show: strain name, THC/CBD, effects tags, flavour tags, compatibility %
- Availability badge
- "Shop This Strain" CTA → `healingbuds.co.za/shop`
- Keep "results sent to your inbox" note

### Files
- **New**: `src/data/strains.ts`, `src/lib/strainMatcher.ts`, `src/lib/emailValidation.ts`
- **Modified**: `src/components/SqueezeScreen.tsx`, `src/pages/Index.tsx`, `src/components/SuccessScreen.tsx`

