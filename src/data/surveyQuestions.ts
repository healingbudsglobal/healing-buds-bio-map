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
    id: "q11",
    question: "Do you have any medical conditions?",
    subtitle: "This helps us prioritise therapeutic benefits",
    options: [
      { label: "Chronic Pain", icon: "activity" },
      { label: "Anxiety", icon: "brain" },
      { label: "Insomnia", icon: "moon-star" },
      { label: "None", icon: "check" },
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
    question: "What's your preferred consumption method?",
    subtitle: "We'll pass this to your consultant for tailored advice",
    options: [
      { label: "Flower", icon: "flower" },
      { label: "Vape", icon: "wind" },
      { label: "Edible", icon: "cookie" },
      { label: "Oil", icon: "droplets" },
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
    id: "q8",
    question: "How do you want your body to feel?",
    subtitle: "Physical sensation matters as much as mental effect",
    options: [
      { label: "Light & Functional", icon: "feather" },
      { label: "Warm & Relaxed", icon: "flame" },
      { label: "Heavy & Sedated", icon: "anchor" },
      { label: "No Preference", icon: "minus" },
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
    id: "q10",
    question: "How often do you consume?",
    subtitle: "Frequency helps us gauge your tolerance level",
    options: [
      { label: "Daily", icon: "calendar-check" },
      { label: "Few times a week", icon: "calendar" },
      { label: "Weekends", icon: "sun" },
      { label: "Rarely", icon: "clock" },
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
    id: "q12",
    question: "What's your ideal session length?",
    subtitle: "Some strains hit fast and fade, others linger",
    options: [
      { label: "Quick (15-30min)", icon: "timer" },
      { label: "Medium (1-2hr)", icon: "clock" },
      { label: "Extended (3hr+)", icon: "hourglass" },
      { label: "No Preference", icon: "minus" },
    ],
  },
  {
    id: "q13",
    question: "Do you prefer to consume alone or socially?",
    subtitle: "Social strains differ from solo-session strains",
    options: [
      { label: "Solo", icon: "user" },
      { label: "Social", icon: "users" },
      { label: "Both", icon: "user-plus" },
    ],
  },
  {
    id: "q14",
    question: "How important is discretion to you?",
    subtitle: "We'll note this for your consultant's recommendation",
    options: [
      { label: "Very", icon: "eye-off" },
      { label: "Somewhat", icon: "eye" },
      { label: "Not Important", icon: "megaphone" },
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
