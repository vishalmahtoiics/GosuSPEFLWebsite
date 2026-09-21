import { resendEmailSender } from "./resendEmailSender.js";
import type { EmailMessage, EmailSender } from "./sender.js";

interface EmailEnv {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
}

/** Dev/demo fallback: log the recipient + body (the body carries the magic link) so links are readable from logs. */
function consoleEmailSender(): EmailSender {
  return {
    async send(msg: EmailMessage) {
      console.log(`[email] no RESEND_API_KEY set — not delivered. to=${msg.to}\n${msg.text}`);
    },
  };
}

export function emailSender(env: EmailEnv): EmailSender {
  const key = env.RESEND_API_KEY;
  if (key && key !== "") {
    return resendEmailSender(key, env.EMAIL_FROM ?? "Gosu Academy <onboarding@resend.dev>");
  }
  return consoleEmailSender();
}
