import { z } from "zod";
import { TOKEN_TTL_MS, generateToken, hashToken } from "./tokens.js";
import { magicLinkEmail, type EmailSender } from "../email/sender.js";
import type { AuthPurpose, AuthTokensRepo } from "./authTokens.js";
import type { ProfilesRepo } from "./profiles.js";

export interface AuthRequestDeps {
  profiles: ProfilesRepo;
  tokens: AuthTokensRepo;
  email: EmailSender;
  staffEmails: string[]; // parsed from env, lowercased
  baseUrl: string;
  nowMs: number;
}

/** Parse the comma-separated staff allowlist env var: trim, lowercase, drop empties. */
export function parseStaffEmails(csv?: string): string[] {
  if (!csv) return [];
  return csv
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s !== "");
}

const bodySchema = z.object({ email: z.string().trim().email().max(200) });

export async function handleAuthRequest(
  body: unknown,
  deps: AuthRequestDeps,
): Promise<{ status: number; json: object }> {
  const parsed = bodySchema.safeParse(body);
  if (parsed.success) {
    const email = parsed.data.email.toLowerCase();
    let purpose: AuthPurpose | null = null;
    let profileId: string | null = null;
    if (deps.staffEmails.includes(email)) {
      purpose = "staff";
    } else {
      const profile = await deps.profiles.getByOwnerEmail(email);
      if (profile) {
        purpose = profile.claimedAt ? "login" : "claim";
        profileId = profile.id;
      }
    }
    if (purpose !== null) {
      const token = generateToken();
      await deps.tokens.create({
        email,
        profileId,
        tokenHash: hashToken(token),
        purpose,
        expiresAt: new Date(deps.nowMs + TOKEN_TTL_MS).toISOString(),
      });
      const link = `${deps.baseUrl}/talent/claim/${token}`;
      const msg = magicLinkEmail(link, purpose);
      await deps.email.send({ to: email, subject: msg.subject, text: msg.text, html: msg.html });
    }
  }
  // Always the same response — never reveal whether the email maps to a profile.
  return { status: 200, json: { ok: true } };
}
