import type { Plan, Sku } from "../../../src/lib/catalog.js";

export interface CheckoutSession {
  provider: "paddle" | "razorpay";
  transactionId: string;
}

export type NormalizedEvent =
  | { type: "payment_completed"; orderId: string; subscriptionId: string | null; transactionId: string }
  | { type: "payment_failed"; orderId: string }
  | { type: "subscription_created"; orderId: string; subscriptionId: string }
  | { type: "ignored" };

export interface PaymentProvider {
  createCheckout(args: { orderId: string; sku: Sku; plan: Plan; email: string }): Promise<CheckoutSession>;
  /** Verifies the webhook signature and returns a normalized event. Throws on invalid signature. */
  verifyWebhook(rawBody: string, signatureHeader: string): Promise<NormalizedEvent>;
  cancelSubscriptionAtPeriodEnd(subscriptionId: string): Promise<void>;
}
