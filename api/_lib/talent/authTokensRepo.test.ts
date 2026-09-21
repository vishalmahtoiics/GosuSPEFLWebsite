import { describe, expect, test } from "vitest";
import { fakeAuthTokensRepo } from "./testing/fakeAuthTokensRepo.js";
import type { NewAuthToken } from "./authTokens.js";

const input = (over: Partial<NewAuthToken> = {}): NewAuthToken => ({
  email: "grad@example.com",
  profileId: "11111111-1111-1111-1111-111111111111",
  tokenHash: "hash-abc",
  purpose: "claim",
  expiresAt: "2026-07-03T12:30:00.000Z",
  ...over,
});

describe("AuthTokensRepo contract (fake)", () => {
  test("create returns a stored record with id/usedAt/createdAt", async () => {
    const repo = fakeAuthTokensRepo();
    const rec = await repo.create(input());
    expect(rec.id).toBeTruthy();
    expect(rec.usedAt).toBeNull();
    expect(rec.createdAt).toBeTruthy();
    expect(rec.email).toBe("grad@example.com");
    expect(rec.purpose).toBe("claim");
  });

  test("findByHash returns a snapshot; null when unknown", async () => {
    const repo = fakeAuthTokensRepo();
    await repo.create(input({ tokenHash: "hash-xyz" }));
    const got = (await repo.findByHash("hash-xyz"))!;
    expect(got.tokenHash).toBe("hash-xyz");
    got.email = "MUTATED";
    expect((await repo.findByHash("hash-xyz"))!.email).toBe("grad@example.com");
    expect(await repo.findByHash("missing")).toBeNull();
  });

  test("markUsed is atomic single-use: first true, second false", async () => {
    const repo = fakeAuthTokensRepo();
    const rec = await repo.create(input());
    expect(await repo.markUsed(rec.id)).toBe(true);
    expect(await repo.markUsed(rec.id)).toBe(false);
    expect((await repo.findByHash("hash-abc"))!.usedAt).not.toBeNull();
  });

  test("markUsed returns false for an unknown id", async () => {
    const repo = fakeAuthTokensRepo();
    expect(await repo.markUsed("nope")).toBe(false);
  });
});
