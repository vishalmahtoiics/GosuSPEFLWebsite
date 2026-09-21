import { describe, expect, test } from "vitest";
import { CATALOG, formatInr, getOffering, planAmountPaise } from "./catalog";

describe("catalog", () => {
  test("spec prices in paise", () => {
    expect(CATALOG.valorant.plans.full.amountPaise).toBe(1500000);
    expect(CATALOG.valorant.plans.monthly).toEqual({ amountPaise: 250000, cycles: 6 });
    expect(CATALOG.bgmi.plans.full.amountPaise).toBe(1200000);
    expect(CATALOG.bgmi.plans.monthly).toEqual({ amountPaise: 200000, cycles: 6 });
    expect(CATALOG["bgmi-squad"].plans.full.amountPaise).toBe(4000000);
    expect(CATALOG["bgmi-squad"].plans.monthly).toBeUndefined();
  });

  test("getOffering rejects unknown skus", () => {
    expect(getOffering("valorant")?.label).toBe("Valorant Season");
    expect(getOffering("csgo")).toBeNull();
  });

  test("planAmountPaise", () => {
    expect(planAmountPaise("valorant", "monthly")).toBe(250000);
    expect(planAmountPaise("bgmi-squad", "monthly")).toBeNull();
  });

  test("formatInr uses Indian grouping", () => {
    expect(formatInr(1500000)).toBe("₹15,000");
    expect(formatInr(4000000)).toBe("₹40,000");
  });
});
