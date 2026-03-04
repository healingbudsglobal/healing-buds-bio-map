import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hbLogoJar from "@/assets/hb-logo-jar.png";
import heroFlower from "@/assets/hero-flower.jpg";

const STATUS_MESSAGES = [
  "Analysing your profile…",
  "Cross-referencing terpene database…",
  "Evaluating potency thresholds…",
  "Generating your match…",
];

const LoadingScreen = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgressWidth(95), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Full-bleed flower backdrop — cinematic */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.img
          src={heroFlower}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(30px) saturate(1.2)", mixBlendMode: "soft-light" }}
          animate={{ opacity: [0.08, 0.14, 0.08], scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,hsl(180_8%_7%_/_0.85)_80%)]" />
        <div className="absolute inset-0 bg-[hsl(var(--primary-green)_/_0.15)]" style={{ mixBlendMode: "overlay" }} />
      </div>

      {/* Green radial glow */}
      <div className="pointer-events-none absolute">
        <motion.div
          className="h-56 w-56 rounded-full bg-[hsl(var(--accent-green))]"
          animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(80px)" }}
        />
      </div>

      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-24 w-24 rounded-full border border-border" />
        {/* Spinning ring 1 — gold */}
        <div
          className="absolute inset-0 h-24 w-24 rounded-full border-[3px] border-[hsl(var(--brand-gold)_/_0.8)] border-t-transparent"
          style={{ animation: "spin 1.2s linear infinite" }}
        />
        {/* Spinning ring 2 — accent green */}
        <div
          className="absolute inset-1.5 h-[84px] w-[84px] rounded-full border border-[hsl(var(--accent-green)_/_0.5)] border-b-transparent"
          style={{ animation: "spin 2s linear infinite reverse" }}
        />
        {/* Spinning ring 3 — deep teal */}
        <div
          className="absolute inset-3 h-[72px] w-[72px] rounded-full border border-[hsl(var(--deep-teal)_/_0.3)] border-l-transparent"
          style={{ animation: "spin 3s linear infinite" }}
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <motion.img
            src={hbLogoJar}
            alt="HB"
            className="h-8 w-auto"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      <h2 className="font-display text-2xl font-bold tracking-[0.02em] text-foreground mb-3 text-glow">
        Calculating Your Profile…
      </h2>

      <div className="h-6 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-muted-foreground absolute inset-x-0"
          >
            {STATUS_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-1 rounded-full bg-[hsl(var(--surface-elevated))] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[3000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: `${progressWidth}%`,
            background: "linear-gradient(90deg, hsl(var(--primary-green)), hsl(var(--accent-green)), hsl(var(--brand-gold)))",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
