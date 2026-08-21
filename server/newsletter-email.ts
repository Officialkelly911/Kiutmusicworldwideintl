/**
 * Welcome email sent to new newsletter subscribers via Resend.
 * Reuses the same Resend instance as contact emails.
 */
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY secret is not configured.");
  return new Resend(key);
}

const FROM       = process.env.CONTACT_FROM_EMAIL ?? "Kiut Music <onboarding@resend.dev>";
const REPLY_TO   = process.env.NEWSLETTER_REPLY_TO ?? process.env.CONTACT_EMAIL ?? "contact@kiutmusic.com";

export async function sendWelcomeEmail(params: { email: string; firstName?: string }) {
  const resend    = getResend();
  const firstName = params.firstName?.trim() || "there";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Welcome to the Kiut Music Community</title></head>
<body style="margin:0;padding:0;background:#09090d;font-family:Arial,sans-serif;color:#e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#111117;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

    <!-- Gold bar -->
    <tr><td style="background:linear-gradient(90deg,transparent,#D4AF37,transparent);height:2px;"></td></tr>

    <!-- Hero -->
    <tr><td style="padding:44px 40px 28px;text-align:center;">
      <h1 style="margin:0 0 4px;font-size:36px;font-weight:900;letter-spacing:0.12em;color:#fff;">KIUT<span style="color:#D4AF37;">.</span></h1>
      <p style="margin:0;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:0.35em;">Inner Circle</p>
    </td></tr>

    <!-- Headline -->
    <tr><td style="padding:0 40px 24px;text-align:center;">
      <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#D4AF37;letter-spacing:0.04em;">Welcome to the Community</h2>
      <p style="margin:0;font-size:15px;color:#aaa;line-height:1.7;">Hi ${firstName}, you're officially part of the inner circle.</p>
    </td></tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(255,255,255,0.06);"></div></td></tr>

    <!-- Body -->
    <tr><td style="padding:28px 40px 32px;">
      <p style="margin:0 0 20px;font-size:14px;color:#bbb;line-height:1.8;">
        Thank you for subscribing. As a member of the Kiut Music community, you'll receive:
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${benefit("🎵", "New Music Releases", "First access to every new track and project")}
        ${benefit("👕", "Exclusive Merchandise", "Early drops and insider pricing")}
        ${benefit("🎬", "Behind-the-Scenes", "Studio sessions, creative process, and more")}
        ${benefit("🎤", "Concert Announcements", "Ticket pre-sales and VIP opportunities")}
        ${benefit("🌍", "Community News", "Updates from the Kiut Music world")}
      </table>
    </td></tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(255,255,255,0.06);"></div></td></tr>

    <!-- Footer -->
    <tr><td style="padding:24px 40px;text-align:center;">
      <p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:0.12em;color:#fff;">— Kiut Music</p>
      <p style="margin:0;font-size:11px;color:#444;">kiutmusic.com · You can unsubscribe at any time.</p>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from:    FROM,
    to:      params.email,
    replyTo: REPLY_TO,
    subject: "Welcome to the Kiut Music Community 🎵",
    html,
  });
}

// ─── helper ──────────────────────────────────────────────────────────────────
function benefit(emoji: string, title: string, desc: string) {
  return `
  <tr>
    <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px;">${emoji}</td>
    <td style="padding:8px 0 8px 10px;vertical-align:top;">
      <p style="margin:0;font-size:13px;font-weight:700;color:#e5e5e5;">${title}</p>
      <p style="margin:2px 0 0;font-size:12px;color:#666;">${desc}</p>
    </td>
  </tr>`;
}
