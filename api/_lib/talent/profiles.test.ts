import { describe, expect, test } from "vitest";
import { toPublicProfile, toSummary } from "./profiles.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { PublicCredential } from "./credentials.js";

describe("profile projections", () => {
  test("toSummary keeps card fields and drops private/locked ones", () => {
    const p = makeProfile({ ownerEmail: "grad@example.com" });
    const s = toSummary(p);
    expect(s.handle).toBe(p.handle);
    expect(s.displayName).toBe(p.displayName);
    expect(s.available).toBe(p.available);
    expect(s).not.toHaveProperty("ownerEmail");
    expect(s).not.toHaveProperty("certifiedName");
    expect(s).not.toHaveProperty("bio");
  });

  test("toSummary copies arrays (no shared references)", () => {
    const p = makeProfile();
    const s = toSummary(p);
    expect(s.games).toEqual(p.games);
    expect(s.games).not.toBe(p.games);
    expect(s.roles).not.toBe(p.roles);
  });

  test("toPublicProfile hides private fields and attaches copied credentials", () => {
    const p = makeProfile({ ownerEmail: "grad@example.com", isDemo: true });
    const creds: PublicCredential[] = [
      {
        id: "c1", holderName: "Demo Player One", course: "valorant", cohort: "2026 Season 1",
        issuedDate: "2026-06-01", issuer: "Gosu Academy", status: "valid", revokeReason: null,
      },
    ];
    const pub = toPublicProfile(p, creds);
    expect(pub.certifiedName).toBe(p.certifiedName);
    expect(pub.credentials).toEqual(creds);
    expect(pub.credentials[0]).not.toBe(creds[0]);
    expect(pub).not.toHaveProperty("ownerEmail");
    expect(pub).not.toHaveProperty("isDemo");
    expect(pub).not.toHaveProperty("status");
  });
});
