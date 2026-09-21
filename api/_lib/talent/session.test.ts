import { describe, expect, test } from "vitest";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  clearSessionCookie,
  readSession,
  sessionCookie,
  signSession,
  verifySession,
} from "./session.js";
import type { Session } from "./session.js";

const secret = "test-session-secret-000";
const now = 1_800_000_000_000;

function gradSession(overrides: Partial<Session> = {}): Session {
  return {
    role: "grad",
    profileId: "11111111-1111-1111-1111-111111111111",
    email: "grad@example.com",
    exp: now + SESSION_TTL_MS,
    ...overrides,
  };
}

describe("session sign/verify", () => {
  test("round-trips a valid session", () => {
    const value = signSession(gradSession(), secret);
    expect(verifySession(value, secret, now)).toEqual(gradSession());
  });

  test("a tampered payload fails verification", () => {
    const value = signSession(gradSession(), secret);
    const sig = value.slice(value.indexOf(".") + 1);
    const forged = Buffer.from(
      JSON.stringify(gradSession({ profileId: "99999999-9999-9999-9999-999999999999" })),
    ).toString("base64url");
    expect(verifySession(`${forged}.${sig}`, secret, now)).toBeNull();
  });

  test("a tampered signature fails verification", () => {
    const value = signSession(gradSession(), secret);
    const payload = value.slice(0, value.indexOf("."));
    expect(verifySession(`${payload}.deadbeef`, secret, now)).toBeNull();
  });

  test("a different secret fails verification", () => {
    const value = signSession(gradSession(), secret);
    expect(verifySession(value, "other-secret", now)).toBeNull();
  });

  test("an expired session fails verification", () => {
    const value = signSession(gradSession({ exp: now - 1 }), secret);
    expect(verifySession(value, secret, now)).toBeNull();
  });

  test("readSession pulls the cookie out of a Cookie header", () => {
    const value = signSession(gradSession(), secret);
    const header = `other=1; ${SESSION_COOKIE}=${value}; more=2`;
    expect(readSession(header, secret, now)).toEqual(gradSession());
    expect(readSession(undefined, secret, now)).toBeNull();
    expect(readSession("nothing=here", secret, now)).toBeNull();
  });

  test("sessionCookie and clearSessionCookie carry the security attributes", () => {
    const set = sessionCookie(signSession(gradSession(), secret));
    expect(set).toContain(`${SESSION_COOKIE}=`);
    expect(set).toContain("HttpOnly");
    expect(set).toContain("Secure");
    expect(set).toContain("SameSite=Lax");
    expect(set).toContain(`Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`);
    expect(clearSessionCookie()).toContain("Max-Age=0");
  });
});
