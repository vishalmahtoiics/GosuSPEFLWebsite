import type { AuthPurpose } from "../talent/authTokens.js";

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailSender {
  send(msg: EmailMessage): Promise<void>;
}

/** Pure magic-link email template. Claim vs login wording differs; staff mirrors login. */
export function magicLinkEmail(
  link: string,
  purpose: AuthPurpose,
): { subject: string; text: string; html: string } {
  const claiming = purpose === "claim";
  const subject = claiming
    ? "Claim your Gosu Academy profile"
    : "Your Gosu Academy sign-in link";
  const lead = claiming
    ? "You've been invited to claim your verified talent profile."
    : "Use the link below to sign in to your talent profile.";
  const action = claiming ? "Claim your profile" : "Sign in";
  const note =
    "This link expires in 30 minutes and can be used once. If you didn't request it, you can ignore this email.";
  const text = `${lead}\n\n${action}: ${link}\n\n${note}`;
  const html = `<p>${lead}</p><p><a href="${link}">${action}</a></p><p>${note}</p>`;
  return { subject, text, html };
}
