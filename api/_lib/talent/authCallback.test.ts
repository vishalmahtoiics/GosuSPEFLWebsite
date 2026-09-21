import { describe, expect, test } from "vitest";
import { handleAuthCallback } from "./authCallback.js";
import { fakeAuthTokensRepo } from "./testing/fakeAuthTokensRepo.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { makeProfile } from "./testing/profileFixture.js";
import { hashToken } from "./tokens.js";
import { SESSION_COOKIE, readSession, verifySession } from "./session.js";
import type { AuthCallbackDeps } from "./authCallback.js";
import type { NewAuthToken } from "./authTokens.js";

const secret = "callback-secret";
const now = 1_800_000_000_000;

const cookieValue = (setCookie: string) =>
  setCookie.split(";")[0].slice(`${SESSION_COOKIE}=`.length);

function deps(over: Partial<AuthCallbackDeps> = {}): AuthCallbackDeps {
  return {
    tokens: fakeAuthTokensRepo(),
    profiles: fakeProfilesRepo(),
    sessionSecret: secret,
    nowMs: now,
    ...over,
  };
}

async function seedToken(
  tokens: ReturnType<typeof fakeAuthTokensRepo>,
  raw: string,
  over: Partial<NewAuthToken> = {},
) {
  return tokens.create({
    email: "grad@x.com",
    profileId: "11111111-1111-1111-1111-111111111111",
    tokenHash: hashToken(raw),
    purpose: "claim",
    expiresAt: new Date(now + 60_000).toISOString(),
    ...over,
  });
}

describe("handleAuthCallback", () => {
  test("claim → marks profile claimed, grad session, next=/talent/edit; cookie re-verifies", async () => {
    const profile = makeProfile({
      id: "11111111-1111-1111-1111-111111111111", ownerEmail: null, claimedAt: null,
    });
    const tokens = fakeAuthTokensRepo();
    const profiles = fakeProfilesRepo([profile]);
    await seedToken(tokens, "raw-claim", { purpose: "claim", profileId: profile.id });
    const res = await handleAuthCallback("raw-claim", deps({ tokens, profiles }));
    expect(res.status).toBe(200);
    expect(res.json).toEqual({ ok: true, role: "grad", next: "/talent/edit" });
    expect((await profiles.getById(profile.id))!.claimedAt).not.toBeNull();
    const session = verifySession(cookieValue(res.setCookie!), secret, now);
    expect(session?.role).toBe("grad");
    expect(session?.profileId).toBe(profile.id);
  });

  test("login → grad session without re-claiming, next=/talent/edit", async () => {
    const tokens = fakeAuthTokensRepo();
    await seedToken(tokens, "raw-login", {
      purpose: "login", profileId: "22222222-2222-2222-2222-222222222222",
    });
    const res = await handleAuthCallback("raw-login", deps({ tokens }));
    expect(res.json).toEqual({ ok: true, role: "grad", next: "/talent/edit" });
    expect(readSession(res.setCookie!.split(";")[0], secret, now)?.role).toBe("grad");
  });

  test("staff → staff session, next=/admin", async () => {
    const tokens = fakeAuthTokensRepo();
    await seedToken(tokens, "raw-staff", { purpose: "staff", profileId: null });
    const res = await handleAuthCallback("raw-staff", deps({ tokens }));
    expect(res.json).toEqual({ ok: true, role: "staff", next: "/admin" });
    const session = verifySession(cookieValue(res.setCookie!), secret, now);
    expect(session?.role).toBe("staff");
    expect(session?.profileId).toBeNull();
  });

  test("empty token → 400", async () => {
    expect((await handleAuthCallback("", deps())).status).toBe(400);
  });

  test("unknown token → 400", async () => {
    expect((await handleAuthCallback("never-seen", deps())).status).toBe(400);
  });

  test("expired token → 400", async () => {
    const tokens = fakeAuthTokensRepo();
    await seedToken(tokens, "raw-exp", { expiresAt: new Date(now - 1).toISOString() });
    expect((await handleAuthCallback("raw-exp", deps({ tokens }))).status).toBe(400);
  });

  test("used token → 400 and a second use of a valid token → 400", async () => {
    const tokens = fakeAuthTokensRepo();
    const profiles = fakeProfilesRepo([
      makeProfile({ id: "11111111-1111-1111-1111-111111111111", claimedAt: null }),
    ]);
    await seedToken(tokens, "raw-twice", { profileId: "11111111-1111-1111-1111-111111111111" });
    expect((await handleAuthCallback("raw-twice", deps({ tokens, profiles }))).status).toBe(200);
    expect((await handleAuthCallback("raw-twice", deps({ tokens, profiles }))).status).toBe(400);
  });

  test("login/claim token with no profileId → 400", async () => {
    const tokens = fakeAuthTokensRepo();
    await seedToken(tokens, "raw-noprofile", { purpose: "login", profileId: null });
    expect((await handleAuthCallback("raw-noprofile", deps({ tokens }))).status).toBe(400);
  });
});
