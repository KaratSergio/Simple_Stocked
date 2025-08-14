import { query } from '@/server/config/db.config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqlFilePath = path.join(__dirname, '../sql/queries/users.sql');
const sqlFile = fs.readFileSync(sqlFilePath, 'utf-8');

const [createUserSQLRaw, getUserByEmailSQLRaw] = sqlFile
    .split(';')
    .map(q => q.trim())
    .filter(Boolean);

const createUserSQL = createUserSQLRaw + ';';
const getUserByEmailSQL = getUserByEmailSQLRaw + ';';

export async function createUser(email: string, name: string, passwordHash: string) {
    const result = await query(createUserSQL, [email, name, passwordHash]);
    return result.rows[0];
}

export async function getUserByEmail(email: string) {
    const result = await query(getUserByEmailSQL, [email]);
    return result.rows[0];
}
