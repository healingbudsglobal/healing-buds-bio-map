import { useState } from "react";
import { MapPin, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

interface LocalizerScreenProps {
  onContinue: () => void;
}

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
];

const LocalizerScreen = ({ onContinue }: LocalizerScreenProps) => {
  const [province, setProvince] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (!province) return;
    setVerified(true);
    setTimeout(() => onContinue(), 1400);
  };

  return (
    <div className="animate-fade-in relative z-10 flex flex-col items-center justify-center px-6 text-center">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2">
        <div
          className="h-64 w-64 rounded-full bg-[hsl(var(--accent-green))] opacity-[0.04] blur-[80px]"
          style={{ animation: "orbFloat 8s ease-in-out infinite" }}
        />
      </div>

      {/* Logo */}
      <div className="mb-10 animate-float">
        <img src={hbLogoWhite} alt="Healing Buds" className="h-14 w-auto sm:h-16" />
      </div>

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent-green)_/_0.25)] bg-[hsl(var(--accent-green)_/_0.08)] px-5 py-2 shadow-elegant">
        <MapPin className="h-3.5 w-3.5 text-[hsl(var(--accent-green))]" />
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[hsl(var(--accent-green))]">
          Service Verification
        </span>
      </div>

      <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-[0.02em] text-foreground sm:text-4xl md:text-5xl text-glow mb-3">
        Check Precision Bio-Mapping
        <br />
        <span
          className="bg-clip-text text-transparent inline-block"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(164 48% 53%), hsl(84 81% 44%))",
          }}
        >
          Availability
        </span>
      </h1>

      <p className="mb-10 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
        Verify our delivery and mapping service in your province.
      </p>

      {/* Province selector */}
      <div className="w-full max-w-sm">
        {!verified ? (
          <div className="flex flex-col gap-3 animate-slide-up">
            <div className="relative">
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-border bg-[hsl(var(--surface-elevated))] px-5 py-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-green)_/_0.4)] focus:border-[hsl(var(--accent-green)_/_0.5)] transition-all cursor-pointer"
              >
                <option value="" disabled>
                  Select your province
                </option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <MapPin className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            <button
              onClick={handleVerify}
              disabled={!province}
              className="group w-full rounded-2xl gradient-accent py-4 font-display font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Verify & Continue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <div className="animate-scale-in flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className="absolute inset-0 h-20 w-20 rounded-full bg-[hsl(var(--accent-green)_/_0.1)]"
                style={{
                  animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--accent-green)_/_0.1)] border border-[hsl(var(--accent-green)_/_0.3)] shadow-glow">
                <CheckCircle className="h-10 w-10 text-[hsl(var(--accent-green))]" />
              </div>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">
                Service Available
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {province} — preparing your bio-mapping…
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalizerScreen;
