import { CheckCircle, Mail, RotateCcw, ExternalLink, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StrainMatch } from "@/lib/strainMatcher";

interface SuccessScreenProps {
  result: StrainMatch | null;
}

const SuccessScreen = ({ result }: SuccessScreenProps) => {
  const strain = result?.strain;

  return (
    <div className="animate-scale-in relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-md w-full">
      {/* Glow */}
      <div className="pointer-events-none absolute">
        <div className="h-48 w-48 rounded-full bg-[hsl(var(--brand-gold))] opacity-[0.06] blur-[80px]" />
      </div>

      {/* Success icon */}
      <div className="relative mb-6">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--brand-gold)_/_0.1)] border border-[hsl(var(--brand-gold)_/_0.25)] shadow-[var(--shadow-glow-gold)]">
          <CheckCircle className="h-10 w-10 text-[hsl(var(--brand-gold))]" />
        </div>
      </div>

      <h2 className="font-display text-2xl font-extrabold tracking-[0.02em] text-foreground sm:text-3xl mb-2 text-glow">
        Your Match Is Ready
      </h2>

      {strain && (
        <>
          {/* Strain card */}
          <div className="mt-4 w-full rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] p-5 text-left shadow-elegant">
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
              <span className={`h-2 w-2 rounded-full ${strain.available ? 'bg-green-500' : 'bg-destructive'}`} />
              <span className="text-xs text-muted-foreground">
                {strain.available ? "In Stock" : "Currently Unavailable"}
              </span>
            </div>
          </div>

          {/* Shop CTA */}
          <a
            href={strain.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Shop This Strain
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
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
    </div>
  );
};

export default SuccessScreen;
