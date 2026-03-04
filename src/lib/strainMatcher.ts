import { strains, type Strain } from "@/data/strains";

export interface StrainMatch {
  strain: Strain;
  score: number;
  compatibility: number; // 0-100
}

/**
 * Weighted strain matching engine.
 * Maps survey answers to strain attributes and returns the best match.
 */
export function matchStrain(answers: Record<string, string>): StrainMatch {
  const scored = strains.map((strain) => {
    let score = 0;

    // === HIGH WEIGHT (3 pts each) ===

    // Q1: Primary goal
    const goal = answers.q1;
    if (goal === "Relaxation" && strain.effects.includes("Relaxed")) score += 3;
    if (goal === "Pain Relief" && (strain.effects.includes("Relaxed") || strain.cbd > 0)) score += 3;
    if (goal === "Creativity/Focus" && (strain.effects.includes("Focused") || strain.effects.includes("Euphoric") || strain.effects.includes("Uplifted"))) score += 3;
    if (goal === "Sleep Support" && strain.effects.includes("Sleepy")) score += 3;

    // Q5: Head effect
    const head = answers.q5;
    if (head === "Functional" && strain.effects.includes("Focused")) score += 3;
    if (head === "Euphoric" && (strain.effects.includes("Euphoric") || strain.effects.includes("Giggly") || strain.effects.includes("Happy"))) score += 3;
    if (head === "Deep" && strain.effects.includes("Relaxed") && strain.thc >= 22) score += 3;
    if (head === "Sedation" && strain.effects.includes("Sleepy")) score += 3;

    // Q7: Flavour profile
    const flav = answers.q7;
    if (flav === "Earthy/Pine" && strain.flavours.some((f) => ["Earthy", "Pine", "Herbal", "Nutty", "Spicy"].includes(f))) score += 3;
    if (flav === "Sweet/Fruity" && strain.flavours.some((f) => ["Berry", "Fruit", "Candy", "Grape", "Tropical", "Pear", "Pineapple", "Vanilla", "Floral", "Creamy"].includes(f))) score += 3;
    if (flav === "Diesel/Gas" && strain.flavours.some((f) => ["Diesel", "Spicy"].includes(f))) score += 3;
    if (flav === "Citrus" && strain.flavours.some((f) => ["Citrus", "Pineapple", "Tropical"].includes(f))) score += 3;

    // Q13: Body stone
    const body = answers.q13;
    if (body === "Yes" && strain.effects.includes("Relaxed") && strain.effects.includes("Sleepy")) score += 3;
    if (body === "No" && (strain.effects.includes("Uplifted") || strain.effects.includes("Focused") || strain.effects.includes("Energetic"))) score += 3;
    if (body === "Balanced" && strain.effects.includes("Relaxed") && !strain.effects.includes("Sleepy")) score += 2;
    if (body === "Balanced" && strain.effects.includes("Euphoric")) score += 1;

    // === MEDIUM WEIGHT (2 pts each) ===

    // Q3: Timing
    const timing = answers.q3;
    if (timing === "Morning" && (strain.effects.includes("Energetic") || strain.effects.includes("Focused") || strain.effects.includes("Uplifted"))) score += 2;
    if (timing === "Afternoon" && (strain.effects.includes("Euphoric") || strain.effects.includes("Happy") || strain.effects.includes("Giggly"))) score += 2;
    if (timing === "Night" && (strain.effects.includes("Sleepy") || strain.effects.includes("Relaxed"))) score += 2;

    // Q4: Munchies
    const munch = answers.q4;
    if (munch === "I want them!" && strain.effects.includes("Hungry")) score += 2;
    if (munch === "Avoid" && !strain.effects.includes("Hungry")) score += 2;
    if (munch === "Neutral") score += 1;

    // Q6: THC anxiety
    const anx = answers.q6;
    if (anx === "Often" && strain.thc < 20) score += 2;
    if (anx === "Occasionally" && strain.thc < 23) score += 1;
    if (anx === "Never" && strain.thc >= 22) score += 2;
    if (anx === "Rarely") score += 1;

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

    // Q2: Tolerance → prefer higher THC for advanced
    const tol = answers.q2;
    if (tol === "Advanced" && strain.thc >= 23) score += 1;
    if (tol === "Beginner" && strain.thc < 22) score += 1;
    if (tol === "Micro-doser" && strain.thc < 20) score += 1;

    // Q10: Bag appeal — no direct data, skip
    // Q11: Duration — no direct data, skip
    // Q12: Setting
    const setting = answers.q12;
    if (setting === "Social" && (strain.effects.includes("Giggly") || strain.effects.includes("Happy"))) score += 1;
    if (setting === "Home" && strain.effects.includes("Relaxed")) score += 1;
    if (setting === "Work" && strain.effects.includes("Focused")) score += 1;
    if (setting === "Outdoor" && (strain.effects.includes("Energetic") || strain.effects.includes("Uplifted"))) score += 1;

    // Q14: Smell sensitivity — no direct data, give slight edge to mild strains
    const smell = answers.q14;
    if (smell === "Low-odor" && strain.flavours.some((f) => ["Vanilla", "Floral", "Creamy", "Fruit"].includes(f))) score += 1;
    if (smell === "Love the skunk" && strain.flavours.some((f) => ["Diesel", "Pine", "Spicy", "Earthy"].includes(f))) score += 1;

    // Availability penalty
    if (!strain.available) score -= 2;

    return { strain, score };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  // Max possible ~28 pts (4 high×3 + 5 med×2 + 3 low×1)
  const maxScore = 25;
  const compatibility = Math.min(Math.round((best.score / maxScore) * 100), 99);

  return {
    strain: best.strain,
    score: best.score,
    compatibility: Math.max(compatibility, 65), // floor at 65% so it always feels good
  };
}
