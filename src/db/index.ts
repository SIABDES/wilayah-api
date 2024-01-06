import * as dotenv from "dotenv";
import {
  PlanetScaleDatabase,
  drizzle,
} from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";

dotenv.config();

// create the connection
const connection = connect({
  url: process.env["DATABASE_URL"],
});

const db: PlanetScaleDatabase<typeof schema> = drizzle(connection, { schema });

export { connection, db };
