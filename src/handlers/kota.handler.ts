import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  FindManyKotaSchema,
  FindManyKotaDto,
  GetManyKotaResponse,
  FindOneKotaSchema,
  GetOneKotaResponse,
} from "../models";
import { findManyKota, findOneKota } from "../usecase";
import { ResponseBuilder } from "../common/response";

export const kota = new Hono();

kota.get(
  "/",
  zValidator("query", FindManyKotaSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto: FindManyKotaDto = c.req.valid("query");
    const result: GetManyKotaResponse = await findManyKota(dto);
    const res = new ResponseBuilder<GetManyKotaResponse>();

    res.setMessage("Berhasil mengambil daftar kota").setData(result);

    return c.json(res.build());
  }
);

kota.get(
  "/:kode",
  zValidator("param", FindOneKotaSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto = c.req.valid("param");
    const result = await findOneKota(dto);
    const res = new ResponseBuilder<GetOneKotaResponse>();

    if (!result) {
      res.setMessage("Kota tidak ditemukan");
      return c.json(res.build(), 404);
    }

    res.setData(result).setMessage("Kota ditemukan");

    return c.json(res.build());
  }
);
