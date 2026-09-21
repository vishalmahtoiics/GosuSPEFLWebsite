import { randomUUID } from "node:crypto";
import type { AuthTokenRecord, AuthTokensRepo, NewAuthToken } from "../authTokens.js";

export function fakeAuthTokensRepo(): AuthTokensRepo & { rows: Map<string, AuthTokenRecord> } {
  const rows = new Map<string, AuthTokenRecord>();
  return {
    rows,
    async create(input: NewAuthToken) {
      const rec: AuthTokenRecord = {
        ...input,
        id: randomUUID(),
        usedAt: null,
        createdAt: new Date().toISOString(),
      };
      rows.set(rec.id, rec);
      return { ...rec };
    },
    async findByHash(tokenHash: string) {
      const r = [...rows.values()].find((x) => x.tokenHash === tokenHash);
      return r ? { ...r } : null;
    },
    async markUsed(id: string) {
      const r = rows.get(id);
      if (!r || r.usedAt !== null) return false;
      r.usedAt = new Date().toISOString();
      return true;
    },
  };
}
