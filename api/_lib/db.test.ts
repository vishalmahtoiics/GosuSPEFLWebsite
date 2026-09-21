import { describe, expect, test } from "vitest";
import { fakeOrdersRepo } from "./testing/fakeRepo.js";

const input = {
  sku: "valorant", plan: "full", amountPaise: 1500000, currency: "INR",
  name: "Arjun Mehta", email: "arjun@example.com", phone: "+919876543210",
  whatsappOptIn: true, provider: "paddle",
} as const;

describe("OrdersRepo contract (fake)", () => {
  test("create returns a pending order with id", async () => {
    const repo = fakeOrdersRepo();
    const order = await repo.create({ ...input });
    expect(order.id).toBeTruthy();
    expect(order.status).toBe("pending");
    expect(order.paymentsMade).toBe(0);
    expect(await repo.get(order.id)).toEqual(order);
  });

  test("get returns null for unknown id", async () => {
    expect(await fakeOrdersRepo().get("3f1d6f4e-0000-0000-0000-000000000000")).toBeNull();
  });

  test("markPaid transitions only once", async () => {
    const repo = fakeOrdersRepo();
    const { id } = await repo.create({ ...input });
    expect(await repo.markPaid(id)).toBe(true); // pending -> paid
    expect(await repo.markPaid(id)).toBe(false); // paid -> paid: idempotent, no duplicate delivery
    expect((await repo.get(id))!.status).toBe("paid");

    const { id: recoveredId } = await repo.create({ ...input });
    await repo.markFailed(recoveredId);
    expect((await repo.get(recoveredId))!.status).toBe("failed");
    expect(await repo.markPaid(recoveredId)).toBe(true); // failed -> paid: recovery on successful retry
    expect((await repo.get(recoveredId))!.status).toBe("paid");
  });

  test("markFailed only from pending", async () => {
    const repo = fakeOrdersRepo();
    const { id } = await repo.create({ ...input });
    await repo.markPaid(id);
    expect(await repo.markFailed(id)).toBe(false); // paid order stays paid
  });

  test("provider refs and instalment counter", async () => {
    const repo = fakeOrdersRepo();
    const { id } = await repo.create({ ...input, plan: "monthly", amountPaise: 250000 });
    await repo.setProviderTransaction(id, "txn_1");
    await repo.setProviderSubscription(id, "sub_1");
    expect(await repo.recordInstalmentPayment(id, "txn_a")).toBe(1);
    expect(await repo.recordInstalmentPayment(id, "txn_b")).toBe(2);
    const row = (await repo.get(id))!;
    expect(row.providerTransactionId).toBe("txn_1");
    expect(row.providerSubscriptionId).toBe("sub_1");
  });

  test("recordInstalmentPayment dedupes redelivered transaction ids", async () => {
    const repo = fakeOrdersRepo();
    const { id } = await repo.create({ ...input, plan: "monthly", amountPaise: 250000 });
    expect(await repo.recordInstalmentPayment(id, "txn_1")).toBe(1);
    expect(await repo.recordInstalmentPayment(id, "txn_1")).toBe(1); // redelivery of same txn: no increment
    expect(await repo.recordInstalmentPayment(id, "txn_2")).toBe(2); // distinct txn: increments
  });

  test("markCancelScheduled and markWelcomeEmailSent transition only once", async () => {
    const repo = fakeOrdersRepo();
    const { id } = await repo.create({ ...input });
    const created = (await repo.get(id))!;
    expect(created.cancelScheduled).toBe(false);
    expect(created.welcomeEmailSent).toBe(false);

    expect(await repo.markCancelScheduled(id)).toBe(true);
    expect(await repo.markCancelScheduled(id)).toBe(false); // idempotent
    expect((await repo.get(id))!.cancelScheduled).toBe(true);

    expect(await repo.markWelcomeEmailSent(id)).toBe(true);
    expect(await repo.markWelcomeEmailSent(id)).toBe(false); // idempotent
    expect((await repo.get(id))!.welcomeEmailSent).toBe(true);
  });

  test("returned records are snapshots, not live references", async () => {
    const repo = fakeOrdersRepo();
    const created = await repo.create({ ...input });
    await repo.markPaid(created.id);
    expect(created.status).toBe("pending"); // captured record must not mutate
    const a = (await repo.get(created.id))!;
    const b = (await repo.get(created.id))!;
    expect(a).toEqual(b);
    expect(a).not.toBe(b); // distinct objects
    a.status = "refunded";
    expect((await repo.get(created.id))!.status).toBe("paid"); // caller mutation must not corrupt repo state
  });
});
