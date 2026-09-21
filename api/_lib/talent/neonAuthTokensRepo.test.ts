import { describe, expect, test } from "vitest";
import { neon } from "@neondatabase/serverless";
import { neonAuthTokensRepo } from "./neonAuthTokensRepo.js";
import { hashToken } from "./tokens.js";

// Live DB only. Skips cleanly (and does not construct neon()) when DATABASE_URL is unset.
const url = process.env.DATABASE_URL;
const d = url ? describe : describe.skip;

d("neonAuthTokensRepo (integration)", () => {
  test("create → findByHash → markUsed single-use round-trip", async () => {
    const sql = neon(url!);
    const repo = neonAuthTokensRepo(sql);
    const tokenHash = hashToken(`itest-${Date.now()}`);
    const created = await repo.create({
      email: "itest@example.com",
      profileId: null, // staff-style token: no FK, safe to insert without a seeded profile
      tokenHash,
      purpose: "staff",
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    });
    expect(created.tokenHash).toBe(tokenHash);
    expect((await repo.findByHash(tokenHash))?.id).toBe(created.id);
    expect(await repo.markUsed(created.id)).toBe(true);
    expect(await repo.markUsed(created.id)).toBe(false);
  });
});
