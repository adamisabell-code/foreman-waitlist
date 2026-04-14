exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, trade } = JSON.parse(event.body);

  if (!name || !email || !trade) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#0a0e18;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0e18;padding:40px 20px;">
        <tr><td align="center">
          <table width="100%" style="max-width:560px;background:#0f1520;border-radius:20px;border:1px solid #1c2640;overflow:hidden;">
            <tr><td style="background:#ff6b00;padding:10px 0;text-align:center;">
              <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;color:#fff;text-transform:uppercase;">🦞 &nbsp; FOREMAN &nbsp; 🦞</span>
            </td></tr>
            <tr><td style="padding:48px 40px 32px;text-align:center;">
              <p style="font-size:48px;font-weight:900;color:#ff6b00;letter-spacing:4px;margin:0 0 8px;line-height:1;font-family:Arial,sans-serif;">FOREMAN</p>
              <p style="font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(238,242,255,0.4);margin:0 0 32px;font-family:Arial,sans-serif;">Blue collar AI · Built for the trades</p>
              <p style="font-size:22px;font-weight:700;color:#eef2ff;margin:0 0 12px;font-family:Arial,sans-serif;">You're on the list, ${name}. 🦞</p>
              <p style="font-size:15px;line-height:1.7;color:rgba(238,242,255,0.6);margin:0;font-family:Arial,sans-serif;">
                Foreman is a first-of-its-kind AI agent built specifically for <strong style="color:#eef2ff;">${trade} professionals</strong> and home service business owners.<br><br>
                We'll reach out as soon as early access opens. In the meantime — the build is happening in public.
              </p>
            </td></tr>
            <tr><td style="padding:0 40px;"><div style="height:1px;background:#1c2640;"></div></td></tr>
            <tr><td style="padding:32px 40px;text-align:center;">
              <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff6b00;margin:0 0 12px;font-family:Arial,sans-serif;">WHILE YOU WAIT</p>
              <p style="font-size:16px;font-weight:700;color:#eef2ff;margin:0 0 8px;font-family:Arial,sans-serif;">Read Foreman's Report</p>
              <p style="font-size:14px;line-height:1.6;color:rgba(238,242,255,0.5);margin:0 0 24px;font-family:Arial,sans-serif;">
                The weekly newsletter for trades business owners.<br>
                AI tips, lead gen tactics, and the build in public journey.
              </p>
              <a href="https://foremansreport.beehiiv.com/" style="display:inline-block;background:#ff6b00;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:900;letter-spacing:2px;text-transform:uppercase;padding:16px 36px;border-radius:10px;">SUBSCRIBE FREE →</a>
            </td></tr>
            <tr><td style="padding:0 40px;"><div style="height:1px;background:#1c2640;"></div></td></tr>
            <tr><td style="padding:24px 40px 32px;text-align:center;">
              <p style="font-size:13px;color:rgba(238,242,255,0.4);margin:0 0 4px;font-family:Arial,sans-serif;">Watch it get built in real time</p>
              <p style="font-size:14px;font-weight:700;color:#eef2ff;margin:0;font-family:Arial,sans-serif;">@adamsforeman on TikTok</p>
            </td></tr>
            <tr><td style="background:#080808;padding:20px 40px;text-align:center;">
              <p style="font-size:11px;color:rgba(238,242,255,0.2);letter-spacing:1px;margin:0;font-family:Arial,sans-serif;">© 2026 Foreman · Built for the trades</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_MmKc5KyB_8CzEqGo78tKSktuCUPQYL46h',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Foreman <onboarding@resend.dev>',
        to: email,
        subject: "You're on the Foreman waitlist 🦞",
        html: emailHtml,
      }),
    });

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email failed' }),
    };
  }
};
