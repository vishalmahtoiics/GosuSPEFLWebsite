import { describe, expect, test } from "vitest";
import { CATALOG, formatInr, getOffering, planAmountPaise } from "./catalog";

describe("catalog", () => {
  test("spec prices in paise", () => {
    expect(CATALOG.valorant.plans.full.amountPaise).toBe(1000000);
    expect(CATALOG.valorant.plans.monthly).toEqual({ amountPaise: 170000, cycles: 6 });
    expect(CATALOG.bgmi.plans.full.amountPaise).toBe(1000000);
    expect(CATALOG.bgmi.plans.monthly).toEqual({ amountPaise: 170000, cycles: 6 });
    expect(CATALOG["bgmi-squad"].plans.full.amountPaise).toBe(3600000);
    expect(CATALOG["bgmi-squad"].plans.monthly).toBeUndefined();
    expect(CATALOG["valorant-squad"].plans.full.amountPaise).toBe(4500000);
    expect(CATALOG["valorant-squad"].plans.monthly).toBeUndefined();
  });

  test("getOffering rejects unknown skus", () => {
    expect(getOffering("valorant")?.label).toBe("Valorant Season");
    expect(getOffering("csgo")).toBeNull();
  });

  test("planAmountPaise", () => {
    expect(planAmountPaise("valorant", "monthly")).toBe(170000);
    expect(planAmountPaise("bgmi-squad", "monthly")).toBeNull();
    expect(planAmountPaise("valorant-squad", "full")).toBe(4500000);
  });

  test("formatInr uses Indian grouping", () => {
    expect(formatInr(1000000)).toBe("₹10,000");
    expect(formatInr(3600000)).toBe("₹36,000");
    expect(formatInr(4500000)).toBe("₹45,000");
  });
});
