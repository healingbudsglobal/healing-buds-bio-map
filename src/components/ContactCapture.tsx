import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, User, Phone } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

interface ContactCaptureProps {
  onSubmit: (name: string, whatsapp: string) => void;
  onSkip: () => void;
}

const ContactCapture = ({ onSubmit, onSkip }: ContactCaptureProps) => {
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

      {/* Glow */}
      <div className="pointer-events-none absolute">
        <div className="h-48 w-48 rounded-full bg-[hsl(var(--brand-gold))] opacity-[0.06] blur-[80px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display text-2xl font-bold tracking-[0.02em] text-foreground sm:text-3xl mb-2"
      >
        We've Mapped Your <span className="text-[hsl(var(--brand-gold))]">Results</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-sm text-muted-foreground leading-relaxed max-w-xs"
      >
        Where should we send your clinical strain profile for future updates?
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
            className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] pl-11 pr-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all text-base"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="tel"
            placeholder="WhatsApp number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] pl-11 pr-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold)_/_0.4)] focus:border-[hsl(var(--brand-gold)_/_0.5)] transition-all text-base"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          className="group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow flex items-center justify-center gap-2"
        >
          See My Recommendations
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
        >
          Skip for now
        </button>
      </motion.form>

      {/* POPIA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground"
      >
        <Shield className="h-3.5 w-3.5 text-primary" />
        <span>POPIA Compliant · Secure medical data</span>
      </motion.div>
    </motion.div>
  );
};

export default ContactCapture;
