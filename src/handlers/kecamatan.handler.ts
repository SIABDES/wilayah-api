import { Hono } from "hono";
import { ResponseBuilder } from "../common/response";
import { zValidator } from "@hono/zod-validator";
import {
  FindManyKecamatanSchema,
  FindManyKecamatanDto,
  GetManyKecamatanResponse,
  FindOneKecamatanSchema,
  GetOneKecamatanResponse,
  FindOneKecamatanDto,
} from "../models";
import { findManyKecamatan, findOneKecamatan } from "../usecase";

export const kecamatan = new Hono();

kecamatan.get(
  "/",
  zValidator("query", FindManyKecamatanSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto: FindManyKecamatanDto = c.req.valid("query");
    const result: GetManyKecamatanResponse = await findManyKecamatan(dto);
    const res = new ResponseBuilder<GetManyKecamatanResponse>();

    res.setMessage("Berhasil mengambil daftar kecamatan").setData(result);

    return c.json(res.build());
  }
);

kecamatan.get(
  "/:kode",
  zValidator("param", FindOneKecamatanSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto: FindOneKecamatanDto = c.req.valid("param");
    const result = await findOneKecamatan(dto);
    const res = new ResponseBuilder<GetOneKecamatanResponse>();

    if (!result) {
      res.setMessage("Kecamatan tidak ditemukan");
      return c.json(res.build(), 404);
    }

    res.setData(result).setMessage("Kecamatan ditemukan");
    return c.json(res.build());
  }
);
