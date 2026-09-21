import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "../_lib/talent/gate.js";
import { handleVerify } from "../_lib/talent/verify.js";
import { credentialsRepo } from "../_lib/talent/repos.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ error: "missing_id" });
  const result = await handleVerify(id, credentialsRepo());
  res.status(result.status).json(result.json);
}
