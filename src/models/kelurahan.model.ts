import { z } from "zod";
import { FindManySchema, FindOneSchema } from "../common/models";
import { kelurahan } from "../db/schema";

export type Kelurahan = typeof kelurahan.$inferSelect;

export const FindManyKelurahanSchema = FindManySchema.extend({
  provinsi_kode: z.string().optional(),
  kota_kode: z.string().optional(),
  kecamatan_kode: z.string().optional(),
});
export const FindOneKelurahanSchema = FindOneSchema;

export type FindManyKelurahanDto = z.infer<typeof FindManyKelurahanSchema>;
export type FindOneKelurahanDto = z.infer<typeof FindOneKelurahanSchema>;

export type GetManyKelurahanResponse = Kelurahan[];
export type GetOneKelurahanResponse = Kelurahan | undefined;
