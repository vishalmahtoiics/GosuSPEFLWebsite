import { describe, expect, test } from "vitest";
import {
  handleAdminCreateProfile,
  handleAdminInvite,
  handleAdminIssueCredential,
  handleAdminListMessages,
  handleAdminListProfiles,
  handleAdminRevoke,
  handleAdminSetMessageStatus,
  requireStaffRole,
} from "./admin.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { fakeCredentialsRepo } from "./testing/fakeCredentialsRepo.js";
import { fakeContactMessagesRepo } from "./testing/fakeContactMessagesRepo.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { Session } from "./session.js";
import type { ProfileRecord } from "./profiles.js";
import type { CredentialRecord } from "./credentials.js";

const staff: Session = { role: "staff", profileId: null, email: "staff@gosu.gg", exp: 9_999_999_999_999 };
const grad: Session = { role: "grad", profileId: "p1", email: "grad@x.com", exp: 9_999_999_999_999 };

describe("requireStaffRole", () => {
  test("null for staff, 403 for grad", () => {
    expect(requireStaffRole(staff)).toBeNull();
    expect(requireStaffRole(grad)).toEqual({ status: 403, json: { error: "forbidden" } });
  });
});

describe("handleAdminListProfiles", () => {
  test("staff gets all profiles incl draft/hidden", async () => {
    const profiles = fakeProfilesRepo([
      makeProfile({ handle: "a", status: "published" }),
      makeProfile({ handle: "b", status: "draft" }),
    ]);
    const res = await handleAdminListProfiles(staff, profiles);
    expect(res.status).toBe(200);
    expect((res.json as { profiles: ProfileRecord[] }).profiles).toHaveLength(2);
  });
  test("grad → 403", async () => {
    expect((await handleAdminListProfiles(grad, fakeProfilesRepo())).status).toBe(403);
  });
});

describe("handleAdminCreateProfile", () => {
  const body = (over: Record<string, unknown> = {}) => ({
    handle: "new-grad", type: "player", displayName: "New Grad", certifiedName: "New Grad Real", ...over,
  });
  test("staff creates a draft profile (201), isDemo defaults true", async () => {
    const profiles = fakeProfilesRepo();
    const res = await handleAdminCreateProfile(staff, body(), profiles);
    expect(res.status).toBe(201);
    const created = (res.json as { profile: ProfileRecord }).profile;
    expect(created.status).toBe("draft");
    expect(created.isDemo).toBe(true);
    expect(profiles.rows.get(created.id)).toBeTruthy();
  });
  test("grad → 403", async () => {
    expect((await handleAdminCreateProfile(grad, body(), fakeProfilesRepo())).status).toBe(403);
  });
  test("invalid body → 400", async () => {
    expect((await handleAdminCreateProfile(staff, { handle: "" }, fakeProfilesRepo())).status).toBe(400);
  });
});

describe("handleAdminIssueCredential", () => {
  const body = (over: Record<string, unknown> = {}) => ({
    profileId: "p1", holderName: "Real Name", course: "valorant", cohort: "2026 Season 1", issuedDate: "2026-06-01", ...over,
  });
  test("staff issues a credential (201), issuer defaults", async () => {
    const credentials = fakeCredentialsRepo();
    const res = await handleAdminIssueCredential(staff, body(), credentials);
    expect(res.status).toBe(201);
    const cred = (res.json as { credential: CredentialRecord }).credential;
    expect(cred.status).toBe("valid");
    expect(cred.issuer).toBe("Gosu Academy");
    expect(credentials.rows.get(cred.id)).toBeTruthy();
  });
  test("grad → 403", async () => {
    expect((await handleAdminIssueCredential(grad, body(), fakeCredentialsRepo())).status).toBe(403);
  });
  test("invalid issuedDate → 400", async () => {
    expect((await handleAdminIssueCredential(staff, body({ issuedDate: "nope" }), fakeCredentialsRepo())).status).toBe(400);
  });
});

