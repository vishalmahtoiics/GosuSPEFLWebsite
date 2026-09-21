import { describe, expect, test } from "vitest";
import { handleVerify } from "./verify.js";
import { fakeCredentialsRepo } from "./testing/fakeCredentialsRepo.js";
import type { NewCredential } from "./credentials.js";

const input: NewCredential = {
  profileId: "p1", holderName: "Aarav Sharma", course: "valorant",
  cohort: "2026 S1", issuedDate: "2026-06-01", issuer: "Gosu Academy", isDemo: true,
};

describe("handleVerify", () => {
  test("returns the public credential for a valid id", async () => {
    const repo = fakeCredentialsRepo();
    const c = await repo.issue({ ...input });
    const r = await handleVerify(c.id, repo);
    expect(r.status).toBe(200);
    expect(r.json).toMatchObject({ holderName: "Aarav Sharma", status: "valid" });
  });

  test("reflects a revoked credential", async () => {
    const repo = fakeCredentialsRepo();
    const c = await repo.issue({ ...input });
    await repo.revoke(c.id, "issued in error");
    const r = await handleVerify(c.id, repo);
    expect(r.status).toBe(200);
    expect(r.json).toMatchObject({ status: "revoked", revokeReason: "issued in error" });
  });

  test("404 for an unknown id", async () => {
    const r = await handleVerify("00000000-0000-0000-0000-000000000000", fakeCredentialsRepo());
    expect(r.status).toBe(404);
    expect(r.json).toEqual({ error: "not_found" });
  });
});
