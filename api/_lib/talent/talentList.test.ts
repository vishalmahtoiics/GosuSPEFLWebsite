import { describe, expect, test } from "vitest";
import { handleList } from "./talentList.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { makeProfile } from "./testing/profileFixture.js";

const repo = () =>
  fakeProfilesRepo([
    makeProfile({ handle: "val-duelist", displayName: "Bravo", games: ["valorant"], primaryGame: "valorant", roles: ["Duelist"], type: "player", available: true, createdAt: "2026-06-03T00:00:00.000Z" }),
    makeProfile({ handle: "bgmi-igl", displayName: "Alpha", games: ["bgmi"], primaryGame: "bgmi", roles: ["IGL"], type: "player", available: false, createdAt: "2026-06-01T00:00:00.000Z" }),
    makeProfile({ handle: "val-coach", displayName: "Charlie", games: ["valorant"], primaryGame: "valorant", roles: ["Coach"], type: "coach", available: true, createdAt: "2026-06-02T00:00:00.000Z" }),
  ]);

const names = (json: object) => (json as { profiles: { handle: string }[] }).profiles.map((p) => p.handle);

describe("handleList", () => {
  test("no filters → all published in recency order", async () => {
    const res = await handleList({}, repo());
    expect(res.status).toBe(200);
    expect(names(res.json)).toEqual(["val-duelist", "val-coach", "bgmi-igl"]);
  });
  test("filters by game + available", async () => {
    const res = await handleList({ game: "valorant", available: "true" }, repo());
    expect(names(res.json)).toEqual(["val-duelist", "val-coach"]);
  });
  test("sort=name orders alphabetically", async () => {
    const res = await handleList({ sort: "name" }, repo());
    expect(names(res.json)).toEqual(["bgmi-igl", "val-duelist", "val-coach"]);
  });
  test("invalid query → 400", async () => {
    const res = await handleList({ sort: "bogus" }, repo());
    expect(res.status).toBe(400);
  });
});
