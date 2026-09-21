import { formatInr, getOffering } from "../../src/lib/catalog.js";
import type { OrderRecord } from "./db.js";
import type { EmailSender } from "./email.js";

export function welcomeEmail(
  order: OrderRecord,
  links: { discord: string; whatsapp: string },
): { subject: string; html: string } {
  const label = getOffering(order.sku)?.label ?? order.sku;
  const firstName = order.name.split(/\s+/)[0];
  const amount = formatInr(order.amountPaise);
  const plan = order.plan === "monthly" ? `${amount}/month instalment plan` : `${amount}, paid in full`;
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return {
    subject: `You're in — ${label} at Gosu Academy`,
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0b;color:#efece6;padding:32px;max-width:560px;margin:0 auto">
  <h1 style="color:#d9ab4d;font-size:22px;margin:0 0 16px">Welcome to Gosu Academy, ${esc(firstName)}.</h1>
  <p style="line-height:1.6">Your enrollment is confirmed:</p>
  <p style="line-height:1.6;border:1px solid #2a2a2c;border-radius:8px;padding:14px 16px">
    <strong>${esc(label)}</strong><br/>${esc(plan)}
  </p>
  <p style="line-height:1.6"><strong>Do these two things now:</strong></p>
  <p style="line-height:1.8">
    1. <a href="${links.discord}" style="color:#d9ab4d">Join the Academy Discord</a> — schedules, VOD reviews, and your coach live here.<br/>
    2. <a href="${links.whatsapp}" style="color:#d9ab4d">Join the WhatsApp group</a> — batch announcements and reminders.
  </p>
  <p style="line-height:1.6">A coach will welcome you and confirm your batch within 24 hours. Questions? Just reply to this email.</p>
  <p style="color:#8a8a8e;font-size:12px;margin-top:24px">Order ${esc(order.id)} · Gosu Academy × Bharat Esports</p>
</div>`,
  };
}

export async function fulfillOrder(order: OrderRecord, sender: EmailSender): Promise<void> {
  const links = {
    discord: process.env.VITE_DISCORD_INVITE_URL ?? "",
    whatsapp: process.env.VITE_WHATSAPP_GROUP_URL ?? "",
  };
  const { subject, html } = welcomeEmail(order, links);
  await sender.send({ to: order.email, subject, html });
}
