import { supabase } from "@/integrations/supabase/client";

const WEBHOOK_URL = "https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb";

/** Legacy direct webhook — kept as fallback */
export async function sendWebhook(data: Record<string, unknown>): Promise<void> {
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: "healing-buds-biomap",
        ...data,
      }),
    });
  } catch (err) {
    console.error("Webhook error:", err);
  }
}

/** Send OTP verification email via Resend (edge function) */
export async function sendOtpEmail(email: string, otpCode: string): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke("send-otp-email", {
      body: { email, otp_code: otpCode },
    });
    if (error) {
      console.error("OTP email error:", error);
      // Fallback to Make.com webhook
      await sendWebhook({ email, otp_code: otpCode, type: "otp_verification" });
    }
  } catch (err) {
    console.error("OTP email failed, falling back to webhook:", err);
    await sendWebhook({ email, otp_code: otpCode, type: "otp_verification" });
  }
}

/** Submit survey results — sends email via Resend + logs to Google Sheets via Make.com */
export async function submitResults(payload: Record<string, string>): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke("submit-results", {
      body: payload,
    });
    if (error) {
      console.error("Submit results error:", error);
      // Fallback to direct webhook
      await sendWebhook(payload);
    }
  } catch (err) {
    console.error("Submit results failed, falling back to webhook:", err);
    await sendWebhook(payload);
  }
}
