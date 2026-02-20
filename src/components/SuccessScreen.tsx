import { CheckCircle } from "lucide-react";

const SuccessScreen = () => {
  return (
    <div className="animate-scale-in flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 shadow-glow">
        <CheckCircle className="h-10 w-10 text-accent" />
      </div>

      <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl mb-3">
        You're All Set!
      </h2>
      <p className="max-w-sm text-base text-muted-foreground leading-relaxed">
        Your personalised strain match has been sent to your inbox. Check your email for your results.
      </p>

      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-display tracking-[0.15em] uppercase">Healing Buds</span>
        <span>— Precision Strain Match</span>
      </div>
    </div>
  );
};

export default SuccessScreen;
