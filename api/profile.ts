import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "./_lib/talent/gate.js";
import { readSession } from "./_lib/talent/session.js";
import { handleMyProfile } from "./_lib/talent/myProfile.js";
import { handleProfileSave } from "./_lib/talent/profileSave.js";
import { profilesRepo, credentialsRepo } from "./_lib/talent/repos.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  const secret = process.env.TALENT_SESSION_SECRET ?? "";
  if (secret === "") return res.status(500).json({ error: "misconfigured" });
  const session = readSession(req.headers.cookie, secret, Date.now());
  if (!session) return res.status(401).json({ error: "unauthorized" });
  if (req.method === "GET") {
    const result = await handleMyProfile(session, profilesRepo(), credentialsRepo());
    return res.status(result.status).json(result.json);
  }
  if (req.method === "POST") {
    const result = await handleProfileSave(session, req.body, profilesRepo());
    return res.status(result.status).json(result.json);
  }
  return res.status(405).json({ error: "method_not_allowed" });
}
