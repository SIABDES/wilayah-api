import { eq, gt, ilike, like } from "drizzle-orm";
import { db } from "../db";
import { kecamatan } from "../db/schema";
import {
  FindManyKecamatanDto,
  FindOneKecamatanDto,
  GetManyKecamatanResponse,
  GetOneKecamatanResponse,
} from "../models";

export async function findManyKecamatan(
  dto: FindManyKecamatanDto
): Promise<GetManyKecamatanResponse> {
  const result = db.select().from(kecamatan).orderBy(kecamatan.nama);

  // Cursor pagination
  if (dto.cursor) {
    result.where(gt(kecamatan.kode, dto.cursor));
  }
  if (dto.take) {
    result.limit(dto.take);
  }
  if (dto.skip) {
    result.offset(dto.skip);
  }

  // Apply filter
  if (dto.nama) {
    result.where(like(kecamatan.nama, `%${dto.nama}%`));
  }
  if (dto.kode) {
    result.where(like(kecamatan.kode, `%${dto.kode}%`));
  }
  if (dto.provinsi_kode) {
    result.where(eq(kecamatan.provinsi_kode, dto.provinsi_kode));
  }
  if (dto.kota_kode) {
    result.where(eq(kecamatan.kota_kode, dto.kota_kode));
  }

  return result;
}

export async function findOneKecamatan(
  dto: FindOneKecamatanDto
): Promise<GetOneKecamatanResponse> {
  return await db.query.kecamatan.findFirst({
    where: (kecamatan, { eq }) => eq(kecamatan.kode, dto.kode),
  });
}
