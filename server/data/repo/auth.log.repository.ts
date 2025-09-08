import path from "path";
import { loadQuery } from "@/server/utils/sqlLoader";
import { query } from "@/server/config/db.config";

const basePath = path.join(process.cwd(), "server/data/sql/queries/logs");

export async function createAuthLog(
  userId: number | null,
  eventType: string,
  ip?: string,
  deviceInfo?: string
) {
  const sql = loadQuery(basePath, "auth.sql");
  const res = await query(sql, [userId, eventType, ip ?? null, deviceInfo ?? null]);
  return res.rows[0];
}
