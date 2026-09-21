import { Resend } from "resend";
import type { EmailMessage, EmailSender } from "./sender.js";

export function resendEmailSender(apiKey: string, from: string): EmailSender {
  const resend = new Resend(apiKey);
  return {
    async send(msg: EmailMessage) {
      await resend.emails.send({
        from,
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
      });
    },
  };
}
