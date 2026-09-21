import { randomUUID } from "node:crypto";
import type { ProfileRecord } from "../profiles.js";

export function makeProfile(overrides: Partial<ProfileRecord> = {}): ProfileRecord {
  return {
    id: randomUUID(),
    handle: "demo-player",
    type: "player",
    displayName: 'Demo "Player" One',
    certifiedName: "Demo Player One",
    photoUrl: null,
    headline: "Aspiring duelist",
    bio: "Short bio.",
    region: "Mumbai",
    languages: ["English", "Hindi"],
    games: ["valorant"],
    primaryGame: "valorant",
    roles: ["Duelist"],
    ranks: { valorant: "Immortal 2" },
    achievements: [],
    socials: {},
    vodEmbeds: [],
    available: true,
    coachDetails: null,
    status: "published",
    isDemo: true,
    ownerEmail: null,
    claimedAt: null,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
    ...overrides,
  };
}
