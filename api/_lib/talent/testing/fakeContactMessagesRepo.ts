import { randomUUID } from "node:crypto";
import type {
  ContactMessageRecord,
  ContactMessagesRepo,
  ContactStatus,
  NewContactMessage,
} from "../contactMessages.js";

export function fakeContactMessagesRepo(): ContactMessagesRepo & {
  rows: Map<string, ContactMessageRecord>;
} {
  const rows = new Map<string, ContactMessageRecord>();
  return {
    rows,
    async create(input: NewContactMessage) {
      const rec: ContactMessageRecord = {
        ...input,
        id: randomUUID(),
        status: "new",
        createdAt: new Date().toISOString(),
      };
      rows.set(rec.id, rec);
      return { ...rec };
    },
    async recentCountByIpHash(ipHash: string, sinceIso: string) {
      return [...rows.values()].filter((r) => r.ipHash === ipHash && r.createdAt > sinceIso).length;
    },
    async list() {
      return [...rows.values()]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((r) => ({ ...r }));
    },
    async setStatus(id: string, status: ContactStatus) {
      const r = rows.get(id);
      if (!r) return false;
      r.status = status;
      return true;
    },
  };
}
