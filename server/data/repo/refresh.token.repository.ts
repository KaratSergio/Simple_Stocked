import path from 'path';
import { query } from '@/server/config/db.config';
import { loadQuery } from "@/server/utils/sqlLoader";

const basePath = path.join(process.cwd(), 'server/data/sql/queries/token');

export async function storeRefreshToken(userId: number, tokenHash: string, expiresAt: Date, deviceInfo?: string, ip?: string) {
  const sql = loadQuery(basePath, 'create.sql');
  const res = await query(sql, [userId, tokenHash, expiresAt.toISOString(), deviceInfo ?? null, ip ?? null]);
  return res.rows[0];
}

export async function findRefreshTokenByHash(tokenHash: string) {
  const sql = loadQuery(basePath, 'findByHash.sql');
  const res = await query(sql, [tokenHash]);
  return res.rows[0] ?? null;
}

export async function revokeRefreshTokenByHash(tokenHash: string) {
  const sql = loadQuery(basePath, 'revokeByHash.sql');
  const res = await query(sql, [tokenHash]);
  return res.rows[0];
}

export async function revokeAllTokensForUser(userId: number) {
  const sql = loadQuery(basePath, 'revokeAllByUser.sql');
  const res = await query(sql, [userId]);
  return res.rows;
}

export async function deleteExpiredTokens() {
  const sql = loadQuery(basePath, 'deleteExpired.sql');
  await query(sql);
}

export async function getAllTokensByUser(userId: number) {
  const sql = loadQuery(basePath, 'getAllByUser.sql');
  const res = await query(sql, [userId]);
  return res.rows;
}