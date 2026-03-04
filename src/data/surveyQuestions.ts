export interface SurveyQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: SurveyOption[];
}

export interface SurveyOption {
  label: string;
  icon?: string; // lucide icon name
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "q1",
    question: "What brings you here today?",
    subtitle: "Choose the outcome that matters most to you",
    options: [
      { label: "Relaxation", icon: "heart" },
      { label: "Pain Relief", icon: "zap" },
      { label: "Creativity & Focus", icon: "lightbulb" },
      { label: "Sleep Support", icon: "moon" },
    ],
  },
  {
    id: "q2",
    question: "How would you describe your experience level?",
    subtitle: "This helps us calibrate your ideal potency",
    options: [
      { label: "Beginner", icon: "sprout" },
      { label: "Intermediate", icon: "leaf" },
      { label: "Advanced", icon: "trees" },
      { label: "Micro-doser", icon: "droplets" },
    ],
  },
  {
    id: "q3",
    question: "When do you usually consume?",
    subtitle: "Time of day influences strain selection",
    options: [
      { label: "Morning", icon: "sunrise" },
      { label: "Afternoon", icon: "sun" },
      { label: "Night", icon: "moon-star" },
    ],
  },
  {
    id: "q4",
    question: "How do you feel about appetite stimulation?",
    subtitle: "Some strains stimulate appetite more than others",
    options: [
      { label: "I want it!", icon: "utensils" },
      { label: "Neutral", icon: "minus" },
      { label: "Avoid", icon: "x" },
    ],
  },
  {
    id: "q5",
    question: "What kind of mental effect do you prefer?",
    subtitle: "This helps match your cerebral sweet spot",
    options: [
      { label: "Functional", icon: "brain" },
      { label: "Euphoric", icon: "sparkles" },
      { label: "Deep", icon: "waves" },
      { label: "Sedation", icon: "bed" },
    ],
  },
  {
    id: "q6",
    question: "How sensitive are you to THC-related anxiety?",
    subtitle: "We'll factor this into your recommendation",
    options: [
      { label: "Never", icon: "shield-check" },
      { label: "Rarely", icon: "shield" },
      { label: "Occasionally", icon: "shield-alert" },
      { label: "Often", icon: "alert-triangle" },
    ],
  },
  {
    id: "q7",
    question: "What flavour profile appeals to you?",
    subtitle: "Terpenes determine taste and therapeutic effect",
    options: [
      { label: "Earthy / Pine", icon: "tree-pine" },
      { label: "Sweet / Fruity", icon: "cherry" },
      { label: "Diesel / Gas", icon: "flame" },
      { label: "Citrus", icon: "citrus" },
    ],
  },
  {
    id: "q8",
    question: "What's your preferred method?",
    subtitle: "Different methods deliver different experiences",
    options: [
      { label: "Flower", icon: "flower-2" },
      { label: "Vaporizer", icon: "wind" },
      { label: "Edibles", icon: "cookie" },
      { label: "Concentrates", icon: "flask-conical" },
    ],
  },
  {
    id: "q9",
    question: "Do you need physical relief?",
    subtitle: "Important for matching body-focused strains",
    options: [
      { label: "Muscle", icon: "dumbbell" },
      { label: "Joint", icon: "bone" },
      { label: "Nausea", icon: "pill" },
      { label: "None", icon: "check" },
    ],
  },
  {
    id: "q10",
    question: "How important is visual appeal?",
    subtitle: "Some people appreciate the aesthetics",
    options: [
      { label: "Very", icon: "eye" },
      { label: "Somewhat", icon: "scan-eye" },
      { label: "Effects Only", icon: "target" },
    ],
  },
  {
    id: "q11",
    question: "How long should the effect last?",
    subtitle: "Duration varies widely by strain",
    options: [
      { label: "Short", icon: "timer" },
      { label: "Medium", icon: "clock" },
      { label: "Long", icon: "hourglass" },
    ],
  },
  {
    id: "q12",
    question: "Where will you mostly consume?",
    subtitle: "Setting influences the ideal strain",
    options: [
      { label: "Social", icon: "users" },
      { label: "Outdoor", icon: "mountain" },
      { label: "Home", icon: "home" },
      { label: "Work", icon: "briefcase" },
    ],
  },
  {
    id: "q13",
    question: "Do you want a body stone?",
    subtitle: "From functional to full relaxation",
    options: [
      { label: "Yes", icon: "armchair" },
      { label: "No", icon: "person-standing" },
      { label: "Balanced", icon: "scale" },
    ],
  },
  {
    id: "q14",
    question: "How sensitive are you to strong aromas?",
    subtitle: "Some strains have a stronger scent profile",
    options: [
      { label: "Low-odor", icon: "wind" },
      { label: "Love the skunk", icon: "sparkles" },
    ],
  },
  {
    id: "q15",
    question: "What's your current state of mind?",
    subtitle: "Let's match your energy right now",
    options: [
      { label: "Stressed", icon: "cloud-lightning" },
      { label: "Bored", icon: "meh" },
      { label: "Sore", icon: "thermometer" },
      { label: "Adventurous", icon: "compass" },
    ],
  },
];
