import { describe, expect, test } from "vitest";
import { checkoutRequestSchema, normalizeIndianPhone } from "./checkoutSchema";

const valid = {
  sku: "valorant",
  plan: "monthly",
  name: "Arjun Mehta",
  email: "arjun@example.com",
  phone: "98765 43210",
  whatsappOptIn: true,
  termsAccepted: true,
};

describe("normalizeIndianPhone", () => {
  test("accepts 10-digit, 91-, +91-, 0-prefixed; strips spaces/dashes", () => {
    for (const raw of ["9876543210", "+91 98765-43210", "919876543210", "09876543210"]) {
      expect(normalizeIndianPhone(raw)).toBe("+919876543210");
    }
  });
  test("rejects non-mobile and garbage", () => {
    expect(normalizeIndianPhone("1234567890")).toBeNull(); // must start 6-9
    expect(normalizeIndianPhone("98765")).toBeNull();
    expect(normalizeIndianPhone("not a phone")).toBeNull();
  });
});

describe("checkoutRequestSchema", () => {
  test("valid request parses with normalized phone", () => {
    const out = checkoutRequestSchema.parse(valid);
    expect(out.phone).toBe("+919876543210");
  });
  test("rejects terms not accepted", () => {
    expect(checkoutRequestSchema.safeParse({ ...valid, termsAccepted: false }).success).toBe(false);
  });
  test("rejects plan not offered for sku", () => {
    expect(checkoutRequestSchema.safeParse({ ...valid, sku: "bgmi-squad", plan: "monthly" }).success).toBe(false);
  });
  test("rejects unknown sku, bad email, short name", () => {
    expect(checkoutRequestSchema.safeParse({ ...valid, sku: "csgo" }).success).toBe(false);
    expect(checkoutRequestSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(checkoutRequestSchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
  });
});
