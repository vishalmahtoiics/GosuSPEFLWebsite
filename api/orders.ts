import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neonOrdersRepo } from "./_lib/db.js";
import { orderStatus } from "./_lib/orderStatus.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });
  const id = typeof req.query.id === "string" ? req.query.id : undefined;
  const result = await orderStatus(id, neonOrdersRepo(process.env.DATABASE_URL!));
  return res.status(result.status).json(result.json);
}
