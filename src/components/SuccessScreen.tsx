import { CheckCircle, Mail } from "lucide-react";
import healingBudsLogo from "@/assets/healing-buds-logo.svg";

const SuccessScreen = () => {
  return (
    <div className="animate-scale-in relative z-10 flex flex-col items-center justify-center px-6 text-center">
      {/* Glow */}
      <div className="pointer-events-none absolute">
        <div className="h-48 w-48 rounded-full bg-[hsl(var(--accent-green))] opacity-[0.06] blur-[80px]" />
      </div>

      {/* Success icon with rings */}
      <div className="relative mb-8">
        <div className="absolute inset-0 h-24 w-24 rounded-full bg-[hsl(var(--accent-green)_/_0.08)] animate-ping" style={{ animationDuration: '2s' }} />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[hsl(var(--accent-green)_/_0.1)] border border-[hsl(var(--accent-green)_/_0.2)] shadow-glow">
          <CheckCircle className="h-12 w-12 text-[hsl(var(--accent-green))]" />
        </div>
      </div>

      <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl mb-3 text-glow">
        You're All Set!
      </h2>

      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4 text-[hsl(var(--accent-green))]" />
        Check your inbox for your personalised results
      </div>

      <p className="max-w-sm text-base text-muted-foreground leading-relaxed">
        Your personalised strain match has been sent to your inbox. Our algorithm has analysed your bio-profile to find the perfect match.
      </p>

      {/* Brand footer */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <img
          src={healingBudsLogo}
          alt="Healing Buds"
          className="h-8 w-auto opacity-60"
        />
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Precision Strain Match™
        </span>
      </div>
    </div>
  );
};

export default SuccessScreen;
