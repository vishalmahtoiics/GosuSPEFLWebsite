import { z } from "zod";
import type { ProfilesRepo, UpdateOwned } from "./profiles.js";
import type { Session } from "./session.js";

const shortTag = z.string().trim().min(1).max(40);

/** A string field that treats "" (or null/undefined) as null; otherwise a trimmed, length-capped string. */
function nullableString(max: number) {
  return z.preprocess(
    (v) => (v == null || (typeof v === "string" && v.trim() === "") ? null : v),
    z.string().trim().max(max).nullable(),
  );
}

/** A social URL that treats "" as absent; otherwise a trimmed URL (max 300). */
const socialUrl = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().url().max(300).optional(),
);

export const updateOwnedSchema = z.object({
  displayName: z.string().trim().min(1).max(80),
  photoUrl: nullableString(500),
  headline: nullableString(120),
  bio: nullableString(2000),
  region: nullableString(60),
  languages: z.array(shortTag).max(10),
  games: z.array(shortTag).max(5),
  primaryGame: nullableString(40),
  roles: z.array(shortTag).max(10),
  ranks: z
    .record(z.string().max(40), z.string().max(60))
    .refine((r) => Object.keys(r).length <= 20, { message: "too many ranks" }),
  achievements: z
    .array(
      z.object({
        title: z.string().trim().max(120),
        detail: z.string().trim().max(200).optional(),
        date: z.string().trim().max(40).optional(),
      }),
    )
    .max(30),
  socials: z.object({
    twitter: socialUrl,
    twitch: socialUrl,
    youtube: socialUrl,
    instagram: socialUrl,
    discord: socialUrl,
  }),
  vodEmbeds: z
    .array(z.object({ title: z.string().trim().max(120), url: z.string().trim().url().max(300) }))
    .max(20),
  available: z.boolean(),
  coachDetails: z
    .object({
      specialties: z.array(z.string().trim().max(60)).max(20),
      experienceYears: z.number().int().min(0).max(60),
      workedWith: z.array(z.string().trim().max(80)).max(20),
      testimonials: z
        .array(z.object({ author: z.string().trim().max(80), quote: z.string().trim().max(400) }))
        .max(20),
    })
    .nullable()
    .optional(),
  publish: z.boolean(),
});

export async function handleProfileSave(
  session: Session,
  body: unknown,
  profiles: ProfilesRepo,
): Promise<{ status: number; json: object }> {
  if (session.role !== "grad" || !session.profileId) {
    return { status: 403, json: { error: "forbidden" } };
  }
  const parsed = updateOwnedSchema.safeParse(body);
  if (!parsed.success) return { status: 400, json: { error: "invalid_profile" } };
  const p = await profiles.getById(session.profileId);
  if (!p) return { status: 404, json: { error: "not_found" } };
  const d = parsed.data;
  const fields: UpdateOwned = {
    displayName: d.displayName,
    photoUrl: d.photoUrl,
    headline: d.headline,
    bio: d.bio,
    region: d.region,
    languages: d.languages,
    games: d.games,
    primaryGame: d.primaryGame,
    roles: d.roles,
    ranks: d.ranks,
    achievements: d.achievements,
    socials: d.socials,
    vodEmbeds: d.vodEmbeds,
    available: d.available,
    coachDetails: p.type === "coach" ? (d.coachDetails ?? null) : null,
    status: d.publish ? "published" : "hidden",
  };
  const updated = await profiles.updateOwned(p.id, fields);
  if (!updated) return { status: 404, json: { error: "not_found" } };
  return { status: 200, json: { ok: true } };
}
