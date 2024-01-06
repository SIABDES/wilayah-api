import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  FindManyKelurahanDto,
  FindManyKelurahanSchema,
  FindOneKelurahanDto,
  FindOneKelurahanSchema,
  GetManyKelurahanResponse,
  GetOneKelurahanResponse,
} from "../models";
import { findManyKelurahan, findOneKelurahan } from "../usecase";
import { ResponseBuilder } from "../common/response";

export const kelurahan = new Hono();

kelurahan.get(
  "/",
  zValidator("query", FindManyKelurahanSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto: FindManyKelurahanDto = c.req.valid("query");
    const result: GetManyKelurahanResponse = await findManyKelurahan(dto);
    const res = new ResponseBuilder<GetManyKelurahanResponse>();

    res.setMessage("Berhasil mengambil daftar kelurahan").setData(result);

    return c.json(res.build());
  }
);

kelurahan.get(
  "/:kode",
  zValidator("param", FindOneKelurahanSchema, (result, c) => {
    if (!result.success) return c.json(result, 400);
  }),
  async (c) => {
    const dto: FindOneKelurahanDto = c.req.valid("param");
    const result = await findOneKelurahan(dto);
    const res = new ResponseBuilder<GetOneKelurahanResponse>();

    if (!result) {
      res.setMessage("Kelurahan tidak ditemukan");
      return c.json(res.build(), 404);
    }

    res.setData(result).setMessage("Kelurahan ditemukan");
    return c.json(res.build());
  }
);
