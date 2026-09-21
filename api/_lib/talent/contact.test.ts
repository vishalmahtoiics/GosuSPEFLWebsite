import { describe, expect, test } from "vitest";
import { RATE_LIMIT, handleContact, hashIp } from "./contact.js";
import { fakeContactMessagesRepo } from "./testing/fakeContactMessagesRepo.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { fakeEmailSender } from "../email/testing/fakeEmailSender.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { ContactDeps } from "./contact.js";

const now = 1_800_000_000_000;

const body = (over: Record<string, unknown> = {}) => ({
  profileHandle: "demo-riya",
  senderName: "Priya Recruiter",
  senderEmail: "priya@team.gg",
  senderOrg: "Team Nova",
  intent: "recruit-player",
  message: "We'd like to trial you.",
  website: "",
  ...over,
});

function deps(over: Partial<ContactDeps> = {}): ContactDeps {
  return {
    profiles: fakeProfilesRepo(),
    messages: fakeContactMessagesRepo(),
    email: fakeEmailSender(),
    staffInbox: "staff@gosu.gg",
    nowMs: now,
    ...over,
  };
}

describe("hashIp", () => {
  test("is deterministic and differs by input", () => {
    expect(hashIp("1.2.3.4", "secret")).toBe(hashIp("1.2.3.4", "secret"));
    expect(hashIp("1.2.3.4", "secret")).not.toBe(hashIp("5.6.7.8", "secret"));
    expect(hashIp("1.2.3.4", "secret")).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("handleContact", () => {
  test("valid + real claimed profile → stored + relayed to ownerEmail", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published", isDemo: false, ownerEmail: "riya@grad.gg" });
    const messages = fakeContactMessagesRepo();
    const email = fakeEmailSender();
    const res = await handleContact(body(), "iphash-1", deps({ profiles: fakeProfilesRepo([p]), messages, email }));
    expect(res).toEqual({ status: 200, json: { ok: true } });
    expect([...messages.rows.values()]).toHaveLength(1);
    expect([...messages.rows.values()][0].ipHash).toBe("iphash-1");
    expect(email.sent).toHaveLength(1);
    expect(email.sent[0].to).toBe("riya@grad.gg");
    expect(email.sent[0].text).not.toContain("riya@grad.gg"); // grad email never leaks into the body
  });

  test("relay html escapes sender-controlled fields (no HTML injection)", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published", isDemo: true });
    const email = fakeEmailSender();
    await handleContact(
      body({ senderName: "<img src=x>", message: "<a href='https://phish'>click</a> & win" }),
      "ip",
      deps({ profiles: fakeProfilesRepo([p]), email }),
    );
    const html = email.sent[0].html ?? "";
    expect(html).not.toContain("<img src=x>");
    expect(html).not.toContain("<a href");
    expect(html).toContain("&lt;img src=x&gt;");
    expect(html).toContain("&amp; win");
  });

  test("valid + demo profile → relayed to the staff inbox, not a fictional person", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published", isDemo: true, ownerEmail: null });
    const email = fakeEmailSender();
    await handleContact(body(), "iphash-2", deps({ profiles: fakeProfilesRepo([p]), email }));
    expect(email.sent[0].to).toBe("staff@gosu.gg");
  });

  test("honeypot filled → 200 but nothing stored or relayed", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published" });
    const messages = fakeContactMessagesRepo();
    const email = fakeEmailSender();
    const res = await handleContact(body({ website: "http://spam" }), "iphash-3", deps({ profiles: fakeProfilesRepo([p]), messages, email }));
    expect(res).toEqual({ status: 200, json: { ok: true } });
    expect(messages.rows.size).toBe(0);
    expect(email.sent).toHaveLength(0);
  });

  test("over the rate limit → 429, nothing stored", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published" });
    const messages = fakeContactMessagesRepo();
    const realNow = Date.now();
    for (let i = 0; i < RATE_LIMIT; i++) {
      await messages.create({ profileId: p.id, senderName: "x", senderEmail: "x@x.com", senderOrg: null, intent: "general", message: "m", ipHash: "flooder" });
    }
    const res = await handleContact(body(), "flooder", deps({ profiles: fakeProfilesRepo([p]), messages, nowMs: realNow }));
    expect(res.status).toBe(429);
    expect(messages.rows.size).toBe(RATE_LIMIT); // no new row added
  });

  test("unknown or unpublished handle → 404 (indistinguishable)", async () => {
    expect((await handleContact(body({ profileHandle: "nobody" }), "ip", deps())).status).toBe(404);
    const draft = makeProfile({ handle: "demo-riya", status: "draft" });
    expect((await handleContact(body(), "ip", deps({ profiles: fakeProfilesRepo([draft]) }))).status).toBe(404);
  });

  test("demo profile + empty staff inbox → stored, no relay, still 200", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published", isDemo: true, ownerEmail: null });
    const messages = fakeContactMessagesRepo();
    const email = fakeEmailSender();
    const res = await handleContact(body(), "ip", deps({ profiles: fakeProfilesRepo([p]), messages, email, staffInbox: "" }));
    expect(res).toEqual({ status: 200, json: { ok: true } });
    expect(messages.rows.size).toBe(1);
    expect(email.sent).toHaveLength(0);
  });

  test("empty senderOrg is stored as null", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published", isDemo: true });
    const messages = fakeContactMessagesRepo();
    await handleContact(body({ senderOrg: "" }), "ip", deps({ profiles: fakeProfilesRepo([p]), messages }));
    expect([...messages.rows.values()][0].senderOrg).toBeNull();
  });

  test("invalid body → 400", async () => {
    expect((await handleContact(body({ senderEmail: "not-an-email" }), "ip", deps())).status).toBe(400);
  });
});
