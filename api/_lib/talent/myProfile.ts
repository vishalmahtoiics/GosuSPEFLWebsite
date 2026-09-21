import { toPublicCredential, type CredentialsRepo, type PublicCredential } from "./credentials.js";
import type {
  Achievement, CoachDetails, ProfileRecord, ProfilesRepo, ProfileStatus, ProfileType, Socials, VodEmbed,
} from "./profiles.js";
import type { Session } from "./session.js";

/** The grad's own view of their profile: owned fields + certifiedName + status + credentials. No ownerEmail/id/isDemo/timestamps. */
export interface MyProfile {
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
  credentials: PublicCredential[];
}

export function toMyProfile(p: ProfileRecord, credentials: PublicCredential[]): MyProfile {
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
    status: p.status,
    credentials: credentials.map((c) => ({ ...c })),
  };
}

export async function handleMyProfile(
  session: Session,
  profiles: ProfilesRepo,
  credentials: CredentialsRepo,
): Promise<{ status: number; json: object }> {
  if (session.role !== "grad" || !session.profileId) {
    return { status: 403, json: { error: "forbidden" } };
  }
  const p = await profiles.getById(session.profileId);
  if (!p) return { status: 404, json: { error: "not_found" } };
  const creds = await credentials.listByProfile(p.id);
  return { status: 200, json: toMyProfile(p, creds.map(toPublicCredential)) };
}
