import { describe, expect, test } from "vitest";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { makeProfile } from "./testing/profileFixture.js";

describe("ProfilesRepo contract (fake)", () => {
  test("list returns only published, filtered summaries", async () => {
    const repo = fakeProfilesRepo([
      makeProfile({ handle: "pub", status: "published", games: ["valorant"] }),
      makeProfile({ handle: "draft", status: "draft", games: ["valorant"] }),
    ]);
    const list = await repo.list({ sort: "recent", game: "valorant" });
    expect(list.map((s) => s.handle)).toEqual(["pub"]);
  });

  test("getByHandle returns a snapshot; null when unknown", async () => {
    const p = makeProfile({ handle: "riya" });
    const repo = fakeProfilesRepo([p]);
    const got = (await repo.getByHandle("riya"))!;
    expect(got.handle).toBe("riya");
    got.displayName = "MUTATED";
    expect((await repo.getByHandle("riya"))!.displayName).toBe(p.displayName);
    expect(await repo.getByHandle("nope")).toBeNull();
  });

  test("list summaries do not share array refs with stored records", async () => {
    const p = makeProfile({ handle: "riya", status: "published", games: ["valorant"] });
    const repo = fakeProfilesRepo([p]);
    const [s] = await repo.list({ sort: "recent" });
    expect(s.games).not.toBe(p.games);
  });
});
