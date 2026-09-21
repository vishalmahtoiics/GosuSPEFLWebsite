import { describe, expect, test } from "vitest";
import { asDate } from "./neonCredentialsRepo.js";

describe("asDate (DATE column mapping)", () => {
  test("passes a date string through unchanged", () => {
    expect(asDate("2026-06-01")).toBe("2026-06-01");
    expect(asDate("2026-06-01T00:00:00.000Z")).toBe("2026-06-01");
  });

  test("formats a Date by its LOCAL calendar fields, with no UTC day-shift", () => {
    // Postgres' DATE parser builds a Date from local Y/M/D; we must read the
    // same fields back, not route through toISOString() (which shifts the day
    // in positive-UTC-offset timezones like IST).
    expect(asDate(new Date(2030, 0, 15))).toBe("2030-01-15");
    expect(asDate(new Date(2026, 5, 1))).toBe("2026-06-01");
  });
});
