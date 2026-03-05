const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/70z505ty60nkksvtl6l6r1yzj4cs58tb";

function buildResultsHtml(data: Record<string, string>): string {
  const name = data.name || 'there';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Strain Match — Healing Buds</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=Inter:wght@400;500&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body { margin: 0; padding: 0; width: 100% !important; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#101414; font-family:'Inter','Helvetica Neue',Arial,sans-serif;">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  Your perfect strain match: ${data.matched_strain} (${data.compatibility} compatibility)
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#101414;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px; width:100%; background-color:#1A1D1C; border:1px solid #2F3633; border-radius:16px;">
        <tr><td style="height:3px; background:linear-gradient(90deg, #4DBFA1, #E5A31E, #4DBFA1); border-radius:16px 16px 0 0; font-size:0; line-height:0;">&nbsp;</td></tr>
        <tr><td align="center" style="padding:32px 32px 16px;"><img src="https://healingbuds.co.za/images/hb-logo-white-full.png" alt="Healing Buds" width="180" style="display:block; width:180px; height:auto;" /></td></tr>
        <tr><td align="center" style="padding:8px 32px 4px;"><h1 style="margin:0; font-family:'DM Sans',sans-serif; font-size:22px; font-weight:700; color:#F0F3F2;">Hey ${name}, your match is ready 🌿</h1></td></tr>
        <tr><td align="center" style="padding:16px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#101414; border:1px solid #2F3633; border-radius:12px;">
            <tr><td style="padding:24px;">
              <p style="margin:0 0 4px; font-size:12px; color:#7F958E; text-transform:uppercase; letter-spacing:0.08em;">Your Matched Strain</p>
              <h2 style="margin:0 0 8px; font-family:'DM Sans',sans-serif; font-size:28px; font-weight:700; color:#E5A31E;">${data.matched_strain}</h2>
              <p style="margin:0; font-size:32px; font-weight:700; color:#4DBFA1;">${data.compatibility}</p>
              <p style="margin:0; font-size:11px; color:#7F958E;">compatibility score</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
            <tr>
              <td style="padding:8px 0; border-bottom:1px solid #2F3633;">
                <span style="font-size:12px; color:#7F958E;">Effects</span><br/>
                <span style="font-size:14px; color:#F0F3F2;">${data.strain_effects}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0; border-bottom:1px solid #2F3633;">
                <span style="font-size:12px; color:#7F958E;">Flavours</span><br/>
                <span style="font-size:14px; color:#F0F3F2;">${data.strain_flavours}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0; border-bottom:1px solid #2F3633;">
                <span style="font-size:12px; color:#7F958E;">THC / CBD</span><br/>
                <span style="font-size:14px; color:#F0F3F2;">${data.strain_thc} THC · ${data.strain_cbd} CBD</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <span style="font-size:12px; color:#7F958E;">Price</span><br/>
                <span style="font-size:14px; color:#F0F3F2;">${data.strain_price}</span>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td align="center" style="padding:24px 32px;">
          <a href="${data.strain_shop_url}" style="display:inline-block; background:linear-gradient(135deg, #4DBFA1, #2C7D7A); color:#fff; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; text-decoration:none; padding:14px 32px; border-radius:10px;">View in Shop →</a>
        </td></tr>
        <tr><td style="padding:0 32px;"><div style="height:1px; background-color:#2F3633;"></div></td></tr>
        <tr><td align="center" style="padding:24px 32px 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding:0 8px;"><table role="presentation"><tr><td style="padding:6px 12px; border:1px solid #2F3633; border-radius:8px; background:#101414;"><span style="font-size:11px; color:#4DBFA1; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">✓ EU GMP</span></td></tr></table></td>
              <td style="padding:0 8px;"><table role="presentation"><tr><td style="padding:6px 12px; border:1px solid #2F3633; border-radius:8px; background:#101414;"><span style="font-size:11px; color:#4DBFA1; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">🔒 POPIA</span></td></tr></table></td>
              <td style="padding:0 8px;"><table role="presentation"><tr><td style="padding:6px 12px; border:1px solid #2F3633; border-radius:8px; background:#101414;"><span style="font-size:11px; color:#4DBFA1; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;">🧬 Bio-Mapped</span></td></tr></table></td>
            </tr>
          </table>
        </td></tr>
        <tr><td align="center" style="padding:16px 32px 32px;">
          <p style="margin:0 0 8px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; color:#F0F3F2;">Healing Buds</p>
          <p style="margin:0 0 12px; font-size:11px; color:#7F958E;">Precision-matched medical cannabis · South Africa</p>
          <p style="margin:0; font-size:11px;"><a href="https://healingbuds.co.za" style="color:#4DBFA1; text-decoration:none;">healingbuds.co.za</a> &middot; <a href="https://mystrain.healingbuds.co.za" style="color:#4DBFA1; text-decoration:none;">mystrain.healingbuds.co.za</a></p>
        </td></tr>
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px; width:100%;">
        <tr><td align="center" style="padding:20px 16px;"><p style="margin:0; font-size:10px; color:#7F958E;">© 2026 Healing Buds (Pty) Ltd. All rights reserved.<br/>This is a transactional email with your personalised strain bio-mapping results.</p></td></tr>
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
