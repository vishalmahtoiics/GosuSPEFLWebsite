import { describe, expect, test } from "vitest";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { UpdateOwned } from "./profiles.js";

const owned = (over: Partial<UpdateOwned> = {}): UpdateOwned => ({
  displayName: "New Name",
  photoUrl: null,
  headline: "New headline",
  bio: "New bio",
  region: "Delhi",
  languages: ["English"],
  games: ["valorant"],
  primaryGame: "valorant",
  roles: ["Sentinel"],
  ranks: { valorant: "Radiant" },
  achievements: [],
  socials: { twitter: "https://twitter.com/x" },
  vodEmbeds: [],
  available: false,
  coachDetails: null,
  status: "published",
  ...over,
});

describe("ProfilesRepo claim/edit methods (fake)", () => {
  test("getById returns a snapshot; null when unknown", async () => {
    const p = makeProfile();
    const repo = fakeProfilesRepo([p]);
    const got = (await repo.getById(p.id))!;
    expect(got.id).toBe(p.id);
    got.displayName = "MUTATED";
    expect((await repo.getById(p.id))!.displayName).toBe(p.displayName);
    expect(await repo.getById("missing")).toBeNull();
  });

  test("getByOwnerEmail matches case-insensitively; null when unclaimed", async () => {
    const claimed = makeProfile({ handle: "claimed", ownerEmail: "Grad@Example.com" });
    const unclaimed = makeProfile({ handle: "unclaimed", ownerEmail: null });
    const repo = fakeProfilesRepo([claimed, unclaimed]);
    expect((await repo.getByOwnerEmail("grad@example.com"))!.handle).toBe("claimed");
    expect(await repo.getByOwnerEmail("nobody@example.com")).toBeNull();
  });

  test("markClaimed sets ownerEmail + claimedAt; keeps an existing owner; null for missing", async () => {
    const fresh = makeProfile({ handle: "fresh", ownerEmail: null, claimedAt: null });
    const repo = fakeProfilesRepo([fresh]);
    const out = (await repo.markClaimed(fresh.id, "new@example.com"))!;
    expect(out.ownerEmail).toBe("new@example.com");
    expect(out.claimedAt).not.toBeNull();

    const already = makeProfile({ handle: "already", ownerEmail: "first@example.com" });
    const repo2 = fakeProfilesRepo([already]);
    expect((await repo2.markClaimed(already.id, "second@example.com"))!.ownerEmail).toBe(
      "first@example.com",
    );
    expect(await repo.markClaimed("missing", "x@example.com")).toBeNull();
  });

  test("updateOwned overwrites owned fields + bumps updatedAt; null for missing", async () => {
    const p = makeProfile({ displayName: "Old", updatedAt: "2026-06-01T00:00:00.000Z" });
    const repo = fakeProfilesRepo([p]);
    const out = (await repo.updateOwned(p.id, owned({ displayName: "Fresh Name" })))!;
    expect(out.displayName).toBe("Fresh Name");
    expect(out.ranks).toEqual({ valorant: "Radiant" });
    expect(out.status).toBe("published");
    expect(out.updatedAt).not.toBe("2026-06-01T00:00:00.000Z");
    expect(await repo.updateOwned("missing", owned())).toBeNull();
  });
});
