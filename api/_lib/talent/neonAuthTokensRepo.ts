import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { AuthTokenRecord, AuthTokensRepo, NewAuthToken } from "./authTokens.js";

type Row = Record<string, unknown>;

function asIso(v: unknown): string {
  return typeof v === "string" ? v : new Date(v as string).toISOString();
}

function toRecord(r: Row): AuthTokenRecord {
  return {
    id: r.id as string,
    email: r.email as string,
    profileId: (r.profile_id as string | null) ?? null,
    tokenHash: r.token_hash as string,
    purpose: r.purpose as AuthTokenRecord["purpose"],
    expiresAt: asIso(r.expires_at),
    usedAt: r.used_at ? asIso(r.used_at) : null,
    createdAt: asIso(r.created_at),
  };
}

export function neonAuthTokensRepo(sql: NeonQueryFunction<false, false>): AuthTokensRepo {
  return {
    async create(input: NewAuthToken) {
      const rows = (await sql`
        INSERT INTO auth_tokens (email, profile_id, token_hash, purpose, expires_at)
        VALUES (${input.email}, ${input.profileId}, ${input.tokenHash}, ${input.purpose}, ${input.expiresAt})
        RETURNING *`) as Row[];
      return toRecord(rows[0]);
    },
    async findByHash(tokenHash: string) {
      const rows = (await sql`SELECT * FROM auth_tokens WHERE token_hash = ${tokenHash}`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async markUsed(id: string) {
      const rows = (await sql`
        UPDATE auth_tokens SET used_at = now()
        WHERE id = ${id} AND used_at IS NULL
        RETURNING id`) as Row[];
      return rows.length > 0;
    },
  };
}
