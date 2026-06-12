import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createTransporter,
  createVerificationToken,
  getBaseUrl,
  logoAttachment,
  verificationEmailHtml,
  type Lead,
} from "./contact-utils.js";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const MIN_SUBMIT_TIME_MS = 3000;
const MAX_MESSAGE_LENGTH = 2000;

const disposableDomains = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "sharklasers.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
]);

const submissionsByIp = new Map<string, number[]>();

function getHeader(req: VercelRequest, name: string) {
  const value = req.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

function getClientIp(req: VercelRequest) {
  const forwardedFor = getHeader(req, "x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentSubmissions = (submissionsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentSubmissions.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, recentSubmissions);
    return true;
  }

  submissionsByIp.set(ip, [...recentSubmissions, now]);
  return false;
}

function isValidEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

async function verifyTurnstile(token: string, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || secret.startsWith("your-")) {
    return process.env.NODE_ENV !== "production";
  }

  if (!token) {
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: remoteIp,
    }),
  });
  const result = (await response.json()) as { success?: boolean };

  return result.success === true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  try {
    const {
      name,
      email,
      company,
      service,
      message,
      startedAt,
      turnstileToken,
    } = req.body as {
      name?: string;
      email?: string;
      company?: string;
      service?: string;
      message?: string;
      startedAt?: string;
      turnstileToken?: string;
    };

    const clientIp = getClientIp(req);
    const trimmedName = name?.trim() || "";
    const trimmedEmail = email?.trim().toLowerCase() || "";
    const trimmedMessage = message?.trim() || "";
    const submittedAt = Number(startedAt);
    const emailDomain = trimmedEmail.split("@")[1] || "";

    if (Number.isFinite(submittedAt) && Date.now() - submittedAt < MIN_SUBMIT_TIME_MS) {
      return res.status(400).json({
        ok: false,
        error: "Please wait a moment before submitting",
      });
    }

    if (!(await verifyTurnstile(turnstileToken || "", clientIp))) {
      return res.status(400).json({
        ok: false,
        error: "Please complete the security check",
      });
    }

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        ok: false,
        error: "Name, email, and message are required",
      });
    }

    if (!isValidEmailFormat(trimmedEmail)) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address",
      });
    }

    if (disposableDomains.has(emailDomain)) {
      return res.status(400).json({
        ok: false,
        error: "Please use a permanent email address",
      });
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        ok: false,
        error: "Message must be 2,000 characters or fewer",
      });
    }

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        ok: false,
        error: "Too many submissions. Please try again later.",
      });
    }

    const lead: Lead = {
      name: trimmedName,
      email: trimmedEmail,
      company: company?.trim() || "",
      service: service?.trim() || "",
      message: trimmedMessage,
    };
    const baseUrl = getBaseUrl(req);
    const verificationUrl = `${baseUrl}/api/verify?token=${encodeURIComponent(
      createVerificationToken(lead)
    )}`;
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"OutSourceWise Website" <${process.env.GMAIL_USER}>`,
      to: lead.email,
      subject: "Confirm your OutSourceWise consultation request",
      html: verificationEmailHtml(lead, verificationUrl),
      attachments: [logoAttachment()],
      text: `
        Hi ${lead.name},

        Please confirm your consultation request by opening this link:
        ${verificationUrl}

        This link expires in 30 minutes. If you did not submit this request, you can ignore this email.
      `.trim(),
    });

    return res.status(200).json({ ok: true, verificationRequired: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({
      ok: false,
      error: "Failed to send email",
    });
  }
}
