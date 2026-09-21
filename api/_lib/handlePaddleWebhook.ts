import { CATALOG, type Sku } from "../../src/lib/catalog.js";
import type { OrdersRepo } from "./db.js";
import type { EmailSender } from "./email.js";
import { fulfillOrder } from "./fulfill.js";
import type { NormalizedEvent, PaymentProvider } from "./providers/types.js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function handlePaddleEvent(
  event: NormalizedEvent,
  deps: { repo: OrdersRepo; email: EmailSender; provider: PaymentProvider },
): Promise<void> {
  if ("orderId" in event && !UUID_RE.test(event.orderId)) return; // malformed id: ignore, never hits the repo
  switch (event.type) {
    case "payment_completed": {
      const order = await deps.repo.get(event.orderId);
      if (!order) return;
      if (event.subscriptionId && !order.providerSubscriptionId) {
        await deps.repo.setProviderSubscription(order.id, event.subscriptionId);
      }
      await deps.repo.markPaid(order.id);
      const fresh = await deps.repo.get(order.id);
      if (fresh && fresh.status === "paid" && !fresh.welcomeEmailSent) {
        await fulfillOrder(fresh, deps.email); // a throw here surfaces to the endpoint → 500 → Paddle retries → email retried
        await deps.repo.markWelcomeEmailSent(order.id);
      }
      if (order.plan === "monthly") {
        const made = await deps.repo.recordInstalmentPayment(order.id, event.transactionId);
        const cycles = CATALOG[order.sku as Sku]?.plans.monthly?.cycles ?? 0;
        const subId = event.subscriptionId ?? order.providerSubscriptionId;
        if (cycles > 0 && made >= cycles && subId) {
          const current = await deps.repo.get(order.id);
          if (current && !current.cancelScheduled) {
            // cancel BEFORE marking: a failed cancel must stay retryable; duplicate cancel attempts are harmless vs indefinite billing
            await deps.provider.cancelSubscriptionAtPeriodEnd(subId);
            await deps.repo.markCancelScheduled(order.id);
          }
        }
      }
      return;
    }
    case "payment_failed": {
      await deps.repo.markFailed(event.orderId);
      return;
    }
    case "subscription_created": {
      await deps.repo.setProviderSubscription(event.orderId, event.subscriptionId);
      return;
    }
    case "ignored":
      return;
  }
}
