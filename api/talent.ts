import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "./_lib/talent/gate.js";
import { handleList } from "./_lib/talent/talentList.js";
import { profilesRepo } from "./_lib/talent/repos.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  const result = await handleList(req.query, profilesRepo());
  res.status(result.status).json(result.json);
}
