import { CheckCircle, Mail, RotateCcw, ExternalLink, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { StrainMatch } from "@/lib/strainMatcher";

interface SuccessScreenProps {
  result: StrainMatch | null;
}

const SuccessScreen = ({ result }: SuccessScreenProps) => {
  const strain = result?.strain;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-md w-full"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute">
        <div className="h-48 w-48 rounded-full bg-[hsl(var(--brand-gold))] opacity-[0.06] blur-[80px]" />
      </div>

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative mb-6"
      >
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--brand-gold)_/_0.1)] border border-[hsl(var(--brand-gold)_/_0.25)] shadow-[var(--shadow-glow-gold)]">
          <CheckCircle className="h-10 w-10 text-[hsl(var(--brand-gold))]" />
        </div>
      </motion.div>

      <h2 className="font-display text-2xl font-extrabold tracking-[0.02em] text-foreground sm:text-3xl mb-2 text-glow">
        Your Recommendation Is Ready
      </h2>

      {strain && (
        <>
          {/* Strain card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] p-5 text-left shadow-elegant"
          >
            <div className="flex items-start justify-between mb-3">
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
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">
                  {result.compatibility}%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Match
                </span>
              </div>
            </div>

            {/* THC / CBD */}
            <div className="flex gap-3 mb-3">
              <div className="rounded-lg border border-border bg-[hsl(var(--surface))] px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">THC </span>
                <span className="font-bold text-foreground">{strain.thc}%</span>
              </div>
              <div className="rounded-lg border border-border bg-[hsl(var(--surface))] px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">CBD </span>
                <span className="font-bold text-foreground">{strain.cbd}%</span>
              </div>
            </div>

            {/* Effects */}
            <div className="mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Effects</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {strain.effects.map((e) => (
                  <Badge key={e} variant="secondary" className="text-xs bg-[hsl(var(--brand-gold)_/_0.1)] text-[hsl(var(--brand-gold))] border-[hsl(var(--brand-gold)_/_0.2)]">
                    {e}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Flavours */}
            <div className="mb-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Flavours</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {strain.flavours.map((f) => (
                  <Badge key={f} variant="outline" className="text-xs">
                    {f}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${strain.available ? 'bg-primary' : 'bg-destructive'}`} />
              <span className="text-xs text-muted-foreground">
                {strain.available ? "In Stock" : "Currently Unavailable"}
              </span>
            </div>
          </motion.div>

          {/* Shop CTA */}
          <motion.a
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            href={strain.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Shop This Strain
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </>
      )}

      {/* Email note */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-[hsl(var(--surface-elevated))] px-4 py-2 text-xs text-muted-foreground">
        <Mail className="h-3.5 w-3.5 text-[hsl(var(--brand-gold))]" />
        Results also sent to your inbox
      </div>

      {/* Back */}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Start Over
      </button>
    </motion.div>
  );
};

export default SuccessScreen;
