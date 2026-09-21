import { createHmac, timingSafeEqual } from "node:crypto";

export interface GateEnv {
  TALENT_GATED?: string;
  TALENT_ACCESS_CODE?: string;
  TALENT_ACCESS_SECRET?: string;
}

export const ACCESS_COOKIE = "talent_access";

export function isGated(env: GateEnv): boolean {
  return env.TALENT_GATED === "1";
}

export function accessToken(secret: string): string {
  return createHmac("sha256", secret).update("talent-access").digest("base64url");
}

export function readCookie(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function hasAccess(cookieHeader: string | undefined, secret: string): boolean {
  const presented = readCookie(cookieHeader, ACCESS_COOKIE);
  return presented !== null && safeEqual(presented, accessToken(secret));
}

export function checkGate(cookieHeader: string | undefined, env: GateEnv): { allowed: boolean } {
  if (!isGated(env)) return { allowed: true };
  const secret = env.TALENT_ACCESS_SECRET ?? "";
  return { allowed: secret !== "" && hasAccess(cookieHeader, secret) };
}

export function codeMatches(input: string, env: GateEnv): boolean {
  const expected = env.TALENT_ACCESS_CODE ?? "";
  return expected !== "" && safeEqual(input, expected);
}

export function grantCookie(secret: string): string {
  return `${ACCESS_COOKIE}=${accessToken(secret)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`;
}

export function handleGate(
  method: string,
  body: unknown,
  cookieHeader: string | undefined,
  env: GateEnv,
): { status: number; json: object; setCookie?: string } {
  if (method === "GET") {
    const gated = isGated(env);
    const granted = !gated || checkGate(cookieHeader, env).allowed;
    return { status: 200, json: { gated, granted } };
  }
  if (method === "POST") {
    const code = (body as { code?: unknown } | null)?.code;
    if (typeof code !== "string" || !codeMatches(code, env)) {
      return { status: 401, json: { error: "invalid_code" } };
    }
    const secret = env.TALENT_ACCESS_SECRET ?? "";
    if (secret === "") return { status: 500, json: { error: "misconfigured" } };
    return { status: 200, json: { granted: true }, setCookie: grantCookie(secret) };
  }
  return { status: 405, json: { error: "method_not_allowed" } };
}
