import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// pool as any: the installed pg Pool type has a minor version mismatch with
// drizzle-orm's NodePgClient interface; the runtime is identical.
export const db = drizzle(pool as any, { schema });
