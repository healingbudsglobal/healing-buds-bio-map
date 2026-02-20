export interface SurveyQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: string[];
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "q1",
    question: "What's your primary goal?",
    subtitle: "Choose the outcome that matters most to you",
    options: ["Relaxation", "Pain Relief", "Creativity/Focus", "Sleep Support"],
  },
  {
    id: "q2",
    question: "How would you describe your tolerance?",
    subtitle: "This helps us calibrate your ideal potency",
    options: ["Beginner", "Intermediate", "Advanced", "Micro-doser"],
  },
  {
    id: "q3",
    question: "When do you usually consume?",
    subtitle: "Time of day influences strain selection",
    options: ["Morning", "Afternoon", "Night"],
  },
  {
    id: "q4",
    question: "How do you feel about the munchies?",
    subtitle: "Some strains stimulate appetite more than others",
    options: ["I want them!", "Neutral", "Avoid"],
  },
  {
    id: "q5",
    question: "What kind of head effect do you prefer?",
    subtitle: "This helps match your cerebral sweet spot",
    options: ["Functional", "Euphoric", "Deep", "Sedation"],
  },
  {
    id: "q6",
    question: "How do you respond to THC-related anxiety?",
    subtitle: "Some people are more sensitive than others",
    options: ["Never", "Rarely", "Occasionally", "Often"],
  },
  {
    id: "q7",
    question: "What flavour profile appeals to you?",
    subtitle: "Terpenes determine taste and effect",
    options: ["Earthy/Pine", "Sweet/Fruity", "Diesel/Gas", "Citrus"],
  },
  {
    id: "q8",
    question: "What's your preferred method?",
    subtitle: "Different methods hit differently",
    options: ["Flower", "Vaporizer", "Edibles", "Concentrates"],
  },
  {
    id: "q9",
    question: "Do you need physical relief?",
    subtitle: "Important for matching body-focused strains",
    options: ["Muscle", "Joint", "Nausea", "None"],
  },
  {
    id: "q10",
    question: "How important is bag appeal?",
    subtitle: "Some people eat with their eyes first 👀",
    options: ["Very", "Somewhat", "Effects Only"],
  },
  {
    id: "q11",
    question: "How long do you want the effect to last?",
    subtitle: "Duration varies widely by strain",
    options: ["Short", "Medium", "Long"],
  },
  {
    id: "q12",
    question: "Where will you mostly consume?",
    subtitle: "Setting influences the ideal strain",
    options: ["Social", "Outdoor", "Home", "Work"],
  },
  {
    id: "q13",
    question: "Do you want a body stone?",
    subtitle: "From functional to full couch-lock",
    options: ["Yes", "No", "Balanced"],
  },
  {
    id: "q14",
    question: "How sensitive are you to strong smells?",
    subtitle: "Some strains are louder than others",
    options: ["Low-odor", "Love the skunk"],
  },
  {
    id: "q15",
    question: "What's your current vibe?",
    subtitle: "Let's match your energy right now",
    options: ["Stressed", "Bored", "Sore", "Adventurous"],
  },
];
