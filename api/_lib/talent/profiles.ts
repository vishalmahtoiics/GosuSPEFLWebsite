import type { PublicCredential } from "./credentials.js";

export type ProfileType = "player" | "coach";
export type ProfileStatus = "draft" | "published" | "hidden";

export interface Achievement {
  title: string;
  detail?: string;
  date?: string;
}

export interface VodEmbed {
  title: string;
  url: string;
}

export interface Socials {
  twitter?: string;
  twitch?: string;
  youtube?: string;
  instagram?: string;
  discord?: string;
}

export interface CoachDetails {
  specialties: string[];
  experienceYears: number;
  workedWith: string[];
  testimonials: { author: string; quote: string }[];
}

export interface ProfileRecord {
  id: string;
  handle: string;
  type: ProfileType;
  displayName: string;
  certifiedName: string;
  photoUrl: string | null;
  headline: string | null;
  bio: string | null;
  region: string | null;
  languages: string[];
  games: string[];
  primaryGame: string | null;
  roles: string[];
  ranks: Record<string, string>;
  achievements: Achievement[];
  socials: Socials;
  vodEmbeds: VodEmbed[];
  available: boolean;
  coachDetails: CoachDetails | null;
  status: ProfileStatus;
  isDemo: boolean;
  ownerEmail: string | null;
  claimedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Card-level projection for the directory list. Omits locked/private fields. */
export interface ProfileSummary {
  handle: string;
  type: ProfileType;
  displayName: string;
  photoUrl: string | null;
  headline: string | null;
  region: string | null;
  primaryGame: string | null;
  games: string[];
  roles: string[];
  ranks: Record<string, string>;
  available: boolean;
}

/** Full public profile projection (detail page). Omits id/ownerEmail/isDemo/status/timestamps. */
export interface PublicProfile {
  handle: string;
  type: ProfileType;
  displayName: string;
  certifiedName: string;
  photoUrl: string | null;
  headline: string | null;
  bio: string | null;
  region: string | null;
  languages: string[];
  games: string[];
  primaryGame: string | null;
  roles: string[];
  ranks: Record<string, string>;
  achievements: Achievement[];
  socials: Socials;
  vodEmbeds: VodEmbed[];
  available: boolean;
  coachDetails: CoachDetails | null;
  credentials: PublicCredential[];
}

export interface ProfileFilter {
  q?: string;
  game?: string;
  role?: string;
  region?: string;
  language?: string;
  type?: ProfileType;
  available?: boolean;
  sort: "recent" | "name";
}

/** The exact set of grad-editable fields, plus a resolved status (core maps publish→"published"/"hidden"; never accepts "draft" from a client). */
export interface UpdateOwned {
  displayName: string;
  photoUrl: string | null;
  headline: string | null;
  bio: string | null;
  region: string | null;
  languages: string[];
  games: string[];
  primaryGame: string | null;
  roles: string[];
  ranks: Record<string, string>;
  achievements: Achievement[];
  socials: Socials;
  vodEmbeds: VodEmbed[];
  available: boolean;
  coachDetails: CoachDetails | null;
  status: ProfileStatus;
}

export interface NewProfile {
  handle: string;
  type: ProfileType;
  displayName: string;
  certifiedName: string;
  ownerEmail: string | null;
  isDemo: boolean;
}

export interface ProfilesRepo {
  list(filter: ProfileFilter): Promise<ProfileSummary[]>;
  getByHandle(handle: string): Promise<ProfileRecord | null>;
  getById(id: string): Promise<ProfileRecord | null>;
  getByOwnerEmail(email: string): Promise<ProfileRecord | null>;
  markClaimed(id: string, email: string): Promise<ProfileRecord | null>;
  updateOwned(id: string, fields: UpdateOwned): Promise<ProfileRecord | null>;
  create(input: NewProfile): Promise<ProfileRecord>;
  listAll(): Promise<ProfileRecord[]>; // all statuses, newest first (admin)
  setOwnerEmail(id: string, email: string): Promise<ProfileRecord | null>; // invite: does NOT set claimed_at
}

export function toSummary(p: ProfileRecord): ProfileSummary {
  return {
    handle: p.handle,
    type: p.type,
    displayName: p.displayName,
    photoUrl: p.photoUrl,
    headline: p.headline,
    region: p.region,
    primaryGame: p.primaryGame,
    games: [...p.games],
    roles: [...p.roles],
    ranks: { ...p.ranks },
    available: p.available,
  };
}

export function toPublicProfile(p: ProfileRecord, credentials: PublicCredential[]): PublicProfile {
  return {
    handle: p.handle,
    type: p.type,
    displayName: p.displayName,
    certifiedName: p.certifiedName,
    photoUrl: p.photoUrl,
    headline: p.headline,
    bio: p.bio,
    region: p.region,
    languages: [...p.languages],
    games: [...p.games],
    primaryGame: p.primaryGame,
    roles: [...p.roles],
    ranks: { ...p.ranks },
    achievements: p.achievements.map((a) => ({ ...a })),
    socials: { ...p.socials },
    vodEmbeds: p.vodEmbeds.map((v) => ({ ...v })),
    available: p.available,
    coachDetails: p.coachDetails
      ? {
          specialties: [...p.coachDetails.specialties],
          experienceYears: p.coachDetails.experienceYears,
          workedWith: [...p.coachDetails.workedWith],
          testimonials: p.coachDetails.testimonials.map((t) => ({ ...t })),
        }
      : null,
    credentials: credentials.map((c) => ({ ...c })),
  };
}
