import { describe, expect, test, vi } from "vitest";
import type { PaymentProvider } from "./providers/types.js";
import { fakeOrdersRepo } from "./testing/fakeRepo.js";
import { handleCheckout } from "./handleCheckout.js";

const validBody = {
  sku: "bgmi", plan: "full", name: "Priya Sharma", email: "priya@example.com",
  phone: "9812345670", whatsappOptIn: true, termsAccepted: true,
};

function stubProvider(overrides: Partial<PaymentProvider> = {}): PaymentProvider {
  return {
    createCheckout: vi.fn().mockResolvedValue({ provider: "paddle", transactionId: "txn_ok" }),
    verifyWebhook: vi.fn(),
    cancelSubscriptionAtPeriodEnd: vi.fn(),
    ...overrides,
  };
}

describe("handleCheckout", () => {
  test("happy path: creates pending order, returns transaction", async () => {
    const repo = fakeOrdersRepo();
    const res = await handleCheckout(validBody, { repo, provider: stubProvider() });
    expect(res.status).toBe(200);
    const json = res.json as { orderId: string; provider: string; transactionId: string };
    expect(json.provider).toBe("paddle");
    expect(json.transactionId).toBe("txn_ok");
    const order = (await repo.get(json.orderId))!;
    expect(order.status).toBe("pending");
    expect(order.amountPaise).toBe(1000000);       // derived server-side, not from client (₹10,000)
    expect(order.phone).toBe("+919812345670");
    expect(order.providerTransactionId).toBe("txn_ok");
  });

  test("invalid body → 400, no order created", async () => {
    const repo = fakeOrdersRepo();
    const res = await handleCheckout({ ...validBody, termsAccepted: false }, { repo, provider: stubProvider() });
    expect(res.status).toBe(400);
    expect(repo.rows.size).toBe(0);
  });

  test("provider failure → 502 and order marked failed", async () => {
    const repo = fakeOrdersRepo();
    const provider = stubProvider({ createCheckout: vi.fn().mockRejectedValue(new Error("paddle down")) });
    const res = await handleCheckout(validBody, { repo, provider });
    expect(res.status).toBe(502);
    const [order] = [...repo.rows.values()];
    expect(order.status).toBe("failed");
  });

  test("db write failure after provider success does not fail the order", async () => {
    const repo = fakeOrdersRepo();
    repo.setProviderTransaction = async () => { throw new Error("db blip"); };
    const res = await handleCheckout(validBody, { repo, provider: stubProvider() });
    expect(res.status).toBe(200);
    const [order] = [...repo.rows.values()];
    expect(order.status).toBe("pending"); // NOT failed — payment can proceed
    const json = res.json as { transactionId: string };
    expect(json.transactionId).toBe("txn_ok");
  });
});
