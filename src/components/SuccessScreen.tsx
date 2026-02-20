import { CheckCircle, Mail, RotateCcw } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

const SuccessScreen = () => {
  return (
    <div className="animate-scale-in relative z-10 flex flex-col items-center justify-center px-6 text-center">
      {/* Glow */}
      <div className="pointer-events-none absolute">
        <div className="h-48 w-48 rounded-full bg-[hsl(var(--accent-green))] opacity-[0.06] blur-[80px]" />
      </div>

      {/* Success icon with rings */}
      <div className="relative mb-8">
        <div className="absolute inset-0 h-24 w-24 rounded-full bg-[hsl(var(--accent-green)_/_0.08)]" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[hsl(var(--accent-green)_/_0.1)] border border-[hsl(var(--accent-green)_/_0.2)] shadow-glow">
          <CheckCircle className="h-12 w-12 text-[hsl(var(--accent-green))]" />
        </div>
      </div>

      <h2 className="font-display text-3xl font-extrabold tracking-[0.02em] text-foreground sm:text-4xl mb-3 text-glow">
        Analysis Complete.
      </h2>

      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4 text-[hsl(var(--accent-green))]" />
        Your personalized match is being prepared and sent to your inbox.
      </div>

      <p className="max-w-sm text-base text-muted-foreground leading-relaxed">
        Our algorithm has cross-referenced your bio-profile against our full lab-tested inventory to find your ideal strain.
      </p>

      {/* Back to Home */}
      <button
        onClick={() => window.location.reload()}
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-[hsl(var(--accent-green)_/_0.5)] hover:text-foreground"
      >
        <RotateCcw className="h-4 w-4" />
        Back to Home
      </button>

      {/* Brand footer */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <img
          src={hbLogoWhite}
          alt="Healing Buds"
          className="h-8 w-auto opacity-50"
        />
        <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">
          Precision Strain Match™
        </span>
      </div>
    </div>
  );
};

export default SuccessScreen;
