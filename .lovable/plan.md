

# WhatsApp Optional + Email OTP Verification

## What's changing

Two modifications to the intake flow:

1. **WhatsApp becomes optional** — Remove the required validation on the WhatsApp field in `ContactCapture`. Add "(optional)" hint to the placeholder. Allow submission with just a name.

2. **Email OTP verification screen** — After the squeeze screen collects the email, insert a new "verify" step where the user enters a 6-digit code. The OTP is generated client-side and sent via the existing Make.com webhook (which triggers an email to the user). This confirms lead quality before proceeding to the survey.

## New flow

```text
Squeeze (email + province)
  → OTP Verify (enter 6-digit code sent to email)
    → Survey (15 questions)
      → Contact (name required, WhatsApp optional)
        → Loading → Success
```

## Implementation

### New screen type + state in `Index.tsx`
- Add `"otp"` to the `Screen` type
- Add `otpCode` state (generated 6-digit string)
- After email submit: generate OTP, fire webhook with `{email, otp_code, type: "otp_verification"}`, navigate to `"otp"` screen
- On OTP verified: proceed to `"survey"`

### New component `OtpVerification.tsx`
- Uses the existing `input-otp` component (already installed)
- 6-digit input with the `InputOTP`, `InputOTPGroup`, `InputOTPSlot` components
- Shows the email address the code was sent to
- "Resend code" button with 30-second cooldown timer
- Validates entered code against the generated OTP
- Styled consistently with other screens (glass card, flower backdrop, brand colors)

### `ContactCapture.tsx` changes
- Remove the WhatsApp required validation — only validate if a value is provided
- Update placeholder to `"WhatsApp number (optional)"`
- Allow form submission with just a name
- Update `onSubmit` signature to accept optional whatsapp: `(name: string, whatsapp?: string)`

### `Index.tsx` webhook changes
- New `sendOtpWebhook` function that posts `{email, province, otp_code, type: "otp_verification"}` to the Make.com webhook
- The Make.com scenario should be configured to send an email with the OTP code when it receives this payload type

## Files modified

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Add "otp" screen, OTP generation, OTP webhook call |
| `src/components/OtpVerification.tsx` | New — 6-digit OTP entry screen |
| `src/components/ContactCapture.tsx` | WhatsApp optional, relaxed validation |

