import { createHmac } from "node:crypto";
import { z } from "zod";
import type { EmailSender } from "../email/sender.js";
import type { ContactIntent, ContactMessagesRepo } from "./contactMessages.js";
import type { ProfileRecord, ProfilesRepo } from "./profiles.js";

export const RATE_LIMIT = 5;
export const RATE_WINDOW_MS = 15 * 60 * 1000;

/** HMAC hash of a client IP (domain-separated). Only the hash is ever stored. */
export function hashIp(ip: string, secret: string): string {
  return createHmac("sha256", secret).update(`ip:${ip}`).digest("hex");
}

export const contactSchema = z.object({
  profileHandle: z.string().trim().min(1).max(60),
  senderName: z.string().trim().min(1).max(120),
  senderEmail: z.string().trim().email().max(200),
  senderOrg: z
    .preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? null : v),
      z.string().trim().max(120).nullable(),
    )
    .optional(),
  intent: z.enum(["hire-coach", "recruit-player", "general"]),
  message: z.string().trim().min(1).max(2000),
  website: z.string().optional(), // HONEYPOT — real users leave blank
});

export interface ContactPayload {
  senderName: string;
  senderEmail: string;
  senderOrg: string | null;
  intent: ContactIntent;
  message: string;
}

const INTENT_LABEL: Record<ContactIntent, string> = {
  "hire-coach": "coaching",
  "recruit-player": "recruitment",
  general: "general",
};

/** Escape sender-controlled text before interpolating it into the relay email's HTML body. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Pure relay-email template. This email goes TO the grad (or a staff inbox) and carries the
 * SENDER's contact details so the recipient can reply. The grad's own email is never sent to
 * the sender — the recipient is chosen by the caller and is never echoed into the body.
 */
export function contactRelayEmail(
  profile: ProfileRecord,
  payload: ContactPayload,
): { subject: string; text: string; html: string } {
  const subject = `New ${INTENT_LABEL[payload.intent]} enquiry for ${profile.displayName}`;
  const org = payload.senderOrg ? `\nOrganization: ${payload.senderOrg}` : "";
  const text =
    `You have a new enquiry via your Gosu Academy talent profile.\n\n` +
    `From: ${payload.senderName} <${payload.senderEmail}>${org}\n` +
    `Intent: ${payload.intent}\n\n` +
    `${payload.message}\n\n` +
    `Reply directly to ${payload.senderEmail} to respond.`;
  const orgHtml = payload.senderOrg ? `<p>Organization: ${escapeHtml(payload.senderOrg)}</p>` : "";
  const html =
    `<p>You have a new enquiry via your Gosu Academy talent profile.</p>` +
    `<p>From: ${escapeHtml(payload.senderName)} &lt;${escapeHtml(payload.senderEmail)}&gt;</p>${orgHtml}` +
    `<p>Intent: ${payload.intent}</p>` +
    `<p>${escapeHtml(payload.message)}</p>` +
    `<p>Reply directly to ${escapeHtml(payload.senderEmail)} to respond.</p>`;
  return { subject, text, html };
}

export interface ContactDeps {
  profiles: ProfilesRepo;
  messages: ContactMessagesRepo;
  email: EmailSender;
  staffInbox: string; // where demo/unclaimed contacts route; "" allowed (store-only)
  nowMs: number;
}

export async function handleContact(
  body: unknown,
  ipHash: string,
  deps: ContactDeps,
): Promise<{ status: number; json: object }> {
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return { status: 400, json: { error: "invalid_contact" } };
  const data = parsed.data;

  // Honeypot: a filled hidden field means a bot. Accept silently; store and relay nothing.
  if (data.website && data.website.trim() !== "") return { status: 200, json: { ok: true } };

  // Per-IP rate limit — only a hash of the IP is ever compared or stored.
  const since = new Date(deps.nowMs - RATE_WINDOW_MS).toISOString();
  if ((await deps.messages.recentCountByIpHash(ipHash, since)) >= RATE_LIMIT) {
    return { status: 429, json: { error: "rate_limited" } };
  }

  // Only published profiles are contactable. 404 is indistinguishable from a missing handle.
  const p = await deps.profiles.getByHandle(data.profileHandle);
  if (!p || p.status !== "published") return { status: 404, json: { error: "not_found" } };

  const senderOrg = data.senderOrg ?? null;
  await deps.messages.create({
    profileId: p.id,
    senderName: data.senderName,
    senderEmail: data.senderEmail,
    senderOrg,
    intent: data.intent,
    message: data.message,
    ipHash,
  });

  // Relay: demo/unclaimed → staff inbox; real claimed → the grad's own email (never exposed).
  const recipient = p.isDemo || !p.ownerEmail ? deps.staffInbox : p.ownerEmail;
  if (recipient !== "") {
    const mail = contactRelayEmail(p, {
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      senderOrg,
      intent: data.intent,
      message: data.message,
    });
    await deps.email.send({ to: recipient, subject: mail.subject, text: mail.text, html: mail.html });
  }
  return { status: 200, json: { ok: true } };
}
