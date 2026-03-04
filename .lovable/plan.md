

# Auto-Send Matched Strain Email via Make.com Webhook

## Approach
The app already sends data to your Make.com webhook. The simplest and most reliable approach is to **enrich the webhook payload** with all strain details so Make.com can auto-send a branded email with the strain info and shop link. No new backend or email service needed — Make.com handles the email delivery.

## What Changes

### 1. Enrich webhook payload in `src/pages/Index.tsx`
Currently the payload sends `matched_strain` (name only) and `compatibility`. Add the full strain profile so Make.com has everything it needs to build the email:
- `strain_effects` — e.g. "Relaxed, Sleepy, Hungry"
- `strain_flavours` — e.g. "Berry, Vanilla, Citrus"  
- `strain_thc` — e.g. "23.0%"
- `strain_cbd` — e.g. "0.1%"
- `strain_price` — e.g. "R191.20/g"
- `strain_shop_url` — e.g. "https://healingbuds.co.za/shop"

### 2. Make.com Configuration (your side)
In your Make.com scenario, add a **Gmail/SMTP/SendGrid module** after the webhook trigger that:
- Sends to the captured `email`
- Subject: "Your Personalised Strain Match — {strain_name}"
- Body uses the enriched payload fields to build a branded email with strain details + CTA linking to `strain_shop_url`

## Files Modified
- `src/pages/Index.tsx` — add strain details to webhook payload (6 new fields)

## Note
The email template design and sending is handled in Make.com, not in the app code. This keeps things simple and lets you customize the email template visually in Make.com's editor without code changes.

