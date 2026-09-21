import { describe, expect, test } from "vitest";
import { fakeCredentialsRepo } from "./testing/fakeCredentialsRepo.js";
import type { NewCredential } from "./credentials.js";

const input: NewCredential = {
  profileId: "p1", holderName: "Aarav Sharma", course: "valorant",
  cohort: "2026 S1", issuedDate: "2026-06-01", issuer: "Gosu Academy", isDemo: true,
};

describe("CredentialsRepo contract (fake)", () => {
  test("issue returns a valid credential with id", async () => {
    const repo = fakeCredentialsRepo();
    const c = await repo.issue({ ...input });
    expect(c.id).toBeTruthy();
    expect(c.status).toBe("valid");
    expect(c.revokeReason).toBeNull();
    expect(await repo.get(c.id)).toEqual(c);
  });

  test("get returns null for unknown id", async () => {
    expect(await fakeCredentialsRepo().get("00000000-0000-0000-0000-000000000000")).toBeNull();
  });

  test("revoke transitions only once and records reason", async () => {
    const repo = fakeCredentialsRepo();
    const { id } = await repo.issue({ ...input });
    expect(await repo.revoke(id, "issued in error")).toBe(true);
    expect(await repo.revoke(id, "again")).toBe(false); // idempotent
    const row = (await repo.get(id))!;
    expect(row.status).toBe("revoked");
    expect(row.revokeReason).toBe("issued in error");
  });

  test("listByProfile filters by profile", async () => {
    const repo = fakeCredentialsRepo();
    await repo.issue({ ...input });
    await repo.issue({ ...input, profileId: "p2" });
    expect((await repo.listByProfile("p1")).length).toBe(1);
  });
});
