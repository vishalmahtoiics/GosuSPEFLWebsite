import { describe, expect, test } from "vitest";
import type { OrderRecord } from "./db.js";
import { fulfillOrder, welcomeEmail } from "./fulfill.js";

const order: OrderRecord = {
  id: "o1", sku: "valorant", plan: "monthly", amountPaise: 250000, currency: "INR",
  name: "Arjun Mehta", email: "arjun@example.com", phone: "+919876543210",
  whatsappOptIn: true, provider: "paddle", providerTransactionId: "txn_1",
  providerSubscriptionId: null, status: "paid", paymentsMade: 1,
  cancelScheduled: false, welcomeEmailSent: false,
  createdAt: "2026-07-03T10:00:00.000Z",
};

const links = { discord: "https://discord.gg/abc", whatsapp: "https://chat.whatsapp.com/xyz" };

describe("welcomeEmail", () => {
  test("contains name, course, amount, both links", () => {
    const { subject, html } = welcomeEmail(order, links);
    expect(subject).toContain("Gosu Academy");
    expect(html).toContain("Arjun");
    expect(html).toContain("Valorant Season");
    expect(html).toContain("₹2,500");
    expect(html).toContain(links.discord);
    expect(html).toContain(links.whatsapp);
  });
});

describe("fulfillOrder", () => {
  test("sends one email to the buyer", async () => {
    process.env.VITE_DISCORD_INVITE_URL = links.discord;
    process.env.VITE_WHATSAPP_GROUP_URL = links.whatsapp;
    const sent: Array<{ to: string; subject: string; html: string }> = [];
    await fulfillOrder(order, { send: async (m) => void sent.push(m) });
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toBe("arjun@example.com");
    expect(sent[0].html).toContain(links.discord);
  });
});
