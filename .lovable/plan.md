

## Plan: Align Codebase with Architecture Spec

The architecture document describes a more comprehensive version of what's already built. Here's what needs updating:

---

### 1. Expand Survey Questions (`src/data/surveyQuestions.ts`)

Every question currently has 2-4 options. The spec has 4-8 options per question. Key expansions:

| Question | Current Options | Spec Options |
|---|---|---|
| `exp_level` | 3 | 5 |
| `effect_intensity` | 3 | 5 |
| `primary_vibe` | 4 | 6 (+Social & Talkative, +Focused & Clear) |
| `body_impact` | 3 | 5 |
| `specific_benefit` | 4 | 7 (+Sleep aid, +Focus/ADHD, +Creativity, +Social anxiety) |
| `paired_activity` | 4 | 8 (+Work/Study, +Physical activity, +Meditation, +Sex/Intimacy) |
| `thc_reaction` | 3 | 5 |
| `terpene_pref` | 4 | 6 (+Pine/Fresh, +Gassy/Diesel) |
| `consumption_format` | 3 | 7 |
| `environment` | 3 | 5 |
| `time_of_day` | 3 | 5 |
| `discretion` | 2 | 3 |
| `effects_avoid` | 3 | 7 (+Paranoia, +Racing thoughts, +Dry mouth, +Memory fog) |

Also add `type: 'single' | 'multi'` field — `effects_avoid` becomes multi-select.

---

### 2. Update Strain Matcher (`src/lib/strainMatcher.ts`)

Add scoring branches for the new options (e.g., "Social & Talkative" → Happy/Uplifted strains, "Focused & Clear" → Focused strains, "Sleep aid" → Indica/Sleepy). Adjust max score calculation to account for expanded option coverage.

---

### 3. Add Multi-Select Support (`src/components/SurveyFlow.tsx`)

Currently all questions are single-select (tap = auto-advance). For `effects_avoid` (type: `multi`):
- Allow toggling multiple options on/off
- Show a "Continue" button instead of auto-advancing
- Track selected items as comma-separated string in answers

---

### 4. Extract Webhook Utility (`src/lib/webhook.ts`)

Create a shared webhook helper used by `Index.tsx` instead of inline fetch calls. Adds timestamp and source fields automatically. No functional change — just cleaner code.

---

### Files Changed

| File | Change |
|---|---|
| `src/data/surveyQuestions.ts` | Expand all questions to spec option counts, add `type` field |
| `src/lib/strainMatcher.ts` | Add scoring for new options, recalculate max score |
| `src/components/SurveyFlow.tsx` | Add multi-select mode for `effects_avoid` |
| `src/lib/webhook.ts` | New — shared webhook utility |
| `src/pages/Index.tsx` | Use `webhook.ts` instead of inline fetch |

