const WEBHOOK_URL = "https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb";

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
