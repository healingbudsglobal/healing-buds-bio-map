import { strains, type Strain } from "@/data/strains";

export interface StrainMatch {
  strain: Strain;
  score: number;
  compatibility: number; // 0-100
}

/**
 * Weighted strain matching engine.
 * Maps 15 survey answers to strain attributes and returns the best match.
 * q4 (method) and q14 (discretion) are informational only — no scoring.
 */
export function matchStrain(answers: Record<string, string>): StrainMatch {
  const availableStrains = strains.filter((s) => s.available);
  const scored = availableStrains.map((strain) => {
    let score = 0;

    // === HIGH WEIGHT (3 pts each) ===

    // Q1: Primary goal
    const goal = answers.q1;
    if (goal === "Relaxation" && strain.effects.includes("Relaxed")) score += 3;
    if (goal === "Pain Relief" && (strain.effects.includes("Relaxed") || strain.cbd > 0)) score += 3;
    if ((goal === "Creativity/Focus" || goal === "Creativity & Focus") && (strain.effects.includes("Focused") || strain.effects.includes("Euphoric") || strain.effects.includes("Uplifted"))) score += 3;
    if (goal === "Sleep Support" && strain.effects.includes("Sleepy")) score += 3;

    // Q5: Head effect
    const head = answers.q5;
    if (head === "Functional" && strain.effects.includes("Focused")) score += 3;
    if (head === "Euphoric" && (strain.effects.includes("Euphoric") || strain.effects.includes("Giggly") || strain.effects.includes("Happy"))) score += 3;
    if (head === "Deep" && strain.effects.includes("Relaxed") && strain.thc >= 22) score += 3;
    if (head === "Sedation" && strain.effects.includes("Sleepy")) score += 3;

    // Q7: Flavour profile
    const flav = answers.q7;
    if ((flav === "Earthy/Pine" || flav === "Earthy / Pine") && strain.flavours.some((f) => ["Earthy", "Pine", "Herbal", "Nutty", "Spicy"].includes(f))) score += 3;
    if ((flav === "Sweet/Fruity" || flav === "Sweet / Fruity") && strain.flavours.some((f) => ["Berry", "Fruit", "Candy", "Grape", "Tropical", "Pear", "Pineapple", "Vanilla", "Floral", "Creamy"].includes(f))) score += 3;
    if ((flav === "Diesel/Gas" || flav === "Diesel / Gas") && strain.flavours.some((f) => ["Diesel", "Spicy"].includes(f))) score += 3;
    if (flav === "Citrus" && strain.flavours.some((f) => ["Citrus", "Pineapple", "Tropical"].includes(f))) score += 3;

    // === MEDIUM WEIGHT (2 pts each) ===

    // Q3: Timing
    const timing = answers.q3;
    if (timing === "Morning" && (strain.effects.includes("Energetic") || strain.effects.includes("Focused") || strain.effects.includes("Uplifted"))) score += 2;
    if (timing === "Afternoon" && (strain.effects.includes("Euphoric") || strain.effects.includes("Happy") || strain.effects.includes("Giggly"))) score += 2;
    if (timing === "Night" && (strain.effects.includes("Sleepy") || strain.effects.includes("Relaxed"))) score += 2;

    // Q6: THC anxiety
    const anx = answers.q6;
    if (anx === "Often" && strain.thc < 20) score += 2;
    if (anx === "Occasionally" && strain.thc < 23) score += 1;
    if (anx === "Never" && strain.thc >= 22) score += 2;
    if (anx === "Rarely") score += 1;

    // Q8: Body feel
    const body = answers.q8;
    if (body === "Light & Functional" && (strain.effects.includes("Energetic") || strain.effects.includes("Focused"))) score += 2;
    if (body === "Warm & Relaxed" && strain.effects.includes("Relaxed")) score += 2;
    if (body === "Heavy & Sedated" && strain.effects.includes("Sleepy")) score += 2;
    // "No Preference" — no score

    // Q11: Medical conditions
    const med = answers.q11;
    if (med === "Chronic Pain" && (strain.effects.includes("Relaxed") || strain.cbd > 0)) score += 2;
    if (med === "Anxiety" && strain.thc < 23 && strain.effects.includes("Relaxed")) score += 2;
    if (med === "Insomnia" && strain.effects.includes("Sleepy")) score += 2;
    // "None" — no score

    // Q9: Physical relief
    const phys = answers.q9;
    if (phys !== "None" && strain.effects.includes("Relaxed")) score += 2;
    if (phys === "Nausea" && strain.cbd > 0) score += 1;

    // Q15: Vibe
    const vibe = answers.q15;
    if (vibe === "Stressed" && strain.effects.includes("Relaxed")) score += 2;
    if (vibe === "Bored" && (strain.effects.includes("Euphoric") || strain.effects.includes("Giggly") || strain.effects.includes("Uplifted"))) score += 2;
    if (vibe === "Sore" && strain.effects.includes("Relaxed") && strain.effects.includes("Sleepy")) score += 2;
    if (vibe === "Adventurous" && (strain.effects.includes("Energetic") || strain.effects.includes("Focused") || strain.effects.includes("Uplifted"))) score += 2;

    // === LOW WEIGHT (1 pt each) ===

    // Q2: Tolerance
    const tol = answers.q2;
    if (tol === "Advanced" && strain.thc >= 23) score += 1;
    if (tol === "Beginner" && strain.thc < 22) score += 1;
    if (tol === "Micro-doser" && strain.thc < 20) score += 1;

    // Q10: Consumption frequency (tolerance reinforcement)
    const freq = answers.q10;
    if (freq === "Daily" && strain.thc >= 22) score += 1;
    if (freq === "Rarely" && strain.thc < 22) score += 1;

    // Q12: Session length
    const session = answers.q12;
    if (session === "Quick (15-30min)" && strain.thc < 22) score += 1;
    if (session === "Extended (3hr+)" && strain.thc >= 23) score += 1;

    // Q13: Solo or social
    const social = answers.q13;
    if (social === "Solo" && (strain.effects.includes("Focused") || strain.effects.includes("Relaxed"))) score += 1;
    if (social === "Social" && (strain.effects.includes("Giggly") || strain.effects.includes("Euphoric") || strain.effects.includes("Happy"))) score += 1;
    if (social === "Both") score += 1;

    return { strain, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  // Max possible ~32 pts (3 high×3 + 6 med×2 + 4 low×1)
  const maxScore = 32;
  const compatibility = Math.min(Math.round((best.score / maxScore) * 100), 99);

  return {
    strain: best.strain,
    score: best.score,
    compatibility: Math.max(compatibility, 65),
  };
}
