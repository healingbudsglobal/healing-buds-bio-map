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
const getIconColor = (_questionId: string, optionLabel: string): string => {
  const calmOptions = ["Relaxation", "Sleep Support", "Night", "Sedation", "Stressed", "Sore", "Heavy & Sedated", "Warm & Relaxed", "Chronic Pain", "Insomnia", "Solo"];
  const activeOptions = ["Creativity & Focus", "Morning", "Functional", "Euphoric", "Adventurous", "Bored", "Light & Functional", "Social", "Daily"];
  if (calmOptions.includes(optionLabel)) return "bg-[hsl(var(--deep-teal)_/_0.2)] text-[hsl(var(--deep-teal))]";
  if (activeOptions.includes(optionLabel)) return "bg-[hsl(var(--accent-green)_/_0.15)] text-[hsl(var(--accent-green))]";
  return "bg-[hsl(var(--primary)_/_0.12)] text-primary";
};

const MIDPOINT = Math.floor(surveyQuestions.length / 2);

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
        if (currentIndex === MIDPOINT - 1) {
          setShowMotivation(true);
          setTimeout(() => {
            setShowMotivation(false);
            setCurrentIndex(nextIndex);
          }, 1400);
        } else {
          setCurrentIndex(nextIndex);
        }
      } else {
        onComplete(newAnswers);
      }
    }, 300);
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

  const cardVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.92,
      rotateY: d > 0 ? 8 : -8,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
      rotateY: d > 0 ? -5 : 5,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="relative z-10 flex w-full max-w-lg flex-col px-5" style={{ perspective: "1200px" }}>
      <LeafProgress
        progress={progress}
        currentStep={currentIndex + 1}
        totalSteps={surveyQuestions.length}
      />

      {/* Header — logo + step counter */}
      <div className="mb-6 flex items-center justify-between pt-4">
        <img
          src={hbLogoWhite}
          alt="Healing Buds"
          className="h-7 w-auto opacity-80"
        />
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium text-muted-foreground tabular-nums"
        >
          {currentIndex + 1}
          <span className="text-muted-foreground/40"> / {surveyQuestions.length}</span>
        </motion.span>
      </div>

      {/* Motivational midpoint flash */}
      <AnimatePresence>
        {showMotivation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--accent-green)_/_0.12)] border border-[hsl(var(--accent-green)_/_0.25)]"
              >
                <span className="text-2xl">🌿</span>
              </motion.div>
              <p className="font-display text-xl font-bold text-[hsl(var(--accent-green))]">
                Halfway there!
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">Your profile is taking shape</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question card */}
      {!showMotivation && (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl"
          >
            {/* Card with layered depth */}
            <div className="relative glass-card-elevated rounded-2xl p-6 sm:p-8">
              {/* Botanical accent in corner */}
              

              {/* Green-to-gold accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60" style={{ background: 'linear-gradient(90deg, hsl(var(--accent-green)), hsl(var(--brand-gold)))' }} />

              {/* Question number pill */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent-green)_/_0.08)] border border-[hsl(var(--accent-green)_/_0.15)] px-3 py-1"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-green))] animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--accent-green))]">
                  Question {currentIndex + 1}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
                className="font-display text-xl font-bold tracking-[0.02em] text-foreground sm:text-2xl mb-1 relative z-10"
              >
                {question.question}
              </motion.h2>
              {question.subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 text-sm text-muted-foreground"
                >
                  {question.subtitle}
                </motion.p>
              )}

              <div className="flex flex-col gap-2.5">
                {question.options.map((option, i) => {
                  const isSelected = selectedOption === option.label;
                  const iconColorClass = getIconColor(question.id, option.label);
                  return (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, x: -16, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => handleSelect(option.label)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className={`group w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium text-foreground transition-all duration-200 sm:text-base min-h-[52px] ${
                        isSelected
                          ? 'border-[hsl(var(--brand-gold))] bg-[hsl(var(--brand-gold)_/_0.12)] shadow-[var(--shadow-glow-gold)]'
                          : 'border-[hsl(170_8%_25%)] bg-[hsl(var(--surface))] hover:border-[hsl(var(--brand-gold)_/_0.5)] hover:bg-[hsl(var(--brand-gold)_/_0.06)]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-[hsl(var(--brand-gold)_/_0.2)] text-[hsl(var(--brand-gold))] scale-110'
                            : `${iconColorClass} group-hover:scale-105`
                        }`}>
                          {option.icon ? getIcon(option.icon) : String.fromCharCode(65 + i)}
                        </span>
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                          {option.label}
                        </span>
                        {/* Selection indicator */}
                        <motion.span
                          className="ml-auto"
                          initial={false}
                          animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.5 }}
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--brand-gold))]">
                            <svg className="h-3 w-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        </motion.span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Back button — thumb zone */}
      {currentIndex > 0 && !showMotivation && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleBack}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 flex items-center gap-1.5 self-start text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[48px] group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </motion.button>
      )}
    </div>
  );
};

export default SurveyFlow;
