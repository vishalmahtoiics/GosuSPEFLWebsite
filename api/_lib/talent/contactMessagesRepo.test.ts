import { describe, expect, test } from "vitest";
import { fakeContactMessagesRepo } from "./testing/fakeContactMessagesRepo.js";
import type { ContactMessageRecord, NewContactMessage } from "./contactMessages.js";

const input = (over: Partial<NewContactMessage> = {}): NewContactMessage => ({
  profileId: "11111111-1111-1111-1111-111111111111",
  senderName: "Priya Recruiter",
  senderEmail: "priya@team.gg",
  senderOrg: null,
  intent: "recruit-player",
  message: "We'd like to trial you.",
  ipHash: "hash-aaa",
  ...over,
});

const seedRow = (over: Partial<ContactMessageRecord>): ContactMessageRecord => ({
  ...input(),
  id: over.id ?? "seed",
  status: "new",
  createdAt: "2026-01-01T00:00:00.000Z",
  ...over,
});

describe("ContactMessagesRepo contract (fake)", () => {
  test("create stores a record with id/status new/createdAt", async () => {
    const repo = fakeContactMessagesRepo();
    const rec = await repo.create(input());
    expect(rec.id).toBeTruthy();
    expect(rec.status).toBe("new");
    expect(rec.createdAt).toBeTruthy();
    expect(rec.senderEmail).toBe("priya@team.gg");
    expect(repo.rows.get(rec.id)).toBeTruthy();
  });

  test("recentCountByIpHash counts matching ipHash after the since cutoff", async () => {
    const repo = fakeContactMessagesRepo();
    repo.rows.set("old", seedRow({ id: "old", ipHash: "aaa", createdAt: "2026-01-01T00:00:00.000Z" }));
    repo.rows.set("new", seedRow({ id: "new", ipHash: "aaa", createdAt: "2026-03-01T00:00:00.000Z" }));
    repo.rows.set("other", seedRow({ id: "other", ipHash: "bbb", createdAt: "2026-03-01T00:00:00.000Z" }));
    expect(await repo.recentCountByIpHash("aaa", "2026-02-01T00:00:00.000Z")).toBe(1);
    expect(await repo.recentCountByIpHash("aaa", "1970-01-01T00:00:00.000Z")).toBe(2);
    expect(await repo.recentCountByIpHash("ccc", "1970-01-01T00:00:00.000Z")).toBe(0);
  });

  test("list returns newest-first copies (mutating one does not touch the store)", async () => {
    const repo = fakeContactMessagesRepo();
    repo.rows.set("old", seedRow({ id: "old", createdAt: "2026-01-01T00:00:00.000Z" }));
    repo.rows.set("new", seedRow({ id: "new", createdAt: "2026-05-01T00:00:00.000Z" }));
    const list = await repo.list();
    expect(list.map((m) => m.id)).toEqual(["new", "old"]);
    list[0].senderName = "MUTATED";
    expect(repo.rows.get("new")!.senderName).toBe("Priya Recruiter");
  });

  test("setStatus mutates an existing row; false for a missing id", async () => {
    const repo = fakeContactMessagesRepo();
    const rec = await repo.create(input());
    expect(await repo.setStatus(rec.id, "read")).toBe(true);
    expect(repo.rows.get(rec.id)!.status).toBe("read");
    expect(await repo.setStatus("missing", "routed")).toBe(false);
  });
});
