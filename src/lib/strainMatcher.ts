import { strains, type Strain } from "@/data/strains";

export interface StrainMatch {
  strain: Strain;
  score: number;
  compatibility: number; // 0-100
}

/**
 * Weighted strain matching engine — Precision Bio-Mapping v2.
 * Maps 15 survey answers to strain attributes and returns the best match.
 * Informational only (no scoring): consumption_format, discretion, recovery_support, effects_avoid.
 */
export function matchStrain(answers: Record<string, string>): StrainMatch {
  const availableStrains = strains.filter((s) => s.available);
  const scored = availableStrains.map((strain) => {
    let score = 0;

    // ═══ HIGH WEIGHT (3 pts each) ═══

    // primary_vibe — single biggest factor
    const vibe = answers.primary_vibe;
    if (vibe === "Energized & Productive" && (strain.effects.includes("Energetic") || strain.effects.includes("Focused") || strain.effects.includes("Uplifted"))) score += 3;
    if (vibe === "Relaxed & Stress-Free" && strain.effects.includes("Relaxed")) score += 3;
    if (vibe === "Creative & Inspired" && (strain.effects.includes("Euphoric") || strain.effects.includes("Giggly") || strain.effects.includes("Uplifted"))) score += 3;
    if (vibe === "Deep Sleep & Sedation" && strain.effects.includes("Sleepy")) score += 3;

    // body_impact
    const body = answers.body_impact;
    if (body === "Heavy body sensations" && (strain.effects.includes("Sleepy") || strain.effects.includes("Relaxed")) && strain.type === "indica") score += 3;
    if (body === "Light head change" && (strain.effects.includes("Focused") || strain.effects.includes("Euphoric") || strain.effects.includes("Uplifted"))) score += 3;
    if (body === "Balanced physical and mental" && strain.type === "hybrid") score += 3;

    // terpene_pref — flavour mapping
    const terp = answers.terpene_pref;
    if (terp === "Citrus/Zesty" && strain.flavours.some((f) => ["Citrus", "Pineapple", "Tropical"].includes(f))) score += 3;
    if (terp === "Floral/Lavender" && strain.flavours.some((f) => ["Floral", "Candy", "Creamy", "Vanilla"].includes(f))) score += 3;
    if (terp === "Earthy/Spicy" && strain.flavours.some((f) => ["Earthy", "Pine", "Spicy", "Diesel", "Herbal", "Nutty"].includes(f))) score += 3;
    // "No preference" — no score

    // ═══ MEDIUM WEIGHT (2 pts each) ═══

    // thc_reaction — safety
    const thc = answers.thc_reaction;
    if (thc === "I enjoy it; no negative effects" && strain.thc >= 22) score += 2;
    if (thc === "I sometimes feel anxious" && strain.thc < 22) score += 2;
    if (thc === "I prefer a balanced 1:1 ratio" && strain.cbd > 0) score += 2;

    // specific_benefit
    const benefit = answers.specific_benefit;
    if (benefit === "Pain management" && (strain.effects.includes("Relaxed") || strain.cbd > 0)) score += 2;
    if (benefit === "Anxiety/Stress relief" && strain.effects.includes("Relaxed") && strain.thc < 24) score += 2;
    if (benefit === "Increased focus/energy" && (strain.effects.includes("Focused") || strain.effects.includes("Energetic"))) score += 2;
    if (benefit === "Appetite stimulation" && strain.effects.includes("Hungry")) score += 2;

    // time_of_day
    const time = answers.time_of_day;
    if (time === "Morning/Daytime" && (strain.effects.includes("Energetic") || strain.effects.includes("Focused") || strain.effects.includes("Uplifted"))) score += 2;
    if (time === "Evening/Nighttime" && (strain.effects.includes("Sleepy") || strain.effects.includes("Relaxed"))) score += 2;
    if (time === "Situational") score += 1;

    // environment
    const env = answers.environment;
    if (env === "On-the-go/Social" && (strain.effects.includes("Giggly") || strain.effects.includes("Happy") || strain.effects.includes("Euphoric"))) score += 2;
    if (env === "Strictly at home" && (strain.effects.includes("Relaxed") || strain.effects.includes("Sleepy"))) score += 2;
    if (env === "Both") score += 1;

    // ═══ LOW WEIGHT (1 pt each) ═══

    // exp_level — tolerance proxy
    const exp = answers.exp_level;
    if (exp === "Seasoned" && strain.thc >= 23) score += 1;
    if (exp === "Newcomer" && strain.thc < 22) score += 1;
    if (exp === "Casual") score += 1;

    // effect_intensity
    const intensity = answers.effect_intensity;
    if (intensity === "Intense/Heavy" && strain.thc >= 23) score += 1;
    if (intensity === "Barely noticeable" && strain.thc < 20) score += 1;
    if (intensity === "Mild/Medium" && strain.thc >= 20 && strain.thc < 24) score += 1;

    // peak_duration
    const duration = answers.peak_duration;
    if (duration === "Short (1–2 hours)" && strain.thc < 22) score += 1;
    if (duration === "Long-lasting (4+ hours)" && strain.thc >= 23) score += 1;

    // paired_activity
    const activity = answers.paired_activity;
    if (activity === "Socializing with friends" && (strain.effects.includes("Giggly") || strain.effects.includes("Happy") || strain.effects.includes("Euphoric"))) score += 1;
    if (activity === "Creative work or hobbies" && (strain.effects.includes("Euphoric") || strain.effects.includes("Focused"))) score += 1;
    if (activity === "Physical exercise/Yoga" && (strain.effects.includes("Energetic") || strain.effects.includes("Uplifted"))) score += 1;
    if (activity === "Solo relaxation/Bedtime" && (strain.effects.includes("Relaxed") || strain.effects.includes("Sleepy"))) score += 1;

    return { strain, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  // Max possible: 3 high×3 + 4 med×2 + 4 low×1 = 9+8+4 = 21
  const maxScore = 21;
  const compatibility = Math.min(Math.round((best.score / maxScore) * 100), 99);

  return {
    strain: best.strain,
    score: best.score,
    compatibility: Math.max(compatibility, 65),
  };
}
