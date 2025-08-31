import fs from 'fs';
import path from 'path';
import { query } from '@/server/config/db.config';
import type { User } from '@/server/types/user.types';

const basePath = path.join(process.cwd(), 'server/data/sql/queries/users');

function loadQuery(name: string) {
  return fs.readFileSync(path.join(basePath, name), 'utf8');
}

export async function createUser(email: string, name: string, passwordHash: string): Promise<User> {
  const sql = loadQuery('create.sql');
  const result = await query(sql, [email, name, passwordHash]);
  return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const sql = loadQuery('getByEmail.sql');
  const result = await query(sql, [email]);
  return result.rows[0] ?? null;
}