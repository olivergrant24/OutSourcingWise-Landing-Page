import type { VercelRequest, VercelResponse } from "@vercel/node";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  confirmationEmailHtml,
  createTransporter,
  getTokenHash,
  logoAttachment,
  parseVerificationToken,
  sendLeadEmail,
} from "./contact-utils.js";

const verifiedTokens = new Map<string, number>();
const TOKEN_REPLAY_WINDOW_MS = 60 * 60 * 1000;
const usedTokenDir = path.join(os.tmpdir(), "outsourcewise-used-verification-tokens");

function html(title: string, message: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Arial, sans-serif;
        color: #111827;
        background: #f8fafc;
      }
      main {
        width: min(92vw, 520px);
        padding: 32px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background: white;
        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
      }
      h1 {
        margin: 0 0 12px;
        font-size: 28px;
      }
      p {
        margin: 0;
        line-height: 1.6;
        color: #4b5563;
      }
      a {
        color: #2563eb;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <p>${message}</p>
    </main>
  </body>
</html>`;
}

function cleanMemoryCache() {
  const now = Date.now();
  for (const [hash, timestamp] of verifiedTokens) {
    if (now - timestamp > TOKEN_REPLAY_WINDOW_MS) {
      verifiedTokens.delete(hash);
    }
  }
}

async function claimVerificationToken(token: string) {
  cleanMemoryCache();
  const now = Date.now();
  const hash = getTokenHash(token);

  if (verifiedTokens.has(hash)) {
    return false;
  }

  await fs.mkdir(usedTokenDir, { recursive: true });
  const markerPath = path.join(usedTokenDir, hash);

  try {
    const fileHandle = await fs.open(markerPath, "wx");
    await fileHandle.writeFile(String(Date.now()));
    await fileHandle.close();
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "EEXIST") {
      verifiedTokens.set(hash, Date.now());
      return false;
    }

    throw err;
  }

  verifiedTokens.set(hash, now);
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed");
  }

  const token = typeof req.query.token === "string" ? req.query.token : "";
  if (!token) {
    return res
      .status(400)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(html("Link expired", "This verification link is invalid."));
  }

  try {
    const lead = parseVerificationToken(token);
    if (!lead) {
      return res
        .status(400)
        .setHeader("Content-Type", "text/html; charset=utf-8")
        .send(html("Link expired", "This verification link is invalid or has expired."));
    }

    if (!(await claimVerificationToken(token))) {
      return res
        .status(200)
        .setHeader("Content-Type", "text/html; charset=utf-8")
        .send(
          html(
            "Already confirmed",
            "This request has already been confirmed. You do not need to do anything else."
          )
        );
    }

    await sendLeadEmail(lead);

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"OutSourceWise Website" <${process.env.GMAIL_USER}>`,
      to: lead.email,
      subject: "Your OutSourceWise request is confirmed",
      html: confirmationEmailHtml(lead),
      attachments: [logoAttachment()],
      text: `
        Hi ${lead.name},

        Your consultation request has been confirmed. One of our account managers will be in touch within 24 hours.
      `.trim(),
    });

    return res
      .status(200)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(
        html(
          "Request confirmed",
          "Thanks for confirming your email. Your consultation request has been sent to our team."
        )
      );
  } catch (err) {
    console.error("Verification error:", err);
    return res
      .status(500)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(html("Something went wrong", "We could not confirm this request. Please try again later."));
  }
}
