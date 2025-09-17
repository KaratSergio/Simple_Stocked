import path from 'path';
import { loadQuery } from "@/server/utils/sqlLoader";
import { query } from '@/server/config/db.config';
import type { User } from '@/server/types/user.types';

const basePath = path.join(process.cwd(), 'server/data/sql/queries/users');

export async function createUser(email: string, name: string, passwordHash: string): Promise<User> {
  const sql = loadQuery(basePath, 'create.sql');
  const result = await query(sql, [email, name, passwordHash]);
  return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const sql = loadQuery(basePath, 'getByEmail.sql');
  const result = await query(sql, [email]);
  return result.rows[0] ?? null;
}

export async function getUserById(id: number): Promise<User | null> {
  const sql = loadQuery(basePath, 'getById.sql');
  const result = await query(sql, [id]);
  return result.rows[0] ?? null;
}