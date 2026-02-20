import { Leaf } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="h-16 w-16 rounded-full border-2 border-secondary" />
        <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-primary border-t-transparent" style={{ animation: "spin 1s linear infinite" }} />
        <Leaf className="absolute inset-0 m-auto h-6 w-6 text-primary" />
      </div>

      <h2 className="font-display text-xl font-bold text-foreground mb-2">
        Calculating Your Match...
      </h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        Our algorithm is cross-referencing your bio-profile with our live strain inventory
      </p>

      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            style={{
              animation: "dotPulse 1.4s infinite ease-in-out both",
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
