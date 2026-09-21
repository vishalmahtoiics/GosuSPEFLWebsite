import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleGate } from "./_lib/talent/gate.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const result = handleGate(req.method ?? "GET", req.body, req.headers.cookie, process.env);
  if (result.setCookie) res.setHeader("Set-Cookie", result.setCookie);
  res.status(result.status).json(result.json);
}
