import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SqueezeScreen from "@/components/SqueezeScreen";
import SurveyFlow from "@/components/SurveyFlow";
import ContactCapture from "@/components/ContactCapture";
import LoadingScreen from "@/components/LoadingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { surveyQuestions } from "@/data/surveyQuestions";
import { matchStrain, type StrainMatch } from "@/lib/strainMatcher";

type Screen = "squeeze" | "survey" | "contact" | "loading" | "success";

const WEBHOOK_URL = "https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("squeeze");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [strainResult, setStrainResult] = useState<StrainMatch | null>(null);

  const handleEmailSubmit = useCallback((submittedEmail: string, submittedProvince: string) => {
    setEmail(submittedEmail);
    setProvince(submittedProvince);
    setScreen("survey");
  }, []);

  const handleSurveyComplete = useCallback((answers: Record<string, string>) => {
    const result = matchStrain(answers);
    setStrainResult(result);
    setSurveyAnswers(answers);
    setScreen("contact");
  }, []);

  const sendWebhook = useCallback(
    async (contactName?: string, whatsapp?: string) => {
      if (!strainResult) return;

      setScreen("loading");

      const payload: Record<string, string> = {
        email,
        province,
        matched_strain: strainResult.strain.name,
        compatibility: `${strainResult.compatibility}%`,
      };

      if (contactName) payload.name = contactName;
      if (whatsapp) payload.whatsapp = whatsapp;

      surveyQuestions.forEach((q) => {
        payload[q.id] = surveyAnswers[q.id] || "";
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
    [email, province, strainResult, surveyAnswers]
  );

  const handleContactSubmit = useCallback(
    (name: string, whatsapp: string) => {
      sendWebhook(name, whatsapp);
    },
    [sendWebhook]
  );

  const handleContactSkip = useCallback(() => {
    sendWebhook();
  }, [sendWebhook]);

  return (
    <div className="leaf-pattern flex min-h-[100dvh] items-center justify-center pb-[env(safe-area-inset-bottom)]">
      <AnimatePresence mode="wait">
        {screen === "squeeze" && <SqueezeScreen key="squeeze" onSubmit={handleEmailSubmit} />}
        {screen === "survey" && <SurveyFlow key="survey" onComplete={handleSurveyComplete} />}
        {screen === "contact" && (
          <ContactCapture
            key="contact"
            onSubmit={handleContactSubmit}
            onSkip={handleContactSkip}
            strainName={strainResult?.strain.name}
          />
        )}
        {screen === "loading" && <LoadingScreen key="loading" />}
        {screen === "success" && <SuccessScreen key="success" result={strainResult} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
