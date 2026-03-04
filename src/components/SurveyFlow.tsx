import { useState, lazy, Suspense } from "react";
import { surveyQuestions } from "@/data/surveyQuestions";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";
import LeafProgress from "@/components/LeafProgress";

interface SurveyFlowProps {
  onComplete: (answers: Record<string, string>) => void;
}

const SurveyFlow = ({ onComplete }: SurveyFlowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

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
        setCurrentIndex(currentIndex + 1);
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

      {/* Header */}
      <div className="mb-8 flex items-center justify-between pt-4">
        <img
          src={hbLogoWhite}
          alt="Healing Buds"
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-[hsl(var(--brand-gold))]">
            Step {currentIndex + 1}
          </span>
          <span className="text-xs text-muted-foreground">
            of {surveyQuestions.length}
          </span>
        </div>
      </div>

      {/* Question card with AnimatePresence */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={question.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card-elevated rounded-2xl p-6 sm:p-8"
        >
          <h2 className="font-display text-xl font-bold tracking-[0.02em] text-foreground sm:text-2xl mb-1">
            {question.question}
          </h2>
          {question.subtitle && (
            <p className="mb-6 text-sm text-muted-foreground">{question.subtitle}</p>
          )}

          <div className="flex flex-col gap-2.5">
            {question.options.map((option, i) => {
              const isSelected = selectedOption === option.label;
              return (
                <motion.button
                  key={option.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => handleSelect(option.label)}
                  className={`group w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium text-foreground transition-all duration-200 sm:text-base active:scale-[0.98] ${
                    isSelected
                      ? 'border-[hsl(var(--brand-gold))] bg-[hsl(var(--brand-gold)_/_0.1)] scale-[1.02]'
                      : 'border-border bg-[hsl(var(--surface))] hover:border-[hsl(var(--brand-gold)_/_0.5)] hover:bg-[hsl(var(--brand-gold)_/_0.06)] hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all ${
                      isSelected
                        ? 'border-[hsl(var(--brand-gold))] text-[hsl(var(--brand-gold))] bg-[hsl(var(--brand-gold)_/_0.15)]'
                        : 'border-border text-muted-foreground group-hover:border-[hsl(var(--brand-gold)_/_0.5)] group-hover:text-[hsl(var(--brand-gold-light))] group-hover:bg-[hsl(var(--brand-gold)_/_0.1)]'
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

      {/* Back button */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBack}
          className="mt-6 flex items-center gap-1.5 self-start text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>
      )}
    </div>
  );
};

export default SurveyFlow;
