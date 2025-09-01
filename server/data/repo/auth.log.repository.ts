import fs from "fs";
import path from "path";
import { query } from "@/server/config/db.config";

const basePath = path.join(process.cwd(), "server/data/sql/queries/logs");

function loadQuery(name: string) {
  return fs.readFileSync(path.join(basePath, name), "utf8");
}

export async function createAuthLog(
  userId: number | null,
  eventType: string,
  ip?: string,
  deviceInfo?: string
) {
  const sql = loadQuery("auth.sql");
  const res = await query(sql, [userId, eventType, ip ?? null, deviceInfo ?? null]);
  return res.rows[0];
}
