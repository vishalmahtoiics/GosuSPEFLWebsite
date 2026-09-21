import { describe, expect, test } from "vitest";
import { handleAuthRequest, parseStaffEmails } from "./authRequest.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { fakeAuthTokensRepo } from "./testing/fakeAuthTokensRepo.js";
import { fakeEmailSender } from "../email/testing/fakeEmailSender.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { AuthRequestDeps } from "./authRequest.js";

function deps(over: Partial<AuthRequestDeps> = {}): AuthRequestDeps {
  return {
    profiles: fakeProfilesRepo(),
    tokens: fakeAuthTokensRepo(),
    email: fakeEmailSender(),
    staffEmails: ["staff@gosu.gg"],
    baseUrl: "https://x.test",
    nowMs: 1_800_000_000_000,
    ...over,
  };
}

describe("parseStaffEmails", () => {
  test("splits, trims, lowercases, drops empties", () => {
    expect(parseStaffEmails(" A@x.com , b@Y.com ,, ")).toEqual(["a@x.com", "b@y.com"]);
    expect(parseStaffEmails(undefined)).toEqual([]);
    expect(parseStaffEmails("")).toEqual([]);
  });
});

describe("handleAuthRequest", () => {
  test("staff email → mints a staff token, sends an email; always 200 {ok:true}", async () => {
    const tokens = fakeAuthTokensRepo();
    const email = fakeEmailSender();
    const res = await handleAuthRequest({ email: "staff@gosu.gg" }, deps({ tokens, email }));
    expect(res).toEqual({ status: 200, json: { ok: true } });
    const rows = [...tokens.rows.values()];
    expect(rows).toHaveLength(1);
    expect(rows[0].purpose).toBe("staff");
    expect(rows[0].profileId).toBeNull();
    expect(email.sent).toHaveLength(1);
    expect(email.sent[0].to).toBe("staff@gosu.gg");
  });

  test("unclaimed owner match → claim token; claimed → login token", async () => {
    const unclaimed = makeProfile({ handle: "u", ownerEmail: "grad@x.com", claimedAt: null });
    const t1 = fakeAuthTokensRepo();
    await handleAuthRequest(
      { email: "grad@x.com" },
      deps({ profiles: fakeProfilesRepo([unclaimed]), tokens: t1 }),
    );
    expect([...t1.rows.values()][0].purpose).toBe("claim");

    const claimed = makeProfile({
      handle: "c", ownerEmail: "grad2@x.com", claimedAt: "2026-06-01T00:00:00.000Z",
    });
    const t2 = fakeAuthTokensRepo();
    await handleAuthRequest(
      { email: "grad2@x.com" },
      deps({ profiles: fakeProfilesRepo([claimed]), tokens: t2 }),
    );
    expect([...t2.rows.values()][0].purpose).toBe("login");
  });

  test("unknown email → no token, still 200 {ok:true}", async () => {
    const tokens = fakeAuthTokensRepo();
    const email = fakeEmailSender();
    const res = await handleAuthRequest({ email: "nobody@x.com" }, deps({ tokens, email }));
    expect(res).toEqual({ status: 200, json: { ok: true } });
    expect(tokens.rows.size).toBe(0);
    expect(email.sent).toHaveLength(0);
  });

  test("invalid body → 200 {ok:true} and no token (never reveals validity)", async () => {
    const tokens = fakeAuthTokensRepo();
    const res = await handleAuthRequest({ email: "not-an-email" }, deps({ tokens }));
    expect(res).toEqual({ status: 200, json: { ok: true } });
    expect(tokens.rows.size).toBe(0);
  });

  test("owner match is case-insensitive; stored token email is normalized lowercase", async () => {
    const p = makeProfile({ handle: "u", ownerEmail: "Grad@X.com", claimedAt: null });
    const tokens = fakeAuthTokensRepo();
    await handleAuthRequest(
      { email: "GRAD@x.com" },
      deps({ profiles: fakeProfilesRepo([p]), tokens }),
    );
    const rows = [...tokens.rows.values()];
    expect(rows).toHaveLength(1);
    expect(rows[0].email).toBe("grad@x.com");
  });
});
