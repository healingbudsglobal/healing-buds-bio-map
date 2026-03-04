

## Create Branded OTP Email Template + Setup Guide

### Files to create

**`src/docs/otp-email-template.html`**
A production-ready, inline-styled HTML email template using table-based layout for email client compatibility. Design:
- Dark background `#101414`, card `#1A1D1C`, borders `#2F3633`
- Logo hosted at `https://healingbuds.co.za/images/hb-logo-white-full.png` (user must upload to cPanel)
- OTP code displayed in large gold (`#E5A31E`) text inside a bordered box
- Teal (`#4DBFA1`) accents for secondary elements
- Trust badges: EU GMP Certified, POPIA Compliant
- Footer with brand links and unsubscribe
- Make.com variables: `{{otp_code}}`, `{{email}}`
- Subject line: `Your Healing Buds Verification Code: {{otp_code}}`

**`src/docs/MAKE-COM-OTP-SETUP.md`**
Step-by-step setup guide covering:

1. **Upload logo to cPanel** — Upload `hb-logo-white-full.png` to `public_html/images/` so it's accessible at `https://healingbuds.co.za/images/hb-logo-white-full.png`
2. **Create email account in cPanel** — Create `noreply@send.healingbuds.co.za` under Email Accounts
3. **Check DNS in cPanel** — Go to Email Deliverability, ensure SPF/DKIM pass for `send.healingbuds.co.za`
4. **Configure Make.com scenario** — Open the scenario triggered by the webhook, find/add the Send Email module:
   - Connection: SMTP with host `mail.healingbuds.co.za`, port `465` SSL, username `noreply@send.healingbuds.co.za`
   - From: `Healing Buds <noreply@send.healingbuds.co.za>`
   - To: `{{email}}` (from webhook data)
   - Subject: `Your Healing Buds Verification Code: {{otp_code}}`
   - Content type: HTML
   - Body: paste the full HTML template, replacing static values with Make.com variables
5. **Test** — Trigger a test OTP from the app, verify email arrives with correct branding

