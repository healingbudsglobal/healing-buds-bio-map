import healingBudsLogo from "@/assets/healing-buds-logo.svg";

const LoadingScreen = () => {
  return (
    <div className="animate-fade-in relative z-10 flex flex-col items-center justify-center px-6 text-center">
      {/* Glow orb behind spinner */}
      <div className="pointer-events-none absolute">
        <div className="h-40 w-40 rounded-full bg-[hsl(var(--accent-green))] opacity-[0.06] blur-[60px]" />
      </div>

      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="h-20 w-20 rounded-full border border-border" />
        {/* Spinning ring */}
        <div
          className="absolute inset-0 h-20 w-20 rounded-full border-2 border-[hsl(var(--accent-green))] border-t-transparent"
          style={{ animation: "spin 1.2s linear infinite" }}
        />
        {/* Second spinning ring */}
        <div
          className="absolute inset-1 h-[72px] w-[72px] rounded-full border border-[hsl(var(--lime-green)_/_0.3)] border-b-transparent"
          style={{ animation: "spin 2s linear infinite reverse" }}
        />
        {/* Center logo */}
        <span className="absolute inset-0 flex items-center justify-center">
          <img src={healingBudsLogo} alt="HB" className="h-8 w-auto opacity-80" />
        </span>
      </div>

      <h2 className="font-display text-2xl font-bold text-foreground mb-2 text-glow">
        Calculating Your Match...
      </h2>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        Cross-referencing your bio-profile with our lab-tested strain inventory
      </p>

      {/* Animated dots */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent-green))]"
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
