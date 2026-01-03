import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  try {
    const { name, email, company, service, message, website } = req.body as {
      name?: string;
      email?: string;
      company?: string;
      service?: string;
      message?: string;
      website?: string;
    };

    if (website && website.trim().length > 0) {
      // Silent success — bot thinks it worked
      return res.status(200).json({ ok: true });
    }

    if (!name || !email) {
      return res.status(400).json({
        ok: false,
        error: "Name and email are required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_APP_PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: `"OutSourceWise Website" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Consultation — ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "-"}
Service: ${service || "-"}

Message:
${message || "-"}
      `.trim(),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({
      ok: false,
      error: "Failed to send email",
    });
  }
}
