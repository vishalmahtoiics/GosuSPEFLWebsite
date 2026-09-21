import type { EmailMessage, EmailSender } from "../sender.js";

export function fakeEmailSender(): EmailSender & { sent: EmailMessage[] } {
  const sent: EmailMessage[] = [];
  return {
    sent,
    async send(msg: EmailMessage) {
      sent.push(msg);
    },
  };
}
