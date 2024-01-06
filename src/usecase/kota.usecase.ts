import { eq, gt, like } from "drizzle-orm";
import { db } from "../db";
import { kota } from "../db/schema";
import {
  FindManyKotaDto,
  FindOneKotaDto,
  GetManyKotaResponse,
  GetOneKotaResponse,
} from "../models";

export async function findManyKota(
  dto: FindManyKotaDto
): Promise<GetManyKotaResponse> {
  const result = db.select().from(kota).orderBy(kota.nama);

  // Cursor pagination
  if (dto.cursor) {
    result.where(gt(kota.kode, dto.cursor));
  }
  if (dto.take) {
    result.limit(dto.take);
  }
  if (dto.skip) {
    result.offset(dto.skip);
  }

  // Apply filter
  if (dto.nama) {
    result.where(like(kota.nama, `%${dto.nama.toUpperCase()}%`));
  }
  if (dto.kode) {
    result.where(like(kota.kode, `%${dto.kode}%`));
  }
  if (dto.provinsi_kode) {
    result.where(eq(kota.provinsi_kode, dto.provinsi_kode));
  }

  return result;
}

export async function findOneKota(
  dto: FindOneKotaDto
): Promise<GetOneKotaResponse> {
  return await db.query.kota.findFirst({
    where: (kota, { eq }) => eq(kota.kode, dto.kode),
  });
}
