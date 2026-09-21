export type AuthPurpose = "claim" | "login" | "staff";

export interface NewAuthToken {
  email: string;
  profileId: string | null;
  tokenHash: string;
  purpose: AuthPurpose;
  expiresAt: string; // ISO
}

export interface AuthTokenRecord extends NewAuthToken {
  id: string;
  usedAt: string | null;
  createdAt: string;
}

export interface AuthTokensRepo {
  create(input: NewAuthToken): Promise<AuthTokenRecord>;
  findByHash(tokenHash: string): Promise<AuthTokenRecord | null>;
  markUsed(id: string): Promise<boolean>; // true iff it flipped an unused token to used (atomic single-use)
}
