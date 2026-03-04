import hbLogoJar from "@/assets/hb-logo-jar.png";

const LoadingScreen = () => {
  return (
    <div className="animate-fade-in relative z-10 flex flex-col items-center justify-center px-6 text-center">
      {/* Glow orb */}
      <div className="pointer-events-none absolute">
        <div className="h-48 w-48 rounded-full bg-[hsl(var(--brand-gold))] opacity-[0.06] blur-[80px]" />
      </div>

      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="h-24 w-24 rounded-full border border-border" />
        {/* Spinning ring 1 — gold */}
        <div
          className="absolute inset-0 h-24 w-24 rounded-full border-2 border-[hsl(var(--brand-gold))] border-t-transparent"
          style={{ animation: "spin 1.2s linear infinite" }}
        />
        {/* Spinning ring 2 — teal */}
        <div
          className="absolute inset-1.5 h-[84px] w-[84px] rounded-full border border-[hsl(var(--accent-green)_/_0.3)] border-b-transparent"
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

      <h2 className="font-display text-2xl font-bold tracking-[0.02em] text-foreground mb-2 text-glow">
      Finding Your Match...
    </h2>
    <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
      Matching your profile to our strains
    </p>

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
    </div>
  );
};

export default LoadingScreen;
