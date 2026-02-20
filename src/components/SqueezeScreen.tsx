import { useState } from "react";
import { Leaf } from "lucide-react";

interface SqueezeScreenProps {
  onSubmit: (email: string) => void;
}

const SqueezeScreen = ({ onSubmit }: SqueezeScreenProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
    <div className="animate-fade-in flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 flex items-center gap-2">
        <Leaf className="h-5 w-5 text-primary" />
        <span className="font-display text-lg font-bold tracking-wide text-primary">
          Healing Buds
        </span>
      </div>

      <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl text-glow mb-4">
        Find Your Perfect Strain
        <br />
        <span className="text-primary">in 60 Seconds</span>
      </h1>

      <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
        No guesswork. Our Precision Bio-Mapping Survey matches your vibe,
        tolerance, and biology to the ideal cannabis strain.
      </p>

      <div className="mb-8 flex flex-col items-start gap-3 text-sm text-secondary-foreground sm:text-base">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">✓</span>
          Answer 15 simple questions
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">✓</span>
          Get personalised strain match from live inventory
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">✓</span>
          Results delivered straight to your inbox
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          required
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3.5 font-display font-semibold text-primary-foreground transition-all hover:brightness-110 animate-pulse-glow"
        >
          Start My Bio-Mapping →
        </button>
      </form>

      <p className="mt-4 text-xs text-muted-foreground">
        We respect your privacy. No spam, ever.
      </p>
    </div>
  );
};

export default SqueezeScreen;
