import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SqueezeScreen from "@/components/SqueezeScreen";
import SurveyFlow from "@/components/SurveyFlow";
import ContactCapture from "@/components/ContactCapture";
import LoadingScreen from "@/components/LoadingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import OtpVerification from "@/components/OtpVerification";
import AmbientParticles from "@/components/AmbientParticles";
import { surveyQuestions } from "@/data/surveyQuestions";
import { matchStrain, type StrainMatch } from "@/lib/strainMatcher";

type Screen = "squeeze" | "otp" | "survey" | "contact" | "loading" | "success";

const WEBHOOK_URL = "https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Cinematic screen transition variants
const screenVariants = {
  initial: { opacity: 0, y: 40, scale: 0.97, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -30, scale: 1.02, filter: "blur(4px)" },
};

const screenTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("squeeze");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [strainResult, setStrainResult] = useState<StrainMatch | null>(null);

  const sendOtpWebhook = useCallback(async (userEmail: string, userProvince: string, code: string) => {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          province: userProvince,
          otp_code: code,
          type: "otp_verification",
        }),
      });
    } catch (err) {
      console.error("OTP webhook error:", err);
    }
  }, []);

  const handleEmailSubmit = useCallback((submittedEmail: string, submittedProvince: string) => {
    setEmail(submittedEmail);
    setProvince(submittedProvince);
    const code = generateOtp();
    setOtpCode(code);
    sendOtpWebhook(submittedEmail, submittedProvince, code);
    setScreen("otp");
  }, [sendOtpWebhook]);

  const handleOtpVerified = useCallback(() => {
    setScreen("survey");
  }, []);

  const handleOtpBack = useCallback(() => {
    setScreen("squeeze");
  }, []);

  const handleOtpResend = useCallback(() => {
    const code = generateOtp();
    setOtpCode(code);
    sendOtpWebhook(email, province, code);
  }, [email, province, sendOtpWebhook]);

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
        strain_effects: strainResult.strain.effects.join(", "),
        strain_flavours: strainResult.strain.flavours.join(", "),
        strain_thc: `${strainResult.strain.thc}%`,
        strain_cbd: `${strainResult.strain.cbd}%`,
        strain_price: strainResult.strain.price,
        strain_shop_url: strainResult.strain.shopUrl,
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
    (name: string, whatsapp?: string) => {
      sendWebhook(name, whatsapp);
    },
    [sendWebhook]
  );

  const handleContactSkip = useCallback(() => {
    sendWebhook();
  }, [sendWebhook]);

  return (
    <div className="leaf-pattern relative flex min-h-[100dvh] items-center justify-center overflow-hidden pb-[env(safe-area-inset-bottom)]">
      <AmbientParticles />

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={screenTransition}
          className="flex w-full items-center justify-center"
        >
          {screen === "squeeze" && <SqueezeScreen onSubmit={handleEmailSubmit} />}
          {screen === "otp" && (
            <OtpVerification
              email={email}
              otpCode={otpCode}
              onVerified={handleOtpVerified}
              onResend={handleOtpResend}
              onBack={handleOtpBack}
            />
          )}
          {screen === "survey" && <SurveyFlow onComplete={handleSurveyComplete} />}
          {screen === "contact" && (
            <ContactCapture
              onSubmit={handleContactSubmit}
              onSkip={handleContactSkip}
              strainName={strainResult?.strain.name}
              userEmail={email}
            />
          )}
          {screen === "loading" && <LoadingScreen />}
          {screen === "success" && <SuccessScreen result={strainResult} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
