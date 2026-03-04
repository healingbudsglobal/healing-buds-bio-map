import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { validateEmail } from "@/lib/emailValidation";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";
import heroBud from "@/assets/hero-bud.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROVINCES = [
  "Western Cape",
  "Gauteng",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "N/A",
];

interface SqueezeScreenProps {
  onSubmit: (email: string, province: string) => void;
}

const SqueezeScreen = ({ onSubmit }: SqueezeScreenProps) => {
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const validation = validateEmail(trimmed);
    if (!validation.valid) {
      setError(validation.error || "Please enter a valid email address");
      return;
    }
    if (!province) {
      setError("Please select your province");
      return;
    }
    setError("");
    onSubmit(trimmed, province);
  };

  return (
    <div className="animate-fade-in relative z-10 flex flex-col items-center justify-center px-5 text-center">
      {/* Hero bud image — soft backdrop */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2">
        <img
          src={heroBud}
          alt=""
          className="h-72 w-72 rounded-full object-cover opacity-[0.12] blur-[2px] sm:h-96 sm:w-96 sm:opacity-[0.18] sm:blur-[1px]"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Logo */}
      <div className="mb-8">
        <img src={hbLogoWhite} alt="Healing Buds" className="h-14 w-auto sm:h-16" />
      </div>

      <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-[0.02em] text-foreground sm:text-4xl md:text-5xl mb-3">
        Find Your Perfect
        <br />
        <span className="text-[hsl(var(--brand-gold))]">Strain Match</span>
      </h1>

      <p className="mb-8 max-w-sm text-base leading-relaxed text-muted-foreground">
        Answer a few quick questions — we'll match you to your ideal strain.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
        <div className={`relative rounded-2xl transition-all duration-300 ${focused ? 'shadow-[var(--shadow-glow-gold)]' : ''}`}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all text-base"
            required
          />
        </div>

        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] px-5 py-4 text-base text-foreground focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all h-auto [&>span]:text-left">
            <SelectValue placeholder="Select your province" />
          </SelectTrigger>
          <SelectContent className="z-50 rounded-xl border border-border bg-card text-card-foreground shadow-lg">
            {PROVINCES.map((p) => (
              <SelectItem key={p} value={p} className="cursor-pointer">
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          className="group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow flex items-center justify-center gap-2"
        >
          Find My Strain
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
};

export default SqueezeScreen;
