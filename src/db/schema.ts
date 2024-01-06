import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const provinsi = mysqlTable("provinsi", {
  kode: varchar("kode", { length: 2 }).primaryKey(),
  nama: varchar("nama", { length: 50 }),
});

export const kota = mysqlTable("kota", {
  kode: varchar("kode", { length: 5 }).primaryKey(),
  nama: varchar("nama", { length: 50 }),
  provinsi_kode: varchar("provinsi_kode", { length: 2 }).references(
    () => provinsi.kode
  ),
});

export const kecamatan = mysqlTable("kecamatan", {
  kode: varchar("kode", { length: 8 }).primaryKey(),
  nama: varchar("nama", { length: 50 }),
  provinsi_kode: varchar("provinsi_kode", { length: 2 }).references(
    () => provinsi.kode
  ),
  kota_kode: varchar("kota_kode", { length: 5 }).references(() => kota.kode),
});

export const kelurahan = mysqlTable("kelurahan", {
  kode: varchar("kode", { length: 13 }).primaryKey(),
  nama: varchar("nama", { length: 50 }),
  provinsi_kode: varchar("provinsi_kode", { length: 2 }).references(
    () => provinsi.kode
  ),
  kota_kode: varchar("kota_kode", { length: 5 }).references(() => kota.kode),
  kecamatan_kode: varchar("kecamatan_kode", { length: 8 }).references(
    () => kecamatan.kode
  ),
});
