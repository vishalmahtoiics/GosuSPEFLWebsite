import { Resend } from "resend";

export interface EmailSender {
  send(args: { to: string; subject: string; html: string }): Promise<void>;
}

export function resendSender(): EmailSender {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM ?? "Gosu Academy <onboarding@resend.dev>";
  return {
    async send({ to, subject, html }) {
      const { error } = await resend.emails.send({ from, to, subject, html });
      if (error) throw new Error(`resend: ${error.message}`);
    },
  };
}
