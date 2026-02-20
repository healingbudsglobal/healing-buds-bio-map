import { useState } from "react";
import { surveyQuestions } from "@/data/surveyQuestions";
import { ChevronLeft } from "lucide-react";
import healingBudsLogo from "@/assets/healing-buds-logo.svg";

interface SurveyFlowProps {
  onComplete: (answers: Record<string, string>) => void;
}

const SurveyFlow = ({ onComplete }: SurveyFlowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = surveyQuestions[currentIndex];
  const progress = ((currentIndex) / surveyQuestions.length) * 100;

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (currentIndex < surveyQuestions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 250);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="animate-fade-in relative z-10 flex w-full max-w-lg flex-col px-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <img
          src={healingBudsLogo}
          alt="Healing Buds"
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[hsl(var(--accent-green))]">
            {currentIndex + 1}
          </span>
          <span className="text-xs text-muted-foreground">
            / {surveyQuestions.length}
          </span>
        </div>
      </div>

      {/* Progress bar — lime gradient */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full gradient-lime transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div key={question.id} className="animate-slide-up glass-card rounded-2xl p-6 shadow-elegant">
        <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl mb-1">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="mb-6 text-sm text-muted-foreground">{question.subtitle}</p>
        )}

        <div className="flex flex-col gap-2.5">
          {question.options.map((option, i) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="group w-full rounded-xl border border-border bg-[hsl(var(--surface))] px-4 py-3.5 text-left text-sm font-medium text-foreground transition-all duration-200 hover:border-[hsl(var(--accent-green)_/_0.5)] hover:bg-[hsl(var(--accent-green)_/_0.06)] hover:shadow-sm active:scale-[0.98] sm:text-base"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border text-xs font-bold text-muted-foreground transition-all group-hover:border-[hsl(var(--accent-green)_/_0.5)] group-hover:text-[hsl(var(--accent-green))] group-hover:bg-[hsl(var(--accent-green)_/_0.1)]">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </span>
            </button>
          ))}
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
