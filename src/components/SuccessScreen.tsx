import { CheckCircle, Mail, RotateCcw, ExternalLink, Leaf, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import BotanicalAccent from "@/components/BotanicalAccent";
import type { StrainMatch } from "@/lib/strainMatcher";

const strainTypeConfig = {
  indica: { label: "Indica", className: "bg-primary/15 text-primary border-primary/25" },
  sativa: { label: "Sativa", className: "bg-[hsl(var(--brand-gold)_/_0.15)] text-[hsl(var(--brand-gold))] border-[hsl(var(--brand-gold)_/_0.25)]" },
  hybrid: { label: "Hybrid", className: "bg-accent/15 text-accent border-accent/25" },
};

interface SuccessScreenProps {
  result: StrainMatch | null;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const SuccessScreen = ({ result }: SuccessScreenProps) => {
  const strain = result?.strain;

  const handleShare = async () => {
    const text = `I just got matched with ${strain?.name} on Healing Buds! 🌿`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Strain Match", text, url: window.location.href });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text + " " + window.location.href);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-md w-full"
    >
      {/* Gold confetti particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[hsl(var(--brand-gold))]"
            style={{
              width: i % 2 === 0 ? 8 : 5,
              height: i % 2 === 0 ? 8 : 5,
              left: `${10 + i * 13}%`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -150, opacity: [0, 1, 0], scale: [1, 1.2, 0.3] }}
            transition={{ duration: 2.5, delay: i * 0.15, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Success icon */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--brand-gold)_/_0.1)] border border-[hsl(var(--brand-gold)_/_0.25)] shadow-[var(--shadow-glow-gold)]"
        >
          <CheckCircle className="h-10 w-10 text-[hsl(var(--brand-gold))]" />
        </motion.div>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-display text-2xl font-extrabold tracking-[0.02em] text-foreground sm:text-3xl mb-2 text-glow"
      >
        Your Recommendation Is Ready
      </motion.h2>

      {strain && (
        <>
          {/* Strain card */}
          <motion.div
            variants={itemVariants}
            className="mt-4 w-full rounded-2xl border border-[hsl(170_8%_25%)] bg-[hsl(175_6%_16%)] p-5 text-left shadow-elegant relative overflow-hidden"
          >
            <BotanicalAccent variant="card" className="absolute -right-4 -bottom-4 rotate-12" />

            <div className="flex items-start justify-between mb-3 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="h-4 w-4 text-[hsl(var(--brand-gold))]" />
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                    Your Top Match
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {strain.name}
                </h3>
                {strain.type && (
                  <Badge className={`mt-1 text-[10px] uppercase tracking-wider border ${strainTypeConfig[strain.type].className}`}>
                    {strainTypeConfig[strain.type].label}
                  </Badge>
                )}
              </div>
              <motion.div
                className="flex flex-col items-end gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 250 }}
              >
                <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">
                  {result.compatibility}%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Match
                </span>
              </motion.div>
            </div>

            {/* THC / CBD */}
            <motion.div
              className="flex gap-3 mb-3 relative z-10"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="rounded-lg border border-border bg-[hsl(var(--surface))] px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">THC </span>
                <span className="font-bold text-foreground">{strain.thc}%</span>
              </div>
              <div className="rounded-lg border border-border bg-[hsl(var(--surface))] px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">CBD </span>
                <span className="font-bold text-foreground">{strain.cbd}%</span>
              </div>
            </motion.div>

            {/* Effects */}
            <motion.div
              className="mb-2 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Effects</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {strain.effects.map((e, i) => (
                  <motion.div
                    key={e}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 + i * 0.05 }}
                  >
                    <Badge variant="secondary" className="text-xs bg-[hsl(var(--brand-gold)_/_0.1)] text-[hsl(var(--brand-gold))] border-[hsl(var(--brand-gold)_/_0.2)]">
                      {e}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Flavours */}
            <motion.div
              className="mb-3 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Flavours</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {strain.flavours.map((f) => (
                  <Badge key={f} variant="outline" className="text-xs">
                    {f}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Price + availability */}
            <motion.div
              className="flex items-center justify-between relative z-10 pt-2 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              <span className="text-lg font-bold text-foreground">{strain.price}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Limited availability
              </span>
            </motion.div>
          </motion.div>

          {/* Shop CTA */}
          <motion.a
            variants={itemVariants}
            href={strain.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 flex items-center justify-center gap-2 min-h-[52px] animate-pulse-glow"
          >
            Order This Strain
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          {/* Share + Email row */}
          <motion.div
            variants={itemVariants}
            className="mt-3 flex w-full gap-3"
          >
            <a
              href="mailto:info@healingbuds.co.za?subject=Strain%20Recommendation%20Query"
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] py-3 text-sm font-medium text-foreground hover:bg-[hsl(var(--brand-gold)_/_0.08)] transition-all min-h-[48px]"
            >
              <Mail className="h-4 w-4 text-[hsl(var(--brand-gold))]" />
              Questions? Email Us
            </a>
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] px-4 py-3 text-sm font-medium text-foreground hover:bg-[hsl(var(--brand-gold)_/_0.08)] transition-all min-h-[48px]"
            >
              <Share2 className="h-4 w-4 text-[hsl(var(--brand-gold))]" />
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Email note */}
      <motion.div
        variants={itemVariants}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-[hsl(var(--surface-elevated))] px-4 py-2 text-xs text-muted-foreground"
      >
        <Mail className="h-3.5 w-3.5 text-[hsl(var(--brand-gold))]" />
        Results also sent to your inbox
      </motion.div>

      {/* Back */}
      <motion.button
        variants={itemVariants}
        onClick={() => window.location.reload()}
        whileHover={{ x: -3 }}
        className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors min-h-[48px]"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Start Over
      </motion.button>
    </motion.div>
  );
};

export default SuccessScreen;
