import { z } from "zod";
import type { CredentialsRepo } from "./credentials.js";
import type { NewProfile, ProfilesRepo } from "./profiles.js";
import type { ContactMessagesRepo } from "./contactMessages.js";
import type { Session } from "./session.js";

/** Defense in depth: routes already gate on a staff session, but every core re-checks. */
export function requireStaffRole(session: Session): { status: number; json: object } | null {
  if (session.role !== "staff") return { status: 403, json: { error: "forbidden" } };
  return null;
}

export async function handleAdminListProfiles(
  session: Session,
  profiles: ProfilesRepo,
): Promise<{ status: number; json: object }> {
  const denied = requireStaffRole(session);
  if (denied) return denied;
  const all = await profiles.listAll();
  return { status: 200, json: { profiles: all } };
}

const nullableEmail = z
  .preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.string().trim().email().max(200).nullable(),
  )
  .optional();

export const newProfileSchema = z.object({
  handle: z.string().trim().min(1).max(60),
  type: z.enum(["player", "coach"]),
  displayName: z.string().trim().min(1).max(120),
  certifiedName: z.string().trim().min(1).max(120),
  ownerEmail: nullableEmail,
  isDemo: z.boolean().default(true),
});

export async function handleAdminCreateProfile(
  session: Session,
  body: unknown,
  profiles: ProfilesRepo,
): Promise<{ status: number; json: object }> {
  const denied = requireStaffRole(session);
  if (denied) return denied;
  const parsed = newProfileSchema.safeParse(body);
  if (!parsed.success) return { status: 400, json: { error: "invalid_profile" } };
  const d = parsed.data;
  const input: NewProfile = {
    handle: d.handle,
    type: d.type,
    displayName: d.displayName,
    certifiedName: d.certifiedName,
    ownerEmail: d.ownerEmail ?? null,
    isDemo: d.isDemo,
  };
  const profile = await profiles.create(input);
  return { status: 201, json: { profile } };
}

export const issueCredentialSchema = z.object({
  profileId: z.string().trim().min(1).max(200),
  holderName: z.string().trim().min(1).max(200),
  course: z.string().trim().min(1).max(80),
  cohort: z.string().trim().min(1).max(80),
  issuedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  issuer: z.string().trim().min(1).max(120).default("Gosu Academy"),
  isDemo: z.boolean().default(true),
});

export async function handleAdminIssueCredential(
  session: Session,
  body: unknown,
  credentials: CredentialsRepo,
): Promise<{ status: number; json: object }> {
  const denied = requireStaffRole(session);
  if (denied) return denied;
  const parsed = issueCredentialSchema.safeParse(body);
  if (!parsed.success) return { status: 400, json: { error: "invalid_credential" } };
  const d = parsed.data;
  const credential = await credentials.issue({
    profileId: d.profileId,
    holderName: d.holderName,
    course: d.course,
    cohort: d.cohort,
    issuedDate: d.issuedDate,
    issuer: d.issuer,
    isDemo: d.isDemo,
  });
  return { status: 201, json: { credential } };
}

export const revokeSchema = z.object({ reason: z.string().trim().min(1).max(300) });

export async function handleAdminRevoke(
  session: Session,
  id: string,
  body: unknown,
  credentials: CredentialsRepo,
): Promise<{ status: number; json: object }> {
  const denied = requireStaffRole(session);
  if (denied) return denied;
  const parsed = revokeSchema.safeParse(body);
  if (!parsed.success) return { status: 400, json: { error: "invalid_revoke" } };
  const ok = await credentials.revoke(id, parsed.data.reason);
  if (!ok) return { status: 404, json: { error: "not_found" } };
  return { status: 200, json: { ok: true } };
}

export async function handleAdminListMessages(
  session: Session,
  messages: ContactMessagesRepo,
): Promise<{ status: number; json: object }> {
  const denied = requireStaffRole(session);
  if (denied) return denied;
  const all = await messages.list();
  return { status: 200, json: { messages: all } };
}

export const setMessageStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "read", "routed"]),
});

export async function handleAdminSetMessageStatus(
  session: Session,
  body: unknown,
  messages: ContactMessagesRepo,
): Promise<{ status: number; json: object }> {
  const denied = requireStaffRole(session);
  if (denied) return denied;
  const parsed = setMessageStatusSchema.safeParse(body);
  if (!parsed.success) return { status: 400, json: { error: "invalid_status" } };
  const ok = await messages.setStatus(parsed.data.id, parsed.data.status);
  if (!ok) return { status: 404, json: { error: "not_found" } };
  return { status: 200, json: { ok: true } };
}

export const inviteSchema = z.object({
  profileId: z.string().min(1),
  email: z.string().trim().email().max(200),
});

export async function handleAdminInvite(
  session: Session,
  body: unknown,
  profiles: ProfilesRepo,
): Promise<{ status: number; json: object }> {
  const denied = requireStaffRole(session);
  if (denied) return denied;
  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) return { status: 400, json: { error: "invalid_invite" } };
  const profile = await profiles.setOwnerEmail(parsed.data.profileId, parsed.data.email);
  if (!profile) return { status: 404, json: { error: "not_found" } };
  return { status: 200, json: { profile } };
}
