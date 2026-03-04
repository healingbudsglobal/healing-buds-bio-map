import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hbLogoJar from "@/assets/hb-logo-jar.png";

const STATUS_MESSAGES = [
  "Analysing your profile…",
  "Cross-referencing strain database…",
  "Generating your match…",
];

const LoadingScreen = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Radial glow behind spinner */}
      <div className="pointer-events-none absolute">
        <div className="h-56 w-56 rounded-full bg-[hsl(var(--brand-gold))] opacity-[0.09] blur-[80px]" />
      </div>

      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="h-24 w-24 rounded-full border border-border" />
        {/* Spinning ring 1 — gold, thicker */}
        <div
          className="absolute inset-0 h-24 w-24 rounded-full border-[3px] border-[hsl(var(--brand-gold)_/_0.8)] border-t-transparent"
          style={{ animation: "spin 1.2s linear infinite" }}
        />
        {/* Spinning ring 2 — teal */}
        <div
          className="absolute inset-1.5 h-[84px] w-[84px] rounded-full border border-primary/30 border-b-transparent"
          style={{ animation: "spin 2s linear infinite reverse" }}
        />
        {/* Spinning ring 3 */}
        <div
          className="absolute inset-3 h-[72px] w-[72px] rounded-full border border-border/50 border-l-transparent"
          style={{ animation: "spin 3s linear infinite" }}
        />
        {/* Center jar logo */}
        <span className="absolute inset-0 flex items-center justify-center">
          <img
            src={hbLogoJar}
            alt="HB"
            className="h-8 w-auto"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
        </span>
      </div>

      <h2 className="font-display text-2xl font-bold tracking-[0.02em] text-foreground mb-3 text-glow">
        Calculating Your Profile…
      </h2>

      {/* Cycling status messages */}
      <div className="h-6 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-muted-foreground absolute inset-x-0"
          >
            {STATUS_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Animated dots — gold */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--brand-gold))]"
            style={{
              animation: "dotPulse 1.4s infinite ease-in-out both",
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
