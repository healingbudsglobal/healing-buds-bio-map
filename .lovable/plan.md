
I will add a Province dropdown to the Squeeze Screen and ensure it's included in the data sent to your webhook.

### Proposed Changes

#### 1. Squeeze Screen Component (`src/components/SqueezeScreen.tsx`)
- **State Management**: Add a new state for the selected province.
- **UI Components**: Import and use the `Select` component family from our UI library.
- **Dropdown Integration**: Add a "Province" dropdown below the email input.
- **Styling**: Apply consistent styling (glassmorphism, `rounded-2xl`, etc.) to match the existing email field.
- **Validation**: Ensure both an email is entered and a province is selected before allowing submission.
- **Prop Update**: Modify the `onSubmit` callback to pass both the email and the selected province.

#### 2. Main Index Page (`src/pages/Index.tsx`)
- **State Management**: Add a `province` state to store the value between the squeeze screen and the final survey submission.
- **Flow Update**: Update the email submission handler to receive and save the province.
- **Webhook Payload**: Modify the `handleSurveyComplete` function to include the `province` field at the top level of the JSON object, alongside the `email` and survey questions (`q1-q15`).

### Province List
The dropdown will include:
- Western Cape
- Gauteng
- KwaZulu-Natal
- Eastern Cape
- Free State
- Limpopo
- Mpumalanga
- North West
- Northern Cape
- N/A

### Technical Details
- The payload sent to `https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb` will look like this:
```json
{
  "email": "user@example.com",
  "province": "Western Cape",
  "q1": "Answer 1",
  ...
  "q15": "Answer 15"
}
```
- The dropdown will be placed above the "Start My Bio-Mapping" button for a natural form flow.
