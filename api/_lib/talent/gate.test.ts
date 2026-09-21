import { describe, expect, test } from "vitest";
import {
  accessToken, checkGate, codeMatches, handleGate, isGated, readCookie,
} from "./gate.js";

const env = { TALENT_GATED: "1", TALENT_ACCESS_CODE: "letmein", TALENT_ACCESS_SECRET: "s3cret-key-value" };

describe("gate primitives", () => {
  test("isGated reads the flag", () => {
    expect(isGated(env)).toBe(true);
    expect(isGated({ ...env, TALENT_GATED: "0" })).toBe(false);
    expect(isGated({})).toBe(false);
  });

  test("readCookie finds a named cookie", () => {
    expect(readCookie("a=1; talent_access=xyz; b=2", "talent_access")).toBe("xyz");
    expect(readCookie(undefined, "talent_access")).toBeNull();
  });

  test("codeMatches is exact", () => {
    expect(codeMatches("letmein", env)).toBe(true);
    expect(codeMatches("nope", env)).toBe(false);
    expect(codeMatches("letmein", {})).toBe(false);
  });

  test("checkGate: ungated always allows", () => {
    expect(checkGate(undefined, { ...env, TALENT_GATED: "0" }).allowed).toBe(true);
  });

  test("checkGate: gated requires the right cookie", () => {
    expect(checkGate(undefined, env).allowed).toBe(false);
    const cookie = `talent_access=${accessToken(env.TALENT_ACCESS_SECRET)}`;
    expect(checkGate(cookie, env).allowed).toBe(true);
    expect(checkGate("talent_access=wrong", env).allowed).toBe(false);
  });
});

describe("handleGate", () => {
  test("GET reports gated + granted state", () => {
    expect(handleGate("GET", null, undefined, env).json).toEqual({ gated: true, granted: false });
    const cookie = `talent_access=${accessToken(env.TALENT_ACCESS_SECRET)}`;
    expect(handleGate("GET", null, cookie, env).json).toEqual({ gated: true, granted: true });
  });

  test("POST with the right code sets the cookie", () => {
    const r = handleGate("POST", { code: "letmein" }, undefined, env);
    expect(r.status).toBe(200);
    expect(r.json).toEqual({ granted: true });
    expect(r.setCookie).toContain("talent_access=");
    expect(r.setCookie).toContain("HttpOnly");
    expect(r.setCookie).toContain("Secure");
  });

  test("POST with a wrong code is rejected", () => {
    expect(handleGate("POST", { code: "nope" }, undefined, env).status).toBe(401);
  });

  test("POST with a valid code but empty secret is misconfigured", () => {
    const r = handleGate("POST", { code: "letmein" }, undefined, {
      TALENT_GATED: "1", TALENT_ACCESS_CODE: "letmein", TALENT_ACCESS_SECRET: "",
    });
    expect(r.status).toBe(500);
    expect(r.json).toEqual({ error: "misconfigured" });
  });

  test("non-GET/POST methods are rejected with 405", () => {
    expect(handleGate("DELETE", null, undefined, env).status).toBe(405);
  });
});
