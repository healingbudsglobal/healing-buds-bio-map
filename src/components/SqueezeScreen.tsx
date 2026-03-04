import { useState } from "react";
import { ArrowRight, Shield, FlaskConical, Microscope } from "lucide-react";
import { motion } from "framer-motion";
import { validateEmail } from "@/lib/emailValidation";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center px-5 text-center"
    >
      {/* Ambient glow orbs — replace old hero circle */}
      <div className="ambient-glow" />

      {/* Radial spotlight behind form */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(40_85%_55%_/_0.04)_0%,transparent_70%)]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <img src={hbLogoWhite} alt="Healing Buds" className="h-14 w-auto sm:h-16" />
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-5 inline-flex items-center gap-4 rounded-full border border-border bg-[hsl(var(--surface-elevated))] px-5 py-2"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <FlaskConical className="h-3.5 w-3.5 text-[hsl(var(--brand-gold))]" />
          EU GMP Certified
        </span>
        <span className="h-3 w-px bg-border" />
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Microscope className="h-3.5 w-3.5 text-[hsl(var(--brand-gold))]" />
          Lab Tested
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="font-display text-3xl font-extrabold leading-[1.1] tracking-[0.02em] text-foreground sm:text-4xl md:text-5xl mb-2"
      >
        Your Personalised
        <br />
        <span className="text-[hsl(var(--brand-gold))]">Strain Prescription</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="mb-7 max-w-xs text-sm leading-relaxed text-muted-foreground"
      >
        90-second guided consultation · clinically informed
      </motion.p>

      {/* Form — glass card wrapper */}
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-3 glass-card-elevated rounded-2xl p-5"
      >
        <div className={`relative rounded-2xl transition-all duration-300 ${focused ? 'shadow-[var(--shadow-glow-gold)]' : ''}`}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all text-[16px]"
            required
          />
        </div>

        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] px-5 py-4 text-[16px] text-foreground focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all h-auto [&>span]:text-left">
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
          className="group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow flex items-center justify-center gap-2 min-h-[52px]"
        >
          Start Clinical Assessment
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-[11px] text-muted-foreground mt-0.5">
          90-second clinical assessment
        </p>
      </motion.form>

      {/* POPIA trust badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand-gold)_/_0.15)] bg-[hsl(var(--brand-gold)_/_0.04)] px-4 py-2 text-xs text-muted-foreground"
      >
        <Shield className="h-3.5 w-3.5 text-[hsl(var(--brand-gold))]" />
        <span>POPIA Compliant · Secure medical data</span>
      </motion.div>
    </motion.div>
  );
};

export default SqueezeScreen;
