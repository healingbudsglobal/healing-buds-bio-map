# OTP Email Setup Guide — Make.com + cPanel

> Step-by-step instructions to send branded OTP verification emails from `send.healingbuds.co.za` using Make.com and your cPanel server.

---

## Prerequisites

- cPanel access for `healingbuds.co.za`
- Make.com account with the existing webhook scenario
- The webhook URL: `https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb`

---

## Step 1 — Upload the Logo to cPanel

1. Log in to **cPanel** → **File Manager**
2. Navigate to `public_html/`
3. Create a folder called `images` (if it doesn't exist)
4. Upload `hb-logo-white-full.png` into `public_html/images/`
5. Verify it's accessible at: `https://healingbuds.co.za/images/hb-logo-white-full.png`

> **Tip:** Right-click the file in File Manager → Permissions → set to `644`

---

## Step 2 — Create the Sender Email Account

1. In cPanel → **Email Accounts**
2. Click **Create**
3. Domain: `send.healingbuds.co.za`
4. Username: `noreply`
5. Set a strong password (save it — you'll need it for Make.com)
6. Storage: 250MB is fine for transactional emails

**Result:** `noreply@send.healingbuds.co.za` is now active.

> **Note:** If `send.healingbuds.co.za` isn't listed as a domain, go to **Domains** or **Subdomains** in cPanel and add it first.

---

## Step 3 — Verify DNS / Email Deliverability

1. In cPanel → **Email Deliverability**
2. Find `send.healingbuds.co.za` in the list
3. Click **Manage** — cPanel will show the status of:
   - **SPF** — Should include your server IP. If flagged, click **Install Suggested Record**
   - **DKIM** — Should show a valid key. If missing, click **Install Suggested Record**
   - **PTR (rDNS)** — Must match your server hostname (contact your host if this fails)
4. Wait 5–10 minutes for DNS propagation, then re-check

> **All three should show ✅ Valid** before proceeding.

---

## Step 4 — Configure Make.com Scenario

### 4a. Open Your Scenario

1. Log in to [Make.com](https://eu1.make.com)
2. Open the scenario connected to your webhook
3. The webhook receives payloads like:

```json
{
  "type": "otp_verification",
  "email": "patient@example.com",
  "otp_code": "482917",
  "timestamp": "2026-03-04T12:00:00Z"
}
```

### 4b. Add a Router (if not already present)

1. After the webhook module, add a **Router**
2. Create a route with a **Filter**:
   - Label: `OTP Emails`
   - Condition: `type` **Text operators: Equal to** `otp_verification`

### 4c. Add the Email (SMTP) Module

1. On the OTP route, click **+** → search for **Email** → select **Send an email (SMTP)**
2. Click **Create a connection**:

| Field | Value |
|-------|-------|
| Connection name | `Healing Buds SMTP` |
| Host | `mail.healingbuds.co.za` |
| Port | `465` |
| Secure connection | `Yes (SSL)` |
| Username | `noreply@send.healingbuds.co.za` |
| Password | *(the password from Step 2)* |

3. Click **Save**

### 4d. Configure the Email Fields

| Field | Value |
|-------|-------|
| **From** | `Healing Buds <noreply@send.healingbuds.co.za>` |
| **To** | Map: `{{email}}` from the webhook data |
| **Subject** | `Your Healing Buds Verification Code: {{otp_code}}` |
| **Content type** | `HTML` |
| **Content** | *(paste the full HTML from `otp-email-template.html`)* |

### 4e. Map the Variables in the HTML

When pasting the HTML template into Make.com's Content field, the variables `{{otp_code}}` and `{{email}}` will appear as plain text. You need to **replace them with Make.com mapped values**:

1. Find `{{otp_code}}` in the HTML content field
2. Delete it and click the variable picker → select the webhook's `otp_code` field
3. Find `{{email}}` in the HTML content field
4. Delete it and click the variable picker → select the webhook's `email` field

> **Important:** Do this for ALL occurrences — there are 2× `{{otp_code}}` (preheader + main display) and 2× `{{email}}` (subtext + preheader).

---

## Step 5 — Test End-to-End

1. In Make.com, click **Run once** on your scenario
2. Go to `https://mystrain.healingbuds.co.za` (or your preview URL)
3. Complete the survey until you reach the email capture screen
4. Enter a real email address you can check
5. Submit — the webhook fires, Make.com sends the branded email
6. Check inbox (and spam folder) for the email
7. Verify:
   - ✅ Logo displays correctly
   - ✅ OTP code shows in gold
   - ✅ "From" shows `Healing Buds <noreply@send.healingbuds.co.za>`
   - ✅ Trust badges render
   - ✅ Links work

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Email lands in spam | Check SPF/DKIM in cPanel Email Deliverability. Ensure PTR record matches. |
| Logo doesn't display | Verify the image URL is publicly accessible. Some email clients block images by default. |
| Connection error in Make.com | Double-check host (`mail.healingbuds.co.za`), port (`465`), and credentials. Try port `587` with TLS. |
| Variables show as `{{otp_code}}` literally | You need to map them using Make.com's variable picker, not type them as text. |
| Email not sent | Check the Router filter is set to `type = otp_verification`. Check Make.com execution log for errors. |

---

## Email Subject Line

```
Your Healing Buds Verification Code: {{otp_code}}
```

---

*© 2026 Healing Buds. All rights reserved.*
