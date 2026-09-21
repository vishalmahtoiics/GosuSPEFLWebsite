import type { NeonQueryFunction } from "@neondatabase/serverless";
import { filterProfiles } from "./directory.js";
import type {
  Achievement, CoachDetails, NewProfile, ProfileFilter, ProfileRecord, ProfilesRepo, Socials, UpdateOwned, VodEmbed,
} from "./profiles.js";

type Row = Record<string, unknown>;

function asIso(v: unknown): string {
  return typeof v === "string" ? v : new Date(v as string).toISOString();
}

function toRecord(r: Row): ProfileRecord {
  return {
    id: r.id as string,
    handle: r.handle as string,
    type: r.type as ProfileRecord["type"],
    displayName: r.display_name as string,
    certifiedName: r.certified_name as string,
    photoUrl: (r.photo_url as string | null) ?? null,
    headline: (r.headline as string | null) ?? null,
    bio: (r.bio as string | null) ?? null,
    region: (r.region as string | null) ?? null,
    languages: (r.languages as string[]) ?? [],
    games: (r.games as string[]) ?? [],
    primaryGame: (r.primary_game as string | null) ?? null,
    roles: (r.roles as string[]) ?? [],
    ranks: (r.ranks as Record<string, string>) ?? {},
    achievements: (r.achievements as Achievement[]) ?? [],
    socials: (r.socials as Socials) ?? {},
    vodEmbeds: (r.vod_embeds as VodEmbed[]) ?? [],
    available: r.available as boolean,
    coachDetails: (r.coach_details as CoachDetails | null) ?? null,
    status: r.status as ProfileRecord["status"],
    isDemo: r.is_demo as boolean,
    ownerEmail: (r.owner_email as string | null) ?? null,
    claimedAt: r.claimed_at ? asIso(r.claimed_at) : null,
    createdAt: asIso(r.created_at),
    updatedAt: asIso(r.updated_at),
  };
}

export function neonProfilesRepo(sql: NeonQueryFunction<false, false>): ProfilesRepo {
  return {
    async list(filter: ProfileFilter) {
      // Demo scale: fetch published rows, filter/sort/project in JS with the same pure
      // function the fake uses (guaranteed parity). SQL-level filtering + pagination is a
      // real-launch-scale upgrade (see the design note above).
      const rows = (await sql`SELECT * FROM profiles WHERE status = 'published'`) as Row[];
      return filterProfiles(rows.map(toRecord), filter);
    },
    async getByHandle(handle: string) {
      const rows = (await sql`SELECT * FROM profiles WHERE handle = ${handle}`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async getById(id: string) {
      const rows = (await sql`SELECT * FROM profiles WHERE id = ${id}`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async getByOwnerEmail(email: string) {
      const rows = (await sql`SELECT * FROM profiles WHERE lower(owner_email) = lower(${email})`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async markClaimed(id: string, email: string) {
      const rows = (await sql`
        UPDATE profiles
        SET owner_email = COALESCE(owner_email, ${email}), claimed_at = now(), updated_at = now()
        WHERE id = ${id}
        RETURNING *`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async updateOwned(id: string, fields: UpdateOwned) {
      const rows = (await sql`
        UPDATE profiles SET
          display_name = ${fields.displayName},
          photo_url = ${fields.photoUrl},
          headline = ${fields.headline},
          bio = ${fields.bio},
          region = ${fields.region},
          languages = ${JSON.stringify(fields.languages)}::jsonb,
          games = ${JSON.stringify(fields.games)}::jsonb,
          primary_game = ${fields.primaryGame},
          roles = ${JSON.stringify(fields.roles)}::jsonb,
          ranks = ${JSON.stringify(fields.ranks)}::jsonb,
          achievements = ${JSON.stringify(fields.achievements)}::jsonb,
          socials = ${JSON.stringify(fields.socials)}::jsonb,
          vod_embeds = ${JSON.stringify(fields.vodEmbeds)}::jsonb,
          available = ${fields.available},
          coach_details = ${fields.coachDetails === null ? null : JSON.stringify(fields.coachDetails)}::jsonb,
          status = ${fields.status},
          updated_at = now()
        WHERE id = ${id}
        RETURNING *`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async create(input: NewProfile) {
      const rows = (await sql`
        INSERT INTO profiles (handle, type, display_name, certified_name, owner_email, is_demo)
        VALUES (${input.handle}, ${input.type}, ${input.displayName}, ${input.certifiedName},
                ${input.ownerEmail}, ${input.isDemo})
        RETURNING *`) as Row[];
      return toRecord(rows[0]);
    },
    async listAll() {
      const rows = (await sql`SELECT * FROM profiles ORDER BY created_at DESC`) as Row[];
      return rows.map(toRecord);
    },
    async setOwnerEmail(id: string, email: string) {
      const rows = (await sql`
        UPDATE profiles SET owner_email = ${email}, updated_at = now()
        WHERE id = ${id}
        RETURNING *`) as Row[];
      return rows[0] ? toRecord(rows[0]) : null;
    },
  };
}
