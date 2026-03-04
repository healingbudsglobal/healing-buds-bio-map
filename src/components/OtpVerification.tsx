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
        <img
          src={heroFlower}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
          style={{ filter: "blur(25px) saturate(1.2)", mixBlendMode: "soft-light" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,hsl(180_8%_7%_/_0.9)_75%)]" />
        <div className="absolute inset-0 bg-[hsl(var(--primary-green)_/_0.12)]" style={{ mixBlendMode: "overlay" }} />
      </div>

      <motion.div variants={itemVariants} className="mb-6">
        <img src={hbLogoWhite} alt="Healing Buds" className="h-10 w-auto" />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-2 flex items-center justify-center gap-2">
        <Mail className="h-5 w-5 text-[hsl(var(--accent-green))]" />
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
        className="glass-card-elevated rounded-2xl p-6 w-full relative overflow-hidden"
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, hsl(var(--accent-green)), hsl(var(--primary-green)))" }}
        />

        <div className="flex justify-center mb-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-11 border-border bg-[hsl(var(--surface-elevated))] text-foreground text-lg font-bold rounded-lg first:rounded-l-lg last:rounded-r-lg focus-within:ring-[hsl(var(--accent-green)_/_0.5)]"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive mb-3"
          >
            {error}
          </motion.p>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] px-4"
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
