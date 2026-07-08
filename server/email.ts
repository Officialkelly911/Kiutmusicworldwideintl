/**
 * Email helpers — powered by Resend.
 * FROM address comes from CONTACT_FROM_EMAIL (env var).
 * RESEND_API_KEY must be set as a Replit Secret.
 */
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY secret is not configured.");
  return new Resend(key);
}

const FROM   = process.env.CONTACT_FROM_EMAIL ?? "Kiut Music <onboarding@resend.dev>";
const TO     = process.env.CONTACT_EMAIL      ?? "contact@kiutmusic.com";

interface ContactPayload {
  name:        string;
  email:       string;
  subject:     string;
  enquiryType: string;
  message:     string;
  ipAddress?:  string;
  userAgent?:  string;
  timestamp:   string;
}

/** Email sent to the Kiut Music inbox. */
export async function sendContactNotification(p: ContactPayload) {
  const resend = getResend();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Contact Form Submission</title></head>
<body style="margin:0;padding:0;background:#09090d;font-family:Arial,sans-serif;color:#e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#111117;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">
    <tr><td style="background:linear-gradient(90deg,transparent,#D4AF37,transparent);height:2px;"></td></tr>
    <tr><td style="padding:36px 40px 28px;">
      <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;letter-spacing:0.05em;color:#fff;">New Contact Form Submission</h1>
      <p style="margin:0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.2em;">Enquiry Type: ${p.enquiryType}</p>
    </td></tr>
    <tr><td style="padding:0 40px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row("Name",    p.name || "—")}
        ${row("Email",   `<a href="mailto:${p.email}" style="color:#D4AF37;">${p.email}</a>`)}
        ${row("Subject", p.subject)}
        ${row("Time",    p.timestamp)}
        ${p.ipAddress ? row("IP Address", p.ipAddress) : ""}
      </table>
      <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
        <p style="margin:0 0 8px;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.2em;">Message</p>
        <p style="margin:0;font-size:14px;color:#ccc;line-height:1.7;white-space:pre-wrap;">${escHtml(p.message)}</p>
      </div>
    </td></tr>
    <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="margin:0;font-size:11px;color:#444;text-align:center;">KIUT. MUSIC — kiutmusic.com</p>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from:    FROM,
    to:      TO,
    replyTo: p.email,
    subject: `[Kiut Music] New ${p.enquiryType} enquiry from ${p.name || p.email}`,
    html,
  });
}

/** Auto-reply sent to the person who submitted the form. */
export async function sendContactConfirmation(p: Pick<ContactPayload, "name" | "email">) {
  const resend = getResend();
  const firstName = (p.name || "").split(" ")[0] || "there";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>We've received your message</title></head>
<body style="margin:0;padding:0;background:#09090d;font-family:Arial,sans-serif;color:#e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#111117;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">
    <tr><td style="background:linear-gradient(90deg,transparent,#D4AF37,transparent);height:2px;"></td></tr>
    <tr><td style="padding:40px 40px 28px;text-align:center;">
      <div style="width:56px;height:56px;border-radius:50%;border:1px solid #D4AF37;background:rgba(212,175,55,0.10);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:24px;">✓</div>
      <h1 style="margin:0 0 10px;font-size:24px;font-weight:700;letter-spacing:0.05em;color:#D4AF37;">We've Received Your Message</h1>
      <p style="margin:0;font-size:15px;color:#999;">Hi ${firstName},</p>
    </td></tr>
    <tr><td style="padding:4px 40px 36px;text-align:center;">
      <p style="font-size:15px;line-height:1.8;color:#bbb;margin:0 0 16px;">
        Thank you for contacting Kiut Music. Your message has been received and will be reviewed by our team. We'll get back to you as soon as possible.
      </p>
      <p style="font-size:13px;color:#666;margin:0;">
        We aim to respond to all enquiries within 48–72 hours.
      </p>
    </td></tr>
    <tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.1em;color:#fff;">KIUT.</p>
      <p style="margin:0;font-size:11px;color:#444;">kiutmusic.com · This is an automated confirmation — please do not reply to this email.</p>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from:    FROM,
    to:      p.email,
    subject: "We've received your message — Kiut Music",
    html,
  });
}

// ── helpers ──────────────────────────────────────────────────────────────────
function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:8px 0;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:0.18em;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:#ddd;">${value}</td>
  </tr>`;
}

function escHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
