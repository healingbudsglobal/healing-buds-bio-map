import { useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SqueezeScreen from "@/components/SqueezeScreen";
import SurveyFlow from "@/components/SurveyFlow";
import ContactCapture from "@/components/ContactCapture";
import LoadingScreen from "@/components/LoadingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import OtpVerification from "@/components/OtpVerification";
import AmbientParticles from "@/components/AmbientParticles";
import StepProgress from "@/components/StepProgress";
import { surveyQuestions } from "@/data/surveyQuestions";
import { matchStrain, type StrainMatch } from "@/lib/strainMatcher";
import { sendOtpEmail, submitResults } from "@/lib/webhook";
import { useToast } from "@/hooks/use-toast";

type Screen = "squeeze" | "otp" | "survey" | "contact" | "loading" | "success";

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

  const stepIndex = useMemo(() => {
    const map: Record<Screen, number> = {
      squeeze: 0, otp: 1, survey: 2, contact: 3, loading: 4, success: 4,
    };
    return map[screen];
  }, [screen]);

  const handleEmailSubmit = useCallback((submittedEmail: string, submittedProvince: string) => {
    setEmail(submittedEmail);
    setProvince(submittedProvince);
    const code = generateOtp();
    setOtpCode(code);
    sendOtpEmail(submittedEmail, code);
    setScreen("otp");
  }, []);

  const handleOtpVerified = useCallback(() => {
    setScreen("survey");
  }, []);

  const handleOtpBack = useCallback(() => {
    setScreen("squeeze");
  }, []);

  const handleOtpResend = useCallback(() => {
    const code = generateOtp();
    setOtpCode(code);
    sendOtpEmail(email, code);
  }, [email, province]);

  const handleSurveyComplete = useCallback((answers: Record<string, string>) => {
    const result = matchStrain(answers);
    setStrainResult(result);
    setSurveyAnswers(answers);
    setScreen("contact");
  }, []);

  const handleSendResults = useCallback(
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

      await submitResults(payload);

      setTimeout(() => setScreen("success"), 3000);
    },
    [email, province, strainResult, surveyAnswers]
  );

  const handleContactSubmit = useCallback(
    (name: string, whatsapp?: string) => {
      handleSendResults(name, whatsapp);
    },
    [handleSendResults]
  );

  const handleContactSkip = useCallback(() => {
    handleSendResults();
  }, [handleSendResults]);

  return (
    <div className="leaf-pattern relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pb-[env(safe-area-inset-bottom)]">
      <AmbientParticles />

      {/* Step Progress - fixed at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 pt-[calc(env(safe-area-inset-top)+12px)] pb-3 px-6 backdrop-blur-md bg-[hsl(180_8%_7%_/_0.5)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <StepProgress currentStep={stepIndex} />
      </motion.div>

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
