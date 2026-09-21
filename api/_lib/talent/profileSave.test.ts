import { describe, expect, test } from "vitest";
import { handleProfileSave } from "./profileSave.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { Session } from "./session.js";

const grad = (profileId: string): Session => ({
  role: "grad",
  profileId,
  email: "grad@x.com",
  exp: 9_999_999_999_999,
});

const validBody = (over: Record<string, unknown> = {}) => ({
  displayName: "Riya Updated",
  photoUrl: "",
  headline: "New headline",
  bio: "Rewritten bio",
  region: "Mumbai",
  languages: ["English", "Hindi"],
  games: ["valorant"],
  primaryGame: "valorant",
  roles: ["Duelist"],
  ranks: { valorant: "Radiant" },
  achievements: [{ title: "Won a thing" }],
  socials: { twitter: "https://twitter.com/riya", twitch: "" },
  vodEmbeds: [],
  available: true,
  coachDetails: null,
  publish: true,
  ...over,
});

describe("handleProfileSave", () => {
  test("grad saves owned fields; publish=true → published; ''→null; ''-social dropped", async () => {
    const p = makeProfile({ handle: "riya", type: "player", status: "draft" });
    const profiles = fakeProfilesRepo([p]);
    const res = await handleProfileSave(grad(p.id), validBody(), profiles);
    expect(res).toEqual({ status: 200, json: { ok: true } });
    const saved = (await profiles.getById(p.id))!;
    expect(saved.displayName).toBe("Riya Updated");
    expect(saved.status).toBe("published");
    expect(saved.photoUrl).toBeNull();
    expect(saved.socials.twitch).toBeUndefined();
  });

  test("publish=false → hidden", async () => {
    const p = makeProfile({ type: "player" });
    const profiles = fakeProfilesRepo([p]);
    await handleProfileSave(grad(p.id), validBody({ publish: false }), profiles);
    expect((await profiles.getById(p.id))!.status).toBe("hidden");
  });

  test("a player cannot set coachDetails (forced null)", async () => {
    const p = makeProfile({ type: "player" });
    const profiles = fakeProfilesRepo([p]);
    await handleProfileSave(
      grad(p.id),
      validBody({
        coachDetails: { specialties: ["x"], experienceYears: 3, workedWith: [], testimonials: [] },
      }),
      profiles,
    );
    expect((await profiles.getById(p.id))!.coachDetails).toBeNull();
  });

  test("a coach keeps their coachDetails", async () => {
    const p = makeProfile({ type: "coach" });
    const profiles = fakeProfilesRepo([p]);
    await handleProfileSave(
      grad(p.id),
      validBody({
        coachDetails: { specialties: ["VOD review"], experienceYears: 5, workedWith: ["Teams"], testimonials: [] },
      }),
      profiles,
    );
    expect((await profiles.getById(p.id))!.coachDetails?.experienceYears).toBe(5);
  });

  test("locked fields in the body are ignored (handle/certifiedName/type unchanged)", async () => {
    const p = makeProfile({ handle: "riya", certifiedName: "Riya Kapoor", type: "player" });
    const profiles = fakeProfilesRepo([p]);
    await handleProfileSave(
      grad(p.id),
      validBody({ handle: "hacked", certifiedName: "Someone Else", type: "coach", id: "x" }),
      profiles,
    );
    const saved = (await profiles.getById(p.id))!;
    expect(saved.handle).toBe("riya");
    expect(saved.certifiedName).toBe("Riya Kapoor");
    expect(saved.type).toBe("player");
  });

  test("invalid body → 400", async () => {
    const p = makeProfile();
    const profiles = fakeProfilesRepo([p]);
    expect((await handleProfileSave(grad(p.id), { displayName: "" }, profiles)).status).toBe(400);
  });

  test("non-grad session → 403", async () => {
    const staff: Session = { role: "staff", profileId: null, email: "s@x.com", exp: 9_999_999_999_999 };
    expect((await handleProfileSave(staff, validBody(), fakeProfilesRepo())).status).toBe(403);
  });
});
