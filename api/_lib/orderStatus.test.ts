import { describe, expect, test } from "vitest";
import { fakeOrdersRepo } from "./testing/fakeRepo.js";
import { orderStatus } from "./orderStatus.js";

describe("orderStatus", () => {
  test("returns only status/sku/plan — never PII", async () => {
    const repo = fakeOrdersRepo();
    const { id } = await repo.create({
      sku: "bgmi", plan: "full", amountPaise: 1200000, currency: "INR",
      name: "Priya Sharma", email: "priya@example.com", phone: "+919812345670",
      whatsappOptIn: true, provider: "paddle",
    });
    const res = await orderStatus(id, repo);
    expect(res.status).toBe(200);
    expect(res.json).toEqual({ status: "pending", sku: "bgmi", plan: "full" });
  });

  test("400 on missing/malformed id (no db hit)", async () => {
    const repo = fakeOrdersRepo();
    expect((await orderStatus(undefined, repo)).status).toBe(400);
    expect((await orderStatus("not-a-uuid", repo)).status).toBe(400);
  });

  test("404 on unknown id", async () => {
    const res = await orderStatus("3f1d6f4e-0000-4000-8000-000000000000", fakeOrdersRepo());
    expect(res.status).toBe(404);
  });
});
