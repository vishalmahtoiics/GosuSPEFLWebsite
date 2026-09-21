import { planAmountPaise } from "../../src/lib/catalog.js";
import { checkoutRequestSchema } from "../../src/lib/checkoutSchema.js";
import type { OrdersRepo } from "./db.js";
import type { PaymentProvider } from "./providers/types.js";

export async function handleCheckout(
  body: unknown,
  deps: { repo: OrdersRepo; provider: PaymentProvider },
): Promise<{ status: number; json: unknown }> {
  const parsed = checkoutRequestSchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, json: { error: "invalid_request", details: parsed.error.flatten() } };
  }
  const { sku, plan, name, email, phone, whatsappOptIn } = parsed.data;
  const amountPaise = planAmountPaise(sku, plan)!; // schema already guarantees the combo exists

  const order = await deps.repo.create({
    sku, plan, amountPaise, currency: "INR", name, email, phone, whatsappOptIn, provider: "paddle",
  });

  let session;
  try {
    session = await deps.provider.createCheckout({ orderId: order.id, sku, plan, email });
  } catch (err) {
    console.error("checkout provider error", err);
    await deps.repo.markFailed(order.id);
    return { status: 502, json: { error: "provider_error" } };
  }

  try {
    await deps.repo.setProviderTransaction(order.id, session.transactionId);
  } catch (err) {
    // Provider transaction exists; webhook matches by customData.orderId, so proceed.
    console.error("failed to persist provider transaction id", order.id, err);
  }

  return {
    status: 200,
    json: { orderId: order.id, provider: session.provider, transactionId: session.transactionId },
  };
}
