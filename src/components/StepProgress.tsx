import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepProgressProps {
  currentStep: number; // 0-indexed
  totalSteps?: number;
  labels?: string[];
}

const defaultLabels = ["Sign Up", "Verify", "Profile", "Details", "Your Match"];

const StepProgress = ({
  currentStep,
  totalSteps = 5,
  labels = defaultLabels,
}: StepProgressProps) => {
  return (
    <div className="flex items-center justify-center gap-1 w-full max-w-xs mx-auto">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isComplete = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={i} className="flex items-center gap-1 flex-1 last:flex-none">
            {/* Step dot */}
            <div className="flex flex-col items-center gap-1.5 relative">
              <motion.div
                className={`relative flex items-center justify-center rounded-full transition-colors duration-300 ${
                  isComplete
                    ? "h-5 w-5 bg-[hsl(var(--accent-green))]"
                    : isActive
                    ? "h-5 w-5 border-2 border-[hsl(var(--accent-green))] bg-[hsl(var(--accent-green)_/_0.15)]"
                    : "h-4 w-4 border border-[hsl(var(--accent-green)_/_0.25)] bg-[hsl(180_8%_7%_/_0.6)]"
                }`}
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
              >
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Check className="h-3 w-3 text-[hsl(var(--primary-green))]" strokeWidth={3} />
                  </motion.div>
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[hsl(var(--accent-green)_/_0.3)]"
                    animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] leading-none whitespace-nowrap transition-colors duration-300 ${
                  isComplete
                    ? "text-[hsl(var(--accent-green))]"
                    : isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground/60"
                }`}
              >
                {labels[i]}
              </span>
            </div>

            {/* Connector line */}
            {i < totalSteps - 1 && (
              <div className="flex-1 h-[1.5px] rounded-full bg-[hsl(var(--accent-green)_/_0.12)] relative overflow-hidden mb-5">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[hsl(var(--accent-green))]"
                  initial={{ width: "0%" }}
                  animate={{ width: isComplete ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
