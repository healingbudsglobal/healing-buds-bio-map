import { motion } from "framer-motion";

interface LeafProgressProps {
  progress: number; // 0-100
  currentStep: number;
  totalSteps: number;
}

const LeafProgress = ({ progress, currentStep, totalSteps }: LeafProgressProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Track */}
      <div className="h-1 bg-[hsl(var(--surface))]">
        <motion.div
          className="h-full rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-gold)))',
          }}
        />
      </div>

      {/* Leaf indicator at the end of the bar */}
      <motion.div
        className="absolute top-0 flex items-center justify-center"
        initial={{ left: 0 }}
        animate={{ left: `${Math.min(progress, 97)}%` }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="mt-1.5 drop-shadow-sm"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.5-1C11.5 19 8 15.5 8 12c0-4 3-7 7-8.5C13.5 2.5 12.5 2 12 2z"
            fill="hsl(var(--brand-gold))"
            opacity="0.9"
          />
          <path
            d="M17 3.5C13 5 10 8.5 10 12c0 3 2 5.5 5 7 3-1.5 5-4.5 5-7.5 0-3.5-1.5-6-3-8z"
            fill="hsl(var(--primary))"
            opacity="0.7"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default LeafProgress;
