import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neonOrdersRepo } from "./_lib/db.js";
import { handleCheckout } from "./_lib/handleCheckout.js";
import { paddleProvider } from "./_lib/providers/paddle.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const result = await handleCheckout(req.body, {
    repo: neonOrdersRepo(process.env.DATABASE_URL!),
    provider: paddleProvider(),
  });
  return res.status(result.status).json(result.json);
}
