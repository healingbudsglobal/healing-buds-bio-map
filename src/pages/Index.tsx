import { useState, useCallback } from "react";
import SqueezeScreen from "@/components/SqueezeScreen";
import SurveyFlow from "@/components/SurveyFlow";
import LoadingScreen from "@/components/LoadingScreen";
import SuccessScreen from "@/components/SuccessScreen";

type Screen = "squeeze" | "survey" | "loading" | "success";

const WEBHOOK_URL = "https://hook.eu1.make.com/ies7377nwtjp83lxneyakinmvqrk5lmc";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("squeeze");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = useCallback((submittedEmail: string) => {
    setEmail(submittedEmail);
    setScreen("survey");
  }, []);

  const handleSurveyComplete = useCallback(
    async (answers: Record<string, string>) => {
      setScreen("loading");

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, ...answers }),
        });
      } catch (err) {
        console.error("Webhook error:", err);
      }

      // Show loading for at least 3 seconds for UX
      setTimeout(() => setScreen("success"), 3000);
    },
    [email]
  );

  return (
    <div className="leaf-pattern flex min-h-[100dvh] items-center justify-center">
      {screen === "squeeze" && <SqueezeScreen onSubmit={handleEmailSubmit} />}
      {screen === "survey" && <SurveyFlow onComplete={handleSurveyComplete} />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "success" && <SuccessScreen />}
    </div>
  );
};

export default Index;
