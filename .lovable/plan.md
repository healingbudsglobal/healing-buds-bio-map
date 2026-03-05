

## Plan: Switch Emails to Resend via Edge Functions, Keep Make.com for Sheets

Since you already use Resend for Healing Buds emails, the cleanest approach is:

- **Resend** (via edge functions) handles all email sending — OTP verification + clinical results
- **Make.com** (existing webhook) handles Google Sheets logging only — no email module needed

This gives you faster email delivery, one email provider across all Healing Buds properties, and Make.com stays as your data pipeline to Sheets.

---

### Architecture

```text
Frontend
  ├─ OTP request ──→ Edge Function (send-otp-email) ──→ Resend API
  │                                                       └─ noreply@send.healingbuds.co.za
  │
  └─ Survey complete ──→ Edge Function (submit-results)
                            ├─→ Resend API (results email)
                            └─→ Make.com webhook (Sheets logging w/ WhatsApp column)
```

---

### Steps

**1. Store Resend API key as a secret**
Add `RESEND_API_KEY` to the project secrets (secure, server-side only).

**2. Create `send-otp-email` edge function**
- Accepts `{ email, otp_code }` 
- Calls Resend API with the branded OTP HTML template (already built in `otp-email-template.html`)
- Sends from `noreply@send.healingbuds.co.za`

**3. Create `submit-results` edge function**
- Accepts full survey payload (email, name, whatsapp, strain match, all 15 answers)
- Sends branded results email via Resend
- Forwards the same payload to the Make.com webhook for Google Sheets logging (including the WhatsApp column)

**4. Update `src/lib/webhook.ts`**
- Add a `sendOtpEmail()` function that calls the `send-otp-email` edge function
- Add a `submitResults()` function that calls the `submit-results` edge function
- Keep `sendWebhook()` as a fallback/utility

**5. Update `src/pages/Index.tsx`**
- `handleEmailSubmit` → call `sendOtpEmail()` instead of `sendWebhook()`
- `handleSendResults` → call `submitResults()` instead of `sendWebhook()`

**6. Simplify Make.com scenario**
- Remove the email-sending module (SMTP or HTTP/Resend)
- Keep only: Webhook trigger → Google Sheets "Add Row" (with WhatsApp column mapped)
- The router filter for `type: otp_verification` can be removed since OTP emails no longer go through Make.com

---

### Files Changed

| File | Change |
|---|---|
| `supabase/functions/send-otp-email/index.ts` | New — sends OTP email via Resend |
| `supabase/functions/submit-results/index.ts` | New — sends results email via Resend + forwards to Make.com for Sheets |
| `supabase/config.toml` | New — edge function config with `verify_jwt = false` |
| `src/lib/webhook.ts` | Add typed functions calling edge functions |
| `src/pages/Index.tsx` | Use new email functions instead of raw webhook |

---

### Make.com Changes (manual, in your Make.com dashboard)

- Remove the Email/SMTP module from your scenario
- Keep: Webhook → Router → Google Sheets (add WhatsApp column if not already there)
- The webhook will now only receive survey result payloads (not OTP requests)

