import { createHash, randomBytes } from "node:crypto";

/** Magic-link token lifetime: 30 minutes. */
export const TOKEN_TTL_MS = 30 * 60 * 1000;

/** A fresh high-entropy magic-link token (URL-safe). Only ever sent by email; never stored raw. */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Deterministic hash stored in auth_tokens.token_hash. Look up / compare by hash, never by raw token. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
