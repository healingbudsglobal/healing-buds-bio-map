import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, User, Phone, Lock } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

interface ContactCaptureProps {
  onSubmit: (name: string, whatsapp: string) => void;
  onSkip: () => void;
  strainName?: string;
}

const ContactCapture = ({ onSubmit, onSkip, strainName }: ContactCaptureProps) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setError("Please enter a valid WhatsApp number");
      return;
    }
    setError("");
    onSubmit(name.trim(), whatsapp.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-sm w-full"
    >
      {/* Logo */}
      <div className="mb-6">
        <img src={hbLogoWhite} alt="Healing Buds" className="h-10 w-auto" />
      </div>

      {/* Ambient glow orbs */}
      <div className="ambient-glow" />

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display text-2xl font-bold tracking-[0.02em] text-foreground sm:text-3xl mb-2"
      >
        Your Clinical Profile Is <span className="text-[hsl(var(--brand-gold))]">Ready</span>
      </motion.h2>

      {/* Blurred strain teaser */}
      {strainName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-4 w-full rounded-xl border border-[hsl(var(--brand-gold)_/_0.3)] bg-[hsl(175_6%_16%)] p-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 h-8 w-8 rounded-full border border-[hsl(var(--brand-gold)_/_0.15)] scale-150" />
              <Lock className="h-4 w-4 text-[hsl(var(--brand-gold))] relative z-10" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Top Match</span>
          </div>
          <p className="mt-2 font-display text-lg font-bold text-foreground blur-[6px] select-none">
            {strainName}
          </p>
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--surface-elevated))] via-transparent to-transparent" />
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 text-sm text-muted-foreground leading-relaxed max-w-xs"
      >
        Enter your details to unlock your full strain report and receive future updates.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3"
      >
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] pl-11 pr-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all text-[16px]"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="tel"
            placeholder="WhatsApp number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] pl-11 pr-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all text-[16px]"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          className="group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow flex items-center justify-center gap-2 min-h-[52px]"
        >
          Unlock My Recommendation
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors mt-1"
        >
          Skip for now
        </button>
      </motion.form>

      {/* POPIA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand-gold)_/_0.15)] bg-[hsl(var(--brand-gold)_/_0.04)] px-4 py-2 text-xs text-muted-foreground"
      >
        <Shield className="h-3.5 w-3.5 text-[hsl(var(--brand-gold))]" />
        <span>POPIA Compliant · Secure medical data</span>
      </motion.div>
    </motion.div>
  );
};

export default ContactCapture;
