import { afterEach, describe, expect, test, vi } from "vitest";
import { createCheckout, fetchOrderStatus } from "./api";

afterEach(() => vi.unstubAllGlobals());

const payload = {
  sku: "valorant", plan: "full", name: "Arjun Mehta", email: "arjun@example.com",
  phone: "+919876543210", whatsappOptIn: true, termsAccepted: true,
} as const;

describe("createCheckout", () => {
  test("posts JSON and returns the session", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ orderId: "o1", provider: "paddle", transactionId: "txn_1" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const out = await createCheckout(payload);
    expect(out.transactionId).toBe("txn_1");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/checkout");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).sku).toBe("valorant");
  });

  test("throws the server error code on failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: "provider_error" }), { status: 502 }),
    ));
    await expect(createCheckout(payload)).rejects.toThrow("provider_error");
  });
});

describe("fetchOrderStatus", () => {
  test("returns parsed status, null on 404", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: "paid", sku: "bgmi", plan: "full" }), { status: 200 }),
    ));
    expect(await fetchOrderStatus("o1")).toEqual({ status: "paid", sku: "bgmi", plan: "full" });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
    expect(await fetchOrderStatus("o1")).toBeNull();
  });
});
