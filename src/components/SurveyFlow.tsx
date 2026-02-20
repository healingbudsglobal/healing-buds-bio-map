import { useState } from "react";
import { surveyQuestions } from "@/data/surveyQuestions";
import { Leaf } from "lucide-react";

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
    <div className="animate-fade-in flex w-full max-w-lg flex-col px-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="font-display text-sm font-bold text-primary">Healing Buds</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1} of {surveyQuestions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div key={question.id} className="animate-slide-up">
        <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl mb-1">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="mb-6 text-sm text-muted-foreground">{question.subtitle}</p>
        )}

        <div className="flex flex-col gap-2.5">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-left text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-secondary active:scale-[0.98] sm:text-base"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Back button */}
      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default SurveyFlow;
