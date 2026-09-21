import { describe, expect, test } from "vitest";
import { toPublicCredential, type CredentialRecord } from "./credentials.js";

const base: CredentialRecord = {
  id: "c1", profileId: "p1", holderName: "Aarav Sharma",
  course: "valorant", cohort: "2026 S1", issuedDate: "2026-06-01",
  issuer: "Gosu Academy", status: "valid", revokeReason: null,
  isDemo: true, createdAt: "2026-06-01T00:00:00.000Z",
};

describe("toPublicCredential", () => {
  test("exposes attestation fields, hides internals", () => {
    const pub = toPublicCredential(base);
    expect(pub).toEqual({
      id: "c1", holderName: "Aarav Sharma", course: "valorant",
      cohort: "2026 S1", issuedDate: "2026-06-01", issuer: "Gosu Academy",
      status: "valid", revokeReason: null,
    });
    expect("isDemo" in pub).toBe(false);
    expect("profileId" in pub).toBe(false);
  });

  test("only surfaces revoke reason when revoked", () => {
    expect(toPublicCredential({ ...base, revokeReason: "issued in error" }).revokeReason).toBeNull();
    const revoked = toPublicCredential({ ...base, status: "revoked", revokeReason: "issued in error" });
    expect(revoked.status).toBe("revoked");
    expect(revoked.revokeReason).toBe("issued in error");
  });
});