describe("handleAdminRevoke", () => {
  test("staff revokes an existing valid credential (200)", async () => {
    const credentials = fakeCredentialsRepo();
    const cred = await credentials.issue({
      profileId: "p1", holderName: "N", course: "valorant", cohort: "c", issuedDate: "2026-06-01", issuer: "Gosu Academy", isDemo: true,
    });
    const res = await handleAdminRevoke(staff, cred.id, { reason: "superseded" }, credentials);
    expect(res).toEqual({ status: 200, json: { ok: true } });
    expect(credentials.rows.get(cred.id)!.status).toBe("revoked");
  });
  test("missing id → 404", async () => {
    expect((await handleAdminRevoke(staff, "nope", { reason: "x" }, fakeCredentialsRepo())).status).toBe(404);
  });
  test("invalid reason → 400", async () => {
    expect((await handleAdminRevoke(staff, "id", { reason: "" }, fakeCredentialsRepo())).status).toBe(400);
  });
  test("grad → 403", async () => {
    expect((await handleAdminRevoke(grad, "id", { reason: "x" }, fakeCredentialsRepo())).status).toBe(403);
  });
});

describe("handleAdminListMessages", () => {
  test("staff lists messages", async () => {
    const messages = fakeContactMessagesRepo();
    await messages.create({ profileId: "p1", senderName: "S", senderEmail: "s@x.com", senderOrg: null, intent: "general", message: "hi", ipHash: "h" });
    const res = await handleAdminListMessages(staff, messages);
    expect(res.status).toBe(200);
    expect((res.json as { messages: unknown[] }).messages).toHaveLength(1);
  });
  test("grad → 403", async () => {
    expect((await handleAdminListMessages(grad, fakeContactMessagesRepo())).status).toBe(403);
  });
});

describe("handleAdminSetMessageStatus", () => {
  test("staff marks a message read (200)", async () => {
    const messages = fakeContactMessagesRepo();
    const rec = await messages.create({ profileId: "p1", senderName: "S", senderEmail: "s@x.com", senderOrg: null, intent: "general", message: "hi", ipHash: "h" });
    const res = await handleAdminSetMessageStatus(staff, { id: rec.id, status: "read" }, messages);
    expect(res).toEqual({ status: 200, json: { ok: true } });
    expect(messages.rows.get(rec.id)!.status).toBe("read");
  });
  test("missing id → 404", async () => {
    expect((await handleAdminSetMessageStatus(staff, { id: "nope", status: "read" }, fakeContactMessagesRepo())).status).toBe(404);
  });
  test("invalid status → 400", async () => {
    expect((await handleAdminSetMessageStatus(staff, { id: "x", status: "bogus" }, fakeContactMessagesRepo())).status).toBe(400);
  });
  test("grad → 403", async () => {
    expect((await handleAdminSetMessageStatus(grad, { id: "x", status: "read" }, fakeContactMessagesRepo())).status).toBe(403);
  });
});

describe("handleAdminInvite", () => {
  test("staff sets ownerEmail without claiming (200)", async () => {
    const p = makeProfile({ handle: "invitee", ownerEmail: null, claimedAt: null });
    const profiles = fakeProfilesRepo([p]);
    const res = await handleAdminInvite(staff, { profileId: p.id, email: "invitee@x.com" }, profiles);
    expect(res.status).toBe(200);
    const updated = (res.json as { profile: ProfileRecord }).profile;
    expect(updated.ownerEmail).toBe("invitee@x.com");
    expect(updated.claimedAt).toBeNull();
  });
  test("missing profile → 404", async () => {
    expect((await handleAdminInvite(staff, { profileId: "nope", email: "x@x.com" }, fakeProfilesRepo())).status).toBe(404);
  });
  test("invalid email → 400", async () => {
    const p = makeProfile();
    expect((await handleAdminInvite(staff, { profileId: p.id, email: "bad" }, fakeProfilesRepo([p]))).status).toBe(400);
  });
  test("grad → 403", async () => {
    expect((await handleAdminInvite(grad, { profileId: "x", email: "x@x.com" }, fakeProfilesRepo())).status).toBe(403);
  });
});
