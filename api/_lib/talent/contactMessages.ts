export type ContactIntent = "hire-coach" | "recruit-player" | "general";
export type ContactStatus = "new" | "read" | "routed";

export interface NewContactMessage {
  profileId: string;
  senderName: string;
  senderEmail: string;
  senderOrg: string | null;
  intent: ContactIntent;
  message: string;
  ipHash: string;
}

export interface ContactMessageRecord extends NewContactMessage {
  id: string;
  status: ContactStatus;
  createdAt: string;
}

export interface ContactMessagesRepo {
  create(input: NewContactMessage): Promise<ContactMessageRecord>;
  recentCountByIpHash(ipHash: string, sinceIso: string): Promise<number>;
  list(): Promise<ContactMessageRecord[]>; // newest first, all statuses
  setStatus(id: string, status: ContactStatus): Promise<boolean>;
}
