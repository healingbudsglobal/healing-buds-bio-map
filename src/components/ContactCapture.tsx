import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, User, Phone, Lock } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

interface ContactCaptureProps {
  onSubmit: (name: string, whatsapp: string) => void;
  onSkip: () => void;
  strainName?: string;
  userEmail?: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const ContactCapture = ({ onSubmit, onSkip, strainName, userEmail }: ContactCaptureProps) => {
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-sm w-full"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <img src={hbLogoWhite} alt="Healing Buds" className="h-10 w-auto" />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-display text-2xl font-bold tracking-[0.02em] text-foreground sm:text-3xl mb-2"
      >
        Your Clinical Profile Is <span className="text-[hsl(var(--brand-gold))]">Ready</span>
      </motion.h2>

      {/* Blurred strain teaser — green border */}
      {strainName && (
        <motion.div
          variants={itemVariants}
          className="mb-4 w-full rounded-xl border border-[hsl(var(--accent-green)_/_0.3)] bg-[hsl(175_6%_16%)] p-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 h-8 w-8 rounded-full border border-[hsl(var(--accent-green)_/_0.15)] scale-150" />
              <Lock className="h-4 w-4 text-[hsl(var(--accent-green))] relative z-10" />
            </motion.div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Top Match</span>
          </div>
          <p className="mt-2 font-display text-lg font-bold text-foreground blur-[6px] select-none">
            {strainName}
          </p>
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--surface-elevated))] via-transparent to-transparent" />
        </motion.div>
      )}

      <motion.p
        variants={itemVariants}
        className="mb-6 text-sm text-muted-foreground leading-relaxed max-w-xs"
      >
        Where should we send your clinical profile?
      </motion.p>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 glass-card-elevated rounded-2xl p-5 relative overflow-hidden"
      >
        {/* Green-to-gold shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, hsl(var(--accent-green)), hsl(var(--brand-gold)))' }} />

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

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 animate-pulse-glow flex items-center justify-center gap-2 min-h-[52px]"
        >
          See My Recommendation
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>

        <motion.button
          type="button"
          onClick={onSkip}
          whileHover={{ x: 4 }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1 min-h-[44px] px-4"
        >
          Just send it to my email →
        </motion.button>

        {userEmail && (
          <p className="text-[11px] text-muted-foreground mt-1">
            Your results are also sent to <span className="text-foreground">{userEmail}</span>
          </p>
        )}
      </motion.form>

      {/* POPIA — green tint */}
      <motion.div
        variants={itemVariants}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent-green)_/_0.2)] bg-[hsl(var(--accent-green)_/_0.04)] px-4 py-2 text-xs text-muted-foreground"
      >
        <Shield className="h-3.5 w-3.5 text-[hsl(var(--accent-green))]" />
        <span>POPIA Compliant · Secure medical data</span>
      </motion.div>
    </motion.div>
  );
};

export default ContactCapture;
