import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { kecamatan, kelurahan, kota, provinsi } from "./handlers";

const app = new Hono().basePath("/api");

app.use("*", logger());

app.route("/provinsi", provinsi);
app.route("/kota", kota);
app.route("/kecamatan", kecamatan);
app.route("/kelurahan", kelurahan);

const port = Number(process.env.PORT ?? 3000);

serve(
  {
    fetch: app.fetch,
    port,
    hostname: "0.0.0.0",
  },
  (info) => {
    console.log(`Server listening on ${info.address}:${info.port}`);
  }
);
