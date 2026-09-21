import { readFileSync } from "node:fs";
import { Client } from "@neondatabase/serverless";

// Node 22+ exposes a global WebSocket the Neon driver uses. On older Node,
// uncomment the two ws lines below (and `npm i -D ws`).
// import ws from "ws";
// import { neonConfig } from "@neondatabase/serverless"; neonConfig.webSocketConstructor = ws;

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/db-apply.mjs <file.sql>");
  process.exit(1);
}
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const migration = readFileSync(file, "utf8");
const client = new Client(url);
await client.connect();
await client.query(migration);
await client.end();
console.log(`applied ${file}`);
