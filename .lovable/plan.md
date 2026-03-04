

# Remaining Work: Restore Full 15-Question Clinical Profile

## Status Check

Three of the four improvements are **already done**:
- Micro-copy tweaks (ContactCapture, SuccessScreen) — done
- Sales-first success screen (price, "Order This Strain", no fake WhatsApp) — done
- Filter matcher to available strains only — done (line 15 of strainMatcher.ts)

**The only remaining work is restoring the survey from 8 to 15 questions** and updating the matcher to score them.

## Current 8 Questions (IDs: q1, q2, q3, q5, q6, q7, q9, q15)

Missing: q4, q8, q10, q11, q12, q13, q14 — these were cut earlier. They need to be designed to add clinical depth without bloating the experience.

## 7 New Questions to Add

| ID | Question | Options | Matching Logic |
|---|---|---|---|
| q4 | Preferred consumption method? | Flower / Vape / Edible / Oil | Informational — sent to webhook for consultant use |
| q8 | How do you want your body to feel? | Light & Functional / Warm & Relaxed / Heavy & Sedated / No Preference | Maps to effects (Energetic vs Relaxed vs Sleepy) — 2pts |
| q10 | How often do you consume? | Daily / Few times a week / Weekends / Rarely | Maps to THC tolerance thresholds — 1pt |
| q11 | Do you have any medical conditions? | Chronic Pain / Anxiety / Insomnia / None | Reinforces q1 goal matching — 2pts |
| q12 | What's your ideal session length? | Quick (15-30min) / Medium (1-2hr) / Extended (3hr+) / No Preference | Maps to strain duration/potency — 1pt |
| q13 | Do you prefer to consume alone or socially? | Solo / Social / Both | Maps to effects (Focused/Relaxed vs Giggly/Euphoric) — 1pt |
| q14 | How important is discretion to you? | Very / Somewhat / Not Important | Informational — webhook data for product format recommendations |

## Question Order (optimized for engagement)

1. q1 — Primary goal (the hook)
2. q2 — Experience level
3. q11 — Medical conditions (clinical depth early)
4. q3 — Time of day
5. q4 — Consumption method
6. q5 — Mental effect
7. q8 — Body effect
8. q6 — THC anxiety sensitivity
9. q7 — Flavour profile
10. q10 — Consumption frequency
11. q9 — Physical relief
12. q12 — Session length
13. q13 — Solo or social
14. q14 — Discretion
15. q15 — Current state of mind (the closer)

## Files Modified

- **`src/data/surveyQuestions.ts`** — Add 7 new questions, reorder to 15-question sequence
- **`src/lib/strainMatcher.ts`** — Add scoring rules for q8, q10, q11, q12, q13; update maxScore from 22 to ~32; keep q4 and q14 as informational (no scoring)

## Midpoint Update

The `MIDPOINT` constant in SurveyFlow.tsx is calculated dynamically (`Math.floor(surveyQuestions.length / 2)`), so it will automatically adjust to question 7-8 — no change needed there.

