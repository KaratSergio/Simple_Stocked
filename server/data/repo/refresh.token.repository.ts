import fs from 'fs';
import path from 'path';
import { query } from '@/server/config/db.config';

const basePath = path.join(process.cwd(), 'server/data/sql/queries/user_refresh_tokens');

function loadQuery(name: string) {
  return fs.readFileSync(path.join(basePath, name), 'utf8');
}

export async function storeRefreshToken(userId: number, tokenHash: string, expiresAt: Date, deviceInfo?: string, ip?: string) {
  const sql = loadQuery('create.sql');
  const res = await query(sql, [userId, tokenHash, expiresAt.toISOString(), deviceInfo ?? null, ip ?? null]);
  return res.rows[0];
}

export async function findRefreshTokenByHash(tokenHash: string) {
  const sql = loadQuery('findByHash.sql');
  const res = await query(sql, [tokenHash]);
  return res.rows[0] ?? null;
}

export async function revokeRefreshTokenByHash(tokenHash: string) {
  const sql = loadQuery('revokeByHash.sql');
  const res = await query(sql, [tokenHash]);
  return res.rows[0];
}

export async function revokeAllTokensForUser(userId: number) {
  const sql = loadQuery('revokeAllByUser.sql');
  const res = await query(sql, [userId]);
  return res.rows;
}

export async function deleteExpiredTokens() {
  const sql = loadQuery('deleteExpired.sql');
  await query(sql);
}

export async function getAllTokensByUser(userId: number) {
  const sql = loadQuery("getAllByUser.sql");
  const res = await query(sql, [userId]);
  return res.rows;
}