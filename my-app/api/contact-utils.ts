import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

export type Lead = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

type VerificationPayload = {
  exp: number;
  lead: Lead;
};

export function getBaseUrl(req: { headers: Record<string, string | string[] | undefined> }) {
  const configuredUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (configuredUrl) {
    return configuredUrl;
  }

  const hostHeader = req.headers.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  const protoHeader = req.headers["x-forwarded-proto"];
  const proto = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader;

  return `${proto || "https"}://${host}`;
}

export function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailShell({
  title,
  preview,
  body,
  logoSrc,
}: {
  title: string;
  preview: string;
  body: string;
  logoSrc: string;
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid #eef2f7;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <img src="${logoSrc}" alt="OutSourceWise" width="44" height="44" style="display:inline-block;vertical-align:middle;border-radius:10px;margin-right:12px;" />
                      <span style="display:inline-block;vertical-align:middle;font-size:22px;font-weight:700;color:#111827;">OutSource<span style="color:#2563eb;">Wise</span></span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #eef2f7;color:#64748b;font-size:13px;line-height:1.6;">
                This email was sent by OutSourceWise after a consultation request was submitted on our website.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function publicLogoUrl() {
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (siteUrl && !siteUrl.includes("localhost")) {
    return `${siteUrl}/outsourcewise.png`;
  }

  return "cid:outsourcewise-logo";
}

export function logoAttachments() {
  const logoPath = path.join(process.cwd(), "public", "outsourcewise.png");
  if (!fs.existsSync(logoPath)) {
    return [];
  }

  return [
    {
      filename: "outsourcewise.png",
      path: logoPath,
      cid: "outsourcewise-logo",
    },
  ];
}

export function verificationEmailHtml(lead: Lead, verificationUrl: string) {
  return emailShell({
    title: "Confirm your consultation request",
    preview: "Please confirm your email to send your consultation request to OutSourceWise.",
    logoSrc: publicLogoUrl(),
    body: `
      <p style="margin:0 0 10px;color:#2563eb;font-size:14px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;">Email confirmation</p>
      <h1 style="margin:0 0 14px;font-size:28px;line-height:1.25;color:#111827;">Confirm your consultation request</h1>
      <p style="margin:0 0 22px;color:#4b5563;font-size:16px;line-height:1.7;">Hi ${escapeHtml(lead.name)}, thanks for reaching out to OutSourceWise. Please confirm your email so we can send your request to our team.</p>
      <a href="${verificationUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:14px 22px;border-radius:10px;">Confirm request</a>
      <p style="margin:24px 0 0;color:#64748b;font-size:14px;line-height:1.7;">This link expires in 30 minutes. If you did not submit this request, you can safely ignore this email.</p>
      <p style="margin:18px 0 0;color:#94a3b8;font-size:12px;line-height:1.7;word-break:break-all;">${verificationUrl}</p>
    `,
  });
}

export function confirmationEmailHtml(lead: Lead) {
  return emailShell({
    title: "Your request is confirmed",
    preview: "Your OutSourceWise consultation request has been confirmed.",
    logoSrc: publicLogoUrl(),
    body: `
      <p style="margin:0 0 10px;color:#16a34a;font-size:14px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;">Request confirmed</p>
      <h1 style="margin:0 0 14px;font-size:28px;line-height:1.25;color:#111827;">We received your request</h1>
      <p style="margin:0 0 22px;color:#4b5563;font-size:16px;line-height:1.7;">Hi ${escapeHtml(lead.name)}, your consultation request has been confirmed and sent to our team. One of our account managers will be in touch within 24 hours.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;margin-top:10px;">
        <tr>
          <td style="padding:18px 20px;color:#111827;font-size:14px;line-height:1.7;">
            <strong style="display:block;margin-bottom:6px;">Request summary</strong>
            Service: ${escapeHtml(lead.service || "Not specified")}<br />
            Company: ${escapeHtml(lead.company || "Not specified")}
          </td>
        </tr>
      </table>
    `,
  });
}

export function leadEmailHtml(lead: Lead) {
  return emailShell({
    title: "Verified consultation request",
    preview: `New verified request from ${lead.name}.`,
    logoSrc: publicLogoUrl(),
    body: `
      <p style="margin:0 0 10px;color:#2563eb;font-size:14px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;">Verified lead</p>
      <h1 style="margin:0 0 14px;font-size:28px;line-height:1.25;color:#111827;">New consultation request</h1>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 10px;margin-top:18px;">
        <tr><td style="color:#64748b;width:110px;">Name</td><td style="color:#111827;font-weight:700;">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="color:#64748b;width:110px;">Email</td><td style="color:#111827;font-weight:700;">${escapeHtml(lead.email)}</td></tr>
        <tr><td style="color:#64748b;width:110px;">Company</td><td style="color:#111827;">${escapeHtml(lead.company || "-")}</td></tr>
        <tr><td style="color:#64748b;width:110px;">Service</td><td style="color:#111827;">${escapeHtml(lead.service || "-")}</td></tr>
      </table>
      <div style="margin-top:22px;padding:18px 20px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;color:#111827;font-size:15px;line-height:1.7;">
        <strong style="display:block;margin-bottom:8px;">Message</strong>
        ${escapeHtml(lead.message).replace(/\n/g, "<br />")}
      </div>
    `,
  });
}

export function createVerificationToken(lead: Lead) {
  const secret = process.env.VERIFY_SECRET;
  if (!secret || (process.env.NODE_ENV === "production" && secret.startsWith("replace-with-"))) {
    throw new Error("VERIFY_SECRET is required");
  }

  const payload: VerificationPayload = {
    exp: Date.now() + 30 * 60 * 1000,
    lead,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(body).digest("base64url");

  return `${body}.${signature}`;
}

export function parseVerificationToken(token: string) {
  const secret = process.env.VERIFY_SECRET;
  if (!secret || (process.env.NODE_ENV === "production" && secret.startsWith("replace-with-"))) {
    throw new Error("VERIFY_SECRET is required");
  }

  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as VerificationPayload;
  if (!payload.exp || payload.exp < Date.now()) {
    return null;
  }

  return payload.lead;
}

export function getTokenHash(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function sendLeadEmail(lead: Lead) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"OutSourceWise Website" <${process.env.GMAIL_USER}>`,
    to: process.env.TO_EMAIL || process.env.GMAIL_USER,
    replyTo: lead.email,
    subject: `Verified Consultation - ${lead.name}`,
    html: leadEmailHtml(lead),
    attachments: logoAttachments(),
    text: `
      Name: ${lead.name}
      Email: ${lead.email}
      Company: ${lead.company || "-"}
      Service: ${lead.service || "-"}

      Message:
      ${lead.message}
    `.trim(),
  });
}
