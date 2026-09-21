export type CredentialStatus = "valid" | "revoked";

export interface NewCredential {
  profileId: string | null;
  holderName: string;
  course: string;
  cohort: string;
  issuedDate: string; // YYYY-MM-DD
  issuer: string;
  isDemo: boolean;
}

export interface CredentialRecord extends NewCredential {
  id: string;
  status: CredentialStatus;
  revokeReason: string | null;
  createdAt: string;
}

export interface PublicCredential {
  id: string;
  holderName: string;
  course: string;
  cohort: string;
  issuedDate: string;
  issuer: string;
  status: CredentialStatus;
  revokeReason: string | null;
}

export interface CredentialsRepo {
  issue(input: NewCredential): Promise<CredentialRecord>;
  get(id: string): Promise<CredentialRecord | null>;
  revoke(id: string, reason: string): Promise<boolean>;
  listByProfile(profileId: string): Promise<CredentialRecord[]>;
}

export function toPublicCredential(c: CredentialRecord): PublicCredential {
  return {
    id: c.id,
    holderName: c.holderName,
    course: c.course,
    cohort: c.cohort,
    issuedDate: c.issuedDate,
    issuer: c.issuer,
    status: c.status,
    revokeReason: c.status === "revoked" ? c.revokeReason : null,
  };
}
