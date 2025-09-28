import postgres from "postgres";
import { env } from "../env.mjs";
import { drizzle } from "drizzle-orm/node-postgres";


export const db = drizzle(env.DATABASE_URL);