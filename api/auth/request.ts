import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "../_lib/talent/gate.js";
import { handleAuthRequest, parseStaffEmails } from "../_lib/talent/authRequest.js";
import { profilesRepo, authTokensRepo } from "../_lib/talent/repos.js";
import { emailSender } from "../_lib/email/index.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  // Build magic-link URLs only from a trusted, configured base — never the client-controlled
  // Host header. Host-header poisoning would let an attacker point a victim's magic link at a
  // malicious host and harvest the single-use token. Fail closed if unset (like the session secret).
  const baseUrl = process.env.PUBLIC_BASE_URL ?? "";
  if (baseUrl === "") return res.status(500).json({ error: "misconfigured" });
  const staffEmails = parseStaffEmails(process.env.TALENT_STAFF_EMAILS);
  const result = await handleAuthRequest(req.body, {
    profiles: profilesRepo(),
    tokens: authTokensRepo(),
    email: emailSender(process.env),
    staffEmails,
    baseUrl,
    nowMs: Date.now(),
  });
  res.status(result.status).json(result.json);
}
