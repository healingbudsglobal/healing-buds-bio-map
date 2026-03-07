const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb";

function buildEffectPills(effects: string): string {
  return effects.split(', ').map(e =>
    `<td style="padding:0 4px 6px 0;"><span style="display:inline-block; padding:5px 12px; background-color:#162220; border:1px solid #2F3633; border-radius:20px; font-size:12px; color:#4DBFA1; font-weight:500;">${e}</span></td>`
  ).join('');
}

function buildFlavourPills(flavours: string): string {
  return flavours.split(', ').map(f =>
    `<td style="padding:0 4px 6px 0;"><span style="display:inline-block; padding:5px 12px; background-color:#1C1A14; border:1px solid #3D3520; border-radius:20px; font-size:12px; color:#E5A31E; font-weight:500;">${f}</span></td>`
  ).join('');
}

function buildResultsHtml(data: Record<string, string>): string {
  const name = data.name || 'there';
  const compatNum = parseInt(data.compatibility) || 85;
  
  // Build the survey summary rows from question answers
  const surveyKeys = [
    { key: 'exp_level', label: 'Experience Level' },
    { key: 'primary_vibe', label: 'Desired Vibe' },
    { key: 'specific_benefit', label: 'Primary Benefit' },
    { key: 'body_impact', label: 'Body Impact' },
    { key: 'terpene_pref', label: 'Terpene Preference' },
    { key: 'consumption_format', label: 'Consumption Method' },
    { key: 'time_of_day', label: 'Time of Day' },
  ];
  
  const profileRows = surveyKeys
    .filter(s => data[s.key])
    .map(s => `<tr><td style="padding:6px 0; border-bottom:1px solid #2F3633;"><span style="font-size:11px; color:#7F958E; text-transform:uppercase; letter-spacing:0.06em;">${s.label}</span><br/><span style="font-size:13px; color:#F0F3F2; font-weight:500;">${data[s.key]}</span></td></tr>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Your Clinical Strain Profile — Healing Buds</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=Inter:wght@400;500&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#101414; font-family:'Inter','Helvetica Neue',Arial,sans-serif;">

<!-- Preheader -->
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  ${name}, your precision bio-mapped strain match is ${data.matched_strain} with ${data.compatibility} compatibility. View your full clinical profile inside.
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#101414;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Main Card -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px; width:100%; background-color:#1A1D1C; border:1px solid #2F3633; border-radius:16px;">

        <!-- Top accent line -->
        <tr><td style="height:3px; background:linear-gradient(90deg, #4DBFA1, #E5A31E, #4DBFA1); border-radius:16px 16px 0 0; font-size:0; line-height:0;">&nbsp;</td></tr>

        <!-- Logo -->
        <tr><td align="center" style="padding:32px 32px 16px;"><img src="https://biomapsurvey.lovable.app/images/hb-logo-white-full.png" alt="Healing Buds" width="180" style="display:block; width:180px; height:auto;" /></td></tr>

        <!-- Heading -->
        <tr><td align="center" style="padding:8px 32px 4px;"><h1 style="margin:0; font-family:'DM Sans','Helvetica Neue',Arial,sans-serif; font-size:22px; font-weight:700; color:#F0F3F2; letter-spacing:0.02em;">Your Clinical Strain Profile</h1></td></tr>

        <!-- Subtext -->
        <tr><td align="center" style="padding:4px 32px 24px;"><p style="margin:0; font-size:14px; line-height:1.6; color:#7F958E;">Hey <span style="color:#F0F3F2; font-weight:500;">${name}</span>, your precision bio-mapping is complete. Here's your personalised match.</p></td></tr>

        <!-- ═══ STRAIN MATCH CARD ═══ -->
        <tr><td style="padding:0 24px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#101414; border:1px solid #2F3633; border-radius:12px; overflow:hidden;">
            <!-- Strain header with gradient -->
            <tr><td style="padding:24px 24px 16px; background:linear-gradient(135deg, rgba(77,191,161,0.12), rgba(229,163,30,0.08));">
              <p style="margin:0 0 2px; font-size:11px; color:#7F958E; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">🧬 Your Matched Strain</p>
              <h2 style="margin:0 0 4px; font-family:'DM Sans','Helvetica Neue',Arial,sans-serif; font-size:30px; font-weight:700; color:#E5A31E; letter-spacing:-0.01em;">${data.matched_strain}</h2>
            </td></tr>
            <!-- Compatibility score -->
            <tr><td align="center" style="padding:16px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr>
                  <td style="width:100%; padding-bottom:8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                      <tr>
                        <td style="font-size:12px; color:#7F958E;">Compatibility</td>
                        <td align="right" style="font-family:'DM Sans',sans-serif; font-size:18px; font-weight:700; color:#4DBFA1;">${data.compatibility}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; height:6px; background-color:#1A1D1C; border-radius:3px;">
                      <tr><td style="width:${compatNum}%; height:6px; background:linear-gradient(90deg, #4DBFA1, #2C7D7A); border-radius:3px;"></td><td></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- ═══ CANNABINOID & STRAIN DATA ═══ -->
        <tr><td style="padding:0 24px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
            <tr>
              <!-- THC -->
              <td style="width:33%; padding:0 4px 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#101414; border:1px solid #2F3633; border-radius:10px;">
                  <tr><td align="center" style="padding:16px 8px;">
                    <p style="margin:0 0 2px; font-size:10px; color:#7F958E; text-transform:uppercase; letter-spacing:0.08em;">THC</p>
                    <p style="margin:0; font-family:'DM Sans',sans-serif; font-size:22px; font-weight:700; color:#F0F3F2;">${data.strain_thc}</p>
                  </td></tr>
                </table>
              </td>
              <!-- CBD -->
              <td style="width:33%; padding:0 4px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#101414; border:1px solid #2F3633; border-radius:10px;">
                  <tr><td align="center" style="padding:16px 8px;">
                    <p style="margin:0 0 2px; font-size:10px; color:#7F958E; text-transform:uppercase; letter-spacing:0.08em;">CBD</p>
                    <p style="margin:0; font-family:'DM Sans',sans-serif; font-size:22px; font-weight:700; color:#F0F3F2;">${data.strain_cbd}</p>
                  </td></tr>
                </table>
              </td>
              <!-- Price -->
              <td style="width:33%; padding:0 0 0 4px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#101414; border:1px solid #2F3633; border-radius:10px;">
                  <tr><td align="center" style="padding:16px 8px;">
                    <p style="margin:0 0 2px; font-size:10px; color:#7F958E; text-transform:uppercase; letter-spacing:0.08em;">Price</p>
                    <p style="margin:0; font-family:'DM Sans',sans-serif; font-size:16px; font-weight:700; color:#F0F3F2;">${data.strain_price}</p>
                  </td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ═══ EFFECTS & FLAVOURS ═══ -->
        <tr><td style="padding:0 24px 8px;">
          <p style="margin:0 0 8px; font-size:11px; color:#7F958E; text-transform:uppercase; letter-spacing:0.08em; font-weight:600;">Effects</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${buildEffectPills(data.strain_effects)}</tr></table>
        </td></tr>
        <tr><td style="padding:0 24px 20px;">
          <p style="margin:0 0 8px; font-size:11px; color:#7F958E; text-transform:uppercase; letter-spacing:0.08em; font-weight:600;">Flavour Profile</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${buildFlavourPills(data.strain_flavours)}</tr></table>
        </td></tr>

        <!-- ═══ CTA BUTTON ═══ -->
        <tr><td align="center" style="padding:8px 32px 24px;">
          <a href="${data.strain_shop_url}" style="display:inline-block; background:linear-gradient(135deg, #E5A31E, #C98B0A); color:#101414; font-family:'DM Sans','Helvetica Neue',Arial,sans-serif; font-size:15px; font-weight:700; text-decoration:none; padding:16px 40px; border-radius:10px; letter-spacing:0.02em;">Shop ${data.matched_strain} →</a>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><div style="height:1px; background-color:#2F3633;"></div></td></tr>

        <!-- ═══ YOUR BIO-MAP PROFILE ═══ -->
        <tr><td style="padding:24px 24px 8px;">
          <p style="margin:0 0 4px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; color:#F0F3F2;">📋 Your Bio-Map Profile</p>
          <p style="margin:0 0 12px; font-size:12px; color:#7F958E;">Key answers that shaped your match</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
            ${profileRows}
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:16px 32px 0;"><div style="height:1px; background-color:#2F3633;"></div></td></tr>

        <!-- ═══ NEXT STEPS ═══ -->
        <tr><td style="padding:20px 24px 8px;">
          <p style="margin:0 0 12px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; color:#F0F3F2;">What happens next?</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
            <tr><td style="padding:6px 0; vertical-align:top; width:28px;"><span style="font-size:16px;">1️⃣</span></td><td style="padding:6px 0;"><span style="font-size:13px; color:#F0F3F2;">A Healing Buds consultant will review your profile</span></td></tr>
            <tr><td style="padding:6px 0; vertical-align:top; width:28px;"><span style="font-size:16px;">2️⃣</span></td><td style="padding:6px 0;"><span style="font-size:13px; color:#F0F3F2;">You'll receive personalised dosing guidance</span></td></tr>
            <tr><td style="padding:6px 0; vertical-align:top; width:28px;"><span style="font-size:16px;">3️⃣</span></td><td style="padding:6px 0;"><span style="font-size:13px; color:#F0F3F2;">Order your matched strain from the shop</span></td></tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:16px 32px 0;"><div style="height:1px; background-color:#2F3633;"></div></td></tr>

        <!-- Trust badges -->
        <tr><td align="center" style="padding:24px 32px 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="padding:0 8px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:6px 14px; border:1px solid #2F3633; border-radius:8px; background-color:#101414;"><span style="font-size:11px; color:#4DBFA1; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">✓ EU GMP Certified</span></td></tr></table></td>
              <td align="center" style="padding:0 8px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:6px 14px; border:1px solid #2F3633; border-radius:8px; background-color:#101414;"><span style="font-size:11px; color:#4DBFA1; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">🔒 POPIA Compliant</span></td></tr></table></td>
              <td align="center" style="padding:0 8px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:6px 14px; border:1px solid #2F3633; border-radius:8px; background-color:#101414;"><span style="font-size:11px; color:#4DBFA1; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">🧬 Bio-Mapped</span></td></tr></table></td>
            </tr>
          </table>
        </td></tr>

        <!-- Security note -->
        <tr><td align="center" style="padding:16px 32px 28px;">
          <p style="margin:0; font-size:12px; line-height:1.5; color:#7F958E;">This email contains your personalised clinical strain profile.<br/>Your data is encrypted and protected under POPIA.</p>
        </td></tr>

        <!-- Footer divider -->
        <tr><td style="padding:0 32px;"><div style="height:1px; background-color:#2F3633;"></div></td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding:24px 32px 32px;">
          <p style="margin:0 0 8px; font-family:'DM Sans','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:600; color:#F0F3F2;">Healing Buds</p>
          <p style="margin:0 0 12px; font-size:11px; color:#7F958E;">Precision-matched medical cannabis · South Africa</p>
          <p style="margin:0; font-size:11px;">
            <a href="https://healingbuds.co.za" style="color:#4DBFA1; text-decoration:none;">healingbuds.co.za</a>
            &nbsp;&middot;&nbsp;
            <a href="https://mystrain.healingbuds.co.za" style="color:#4DBFA1; text-decoration:none;">mystrain.healingbuds.co.za</a>
          </p>
        </td></tr>

      </table>
      <!-- /Main card -->

      <!-- Outer footer -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px; width:100%;">
        <tr><td align="center" style="padding:20px 16px;">
          <p style="margin:0; font-size:10px; color:#7F958E;">© 2026 Healing Buds (Pty) Ltd. All rights reserved.<br/>This is a transactional email with your personalised strain bio-mapping results.</p>
        </td></tr>
      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { email } = payload;

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // 1. Send results email via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Healing Buds <noreply@send.healingbuds.co.za>',
        to: [email],
        subject: `Your Strain Match: ${payload.matched_strain} (${payload.compatibility} compatibility)`,
        html: buildResultsHtml(payload),
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error('Resend error:', resendData);
    }

    // 2. Forward to Make.com webhook for Google Sheets logging
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: 'healing-buds-biomap',
          ...payload,
        }),
      });
    } catch (webhookErr) {
      console.error('Make.com webhook error:', webhookErr);
      // Don't fail the request if Sheets logging fails
    }

    return new Response(
      JSON.stringify({ success: true, email_id: resendData?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('submit-results error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
