import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "./_lib/talent/gate.js";
import { hashIp, handleContact } from "./_lib/talent/contact.js";
import { parseStaffEmails } from "./_lib/talent/authRequest.js";
import { profilesRepo, contactMessagesRepo } from "./_lib/talent/repos.js";
import { emailSender } from "./_lib/email/index.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const secret = process.env.TALENT_SESSION_SECRET ?? "";
  if (secret === "") return res.status(500).json({ error: "misconfigured" });

  const fwd = req.headers["x-forwarded-for"];
  const ipRaw =
    (Array.isArray(fwd) ? fwd[0] : fwd)?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const ipHash = hashIp(ipRaw, secret);

  // `||` (not `??`) so an empty TALENT_CONTACT_INBOX="" still falls back to the staff allowlist.
  const staffInbox =
    process.env.TALENT_CONTACT_INBOX || parseStaffEmails(process.env.TALENT_STAFF_EMAILS)[0] || "";

  const result = await handleContact(req.body, ipHash, {
    profiles: profilesRepo(),
    messages: contactMessagesRepo(),
    email: emailSender(process.env),
    staffInbox,
    nowMs: Date.now(),
  });
  res.status(result.status).json(result.json);
}
