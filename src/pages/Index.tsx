import { useState, useCallback } from "react";
import LocalizerScreen from "@/components/LocalizerScreen";
import SurveyFlow from "@/components/SurveyFlow";
import SqueezeScreen from "@/components/SqueezeScreen";
import LoadingScreen from "@/components/LoadingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { surveyQuestions } from "@/data/surveyQuestions";

type Screen = "localizer" | "survey" | "squeeze" | "loading" | "success";

const WEBHOOK_URL = "https://hook.eu1.make.com/ies7377nwtjp83lxneyakinmvqrk5lmc";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("localizer");
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});

  const handleLocalizerContinue = useCallback(() => {
    setScreen("survey");
  }, []);

  const handleSurveyComplete = useCallback((answers: Record<string, string>) => {
    setSurveyAnswers(answers);
    setScreen("squeeze");
  }, []);

  const handleEmailSubmit = useCallback(
    async (email: string) => {
      setScreen("loading");

      const payload: Record<string, string> = { email };
      surveyQuestions.forEach((q, i) => {
        payload[`q${i + 1}`] = surveyAnswers[q.id] || "";
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
    [surveyAnswers]
  );

  return (
    <div className="leaf-pattern flex min-h-[100dvh] items-center justify-center">
      {screen === "localizer" && <LocalizerScreen onContinue={handleLocalizerContinue} />}
      {screen === "survey" && <SurveyFlow onComplete={handleSurveyComplete} />}
      {screen === "squeeze" && <SqueezeScreen onSubmit={handleEmailSubmit} />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "success" && <SuccessScreen />}
    </div>
  );
};

export default Index;
