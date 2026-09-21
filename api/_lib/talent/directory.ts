import { z } from "zod";
import { toSummary, type ProfileFilter, type ProfileRecord, type ProfileSummary } from "./profiles.js";

export function filterProfiles(all: ProfileRecord[], f: ProfileFilter): ProfileSummary[] {
  let out = all.filter((p) => p.status === "published");
  if (f.q) {
    const q = f.q.toLowerCase();
    out = out.filter(
      (p) => p.displayName.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q),
    );
  }
  if (f.game) out = out.filter((p) => p.games.includes(f.game!));
  if (f.role) out = out.filter((p) => p.roles.includes(f.role!));
  if (f.language) out = out.filter((p) => p.languages.includes(f.language!));
  if (f.region) out = out.filter((p) => (p.region ?? "").toLowerCase() === f.region!.toLowerCase());
  if (f.type) out = out.filter((p) => p.type === f.type);
  if (f.available !== undefined) out = out.filter((p) => p.available === f.available);
  out = [...out].sort((a, b) =>
    f.sort === "name"
      ? a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase())
      : b.createdAt.localeCompare(a.createdAt),
  );
  return out.map(toSummary);
}

export const directoryQuerySchema = z.object({
  q: z.string().trim().min(1).max(80).optional(),
  game: z.string().trim().min(1).max(40).optional(),
  role: z.string().trim().min(1).max(40).optional(),
  region: z.string().trim().min(1).max(40).optional(),
  language: z.string().trim().min(1).max(40).optional(),
  type: z.enum(["player", "coach"]).optional(),
  available: z.enum(["true", "false"]).optional(),
  sort: z.enum(["recent", "name"]).default("recent"),
});

export type DirectoryQuery = z.infer<typeof directoryQuerySchema>;

export function queryToFilter(q: DirectoryQuery): ProfileFilter {
  return {
    q: q.q,
    game: q.game,
    role: q.role,
    region: q.region,
    language: q.language,
    type: q.type,
    available: q.available === undefined ? undefined : q.available === "true",
    sort: q.sort,
  };
}
