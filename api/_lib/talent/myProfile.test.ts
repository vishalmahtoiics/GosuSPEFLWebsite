import { describe, expect, test } from "vitest";
import { handleMyProfile, toMyProfile } from "./myProfile.js";
import { fakeProfilesRepo } from "./testing/fakeProfilesRepo.js";
import { fakeCredentialsRepo } from "./testing/fakeCredentialsRepo.js";
import { makeProfile } from "./testing/profileFixture.js";
import type { Session } from "./session.js";

const gradSession = (profileId: string): Session => ({
  role: "grad",
  profileId,
  email: "grad@x.com",
  exp: 9_999_999_999_999,
});

describe("toMyProfile", () => {
  test("includes certifiedName + status but no private fields", () => {
    const p = makeProfile({ ownerEmail: "grad@x.com", status: "hidden", isDemo: true });
    const my = toMyProfile(p, []);
    expect(my.certifiedName).toBe(p.certifiedName);
    expect(my.status).toBe("hidden");
    expect(my).not.toHaveProperty("ownerEmail");
    expect(my).not.toHaveProperty("id");
    expect(my).not.toHaveProperty("isDemo");
    expect(my).not.toHaveProperty("claimedAt");
    expect(my).not.toHaveProperty("createdAt");
    expect(my).not.toHaveProperty("updatedAt");
  });
});

describe("handleMyProfile", () => {
  test("grad reads their own profile with credentials", async () => {
    const p = makeProfile({ handle: "riya", status: "hidden" });
    const profiles = fakeProfilesRepo([p]);
    const credentials = fakeCredentialsRepo();
    const cred = await credentials.issue({
      profileId: p.id, holderName: p.certifiedName, course: "valorant", cohort: "2026 Season 1",
      issuedDate: "2026-06-01", issuer: "Gosu Academy", isDemo: true,
    });
    const res = await handleMyProfile(gradSession(p.id), profiles, credentials);
    expect(res.status).toBe(200);
    const body = res.json as { handle: string; status: string; credentials: { id: string }[] };
    expect(body.handle).toBe("riya");
    expect(body.status).toBe("hidden");
    expect(body.credentials.map((c) => c.id)).toContain(cred.id);
    expect(body).not.toHaveProperty("ownerEmail");
  });

  test("staff session → 403", async () => {
    const staff: Session = { role: "staff", profileId: null, email: "s@x.com", exp: 9_999_999_999_999 };
    const res = await handleMyProfile(staff, fakeProfilesRepo(), fakeCredentialsRepo());
    expect(res.status).toBe(403);
  });

  test("grad session with no matching profile → 404", async () => {
    const res = await handleMyProfile(
      gradSession("missing-id"), fakeProfilesRepo(), fakeCredentialsRepo(),
    );
    expect(res.status).toBe(404);
  });
});
