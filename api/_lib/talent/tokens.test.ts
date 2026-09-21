import { describe, expect, test } from "vitest";
import { TOKEN_TTL_MS, generateToken, hashToken } from "./tokens.js";

describe("magic-link tokens", () => {
  test("TOKEN_TTL_MS is 30 minutes", () => {
    expect(TOKEN_TTL_MS).toBe(30 * 60 * 1000);
  });

  test("generateToken is URL-safe base64url with high entropy", () => {
    const t = generateToken();
    expect(t).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(t.length).toBeGreaterThanOrEqual(43);
  });

  test("generateToken returns a distinct token each call", () => {
    expect(generateToken()).not.toBe(generateToken());
  });

  test("hashToken is deterministic: same input → same 64-char hex hash", () => {
    const t = generateToken();
    const h1 = hashToken(t);
    const h2 = hashToken(t);
    expect(h1).toBe(h2);
    expect(h1).toMatch(/^[0-9a-f]{64}$/);
  });

  test("hashToken differs when the input differs", () => {
    expect(hashToken("alpha")).not.toBe(hashToken("beta"));
  });
});
