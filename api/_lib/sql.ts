import { neon } from "@neondatabase/serverless";

// Shared Neon HTTP client for all serverless functions.
export const sql = neon(process.env.DATABASE_URL!);
