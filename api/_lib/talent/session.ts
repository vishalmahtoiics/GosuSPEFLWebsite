import { createHmac, timingSafeEqual } from "node:crypto";
import { readCookie } from "./gate.js";

export const SESSION_COOKIE = "talent_session";
/** Session lifetime: 7 days. */
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionRole = "grad" | "staff";

export interface Session {
  role: SessionRole;
  profileId: string | null; // set for grads, null for staff
  email: string;
  exp: number; // epoch ms
}

function sign(payloadB64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** Sign a session into a `payload.sig` cookie value. */
export function signSession(session: Session, secret: string): string {
  const payloadB64 = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payloadB64}.${sign(payloadB64, secret)}`;
}

/** Verify a `payload.sig` value: checks signature + expiry. Returns null on any failure. */
export function verifySession(value: string, secret: string, nowMs: number): Session | null {
  const dot = value.indexOf(".");
  if (dot <= 0) return null;
  const payloadB64 = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!safeEqual(sig, sign(payloadB64, secret))) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  const s = parsed as Session;
  if (s === null || typeof s !== "object") return null;
  if (s.role !== "grad" && s.role !== "staff") return null;
  if (typeof s.exp !== "number" || s.exp <= nowMs) return null;
  return s;
}

/** Read + verify the session cookie from a request cookie header. */
export function readSession(
  cookieHeader: string | undefined,
  secret: string,
  nowMs: number,
): Session | null {
  const raw = readCookie(cookieHeader, SESSION_COOKIE);
  return raw ? verifySession(raw, secret, nowMs) : null;
}

/** Set-Cookie string that persists the signed session. */
export function sessionCookie(value: string): string {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

/** Set-Cookie string that clears the session (logout). */
export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
