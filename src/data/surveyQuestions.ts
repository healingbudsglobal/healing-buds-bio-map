export interface SurveyQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: string[];
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "goal",
    question: "What's your primary goal?",
    subtitle: "Choose the outcome you're chasing most",
    options: ["Relax & Unwind", "Creative Boost", "Pain Relief", "Better Sleep", "Social Energy", "Focus & Productivity"],
  },
  {
    id: "tolerance",
    question: "How would you describe your tolerance?",
    subtitle: "Be honest — we won't judge",
    options: ["Brand New (never tried)", "Light (occasional)", "Moderate (weekly)", "Heavy (daily)", "Veteran (multiple daily)"],
  },
  {
    id: "time_of_use",
    question: "When do you usually consume?",
    subtitle: "Time of day matters for strain selection",
    options: ["Morning", "Afternoon", "Evening", "Late Night", "All Day", "Weekends Only"],
  },
  {
    id: "munchies",
    question: "How do you feel about the munchies?",
    subtitle: "Some strains stimulate appetite more than others",
    options: ["Bring them on!", "Mild snacking is fine", "I'd rather avoid them", "No preference"],
  },
  {
    id: "head_effect",
    question: "What kind of head effect do you prefer?",
    subtitle: "This helps us match your cerebral sweet spot",
    options: ["Clear & Focused", "Euphoric & Uplifting", "Dreamy & Spacey", "Minimal head effect"],
  },
  {
    id: "anxiety",
    question: "How do you respond to anxiety-inducing strains?",
    subtitle: "Some people are more sensitive than others",
    options: ["I'm very sensitive", "Somewhat sensitive", "Rarely bothered", "Never had anxiety from cannabis"],
  },
  {
    id: "flavor",
    question: "What flavour profile appeals to you?",
    subtitle: "Terpenes determine taste and effect",
    options: ["Citrus & Fruity", "Earthy & Woody", "Sweet & Dessert", "Diesel & Skunky", "Spicy & Herbal", "No preference"],
  },
  {
    id: "consumption_method",
    question: "How do you usually consume?",
    subtitle: "Different methods hit differently",
    options: ["Smoking (joint/pipe)", "Vaping", "Edibles", "Concentrates/Dabs", "Multiple methods"],
  },
  {
    id: "physical_relief",
    question: "Do you need physical/body relief?",
    subtitle: "Important for matching indica-leaning strains",
    options: ["Yes, significant pain relief", "Mild body relaxation", "Not really", "Only for sleep"],
  },
  {
    id: "bag_appeal",
    question: "How important is bag appeal to you?",
    subtitle: "Some people eat with their eyes first 👀",
    options: ["Very important — I want frosty nugs", "Nice to have", "Don't care, just make it work"],
  },
  {
    id: "duration",
    question: "How long do you want the effect to last?",
    subtitle: "Duration varies widely by strain",
    options: ["Quick hit (30-60 min)", "Medium (1-2 hours)", "Long-lasting (3+ hours)", "As long as possible"],
  },
  {
    id: "environment",
    question: "Where will you mostly consume?",
    subtitle: "Setting influences the ideal strain",
    options: ["At home chilling", "Outdoors/Nature", "Social gatherings", "While working/creating", "Before bed"],
  },
  {
    id: "body_stone",
    question: "How much body stone do you want?",
    subtitle: "From functional to full couch-lock",
    options: ["None — keep me moving", "Light body buzz", "Moderate — melt into the couch", "Full couch-lock please"],
  },
  {
    id: "smell_sensitivity",
    question: "How sensitive are you to strong smells?",
    subtitle: "Some strains are louder than others",
    options: ["Love the loud smell", "Moderate is fine", "Prefer something discreet", "No preference"],
  },
  {
    id: "current_vibe",
    question: "What's your current vibe right now?",
    subtitle: "Let's match your energy",
    options: ["Stressed & need to decompress", "Bored & need stimulation", "In pain & need relief", "Happy & want to enhance it", "Can't sleep"],
  },
];
