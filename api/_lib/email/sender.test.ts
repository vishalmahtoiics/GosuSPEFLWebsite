import { describe, expect, test, vi } from "vitest";
import { magicLinkEmail } from "./sender.js";
import { fakeEmailSender } from "./testing/fakeEmailSender.js";
import { emailSender } from "./index.js";

describe("magicLinkEmail template", () => {
  test("claim wording includes the link and a claim call to action", () => {
    const msg = magicLinkEmail("https://x.test/talent/claim/tok123", "claim");
    expect(msg.subject.toLowerCase()).toContain("claim");
    expect(msg.text).toContain("https://x.test/talent/claim/tok123");
    expect(msg.html).toContain("https://x.test/talent/claim/tok123");
  });

  test("login wording includes the link and sign-in copy", () => {
    const msg = magicLinkEmail("https://x.test/talent/claim/tok456", "login");
    expect(msg.subject.toLowerCase()).toContain("sign-in");
    expect(msg.text).toContain("https://x.test/talent/claim/tok456");
  });
});

describe("fakeEmailSender", () => {
  test("records each sent message", async () => {
    const email = fakeEmailSender();
    await email.send({ to: "a@example.com", subject: "s", text: "t" });
    expect(email.sent).toHaveLength(1);
    expect(email.sent[0].to).toBe("a@example.com");
  });
});

describe("emailSender factory", () => {
  test("without RESEND_API_KEY returns a console sender that does not throw", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const sender = emailSender({});
    await expect(
      sender.send({ to: "a@example.com", subject: "s", text: "t" }),
    ).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
