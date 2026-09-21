import { createHmac } from "node:crypto";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Paddle } from "@paddle/paddle-node-sdk";
import { paddlePriceId, paddleProvider } from "./paddle.js";

const TEST_WEBHOOK_SECRET = "unit-test-notification-secret";

function signedHeader(body: string): string {
  const ts = Math.floor(Date.now() / 1000);
  const h1 = createHmac("sha256", TEST_WEBHOOK_SECRET).update(`${ts}:${body}`).digest("hex");
  return `ts=${ts};h1=${h1}`;
}

function webhookBody(eventType: string, data: Record<string, unknown>): string {
  return JSON.stringify({
    event_id: "evt_01test",
    event_type: eventType,
    occurred_at: new Date().toISOString(),
    notification_id: "ntf_01test",
    data,
  });
}

beforeEach(() => {
  process.env.PADDLE_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;
  process.env.PADDLE_PRICE_VALORANT_FULL = "pri_val_full";
  process.env.PADDLE_PRICE_VALORANT_MONTHLY = "pri_val_month";
  process.env.PADDLE_PRICE_BGMI_FULL = "pri_bgmi_full";
  process.env.PADDLE_PRICE_BGMI_MONTHLY = "pri_bgmi_month";
  process.env.PADDLE_PRICE_BGMI_SQUAD = "pri_bgmi_squad";
});

describe("paddlePriceId", () => {
  test("maps sku+plan to env vars", () => {
    expect(paddlePriceId("valorant", "full")).toBe("pri_val_full");
    expect(paddlePriceId("bgmi", "monthly")).toBe("pri_bgmi_month");
    expect(paddlePriceId("bgmi-squad", "full")).toBe("pri_bgmi_squad");
  });
  test("throws when env missing", () => {
    delete process.env.PADDLE_PRICE_BGMI_SQUAD;
    expect(() => paddlePriceId("bgmi-squad", "full")).toThrow();
  });
});

describe("createCheckout", () => {
  test("creates a Paddle transaction with orderId in customData", async () => {
    const create = vi.fn().mockResolvedValue({ id: "txn_123" });
    const client = { transactions: { create } } as unknown as Paddle;
    const session = await paddleProvider(client).createCheckout({
      orderId: "order-1", sku: "valorant", plan: "full", email: "a@b.com",
    });
    expect(session).toEqual({ provider: "paddle", transactionId: "txn_123" });
    expect(create).toHaveBeenCalledWith({
      items: [{ priceId: "pri_val_full", quantity: 1 }],
      customData: { orderId: "order-1" },
    });
  });
});

describe("verifyWebhook", () => {
  const client = new Paddle("test_api_key"); // unmarshal is local crypto, no network
  const provider = () => paddleProvider(client);

  test("throws when PADDLE_WEBHOOK_SECRET is unset (fail closed)", async () => {
    delete process.env.PADDLE_WEBHOOK_SECRET;
    const body = webhookBody("transaction.completed", {
      id: "txn_1", status: "completed", custom_data: { orderId: "o1" }, items: [], payments: [],
    });
    await expect(provider().verifyWebhook(body, signedHeader(body))).rejects.toThrow(/PADDLE_WEBHOOK_SECRET/);
  });

  test("rejects a tampered body", async () => {
    const body = webhookBody("transaction.completed", {
      id: "txn_1", custom_data: { orderId: "o1" }, items: [], payments: [],
    });
    const header = signedHeader(body);
    await expect(provider().verifyWebhook(body.replace("o1", "o2"), header)).rejects.toThrow(/Webhook signature verification failed/);
  });

  test("transaction.completed → payment_completed", async () => {
    const body = webhookBody("transaction.completed", {
      id: "txn_1", status: "completed", custom_data: { orderId: "o1" }, subscription_id: "sub_9",
      items: [], payments: [],
    });
    const event = await provider().verifyWebhook(body, signedHeader(body));
    expect(event).toEqual({ type: "payment_completed", orderId: "o1", subscriptionId: "sub_9", transactionId: "txn_1" });
  });

  test("transaction.payment_failed → payment_failed", async () => {
    const body = webhookBody("transaction.payment_failed", {
      id: "txn_1", status: "past_due", custom_data: { orderId: "o1" },
      items: [], payments: [],
    });
    const event = await provider().verifyWebhook(body, signedHeader(body));
    expect(event).toEqual({ type: "payment_failed", orderId: "o1" });
  });

  test("subscription.created → subscription_created", async () => {
    const body = webhookBody("subscription.created", {
      id: "sub_9", status: "active", custom_data: { orderId: "o1" },
      items: [], billing_cycle: { interval: null, frequency: null },
    });
    const event = await provider().verifyWebhook(body, signedHeader(body));
    expect(event).toEqual({ type: "subscription_created", orderId: "o1", subscriptionId: "sub_9" });
  });

  test("unrelated events and missing orderId → ignored", async () => {
    const body = webhookBody("product.updated", { id: "pro_1" });
    expect(await provider().verifyWebhook(body, signedHeader(body))).toEqual({ type: "ignored" });
    const noOrder = webhookBody("transaction.completed", {
      id: "txn_1", status: "completed", items: [], payments: [],
    });
    expect(await provider().verifyWebhook(noOrder, signedHeader(noOrder))).toEqual({ type: "ignored" });
  });
});
