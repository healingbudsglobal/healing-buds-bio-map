import { useState, useCallback } from "react";
import SqueezeScreen from "@/components/SqueezeScreen";
import SurveyFlow from "@/components/SurveyFlow";
import LoadingScreen from "@/components/LoadingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { surveyQuestions } from "@/data/surveyQuestions";

type Screen = "squeeze" | "survey" | "loading" | "success";

const WEBHOOK_URL = "https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("squeeze");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");

  const handleEmailSubmit = useCallback((submittedEmail: string, submittedProvince: string) => {
    setEmail(submittedEmail);
    setProvince(submittedProvince);
    setScreen("survey");
  }, []);

  const handleSurveyComplete = useCallback(
    async (answers: Record<string, string>) => {
      setScreen("loading");

      const payload: Record<string, string> = { email, province };
      surveyQuestions.forEach((q, i) => {
        payload[`q${i + 1}`] = answers[q.id] || "";
      });

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Webhook error:", err);
      }

      setTimeout(() => setScreen("success"), 3000);
    },
    [email, province]
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
