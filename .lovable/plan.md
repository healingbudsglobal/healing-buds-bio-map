

## Phase 1: Replace Survey with Precision Bio-Mapping Questions + Update Strain Matcher

This phase replaces the current 15 survey questions with the new 4-section "Precision Bio-Mapping" set and rewrites the strain matching engine to score against the new question IDs.

---

### 1. Replace survey questions (`src/data/surveyQuestions.ts`)

Add a `section` field to the `SurveyQuestion` interface. Replace all questions with the new 15-question set across 4 sections:

| Section | Questions |
|---|---|
| **Experience & Tolerance** (3) | Experience level, Effect intensity, Peak duration |
| **The Desired State** (4) | Primary vibe, Body impact, Specific benefit, Paired activity |
| **Biological Sensitivities** (3) | THC reaction, Terpene preference, Consumption format |
| **Advanced Synergy** (5) | Recovery support, Environment, Time of day, Discretion, Effects to avoid |

New IDs: `exp_level`, `effect_intensity`, `peak_duration`, `primary_vibe`, `body_impact`, `specific_benefit`, `paired_activity`, `thc_reaction`, `terpene_pref`, `consumption_format`, `recovery_support`, `environment`, `time_of_day`, `discretion`, `effects_avoid`.

---

### 2. Rewrite strain matcher (`src/lib/strainMatcher.ts`)

Remap scoring logic to the new question IDs. Core high-weight mappings:

- `primary_vibe`: "Energized & Productive" → Energetic/Focused strains; "Deep Sleep & Sedation" → Sleepy strains
- `body_impact`: "Heavy body sensations" → Indica/Sleepy; "Light head change" → Sativa/Focused
- `terpene_pref`: "Citrus/Zesty" → Citrus/Tropical flavours; "Earthy/Spicy" → Earthy/Pine/Spicy flavours
- `thc_reaction`: "I sometimes feel anxious" → prefer THC < 22; "I prefer 1:1" → prefer high CBD
- `specific_benefit`: "Pain management" → Relaxed + CBD strains; "Anxiety/Stress relief" → lower THC + Relaxed

Medium/low weight: `exp_level`, `effect_intensity`, `peak_duration`, `paired_activity`, `time_of_day`, `environment`. Informational only (no scoring): `consumption_format`, `discretion`, `recovery_support`, `effects_avoid`.

---

### 3. Add section headers to survey flow (`src/components/SurveyFlow.tsx`)

When transitioning into the first question of a new section, show a brief section title card (e.g., "Section 2: The Desired State") with a fade-in/out animation before the question appears — similar to the existing midpoint motivational flash. Detect section boundaries from the new `section` field on each question.

---

### 4. Update webhook payload (`src/pages/Index.tsx`)

No structural changes needed — the existing loop over `surveyQuestions` already sends all question IDs dynamically. The new IDs will flow through automatically.

**Make.com note**: The webhook will now receive new field names (e.g., `primary_vibe` instead of `q1`). You'll need to update your Make.com scenario's data mappings to reference the new field names in any Google Sheets columns or email templates.

---

### Files changed

| File | Change |
|---|---|
| `src/data/surveyQuestions.ts` | Replace all 15 questions with new 4-section Bio-Mapping set, add `section` field |
| `src/lib/strainMatcher.ts` | Rewrite scoring for new question IDs |
| `src/components/SurveyFlow.tsx` | Add section header transitions between groups |

