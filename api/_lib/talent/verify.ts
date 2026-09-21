import { toPublicCredential, type CredentialsRepo } from "./credentials.js";

export async function handleVerify(
  id: string,
  repo: CredentialsRepo,
): Promise<{ status: number; json: object }> {
  const cred = await repo.get(id);
  if (!cred) return { status: 404, json: { error: "not_found" } };
  return { status: 200, json: toPublicCredential(cred) };
}
