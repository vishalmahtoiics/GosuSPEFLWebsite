import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkGate } from "../_lib/talent/gate.js";
import { staffOnly } from "../_lib/talent/adminGuard.js";
import { handleAdminListMessages, handleAdminSetMessageStatus } from "../_lib/talent/admin.js";
import { contactMessagesRepo } from "../_lib/talent/repos.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkGate(req.headers.cookie, process.env).allowed) {
    return res.status(403).json({ error: "gated" });
  }
  const guard = staffOnly(req);
  if ("error" in guard) return res.status(guard.error.status).json(guard.error.json);
  const { session } = guard;
  if (req.method === "GET") {
    const result = await handleAdminListMessages(session, contactMessagesRepo());
    return res.status(result.status).json(result.json);
  }
  if (req.method === "POST") {
    const result = await handleAdminSetMessageStatus(session, req.body, contactMessagesRepo());
    return res.status(result.status).json(result.json);
  }
  return res.status(405).json({ error: "method_not_allowed" });
}
