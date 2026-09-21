import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "../_lib/talent/gate.js";
import { handleProfile } from "../_lib/talent/talentProfile.js";
import { profilesRepo, credentialsRepo } from "../_lib/talent/repos.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  const handle = Array.isArray(req.query.handle) ? req.query.handle[0] : req.query.handle;
  if (!handle) return res.status(400).json({ error: "missing_handle" });
  const result = await handleProfile(handle, profilesRepo(), credentialsRepo());
  res.status(result.status).json(result.json);
}
