import type { OrdersRepo } from "./db.js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function orderStatus(
  id: string | undefined,
  repo: OrdersRepo,
): Promise<{ status: number; json: unknown }> {
  if (!id || !UUID_RE.test(id)) return { status: 400, json: { error: "invalid_id" } };
  const order = await repo.get(id);
  if (!order) return { status: 404, json: { error: "not_found" } };
  return { status: 200, json: { status: order.status, sku: order.sku, plan: order.plan } };
}
