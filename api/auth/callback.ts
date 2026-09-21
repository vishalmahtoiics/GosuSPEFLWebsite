import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "../_lib/talent/gate.js";
import { handleAuthCallback } from "../_lib/talent/authCallback.js";
import { profilesRepo, authTokensRepo } from "../_lib/talent/repos.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  // POST only: a GET would let email/browser prefetch silently consume a single-use token.
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const secret = process.env.TALENT_SESSION_SECRET ?? "";
  if (secret === "") return res.status(500).json({ error: "misconfigured" });
  const rawToken = (req.body as { token?: unknown } | null)?.token;
  const token = typeof rawToken === "string" ? rawToken : "";
  const result = await handleAuthCallback(token, {
    tokens: authTokensRepo(),
    profiles: profilesRepo(),
    sessionSecret: secret,
    nowMs: Date.now(),
  });
  if (result.setCookie) res.setHeader("Set-Cookie", result.setCookie);
  res.status(result.status).json(result.json);
}
