import { hashToken } from "./tokens.js";
import { SESSION_TTL_MS, sessionCookie, signSession } from "./session.js";
import type { Session } from "./session.js";
import type { AuthTokensRepo } from "./authTokens.js";
import type { ProfilesRepo } from "./profiles.js";

export interface AuthCallbackDeps {
  tokens: AuthTokensRepo;
  profiles: ProfilesRepo;
  sessionSecret: string;
  nowMs: number;
}

const invalid = { status: 400, json: { error: "invalid_token" } } as const;

export async function handleAuthCallback(
  token: string,
  deps: AuthCallbackDeps,
): Promise<{ status: number; json: object; setCookie?: string }> {
  if (!token) return invalid;
  const rec = await deps.tokens.findByHash(hashToken(token));
  if (!rec) return invalid;
  if (rec.usedAt) return invalid;
  if (new Date(rec.expiresAt).getTime() <= deps.nowMs) return invalid;
  const flipped = await deps.tokens.markUsed(rec.id);
  if (!flipped) return invalid; // lost the single-use race

  const exp = deps.nowMs + SESSION_TTL_MS;
  let session: Session;
  let next: string;
  if (rec.purpose === "staff") {
    session = { role: "staff", profileId: null, email: rec.email, exp };
    next = "/admin";
  } else if (rec.purpose === "login") {
    if (!rec.profileId) return invalid;
    session = { role: "grad", profileId: rec.profileId, email: rec.email, exp };
    next = "/talent/edit";
  } else {
    // rec.purpose === "claim"
    if (!rec.profileId) return invalid;
    await deps.profiles.markClaimed(rec.profileId, rec.email);
    session = { role: "grad", profileId: rec.profileId, email: rec.email, exp };
    next = "/talent/edit";
  }

  return {
    status: 200,
    json: { ok: true, role: session.role, next },
    setCookie: sessionCookie(signSession(session, deps.sessionSecret)),
  };
}
