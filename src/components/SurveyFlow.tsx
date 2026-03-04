import { useState } from "react";
import { surveyQuestions } from "@/data/surveyQuestions";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";
import LeafProgress from "@/components/LeafProgress";

interface SurveyFlowProps {
  onComplete: (answers: Record<string, string>) => void;
}

// Color mapping for icon backgrounds based on option intent
const getIconColor = (questionId: string, optionLabel: string): string => {
  const calmOptions = ["Relaxation", "Sleep Support", "Night", "Sedation", "Stressed", "Sore"];
  const activeOptions = ["Creativity & Focus", "Morning", "Functional", "Euphoric", "Adventurous", "Bored"];
  if (calmOptions.includes(optionLabel)) return "bg-primary/15 text-primary";
  if (activeOptions.includes(optionLabel)) return "bg-[hsl(var(--brand-gold)_/_0.15)] text-[hsl(var(--brand-gold))]";
  return "bg-muted text-muted-foreground";
};

const MIDPOINT = Math.floor(surveyQuestions.length / 2); // halfway

const SurveyFlow = ({ onComplete }: SurveyFlowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [showMotivation, setShowMotivation] = useState(false);

  const question = surveyQuestions[currentIndex];
  const progress = ((currentIndex) / surveyQuestions.length) * 100;

  const handleSelect = (optionLabel: string) => {
    setSelectedOption(optionLabel);
    const newAnswers = { ...answers, [question.id]: optionLabel };
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelectedOption(null);
      setDirection(1);
      if (currentIndex < surveyQuestions.length - 1) {
        const nextIndex = currentIndex + 1;
        // Show motivational micro-copy at midpoint
        if (currentIndex === MIDPOINT - 1) {
          setShowMotivation(true);
          setTimeout(() => {
            setShowMotivation(false);
            setCurrentIndex(nextIndex);
          }, 1200);
        } else {
          setCurrentIndex(nextIndex);
        }
      } else {
        onComplete(newAnswers);
      }
    }, 250);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getIcon = (iconName: string) => {
    const pascalName = iconName
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") as keyof typeof icons;
    const IconComponent = icons[pascalName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="relative z-10 flex w-full max-w-lg flex-col px-5">
      <LeafProgress
        progress={progress}
        currentStep={currentIndex + 1}
        totalSteps={surveyQuestions.length}
      />

      {/* Header — logo only, no step counter */}
      <div className="mb-8 flex items-center justify-center pt-4">
        <img
          src={hbLogoWhite}
          alt="Healing Buds"
          className="h-8 w-auto"
        />
      </div>

      {/* Motivational midpoint flash */}
      <AnimatePresence>
        {showMotivation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="font-display text-xl font-bold text-[hsl(var(--brand-gold))]">
                Great — halfway there! 🌿
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Your profile is taking shape</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question card with AnimatePresence */}
      {!showMotivation && (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-elevated rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Gold accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] gradient-accent opacity-60" />
            <h2 className="font-display text-xl font-bold tracking-[0.02em] text-foreground sm:text-2xl mb-1">
              {question.question}
            </h2>
            {question.subtitle && (
              <p className="mb-6 text-sm text-muted-foreground">{question.subtitle}</p>
            )}

            <div className="flex flex-col gap-2.5">
              {question.options.map((option, i) => {
                const isSelected = selectedOption === option.label;
                const iconColorClass = getIconColor(question.id, option.label);
                return (
                  <motion.button
                    key={option.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    onClick={() => handleSelect(option.label)}
                    className={`group w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium text-foreground transition-all duration-200 sm:text-base active:scale-[0.97] min-h-[52px] ${
                      isSelected
                        ? 'border-[hsl(var(--brand-gold))] bg-[hsl(var(--brand-gold)_/_0.1)] scale-[1.02] shadow-[var(--shadow-glow-gold)]'
                        : 'border-[hsl(170_8%_25%)] bg-[hsl(var(--surface))] hover:border-[hsl(var(--brand-gold)_/_0.5)] hover:bg-[hsl(var(--brand-gold)_/_0.06)] hover:scale-[1.01]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                        isSelected
                          ? 'bg-[hsl(var(--brand-gold)_/_0.2)] text-[hsl(var(--brand-gold))]'
                          : iconColorClass
                      }`}>
                        {option.icon ? getIcon(option.icon) : String.fromCharCode(65 + i)}
                      </span>
                      {option.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Back button — thumb zone */}
      {currentIndex > 0 && !showMotivation && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBack}
          className="mt-6 flex items-center gap-1.5 self-start text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[48px]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>
      )}
    </div>
  );
};

export default SurveyFlow;
