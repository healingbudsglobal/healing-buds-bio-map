import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, RotateCw, Mail } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";
import heroFlower from "@/assets/hero-flower.jpg";

interface OtpVerificationProps {
  email: string;
  otpCode: string;
  onVerified: () => void;
  onResend: () => void;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const OtpVerification = ({ email, otpCode, onVerified, onResend }: OtpVerificationProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleComplete = useCallback(
    (val: string) => {
      if (val === otpCode) {
        setError("");
        onVerified();
      } else {
        setError("Incorrect code. Please try again.");
        setValue("");
      }
    },
    [otpCode, onVerified]
  );

  const handleResend = useCallback(() => {
    if (!canResend) return;
    setCanResend(false);
    setCooldown(30);
    setValue("");
    setError("");
    onResend();
  }, [canResend, onResend]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-sm w-full"
    >
      {/* Cinematic flower backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.img
          src={heroFlower}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
          style={{ filter: "blur(25px) saturate(1.2)", mixBlendMode: "soft-light" }}
          animate={{ scale: [1, 1.05, 1], x: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,hsl(180_8%_7%_/_0.9)_75%)]" />
        <div className="absolute inset-0 bg-[hsl(var(--primary-green)_/_0.12)]" style={{ mixBlendMode: "overlay" }} />
      </div>

      <motion.div variants={itemVariants} className="mb-6">
        <img src={hbLogoWhite} alt="Healing Buds" className="h-10 w-auto" />
      </motion.div>

      {/* Animated mail icon with gentle breathing pulse */}
      <motion.div variants={itemVariants} className="mb-3 flex flex-col items-center gap-3">
        <motion.div
          className="relative flex items-center justify-center h-14 w-14 rounded-2xl border border-[hsl(var(--accent-green)_/_0.25)] bg-[hsl(var(--accent-green)_/_0.08)] backdrop-blur-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Soft glow behind icon */}
          <div className="absolute inset-0 rounded-2xl bg-[hsl(var(--accent-green)_/_0.1)] blur-md" />
          <Mail className="h-6 w-6 text-[hsl(var(--accent-green))] relative z-10" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold tracking-[0.02em] text-foreground">
          Verify Your Email
        </h2>
      </motion.div>

      <motion.p variants={itemVariants} className="mb-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
        We sent a 6-digit code to{" "}
        <span className="text-foreground font-medium">{email}</span>
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-[hsl(var(--accent-green)_/_0.15)] bg-[hsl(175_6%_12%_/_0.6)] backdrop-blur-xl p-6 w-full relative overflow-hidden"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        {/* Subtle green shimmer line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden">
          <motion.div
            className="h-full w-[200%]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent-green)), hsl(var(--primary-green)), transparent)" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,hsl(var(--accent-green)_/_0.06)_0%,transparent_60%)]" />

        <div className="flex justify-center mb-4 relative z-10">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
          >
            <InputOTPGroup className="gap-2.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="!h-14 !w-12 !border !rounded-xl !border-[hsl(var(--accent-green)_/_0.2)] !bg-[hsl(180_8%_7%_/_0.8)] text-foreground !text-xl font-bold backdrop-blur-sm transition-all duration-200 !ring-0 data-[active]:!ring-2 data-[active]:!ring-[hsl(var(--accent-green)_/_0.6)] data-[active]:!border-[hsl(var(--accent-green)_/_0.5)] data-[active]:!bg-[hsl(var(--accent-green)_/_0.08)] data-[active]:shadow-[0_0_12px_hsl(var(--accent-green)_/_0.15)]"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive mb-3 relative z-10"
          >
            {error}
          </motion.p>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className="relative z-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[hsl(var(--accent-green))] transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] px-4"
        >
          <RotateCw className="h-3.5 w-3.5" />
          {canResend ? "Resend code" : `Resend in ${cooldown}s`}
        </button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent-green)_/_0.2)] bg-[hsl(var(--accent-green)_/_0.04)] px-4 py-2 text-xs text-muted-foreground"
      >
        <Shield className="h-3.5 w-3.5 text-[hsl(var(--accent-green))]" />
        <span>POPIA Compliant · Secure verification</span>
      </motion.div>
    </motion.div>
  );
};

export default OtpVerification;
