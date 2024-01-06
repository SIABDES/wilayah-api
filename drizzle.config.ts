import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  strict: true,
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
} satisfies Config;
