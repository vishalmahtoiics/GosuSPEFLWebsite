import { Environment, EventName, Paddle } from "@paddle/paddle-node-sdk";
import type { Plan, Sku } from "../../../src/lib/catalog.js";
import type { NormalizedEvent, PaymentProvider } from "./types.js";

const PRICE_ENV: Record<Sku, Partial<Record<Plan, string>>> = {
  valorant: { full: "PADDLE_PRICE_VALORANT_FULL", monthly: "PADDLE_PRICE_VALORANT_MONTHLY" },
  bgmi: { full: "PADDLE_PRICE_BGMI_FULL", monthly: "PADDLE_PRICE_BGMI_MONTHLY" },
  "bgmi-squad": { full: "PADDLE_PRICE_BGMI_SQUAD" },
  "valorant-squad": { full: "PADDLE_PRICE_VALORANT_SQUAD" },
  coaching: { full: "PADDLE_PRICE_COACHING_FULL", monthly: "PADDLE_PRICE_COACHING_MONTHLY" },
  "tournament-ops": { full: "PADDLE_PRICE_TOURNAMENT_OPS_FULL", monthly: "PADDLE_PRICE_TOURNAMENT_OPS_MONTHLY" },
};

export function paddlePriceId(sku: Sku, plan: Plan): string {
  const envName = PRICE_ENV[sku][plan];
  const value = envName ? process.env[envName] : undefined;
  if (!value) throw new Error(`Missing Paddle price id env for ${sku}/${plan}`);
  return value;
}

function defaultClient(): Paddle {
  return new Paddle(process.env.PADDLE_API_KEY ?? "", {
    environment: process.env.PADDLE_ENV === "production" ? Environment.production : Environment.sandbox,
  });
}

function orderIdOf(data: unknown): string | null {
  const custom = (data as { customData?: unknown })?.customData;
  const orderId = (custom as { orderId?: unknown })?.orderId;
  return typeof orderId === "string" ? orderId : null;
}

export function paddleProvider(client: Paddle = defaultClient()): PaymentProvider {
  return {
    async createCheckout({ orderId, sku, plan }) {
      const txn = await client.transactions.create({
        items: [{ priceId: paddlePriceId(sku, plan), quantity: 1 }],
        customData: { orderId },
      });
      return { provider: "paddle", transactionId: txn.id };
    },

    async verifyWebhook(rawBody, signatureHeader): Promise<NormalizedEvent> {
      const secret = process.env.PADDLE_WEBHOOK_SECRET;
      if (!secret) throw new Error("PADDLE_WEBHOOK_SECRET is not set");
      // throws on signature mismatch
      const event = await client.webhooks.unmarshal(rawBody, secret, signatureHeader);
      switch (event.eventType) {
        case EventName.TransactionCompleted: {
          const orderId = orderIdOf(event.data);
          if (!orderId) return { type: "ignored" };
          const subscriptionId = (event.data as { subscriptionId?: string | null }).subscriptionId ?? null;
          return { type: "payment_completed", orderId, subscriptionId, transactionId: event.data.id };
        }
        case EventName.TransactionPaymentFailed: {
          const orderId = orderIdOf(event.data);
          return orderId ? { type: "payment_failed", orderId } : { type: "ignored" };
        }
        case EventName.SubscriptionCreated: {
          const orderId = orderIdOf(event.data);
          return orderId
            ? { type: "subscription_created", orderId, subscriptionId: event.data.id }
            : { type: "ignored" };
        }
        default:
          return { type: "ignored" };
      }
    },

    async cancelSubscriptionAtPeriodEnd(subscriptionId) {
      await client.subscriptions.cancel(subscriptionId, { effectiveFrom: "next_billing_period" });
    },
  };
}
