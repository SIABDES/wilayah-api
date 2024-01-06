import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  FindManyProvinsiDto,
  FindManyProvinsiSchema,
  FindOneProvinsiSchema,
  GetManyProvinsiResponse,
  GetOneProvinsiResponse,
} from "../models";
import { findManyProvinsi, findOneProvinsi } from "../usecase";
import { ResponseBuilder } from "../common/response";

export const provinsi = new Hono();

provinsi.get(
  "/",
  zValidator("query", FindManyProvinsiSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto: FindManyProvinsiDto = c.req.valid("query");
    const result: GetManyProvinsiResponse = await findManyProvinsi(dto);
    const res = new ResponseBuilder<GetManyProvinsiResponse>();

    res.setMessage("Berhasil mengambil daftar provinsi").setData(result);

    return c.json(res.build());
  }
);

provinsi.get(
  "/:kode",
  zValidator("param", FindOneProvinsiSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto = c.req.valid("param");
    const result = await findOneProvinsi(dto);
    const res = new ResponseBuilder<GetOneProvinsiResponse>();

    if (!result) {
      res.setMessage("Provinsi tidak ditemukan");
      return c.json(res.build(), 404);
    }

    res.setData(result).setMessage("Provinsi ditemukan");
    return c.json(res.build());
  }
);
