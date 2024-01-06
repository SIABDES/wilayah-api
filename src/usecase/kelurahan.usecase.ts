import { eq, gt, like } from "drizzle-orm";
import { db } from "../db";
import { kelurahan } from "../db/schema";
import {
  FindManyKelurahanDto,
  FindOneKelurahanDto,
  GetManyKelurahanResponse,
  GetOneKelurahanResponse,
} from "../models";

export async function findManyKelurahan(
  dto: FindManyKelurahanDto
): Promise<GetManyKelurahanResponse> {
  const result = db.select().from(kelurahan).orderBy(kelurahan.nama);

  // Cursor pagination
  if (dto.cursor) {
    result.where(gt(kelurahan.kode, dto.cursor));
  }
  if (dto.take) {
    result.limit(dto.take);
  }
  if (dto.skip) {
    result.offset(dto.skip);
  }

  // Apply filter
  if (dto.nama) {
    result.where(like(kelurahan.nama, `%${dto.nama}%`));
  }
  if (dto.kode) {
    result.where(like(kelurahan.kode, `%${dto.kode}%`));
  }
  if (dto.provinsi_kode) {
    result.where(eq(kelurahan.provinsi_kode, dto.provinsi_kode));
  }
  if (dto.kota_kode) {
    result.where(eq(kelurahan.kota_kode, dto.kota_kode));
  }
  if (dto.kecamatan_kode) {
    result.where(eq(kelurahan.kecamatan_kode, dto.kecamatan_kode));
  }

  return result;
}

export async function findOneKelurahan(
  dto: FindOneKelurahanDto
): Promise<GetOneKelurahanResponse> {
  return await db.query.kelurahan.findFirst({
    where: (kelurahan, { eq }) => eq(kelurahan.kode, dto.kode),
  });
}
