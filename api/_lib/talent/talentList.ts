import { directoryQuerySchema, queryToFilter } from "./directory.js";
import type { ProfilesRepo } from "./profiles.js";

export async function handleList(
  rawQuery: unknown,
  repo: ProfilesRepo,
): Promise<{ status: number; json: object }> {
  const parsed = directoryQuerySchema.safeParse(rawQuery);
  if (!parsed.success) return { status: 400, json: { error: "invalid_query" } };
  const profiles = await repo.list(queryToFilter(parsed.data));
  return { status: 200, json: { profiles } };
}
