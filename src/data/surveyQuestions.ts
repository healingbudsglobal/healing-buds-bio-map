export interface SurveyOption {
  label: string;
  icon?: string; // lucide icon name
}

export interface SurveyQuestion {
  id: string;
  question: string;
  subtitle?: string;
  section: string;
  options: SurveyOption[];
}

export const surveyQuestions: SurveyQuestion[] = [
  // ─── Section 1: Experience & Tolerance ───
  {
    id: "exp_level",
    section: "Experience & Tolerance",
    question: "How would you describe your experience level with cannabis?",
    subtitle: "This helps us calibrate your ideal potency",
    options: [
      { label: "Newcomer", icon: "sprout" },
      { label: "Casual", icon: "leaf" },
      { label: "Seasoned", icon: "trees" },
    ],
  },
  {
    id: "effect_intensity",
    section: "Experience & Tolerance",
    question: "How strongly do you prefer to feel the effects?",
    subtitle: "From micro-dose to full immersion",
    options: [
      { label: "Barely noticeable", icon: "droplets" },
      { label: "Mild/Medium", icon: "sun" },
      { label: "Intense/Heavy", icon: "flame" },
    ],
  },
  {
    id: "peak_duration",
    section: "Experience & Tolerance",
    question: "How long do you want the peak effects to last?",
    subtitle: "Duration shapes which compounds we prioritise",
    options: [
      { label: "Short (1–2 hours)", icon: "timer" },
      { label: "Medium (2–4 hours)", icon: "clock" },
      { label: "Long-lasting (4+ hours)", icon: "hourglass" },
    ],
  },

  // ─── Section 2: The Desired State ───
  {
    id: "primary_vibe",
    section: "The Desired State",
    question: "What is the primary vibe you're looking to achieve?",
    subtitle: "This is the single biggest factor in your match",
    options: [
      { label: "Energized & Productive", icon: "zap" },
      { label: "Relaxed & Stress-Free", icon: "heart" },
      { label: "Creative & Inspired", icon: "lightbulb" },
      { label: "Deep Sleep & Sedation", icon: "moon" },
    ],
  },
  {
    id: "body_impact",
    section: "The Desired State",
    question: "How do you want the high to impact your physical body?",
    subtitle: "Physical sensation matters as much as mental effect",
    options: [
      { label: "Heavy body sensations", icon: "anchor" },
      { label: "Light head change", icon: "feather" },
      { label: "Balanced physical and mental", icon: "scale" },
    ],
  },
  {
    id: "specific_benefit",
    section: "The Desired State",
    question: "Which specific benefit is most important to you right now?",
    subtitle: "We'll weight this heavily in your match",
    options: [
      { label: "Pain management", icon: "activity" },
      { label: "Anxiety/Stress relief", icon: "brain" },
      { label: "Increased focus/energy", icon: "target" },
      { label: "Appetite stimulation", icon: "utensils" },
    ],
  },
  {
    id: "paired_activity",
    section: "The Desired State",
    question: "What activity do you plan to pair with this experience?",
    subtitle: "Context shapes the ideal strain profile",
    options: [
      { label: "Socializing with friends", icon: "users" },
      { label: "Creative work or hobbies", icon: "palette" },
      { label: "Physical exercise/Yoga", icon: "dumbbell" },
      { label: "Solo relaxation/Bedtime", icon: "bed" },
    ],
  },

  // ─── Section 3: Biological Sensitivities ───
  {
    id: "thc_reaction",
    section: "Biological Sensitivities",
    question: "How does your body typically react to high-potency THC?",
    subtitle: "We'll factor this into your safety profile",
    options: [
      { label: "I enjoy it; no negative effects", icon: "shield-check" },
      { label: "I sometimes feel anxious", icon: "alert-triangle" },
      { label: "I prefer a balanced 1:1 ratio", icon: "scale" },
    ],
  },
  {
    id: "terpene_pref",
    section: "Biological Sensitivities",
    question: "Are you sensitive to specific smells or flavours?",
    subtitle: "Terpenes determine taste and therapeutic effect",
    options: [
      { label: "Citrus/Zesty", icon: "citrus" },
      { label: "Floral/Lavender", icon: "flower" },
      { label: "Earthy/Spicy", icon: "tree-pine" },
      { label: "No preference", icon: "minus" },
    ],
  },
  {
    id: "consumption_format",
    section: "Biological Sensitivities",
    question: "Do you have a preference for consumption format?",
    subtitle: "We'll pass this to your consultant for tailored advice",
    options: [
      { label: "Inhalation (Flower/Vape)", icon: "wind" },
      { label: "Ingestion (Edibles/Tinctures)", icon: "cookie" },
      { label: "No preference", icon: "minus" },
    ],
  },

  // ─── Section 4: Advanced Synergy ───
  {
    id: "recovery_support",
    section: "Advanced Synergy",
    question: "Are you looking for specific metabolic or recovery support?",
    subtitle: "Optional — helps us explore peptide pairings",
    options: [
      { label: "Muscle recovery & inflammation", icon: "dumbbell" },
      { label: "Cognitive enhancement", icon: "brain" },
      { label: "Anti-aging & skin health", icon: "sparkles" },
      { label: "None / Not sure", icon: "minus" },
    ],
  },
  {
    id: "environment",
    section: "Advanced Synergy",
    question: "In what environment will you be using the product?",
    subtitle: "Setting influences the ideal effect profile",
    options: [
      { label: "Strictly at home", icon: "home" },
      { label: "On-the-go/Social", icon: "map-pin" },
      { label: "Both", icon: "globe" },
    ],
  },
  {
    id: "time_of_day",
    section: "Advanced Synergy",
    question: "What time of day do you primarily intend to use it?",
    subtitle: "Morning strains differ from evening strains",
    options: [
      { label: "Morning/Daytime", icon: "sunrise" },
      { label: "Evening/Nighttime", icon: "moon-star" },
      { label: "Situational", icon: "clock" },
    ],
  },
  {
    id: "discretion",
    section: "Advanced Synergy",
    question: "How important is discretion for your usage?",
    subtitle: "We'll note this for your consultant",
    options: [
      { label: "Very important", icon: "eye-off" },
      { label: "Not important", icon: "megaphone" },
    ],
  },
  {
    id: "effects_avoid",
    section: "Advanced Synergy",
    question: "Are there any effects you explicitly want to avoid?",
    subtitle: "We'll steer your match away from these",
    options: [
      { label: "Daytime sleepiness", icon: "cloud-lightning" },
      { label: "Munchies/Increased appetite", icon: "utensils" },
      { label: "Brain fog", icon: "cloud" },
    ],
  },
];
