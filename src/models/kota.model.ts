import { z } from "zod";
import { FindManySchema, FindOneSchema } from "../common/models";
import { kota } from "../db/schema";

export type Kota = typeof kota.$inferSelect;

export const FindManyKotaSchema = FindManySchema.extend({
  provinsi_kode: z.string().optional(),
});
export const FindOneKotaSchema = FindOneSchema;

export type FindManyKotaDto = z.infer<typeof FindManyKotaSchema>;
export type FindOneKotaDto = z.infer<typeof FindOneKotaSchema>;

export type GetManyKotaResponse = Kota[];
export type GetOneKotaResponse = Kota | undefined;
