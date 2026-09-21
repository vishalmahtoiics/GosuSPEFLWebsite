import { toPublicCredential, type CredentialsRepo } from "./credentials.js";
import { toPublicProfile, type ProfilesRepo } from "./profiles.js";

export async function handleProfile(
  handle: string,
  profiles: ProfilesRepo,
  credentials: CredentialsRepo,
): Promise<{ status: number; json: object }> {
  const p = await profiles.getByHandle(handle);
  if (!p || p.status !== "published") return { status: 404, json: { error: "not_found" } };
  const creds = await credentials.listByProfile(p.id);
  return { status: 200, json: toPublicProfile(p, creds.map(toPublicCredential)) };
}
