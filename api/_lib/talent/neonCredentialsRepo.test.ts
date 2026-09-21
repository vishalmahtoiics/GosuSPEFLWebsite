import { describe, expect, test } from "vitest";
import { neon } from "@neondatabase/serverless";
import { neonCredentialsRepo } from "./neonCredentialsRepo.js";
import type { NewCredential } from "./credentials.js";

const url = process.env.DATABASE_URL;

describe.skipIf(!url)("neonCredentialsRepo (integration)", () => {
  const input: NewCredential = {
    profileId: null, holderName: "Integration Test", course: "valorant",
    cohort: "test", issuedDate: "2026-06-01", issuer: "Gosu Academy", isDemo: true,
  };

  test("issue -> get -> revoke round-trips", async () => {
    const sql = neon(url!);
    const repo = neonCredentialsRepo(sql);
    const c = await repo.issue({ ...input });
    expect(c.status).toBe("valid");
    const fetched = await repo.get(c.id);
    expect(fetched?.holderName).toBe("Integration Test");
    expect(await repo.revoke(c.id, "cleanup")).toBe(true);
    expect((await repo.get(c.id))?.status).toBe("revoked");
    await sql`DELETE FROM credentials WHERE id = ${c.id}`;
  });
});
