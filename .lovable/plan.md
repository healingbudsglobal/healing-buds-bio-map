

## Add "Wrong email?" back button to OTP screen

### Changes

**`src/components/OtpVerification.tsx`**
- Add an `onBack` prop to the component
- Below the email display text, add a "Wrong email?" button styled as a subtle text link in `--accent-green` that calls `onBack`

**`src/pages/Index.tsx`**
- Add a `handleOtpBack` callback that sets screen back to `"squeeze"`
- Pass `onBack={handleOtpBack}` to the `OtpVerification` component

