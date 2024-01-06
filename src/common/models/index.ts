import { z } from "zod";

export type ResponseStruct<T> = {
  message?: string;
  data?: T;
  errors?: string[];
};

export const FindWithCursorSchema = z.object({
  cursor: z.string().optional(),
  skip: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().int().min(0))
    .optional(),
  take: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().int().positive())
    .optional(),
});

export const FindOneSchema = z.object({
  kode: z.string(),
});

export const FindManySchema = FindWithCursorSchema.extend({
  kode: z.string().optional(),
  nama: z.string().optional(),
});

export type FindWithCursorDto = z.infer<typeof FindWithCursorSchema>;
export type FindOneDto = z.infer<typeof FindOneSchema>;
export type FindManyDto = z.infer<typeof FindManySchema>;
