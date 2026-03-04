import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Floating ambient particles that persist across screens.
 * Creates a cinematic depth layer behind all content.
 */
const AmbientParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      opacity: 0.08 + Math.random() * 0.15,
      color: i % 3 === 0 ? "var(--brand-gold)" : i % 3 === 1 ? "var(--primary)" : "var(--accent-green)",
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Layered radial glows for depth */}
      <div className="absolute top-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-[hsl(var(--brand-gold)_/_0.03)] blur-[120px] animate-float" />
      <div className="absolute bottom-[15%] right-[10%] h-[400px] w-[400px] rounded-full bg-[hsl(var(--primary)_/_0.04)] blur-[100px]" style={{ animation: "orbFloat 20s ease-in-out infinite reverse" }} />
      <div className="absolute top-[60%] left-[60%] h-[300px] w-[300px] rounded-full bg-[hsl(var(--accent-green)_/_0.02)] blur-[80px]" style={{ animation: "orbFloat 25s ease-in-out infinite" }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `hsl(${p.color})`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -80, -30, -120, 0],
            x: [0, 20, -15, 10, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.2, p.opacity],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal scan line — subtle */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-gold)_/_0.06)] to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default AmbientParticles;
