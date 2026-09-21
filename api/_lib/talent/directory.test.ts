import { describe, expect, test } from "vitest";
import { directoryQuerySchema, filterProfiles, queryToFilter } from "./directory.js";
import { makeProfile } from "./testing/profileFixture.js";

const val = makeProfile({
  handle: "val-duelist", displayName: "Bravo", games: ["valorant"], primaryGame: "valorant",
  roles: ["Duelist"], region: "Mumbai", languages: ["Hindi"], type: "player", available: true,
  createdAt: "2026-06-03T00:00:00.000Z",
});
const bgmi = makeProfile({
  handle: "bgmi-igl", displayName: "Alpha", games: ["bgmi"], primaryGame: "bgmi",
  roles: ["IGL"], region: "Delhi", languages: ["English"], type: "player", available: false,
  createdAt: "2026-06-01T00:00:00.000Z",
});
const coach = makeProfile({
  handle: "val-coach", displayName: "Charlie", games: ["valorant"], primaryGame: "valorant",
  roles: ["Coach"], region: "Pune", languages: [], type: "coach", available: true,
  createdAt: "2026-06-02T00:00:00.000Z",
});
const draft = makeProfile({ handle: "hidden-one", status: "draft", games: ["valorant"] });
const all = [val, bgmi, coach, draft];
const handles = (f: Parameters<typeof filterProfiles>[1]) => filterProfiles(all, f).map((s) => s.handle);

describe("filterProfiles", () => {
  test("excludes non-published; default recency order", () => {
    expect(handles({ sort: "recent" })).toEqual(["val-duelist", "val-coach", "bgmi-igl"]);
  });
  test("game filter (array-includes)", () => {
    expect(handles({ sort: "recent", game: "bgmi" })).toEqual(["bgmi-igl"]);
  });
  test("role and type filters", () => {
    expect(handles({ sort: "recent", role: "IGL" })).toEqual(["bgmi-igl"]);
    expect(handles({ sort: "recent", type: "coach" })).toEqual(["val-coach"]);
  });
  test("available + language + region (case-insensitive)", () => {
    expect(handles({ sort: "recent", available: true })).toEqual(["val-duelist", "val-coach"]);
    expect(handles({ sort: "recent", language: "Hindi" })).toEqual(["val-duelist"]);
    expect(handles({ sort: "recent", region: "delhi" })).toEqual(["bgmi-igl"]);
  });
  test("q searches name and handle, case-insensitive", () => {
    expect(handles({ sort: "recent", q: "alp" })).toEqual(["bgmi-igl"]);
    expect(handles({ sort: "recent", q: "COACH" })).toEqual(["val-coach"]);
  });
  test("sort=name is alphabetical by display name", () => {
    expect(handles({ sort: "name" })).toEqual(["bgmi-igl", "val-duelist", "val-coach"]);
  });
  test("returns summaries, not records (no private fields)", () => {
    const [s] = filterProfiles(all, { sort: "recent" });
    expect(s).not.toHaveProperty("ownerEmail");
    expect(s).not.toHaveProperty("status");
  });
});

describe("directoryQuerySchema + queryToFilter", () => {
  test("defaults sort to recent and maps available string to boolean", () => {
    const parsed = directoryQuerySchema.parse({ available: "true" });
    expect(parsed.sort).toBe("recent");
    expect(queryToFilter(parsed).available).toBe(true);
    expect(queryToFilter(directoryQuerySchema.parse({})).available).toBeUndefined();
  });
  test("rejects an unknown sort value", () => {
    expect(directoryQuerySchema.safeParse({ sort: "bogus" }).success).toBe(false);
  });
});
