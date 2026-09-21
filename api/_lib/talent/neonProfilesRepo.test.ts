import { describe, expect, test } from "vitest";
import { neon } from "@neondatabase/serverless";
import { neonProfilesRepo } from "./neonProfilesRepo.js";

// Live DB only. Skips cleanly (and does not construct neon()) when DATABASE_URL is unset.
const url = process.env.DATABASE_URL;
const d = url ? describe : describe.skip;

d("neonProfilesRepo (integration)", () => {
  test("getByHandle round-trips a seeded profile; list returns it", async () => {
    const sql = neon(url!);
    const repo = neonProfilesRepo(sql);
    const p = await repo.getByHandle("demo-riya");
    expect(p?.handle).toBe("demo-riya");
    const list = await repo.list({ sort: "recent" });
    expect(list.some((s) => s.handle === "demo-riya")).toBe(true);
  });
});
