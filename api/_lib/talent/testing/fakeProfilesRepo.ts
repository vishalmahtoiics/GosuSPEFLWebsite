import { randomUUID } from "node:crypto";
import { filterProfiles } from "../directory.js";
import type { NewProfile, ProfileFilter, ProfileRecord, ProfilesRepo, UpdateOwned } from "../profiles.js";

export function fakeProfilesRepo(
  seed: ProfileRecord[] = [],
): ProfilesRepo & { rows: Map<string, ProfileRecord> } {
  const rows = new Map(seed.map((r) => [r.id, r]));
  return {
    rows,
    async list(filter: ProfileFilter) {
      return filterProfiles([...rows.values()], filter);
    },
    async getByHandle(handle: string) {
      const r = [...rows.values()].find((p) => p.handle === handle);
      return r ? { ...r } : null;
    },
    async getById(id: string) {
      const r = rows.get(id);
      return r ? { ...r } : null;
    },
    async getByOwnerEmail(email: string) {
      const r = [...rows.values()].find(
        (p) => p.ownerEmail !== null && p.ownerEmail.toLowerCase() === email.toLowerCase(),
      );
      return r ? { ...r } : null;
    },
    async markClaimed(id: string, email: string) {
      const r = rows.get(id);
      if (!r) return null;
      const now = new Date().toISOString();
      r.ownerEmail = r.ownerEmail ?? email;
      r.claimedAt = now;
      r.updatedAt = now;
      return { ...r };
    },
    async updateOwned(id: string, fields: UpdateOwned) {
      const r = rows.get(id);
      if (!r) return null;
      r.displayName = fields.displayName;
      r.photoUrl = fields.photoUrl;
      r.headline = fields.headline;
      r.bio = fields.bio;
      r.region = fields.region;
      r.languages = fields.languages;
      r.games = fields.games;
      r.primaryGame = fields.primaryGame;
      r.roles = fields.roles;
      r.ranks = fields.ranks;
      r.achievements = fields.achievements;
      r.socials = fields.socials;
      r.vodEmbeds = fields.vodEmbeds;
      r.available = fields.available;
      r.coachDetails = fields.coachDetails;
      r.status = fields.status;
      r.updatedAt = new Date().toISOString();
      return { ...r };
    },
    async create(input: NewProfile) {
      const now = new Date().toISOString();
      const rec: ProfileRecord = {
        id: randomUUID(),
        handle: input.handle,
        type: input.type,
        displayName: input.displayName,
        certifiedName: input.certifiedName,
        photoUrl: null,
        headline: null,
        bio: null,
        region: null,
        languages: [],
        games: [],
        primaryGame: null,
        roles: [],
        ranks: {},
        achievements: [],
        socials: {},
        vodEmbeds: [],
        available: false,
        coachDetails: null,
        status: "draft",
        isDemo: input.isDemo,
        ownerEmail: input.ownerEmail,
        claimedAt: null,
        createdAt: now,
        updatedAt: now,
      };
      rows.set(rec.id, rec);
      return { ...rec };
    },
    async listAll() {
      return [...rows.values()]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((r) => ({ ...r }));
    },
    async setOwnerEmail(id: string, email: string) {
      const r = rows.get(id);
      if (!r) return null;
      r.ownerEmail = email;
      r.updatedAt = new Date().toISOString();
      return { ...r };
    },
  };
}
