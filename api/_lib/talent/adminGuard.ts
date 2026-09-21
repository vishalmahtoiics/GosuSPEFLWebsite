import type { VercelRequest } from "@vercel/node";
import { readSession } from "./session.js";
import type { Session } from "./session.js";

export type StaffGuard =
  | { error: { status: number; json: object } }
  | { session: Session };

/**
 * Resolve a STAFF session from the request, or an error to return. MUST be called AFTER
 * checkGate. 500 if the session secret is unset, 401 if there is no valid session, 403 if the
 * session is not staff — the exact order api/profile.ts uses.
 */
export function staffOnly(req: VercelRequest): StaffGuard {
  const secret = process.env.TALENT_SESSION_SECRET ?? "";
  if (secret === "") return { error: { status: 500, json: { error: "misconfigured" } } };
  const session = readSession(req.headers.cookie, secret, Date.now());
  if (!session) return { error: { status: 401, json: { error: "unauthorized" } } };
  if (session.role !== "staff") return { error: { status: 403, json: { error: "forbidden" } } };
  return { session };
}
