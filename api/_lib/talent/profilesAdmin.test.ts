import { describe, expect, test } from "vitest";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { NewProfile } from "./profiles.js";

const newInput = (over: Partial<NewProfile> = {}): NewProfile => ({
  handle: "created-grad",
  type: "player",
  displayName: "Created Grad",
  certifiedName: "Created Grad Real",
  ownerEmail: null,
  isDemo: true,
  ...over,
});

describe("ProfilesRepo admin methods (fake)", () => {
  test("create inserts a draft with empty defaults", async () => {
    const repo = fakeProfilesRepo();
    const rec = await repo.create(newInput({ ownerEmail: "owner@x.com" }));
    expect(rec.id).toBeTruthy();
    expect(rec.status).toBe("draft");
    expect(rec.handle).toBe("created-grad");
    expect(rec.ownerEmail).toBe("owner@x.com");
    expect(rec.isDemo).toBe(true);
    expect(rec.languages).toEqual([]);
    expect(rec.ranks).toEqual({});
    expect(rec.coachDetails).toBeNull();
    expect(rec.available).toBe(false);
    expect(rec.claimedAt).toBeNull();
    expect(repo.rows.get(rec.id)).toBeTruthy();
  });

  test("listAll returns every status, newest-first", async () => {
    const older = makeProfile({ handle: "older", status: "hidden", createdAt: "2026-01-01T00:00:00.000Z" });
    const newer = makeProfile({ handle: "newer", status: "draft", createdAt: "2026-05-01T00:00:00.000Z" });
    const repo = fakeProfilesRepo([older, newer]);
    const all = await repo.listAll();
    expect(all.map((p) => p.handle)).toEqual(["newer", "older"]);
  });

  test("setOwnerEmail sets ownerEmail without claimedAt; null for a missing id", async () => {
    const p = makeProfile({ ownerEmail: null, claimedAt: null });
    const repo = fakeProfilesRepo([p]);
    const out = (await repo.setOwnerEmail(p.id, "new@x.com"))!;
    expect(out.ownerEmail).toBe("new@x.com");
    expect(out.claimedAt).toBeNull();
    expect(await repo.setOwnerEmail("missing", "x@x.com")).toBeNull();
  });
});
