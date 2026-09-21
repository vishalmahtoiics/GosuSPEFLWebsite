import { describe, expect, test } from "vitest";
import { handleProfile } from "./talentProfile.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { fakeCredentialsRepo } from "./testing/fakeCredentialsRepo.js";
import { makeProfile } from "./testing/profileFixture.js";

describe("handleProfile", () => {
  test("published profile → public data + its credentials (verify ids)", async () => {
    const p = makeProfile({ handle: "demo-riya", status: "published" });
    const profiles = fakeProfilesRepo([p]);
    const credentials = fakeCredentialsRepo();
    const cred = await credentials.issue({
      profileId: p.id, holderName: p.certifiedName, course: "valorant", cohort: "2026 Season 1",
      issuedDate: "2026-06-01", issuer: "Gosu Academy", isDemo: true,
    });
    const res = await handleProfile("demo-riya", profiles, credentials);
    expect(res.status).toBe(200);
    const body = res.json as { handle: string; certifiedName: string; credentials: { id: string }[] };
    expect(body.handle).toBe("demo-riya");
    expect(body.certifiedName).toBe(p.certifiedName);
    expect(body.credentials.map((c) => c.id)).toContain(cred.id);
    expect(body).not.toHaveProperty("ownerEmail");
    expect(body).not.toHaveProperty("isDemo");
    expect(body).not.toHaveProperty("status");
  });

  test("unknown handle → 404", async () => {
    const res = await handleProfile("nobody", fakeProfilesRepo([]), fakeCredentialsRepo());
    expect(res.status).toBe(404);
  });

  test("draft/hidden profile → 404 (not leaked)", async () => {
    const p = makeProfile({ handle: "secret", status: "draft" });
    const res = await handleProfile("secret", fakeProfilesRepo([p]), fakeCredentialsRepo());
    expect(res.status).toBe(404);
  });
});
