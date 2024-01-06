import { z } from "zod";
import { FindManySchema, FindOneSchema } from "../common/models";
import { provinsi } from "../db/schema";

export type Provinsi = typeof provinsi.$inferSelect;

export const FindManyProvinsiSchema = FindManySchema;
export const FindOneProvinsiSchema = FindOneSchema;

export type FindManyProvinsiDto = z.infer<typeof FindManyProvinsiSchema>;
export type FindOneProvinsiDto = z.infer<typeof FindOneProvinsiSchema>;

export type GetManyProvinsiResponse = Provinsi[];
export type GetOneProvinsiResponse = Provinsi | undefined;
