import { useState } from "react";
import { surveyQuestions } from "@/data/surveyQuestions";
import { ChevronLeft } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

interface SurveyFlowProps {
  onComplete: (answers: Record<string, string>) => void;
}

const SurveyFlow = ({ onComplete }: SurveyFlowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = surveyQuestions[currentIndex];
  const progress = ((currentIndex) / surveyQuestions.length) * 100;

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex < surveyQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 300);
  };

  return (
    <div className="animate-fade-in relative z-10 flex w-full max-w-lg flex-col px-6">
      {/* Fixed progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[hsl(var(--surface))]">
        <div
          className="h-full rounded-r-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(84 81% 44%), hsl(164 48% 53%))',
          }}
        />
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between pt-2">
        <img
          src={hbLogoWhite}
          alt="Healing Buds"
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-[hsl(var(--accent-green))]">
            Step {currentIndex + 1}
          </span>
          <span className="text-xs text-muted-foreground">
            of {surveyQuestions.length}
          </span>
        </div>
      </div>

      {/* Question card */}
      <div key={question.id} className="animate-slide-up glass-card-elevated rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold tracking-[0.02em] text-foreground sm:text-2xl mb-1">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="mb-6 text-sm text-muted-foreground">{question.subtitle}</p>
        )}

        <div className="flex flex-col gap-2.5">
          {question.options.map((option, i) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`group w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium text-foreground transition-all duration-200 sm:text-base active:scale-[0.98] ${
                  isSelected
                    ? 'border-[hsl(var(--lime-green))] bg-[hsl(var(--accent-green)_/_0.1)] scale-[1.02]'
                    : 'border-border bg-[hsl(var(--surface))] hover:border-[hsl(var(--lime-green)_/_0.5)] hover:bg-[hsl(var(--accent-green)_/_0.06)] hover:scale-[1.01]'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-[hsl(var(--lime-green))] text-[hsl(var(--lime-green))] bg-[hsl(var(--lime-green)_/_0.15)]'
                      : 'border-border text-muted-foreground group-hover:border-[hsl(var(--lime-green)_/_0.5)] group-hover:text-[hsl(var(--accent-green))] group-hover:bg-[hsl(var(--accent-green)_/_0.1)]'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Back button */}
      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="mt-6 flex items-center gap-1.5 self-start text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}
    </div>
  );
};

export default SurveyFlow;
