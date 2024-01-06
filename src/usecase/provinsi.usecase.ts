import { gt, ilike, like } from "drizzle-orm";
import { db } from "../db";
import { provinsi } from "../db/schema";
import {
  FindManyProvinsiDto,
  FindOneProvinsiDto,
  GetManyProvinsiResponse,
  GetOneProvinsiResponse,
} from "../models";

export async function findManyProvinsi(
  dto: FindManyProvinsiDto
): Promise<GetManyProvinsiResponse> {
  const query = db.select().from(provinsi).orderBy(provinsi.nama);

  // Cursor pagination
  if (dto.take) {
    query.limit(dto.take);
  }
  if (dto.cursor) {
    query.where(gt(provinsi.kode, dto.cursor));
  }
  if (dto.skip) {
    query.offset(dto.skip);
  }

  // Apply filter
  if (dto.kode) {
    query.where(like(provinsi.kode, `%${dto.kode}%`));
  }

  if (dto.nama) {
    query.where(like(provinsi.nama, `%${dto.nama}%`));
  }

  return query;
}

export async function findOneProvinsi(
  dto: FindOneProvinsiDto
): Promise<GetOneProvinsiResponse> {
  const result = await db.query.provinsi.findFirst({
    where: (provinsi, { eq }) => eq(provinsi.kode, dto.kode),
  });

  return result;
}
