import { describe, expect, test, vi } from "vitest";
import type { EmailSender } from "./email.js";
import type { PaymentProvider } from "./providers/types.js";
import { fakeOrdersRepo } from "./testing/fakeRepo.js";
import { handlePaddleEvent } from "./handlePaddleWebhook.js";

function makeDeps() {
  const repo = fakeOrdersRepo();
  const sent: string[] = [];
  const email: EmailSender = { send: async (m) => void sent.push(m.to) };
  const cancel = vi.fn().mockResolvedValue(undefined);
  const provider = {
    createCheckout: vi.fn(),
    verifyWebhook: vi.fn(),
    cancelSubscriptionAtPeriodEnd: cancel,
  } as PaymentProvider;
  return { repo, email, provider, sent, cancel };
}

const base = {
  sku: "valorant", plan: "full", amountPaise: 1500000, currency: "INR",
  name: "Arjun Mehta", email: "arjun@example.com", phone: "+919876543210",
  whatsappOptIn: true, provider: "paddle",
} as const;

describe("handlePaddleEvent", () => {
  test("payment_completed marks paid and sends exactly one email (idempotent)", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base });
    const ev = { type: "payment_completed", orderId: id, subscriptionId: null, transactionId: "txn_1" } as const;
    await handlePaddleEvent(ev, d);
    await handlePaddleEvent(ev, d); // duplicate delivery
    expect((await d.repo.get(id))!.status).toBe("paid");
    expect(d.sent).toEqual(["arjun@example.com"]); // one email only
  });

  test("unknown orderId is a no-op", async () => {
    const d = makeDeps();
    await handlePaddleEvent(
      { type: "payment_completed", orderId: "3f1d6f4e-0000-0000-0000-000000000000", subscriptionId: null, transactionId: "txn_1" },
      d,
    );
    expect(d.sent).toHaveLength(0);
  });

  test("malformed orderId is ignored without ever touching the repo", async () => {
    const repo = {
      get: vi.fn().mockRejectedValue(new Error("must not be called with a malformed id")),
      create: vi.fn(),
      setProviderTransaction: vi.fn(),
      setProviderSubscription: vi.fn(),
      markPaid: vi.fn(),
      markFailed: vi.fn(),
      recordInstalmentPayment: vi.fn(),
      markCancelScheduled: vi.fn(),
      markWelcomeEmailSent: vi.fn(),
    };
    const email: EmailSender = { send: vi.fn() };
    const provider = {
      createCheckout: vi.fn(),
      verifyWebhook: vi.fn(),
      cancelSubscriptionAtPeriodEnd: vi.fn(),
    } as PaymentProvider;
    await expect(
      handlePaddleEvent(
        { type: "payment_completed", orderId: "not-a-uuid", subscriptionId: null, transactionId: "txn_1" },
        { repo, email, provider },
      ),
    ).resolves.not.toThrow();
    expect(repo.get).not.toHaveBeenCalled();
  });

  test("payment_failed only downgrades pending orders", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base });
    await d.repo.markPaid(id);
    await handlePaddleEvent({ type: "payment_failed", orderId: id }, d);
    expect((await d.repo.get(id))!.status).toBe("paid"); // failed renewal must not unmark paid
  });

  test("payment_failed transitions a pending order to failed", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base });
    await handlePaddleEvent({ type: "payment_failed", orderId: id }, d);
    expect((await d.repo.get(id))!.status).toBe("failed");
  });

  test("a failed order recovers to paid on successful retry, sending exactly one welcome email", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base });
    await handlePaddleEvent({ type: "payment_failed", orderId: id }, d);
    expect((await d.repo.get(id))!.status).toBe("failed");
    await handlePaddleEvent(
      { type: "payment_completed", orderId: id, subscriptionId: null, transactionId: "txn_retry" },
      d,
    );
    expect((await d.repo.get(id))!.status).toBe("paid");
    expect(d.sent).toEqual(["arjun@example.com"]);
  });

  test("subscription_created stores the subscription id", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base, plan: "monthly", amountPaise: 250000 });
    await handlePaddleEvent({ type: "subscription_created", orderId: id, subscriptionId: "sub_1" }, d);
    expect((await d.repo.get(id))!.providerSubscriptionId).toBe("sub_1");
  });

  test("6th instalment payment schedules subscription cancellation", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base, plan: "monthly", amountPaise: 250000 });
    for (let i = 1; i <= 6; i++) {
      await handlePaddleEvent(
        { type: "payment_completed", orderId: id, subscriptionId: "sub_1", transactionId: `txn_${i}` },
        d,
      );
    }
    expect((await d.repo.get(id))!.paymentsMade).toBe(6);
    expect(d.cancel).toHaveBeenCalledTimes(1);
    expect(d.cancel).toHaveBeenCalledWith("sub_1");
    expect(d.sent).toHaveLength(1); // welcome email only once, on first payment
  });

  test("duplicate delivery of the same instalment transaction id does not double-count", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base, plan: "monthly", amountPaise: 250000 });
    const ev = { type: "payment_completed", orderId: id, subscriptionId: "sub_1", transactionId: "txn_1" } as const;
    await handlePaddleEvent(ev, d);
    await handlePaddleEvent(ev, d); // redelivery, same txn id
    expect((await d.repo.get(id))!.paymentsMade).toBe(1);
    expect(d.sent).toHaveLength(1);
  });

  test("six distinct instalments cancel once; redelivering the final txn does not re-trigger cancel or recount", async () => {
    const d = makeDeps();
    const { id } = await d.repo.create({ ...base, plan: "monthly", amountPaise: 250000 });
    for (let i = 1; i <= 6; i++) {
      await handlePaddleEvent(
        { type: "payment_completed", orderId: id, subscriptionId: "sub_1", transactionId: `txn_${i}` },
        d,
      );
    }
    expect(d.cancel).toHaveBeenCalledTimes(1);

    await handlePaddleEvent(
      { type: "payment_completed", orderId: id, subscriptionId: "sub_1", transactionId: "txn_6" },
      d,
    ); // redelivery of the final txn
    expect(d.cancel).toHaveBeenCalledTimes(1);
    expect((await d.repo.get(id))!.paymentsMade).toBe(6);
  });

  test("cancel failure on the final instalment is retried on redelivery until it succeeds", async () => {
    const d = makeDeps();
    d.cancel.mockRejectedValueOnce(new Error("paddle down"));
    const { id } = await d.repo.create({ ...base, plan: "monthly", amountPaise: 250000 });
    for (let i = 1; i <= 5; i++) {
      await handlePaddleEvent(
        { type: "payment_completed", orderId: id, subscriptionId: "sub_1", transactionId: `txn_${i}` },
        d,
      );
    }
    const sixth = { type: "payment_completed", orderId: id, subscriptionId: "sub_1", transactionId: "txn_6" } as const;
    await expect(handlePaddleEvent(sixth, d)).rejects.toThrow("paddle down");
    expect((await d.repo.get(id))!.paymentsMade).toBe(6);
    expect((await d.repo.get(id))!.cancelScheduled).toBe(false);

    await handlePaddleEvent(sixth, d); // redelivery of the same txn id
    expect((await d.repo.get(id))!.paymentsMade).toBe(6); // not recounted
    expect(d.cancel).toHaveBeenCalledTimes(2);
    expect((await d.repo.get(id))!.cancelScheduled).toBe(true);
  });

  test("email failure after markPaid is retried on redelivery without double-counting the instalment", async () => {
    const d = makeDeps();
    let calls = 0;
    d.email.send = async (m) => {
      calls++;
      if (calls === 1) throw new Error("resend down");
      d.sent.push(m.to);
    };
    const { id } = await d.repo.create({ ...base, plan: "monthly", amountPaise: 250000 });
    const ev = { type: "payment_completed", orderId: id, subscriptionId: "sub_1", transactionId: "txn_1" } as const;
    await expect(handlePaddleEvent(ev, d)).rejects.toThrow("resend down");
    expect((await d.repo.get(id))!.status).toBe("paid");
    expect((await d.repo.get(id))!.paymentsMade).toBe(0); // instalment not recorded before email settled

    await handlePaddleEvent(ev, d); // redelivery, same txn id
    expect(d.sent).toEqual(["arjun@example.com"]); // exactly one successful send
    expect((await d.repo.get(id))!.paymentsMade).toBe(1); // no double count
  });
});
