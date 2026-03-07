

## Refined Copy Rewrite — Best of Both Worlds

After reviewing every screen, here's a tighter rewrite that keeps the strongest existing copy (the authority tone, trust badges, POPIA) while replacing the weaker/jargon-heavy parts with proven cannabis funnel language.

### What stays (already strong)
- Trust badges: "EU GMP Certified · Lab Tested" — these convert, don't touch
- POPIA compliance footer — critical for SA
- "Limited availability" on results — honest urgency, on-brand
- Dark cinematic aesthetic + animations — premium feel
- Survey question option labels — these are already clear and well-written

### What changes

**SqueezeScreen** (`src/components/SqueezeScreen.tsx`)

| Line | Current | New | Why |
|---|---|---|---|
| 120-123 | "Find Your **Plant-Based Frequency**" | "Find Your **Perfect Strain**" | "Perfect strain" is the #1 search term in cannabis funnels. "Frequency" is vague. |
| 129 | "A 60-second medical mapping to find the right strain for your relief." | "Answer 15 quick questions and we'll match you to the cannabis strain your body needs." | Specific, sets expectations, uses "match" psychology |
| 184 | "Begin Mapping" | "Find My Strain" | Action-oriented, uses "My" for ownership |
| 189 | "60 seconds · clinically informed · private" | "2 min · science-backed · 100% private" | Honest time estimate, "science-backed" > "clinically informed" |

**StepProgress** (`src/components/StepProgress.tsx`)

| Current | New |
|---|---|
| `["Email", "Verify", "Survey", "Contact", "Results"]` | `["Sign Up", "Verify", "Profile", "Details", "Your Match"]` |

**SurveyFlow section names** (`src/components/SurveyFlow.tsx` + `src/data/surveyQuestions.ts`)

| Current Section | New Section | New Subtitle |
|---|---|---|
| "Experience & Tolerance" | "Your Cannabis Background" | "Understanding your baseline" |
| "The Desired State" | "Your Ideal Experience" | "What does relief look like for you?" |
| "Biological Sensitivities" | "Your Body & Preferences" | "Safety, flavour & format" |
| "Advanced Synergy" | "Lifestyle & Context" | "Fine-tuning your match" |

Update `SECTION_META` keys and `surveyQuestions.ts` section strings to match.

**Survey question titles** — only rewrite the ones that are too clinical. Keep the rest.

| ID | Current | New |
|---|---|---|
| `exp_level` | "How would you describe your experience level with cannabis?" | "How familiar are you with cannabis?" |
| `effect_intensity` | "How strongly do you prefer to feel the effects?" | "How strong do you like the effects?" |
| `primary_vibe` | "What is the primary vibe you're looking to achieve?" | "What experience are you looking for?" |
| `thc_reaction` | "How does your body typically react to high-potency THC?" | "How sensitive are you to THC?" |
| `terpene_pref` | "Which aroma profiles do you naturally enjoy?" | "Which aromas appeal to you?" |
| `consumption_format` | "How do you prefer to consume?" | Keep as-is (already clean) |
| `recovery_support` | "Do you need recovery or anti-inflammatory support?" | Keep as-is |
| `discretion` | "How important is discretion for your usage?" | "How important is discretion?" |

Subtitles — same approach, simplify only the jargon-heavy ones:

| ID | Current Subtitle | New Subtitle |
|---|---|---|
| `exp_level` | "This helps us calibrate your ideal potency" | "So we can find the right strength for you" |
| `effect_intensity` | "From micro-dose to full immersion" | "From barely-there to fully immersive" |
| `primary_vibe` | "This is the single biggest factor in your match" | "This shapes your match more than anything" |
| `thc_reaction` | "We'll factor this into your safety profile" | "We'll use this to keep your experience comfortable" |
| `terpene_pref` | "Terpenes determine taste and therapeutic effect" | "Terpenes shape both flavour and how it feels" |

**LoadingScreen** (`src/components/LoadingScreen.tsx`)

| Current | New |
|---|---|
| "Processing Your Bio-Map…" | "Finding Your Match…" |
| Status messages | "Comparing your answers to our strain library…", "Analysing terpene compatibility…", "Matching cannabinoid ratios to your profile…", "Checking strain availability…", "Building your personalised result…", "Done." |

**ContactCapture** (`src/components/ContactCapture.tsx`)

| Current | New |
|---|---|
| "Your Clinical Profile Is Ready" | "Your Strain Match Is **Ready**" |
| "Where should we send your clinical profile?" | "Add your name to personalise your results" |
| "See My Recommendation" | "Reveal My Match" |
| "Just send it to my email →" | "Skip — email my results →" |
| "Your Top Match" (locked teaser label) | "Your #1 Match" |

**SuccessScreen** (`src/components/SuccessScreen.tsx`)

| Current | New |
|---|---|
| "Your Recommendation Is Ready" | "We Found Your Match" |
| "Your Top Match" | "Your #1 Match" |
| "Order This Strain" | "Shop This Strain" |
| "Results also sent to your inbox" | "Full results sent to your email" |
| "Questions? Email Us" | "Speak to a Consultant" |

### Files changed

| File | Scope |
|---|---|
| `src/components/SqueezeScreen.tsx` | 4 text strings |
| `src/components/StepProgress.tsx` | 1 array |
| `src/data/surveyQuestions.ts` | 4 section names, ~8 question titles, ~5 subtitles |
| `src/components/SurveyFlow.tsx` | `SECTION_META` keys + subtitles |
| `src/components/ContactCapture.tsx` | 4 text strings |
| `src/components/LoadingScreen.tsx` | Title + 6 status messages |
| `src/components/SuccessScreen.tsx` | 5 text strings |

No logic, animation, or structural changes. Copy only.

