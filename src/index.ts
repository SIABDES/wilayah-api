import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { kecamatan, kelurahan, kota, provinsi } from "./handlers";

const app = new Hono();

app.route("/provinsi", provinsi);
app.route("/kota", kota);
app.route("/kecamatan", kecamatan);
app.route("/kelurahan", kelurahan);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0",
});
