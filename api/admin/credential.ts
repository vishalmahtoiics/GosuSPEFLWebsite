import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "../_lib/talent/gate.js";
import { staffOnly } from "../_lib/talent/adminGuard.js";
import { handleAdminIssueCredential } from "../_lib/talent/admin.js";
import { credentialsRepo } from "../_lib/talent/repos.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  const guard = staffOnly(req);
  if ("error" in guard) return res.status(guard.error.status).json(guard.error.json);
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const result = await handleAdminIssueCredential(guard.session, req.body, credentialsRepo());
  res.status(result.status).json(result.json);
}
