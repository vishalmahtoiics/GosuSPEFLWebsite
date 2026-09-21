import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { CredentialRecord, CredentialsRepo, NewCredential } from "./credentials.js";

type Row = Record<string, unknown>;

export function asDate(v: unknown): string {
  if (typeof v === "string") return v.slice(0, 10);
  const d = v as Date;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function asIso(v: unknown): string {
  return typeof v === "string" ? v : new Date(v as string).toISOString();
}

function toRecord(r: Row): CredentialRecord {
  return {
    id: r.id as string,
    profileId: (r.profile_id as string | null) ?? null,
    holderName: r.holder_name as string,
    course: r.course as string,
    cohort: r.cohort as string,
    issuedDate: asDate(r.issued_date),
    issuer: r.issuer as string,
    status: r.status as CredentialRecord["status"],
    revokeReason: (r.revoke_reason as string | null) ?? null,
    isDemo: r.is_demo as boolean,
    createdAt: asIso(r.created_at),
  };
}

export function neonCredentialsRepo(sql: NeonQueryFunction<false, false>): CredentialsRepo {
  return {
    async issue(input: NewCredential) {
      const rows = (await sql`
        INSERT INTO credentials (profile_id, holder_name, course, cohort, issued_date, issuer, is_demo)
        VALUES (${input.profileId}, ${input.holderName}, ${input.course}, ${input.cohort},
                ${input.issuedDate}, ${input.issuer}, ${input.isDemo})
        RETURNING *`) as Row[];
      return toRecord(rows[0]);
    },
    async get(id: string) {
      const rows = (await sql`SELECT * FROM credentials WHERE id = ${id}`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async revoke(id: string, reason: string) {
      const rows = (await sql`
        UPDATE credentials SET status='revoked', revoke_reason=${reason}
        WHERE id = ${id} AND status='valid'
        RETURNING id`) as Row[];
      return rows.length > 0;
    },
    async listByProfile(profileId: string) {
      const rows = (await sql`
        SELECT * FROM credentials WHERE profile_id = ${profileId}
        ORDER BY created_at DESC`) as Row[];
      return rows.map(toRecord);
    },
  };
}
