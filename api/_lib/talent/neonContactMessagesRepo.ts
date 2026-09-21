import type { NeonQueryFunction } from "@neondatabase/serverless";
import type {
  ContactMessageRecord,
  ContactMessagesRepo,
  ContactStatus,
  NewContactMessage,
} from "./contactMessages.js";

type Row = Record<string, unknown>;

function asIso(v: unknown): string {
  return typeof v === "string" ? v : new Date(v as string).toISOString();
}

function toRecord(r: Row): ContactMessageRecord {
  return {
    id: r.id as string,
    profileId: r.profile_id as string,
    senderName: r.sender_name as string,
    senderEmail: r.sender_email as string,
    senderOrg: (r.sender_org as string | null) ?? null,
    intent: r.intent as ContactMessageRecord["intent"],
    message: r.message as string,
    ipHash: (r.ip_hash as string | null) ?? "",
    status: r.status as ContactMessageRecord["status"],
    createdAt: asIso(r.created_at),
  };
}

export function neonContactMessagesRepo(sql: NeonQueryFunction<false, false>): ContactMessagesRepo {
  return {
    async create(input: NewContactMessage) {
      const rows = (await sql`
        INSERT INTO contact_messages (profile_id, sender_name, sender_email, sender_org, intent, message, ip_hash)
        VALUES (${input.profileId}, ${input.senderName}, ${input.senderEmail}, ${input.senderOrg},
                ${input.intent}, ${input.message}, ${input.ipHash})
        RETURNING *`) as Row[];
      return toRecord(rows[0]);
    },
    async recentCountByIpHash(ipHash: string, sinceIso: string) {
      const rows = (await sql`
        SELECT count(*)::int AS n FROM contact_messages
        WHERE ip_hash = ${ipHash} AND created_at > ${sinceIso}`) as Row[];
      return Number(rows[0].n);
    },
    async list() {
      const rows = (await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`) as Row[];
      return rows.map(toRecord);
    },
    async setStatus(id: string, status: ContactStatus) {
      const rows = (await sql`
        UPDATE contact_messages SET status = ${status} WHERE id = ${id} RETURNING id`) as Row[];
      return rows.length > 0;
    },
  };
}
