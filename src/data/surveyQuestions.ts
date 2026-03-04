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
  type: "single" | "multi";
}

export const surveyQuestions: SurveyQuestion[] = [
  // ─── Section 1: Experience & Tolerance ───
  {
    id: "exp_level",
    section: "Experience & Tolerance",
    question: "How would you describe your experience level with cannabis?",
    subtitle: "This helps us calibrate your ideal potency",
    type: "single",
    options: [
      { label: "First timer / Very new", icon: "baby" },
      { label: "Occasional (few times a year)", icon: "sprout" },
      { label: "Regular (few times a month)", icon: "leaf" },
      { label: "Experienced (few times a week)", icon: "trees" },
      { label: "Daily consumer", icon: "flame" },
    ],
  },
  {
    id: "effect_intensity",
    section: "Experience & Tolerance",
    question: "How strongly do you prefer to feel the effects?",
    subtitle: "From micro-dose to full immersion",
    type: "single",
    options: [
      { label: "Very mild (barely noticeable)", icon: "droplets" },
      { label: "Mild but noticeable", icon: "droplet" },
      { label: "Moderate balanced effect", icon: "sun" },
      { label: "Strong pronounced effect", icon: "flame" },
      { label: "Maximum intensity", icon: "flame-kindling" },
    ],
  },
  {
    id: "peak_duration",
    section: "Experience & Tolerance",
    question: "How long do you want the peak effects to last?",
    subtitle: "Duration shapes which compounds we prioritise",
    type: "single",
    options: [
      { label: "Short (30-60 min)", icon: "timer" },
      { label: "Medium (1-2 hours)", icon: "clock" },
      { label: "Long (2-4 hours)", icon: "hourglass" },
      { label: "Extended (4+ hours)", icon: "infinity" },
    ],
  },

  // ─── Section 2: The Desired State ───
  {
    id: "primary_vibe",
    section: "The Desired State",
    question: "What is the primary vibe you're looking to achieve?",
    subtitle: "This is the single biggest factor in your match",
    type: "single",
    options: [
      { label: "Energized & Productive", icon: "zap" },
      { label: "Relaxed & Stress-Free", icon: "heart" },
      { label: "Creative & Inspired", icon: "lightbulb" },
      { label: "Deep Sleep & Sedation", icon: "moon" },
      { label: "Social & Talkative", icon: "users" },
      { label: "Focused & Clear", icon: "target" },
    ],
  },
  {
    id: "body_impact",
    section: "The Desired State",
    question: "How do you want the high to impact your physical body?",
    subtitle: "Physical sensation matters as much as mental effect",
    type: "single",
    options: [
      { label: "Light head change only", icon: "feather" },
      { label: "Gentle body relaxation", icon: "armchair" },
      { label: "Balanced physical and mental", icon: "scale" },
      { label: "Heavy body sensations", icon: "anchor" },
      { label: "Full-body immersion", icon: "waves" },
    ],
  },
  {
    id: "specific_benefit",
    section: "The Desired State",
    question: "Which specific benefit is most important to you right now?",
    subtitle: "We'll weight this heavily in your match",
    type: "single",
    options: [
      { label: "Pain management", icon: "activity" },
      { label: "Anxiety/Stress relief", icon: "brain" },
      { label: "Sleep aid", icon: "moon" },
      { label: "Focus/ADHD support", icon: "target" },
      { label: "Creativity boost", icon: "palette" },
      { label: "General wellness", icon: "heart-pulse" },
      { label: "Social anxiety relief", icon: "users" },
    ],
  },
  {
    id: "paired_activity",
    section: "The Desired State",
    question: "What activity do you plan to pair with this experience?",
    subtitle: "Context shapes the ideal strain profile",
    type: "single",
    options: [
      { label: "Work/Study", icon: "laptop" },
      { label: "Creative projects", icon: "palette" },
      { label: "Socializing with friends", icon: "users" },
      { label: "Relaxing alone", icon: "bed" },
      { label: "Physical activity", icon: "dumbbell" },
      { label: "Meditation/Yoga", icon: "flower" },
      { label: "Watching movies/music", icon: "tv" },
      { label: "Sex/Intimacy", icon: "heart" },
    ],
  },

  // ─── Section 3: Biological Sensitivities ───
  {
    id: "thc_reaction",
    section: "Biological Sensitivities",
    question: "How does your body typically react to high-potency THC?",
    subtitle: "We'll factor this into your safety profile",
    type: "single",
    options: [
      { label: "I am very sensitive (can feel 2.5mg)", icon: "alert-triangle" },
      { label: "I have average tolerance", icon: "minus" },
      { label: "I need higher doses for effects", icon: "trending-up" },
      { label: "I sometimes feel anxious/paranoid", icon: "shield-alert" },
      { label: "I prefer CBD-dominant or 1:1 ratios", icon: "scale" },
    ],
  },
  {
    id: "terpene_pref",
    section: "Biological Sensitivities",
    question: "Which aroma profiles do you naturally enjoy?",
    subtitle: "Terpenes determine taste and therapeutic effect",
    type: "single",
    options: [
      { label: "Citrus/Zesty (Limonene)", icon: "citrus" },
      { label: "Pine/Fresh (Pinene)", icon: "tree-pine" },
      { label: "Earthy/Spicy (Myrcene/Caryophyllene)", icon: "mountain" },
      { label: "Sweet/Floral (Linalool)", icon: "flower" },
      { label: "Gassy/Diesel", icon: "fuel" },
      { label: "No strong preference", icon: "minus" },
    ],
  },
  {
    id: "consumption_format",
    section: "Biological Sensitivities",
    question: "How do you prefer to consume?",
    subtitle: "We'll pass this to your consultant for tailored advice",
    type: "single",
    options: [
      { label: "Flower (joints/bowls)", icon: "leaf" },
      { label: "Vaporizing", icon: "wind" },
      { label: "Edibles", icon: "cookie" },
      { label: "Concentrates", icon: "flask-conical" },
      { label: "Tinctures/Oils", icon: "droplets" },
      { label: "Topicals", icon: "hand" },
      { label: "Open to trying different", icon: "shuffle" },
    ],
  },

  // ─── Section 4: Advanced Synergy ───
  {
    id: "recovery_support",
    section: "Advanced Synergy",
    question: "Do you need recovery or anti-inflammatory support?",
    subtitle: "Optional — helps us explore therapeutic pairings",
    type: "single",
    options: [
      { label: "Yes - chronic pain/inflammation", icon: "activity" },
      { label: "Yes - post-workout recovery", icon: "dumbbell" },
      { label: "Yes - general aches", icon: "bone" },
      { label: "No - not a priority", icon: "minus" },
    ],
  },
  {
    id: "environment",
    section: "Advanced Synergy",
    question: "What is your typical environment?",
    subtitle: "Setting influences the ideal effect profile",
    type: "single",
    options: [
      { label: "Quiet/private space", icon: "home" },
      { label: "Social setting", icon: "users" },
      { label: "Outdoors/nature", icon: "mountain-snow" },
      { label: "Active/busy environment", icon: "building" },
      { label: "Mixed situations", icon: "globe" },
    ],
  },
  {
    id: "time_of_day",
    section: "Advanced Synergy",
    question: "When do you typically consume?",
    subtitle: "Morning strains differ from evening strains",
    type: "single",
    options: [
      { label: "Morning", icon: "sunrise" },
      { label: "Afternoon", icon: "sun" },
      { label: "Evening", icon: "sunset" },
      { label: "Night", icon: "moon-star" },
      { label: "Varies", icon: "clock" },
    ],
  },
  {
    id: "discretion",
    section: "Advanced Synergy",
    question: "How important is discretion for your usage?",
    subtitle: "We'll note this for your consultant",
    type: "single",
    options: [
      { label: "Very important - low odor preferred", icon: "eye-off" },
      { label: "Moderately important", icon: "eye" },
      { label: "Not a concern", icon: "megaphone" },
    ],
  },
  {
    id: "effects_avoid",
    section: "Advanced Synergy",
    question: "Any effects you want to avoid?",
    subtitle: "Select all that apply — we'll steer your match away",
    type: "multi",
    options: [
      { label: "Paranoia/Anxiety", icon: "alert-triangle" },
      { label: "Sleepiness", icon: "moon" },
      { label: "Racing thoughts", icon: "zap" },
      { label: "Dry mouth/eyes", icon: "droplets" },
      { label: "Memory fog", icon: "cloud" },
      { label: "Munchies", icon: "utensils" },
      { label: "None of these", icon: "check-circle" },
    ],
  },
];
