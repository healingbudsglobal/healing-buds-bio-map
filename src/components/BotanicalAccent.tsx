import { motion } from "framer-motion";

interface BotanicalAccentProps {
  className?: string;
  variant?: "hero" | "card" | "corner";
}

/**
 * Decorative botanical cannabis leaf SVG for brand identity.
 * Three variants: hero (large behind squeeze), card (on result card), corner (subtle in survey).
 */
const BotanicalAccent = ({ className = "", variant = "hero" }: BotanicalAccentProps) => {
  const sizes = {
    hero: "w-64 h-64 sm:w-80 sm:h-80",
    card: "w-28 h-28",
    corner: "w-16 h-16",
  };

  const opacities = {
    hero: "opacity-[0.06]",
    card: "opacity-[0.08]",
    corner: "opacity-[0.05]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`pointer-events-none ${sizes[variant]} ${opacities[variant]} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Cannabis leaf silhouette — 7-point stylized medical leaf */}
        <g transform="translate(100,195) scale(1,-1)">
          {/* Center leaflet */}
          <path
            d="M0 0 Q-8 50 -6 90 Q-3 120 0 150 Q3 120 6 90 Q8 50 0 0Z"
            fill="hsl(var(--brand-gold))"
          />
          {/* Inner left */}
          <path
            d="M0 20 Q-20 55 -35 95 Q-30 100 -20 95 Q-10 80 0 50Z"
            fill="hsl(var(--brand-gold))"
          />
          {/* Inner right */}
          <path
            d="M0 20 Q20 55 35 95 Q30 100 20 95 Q10 80 0 50Z"
            fill="hsl(var(--brand-gold))"
          />
          {/* Mid left */}
          <path
            d="M-5 35 Q-35 50 -55 80 Q-48 88 -38 82 Q-20 65 -5 50Z"
            fill="hsl(var(--brand-gold))"
          />
          {/* Mid right */}
          <path
            d="M5 35 Q35 50 55 80 Q48 88 38 82 Q20 65 5 50Z"
            fill="hsl(var(--brand-gold))"
          />
          {/* Outer left */}
          <path
            d="M-10 25 Q-45 30 -65 55 Q-58 65 -48 58 Q-28 42 -10 35Z"
            fill="hsl(var(--brand-gold))"
          />
          {/* Outer right */}
          <path
            d="M10 25 Q45 30 65 55 Q58 65 48 58 Q28 42 10 35Z"
            fill="hsl(var(--brand-gold))"
          />
          {/* Stem */}
          <rect x="-2" y="-30" width="4" height="35" rx="2" fill="hsl(var(--brand-gold))" />
        </g>
      </svg>
    </motion.div>
  );
};

export default BotanicalAccent;
