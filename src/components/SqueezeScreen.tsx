import { useState } from "react";
import { Shield, FlaskConical, FileCheck, ArrowRight, Sparkles, Mail } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

interface SqueezeScreenProps {
  onSubmit: (email: string) => void;
}

const SqueezeScreen = ({ onSubmit }: SqueezeScreenProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    onSubmit(trimmed);
  };

  return (
    <div className="animate-fade-in relative z-10 flex flex-col items-center justify-center px-6 text-center">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2">
        <div className="h-64 w-64 rounded-full bg-[hsl(var(--accent-green))] opacity-[0.04] blur-[80px]" style={{ animation: 'orbFloat 8s ease-in-out infinite' }} />
      </div>

      {/* Logo */}
      <div className="mb-10 animate-float">
        <img src={hbLogoWhite} alt="Healing Buds" className="h-12 w-auto sm:h-14" />
      </div>

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent-green)_/_0.25)] bg-[hsl(var(--accent-green)_/_0.08)] px-5 py-2 shadow-elegant">
        <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--accent-green))]" />
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[hsl(var(--accent-green))]">
          Analysis Complete
        </span>
      </div>

      <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-[0.02em] text-foreground sm:text-4xl md:text-5xl text-glow mb-3">
        Your Strain Match
        <br />
        <span className="bg-clip-text text-transparent inline-block" style={{ backgroundImage: 'linear-gradient(135deg, hsl(164 48% 53%), hsl(84 81% 44%))' }}>
          Is Ready
        </span>
      </h1>

      <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
        Enter your email to receive your Precision Bio-Mapping Report
        and personalised strain match.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
        <div className={`relative rounded-2xl transition-all duration-300 ${focused ? 'shadow-glow' : ''}`}>
          <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] pl-12 pr-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-green)_/_0.4)] focus:border-[hsl(var(--accent-green)_/_0.5)] transition-all text-base"
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          className="group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow flex items-center justify-center gap-2"
        >
          Get My Results
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      {/* Trust badges */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
        {[
          { icon: Shield, label: "EU GMP Certified" },
          { icon: FlaskConical, label: "Lab Tested" },
          { icon: FileCheck, label: "POPIA Compliant" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded-full border border-border/50 bg-[hsl(var(--surface))] px-3.5 py-1.5">
            <Icon className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SqueezeScreen;
