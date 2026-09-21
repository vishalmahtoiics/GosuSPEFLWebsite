import { randomUUID } from "node:crypto";
import type { CredentialRecord, CredentialsRepo, NewCredential } from "../credentials.js";

export function fakeCredentialsRepo(): CredentialsRepo & { rows: Map<string, CredentialRecord> } {
  const rows = new Map<string, CredentialRecord>();
  return {
    rows,
    async issue(input: NewCredential) {
      const rec: CredentialRecord = {
        ...input,
        id: randomUUID(),
        status: "valid",
        revokeReason: null,
        createdAt: new Date().toISOString(),
      };
      rows.set(rec.id, rec);
      return { ...rec };
    },
    async get(id: string) {
      const r = rows.get(id);
      return r ? { ...r } : null;
    },
    async revoke(id: string, reason: string) {
      const r = rows.get(id);
      if (!r || r.status !== "valid") return false;
      r.status = "revoked";
      r.revokeReason = reason;
      return true;
    },
    async listByProfile(profileId: string) {
      return [...rows.values()].filter((r) => r.profileId === profileId).map((r) => ({ ...r }));
    },
  };
}
