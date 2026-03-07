

## Fix: Remove the Green "Pacman" Leaf Icon

The green pac-man shape is the animated leaf SVG inside `LeafProgress.tsx`, which is rendered by `SurveyFlow.tsx`. It's redundant — `StepProgress` in the fixed header already handles progress display.

### Changes

1. **`src/components/SurveyFlow.tsx`**
   - Remove the `LeafProgress` import (line 7)
   - Remove the `<LeafProgress ... />` usage (lines 161-165)

2. **`src/pages/Index.tsx`**
   - Hide the `StepProgress` fixed header when `screen === "squeeze"` — the step dots and connector lines serve no purpose on the entry screen and contribute to the visual clutter above the logo

Two files, copy/layout only — no logic changes.

