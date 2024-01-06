import { z } from "zod";
import { FindManySchema, FindOneSchema } from "../common/models";
import { kecamatan } from "../db/schema";

export type Kecamatan = typeof kecamatan.$inferSelect;

export const FindManyKecamatanSchema = FindManySchema.extend({
  provinsi_kode: z.string().optional(),
  kota_kode: z.string().optional(),
});
export const FindOneKecamatanSchema = FindOneSchema;

export type FindManyKecamatanDto = z.infer<typeof FindManyKecamatanSchema>;
export type FindOneKecamatanDto = z.infer<typeof FindOneKecamatanSchema>;

export type GetManyKecamatanResponse = Kecamatan[];
export type GetOneKecamatanResponse = Kecamatan | undefined;
