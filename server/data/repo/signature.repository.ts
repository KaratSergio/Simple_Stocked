import { query } from '@/server/config/db.config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqlFilePath = path.join(__dirname, '../sql/queries/signatures.sql');
const sqlFile = fs.readFileSync(sqlFilePath, 'utf-8');

const [addSignerSQLRaw, listSignersSQLRaw, updateSignerStatusSQLRaw] = sqlFile
    .split(';')
    .map(q => q.trim())
    .filter(Boolean);

const addSignerSQL = addSignerSQLRaw + ';';
const listSignersSQL = listSignersSQLRaw + ';';
const updateSignerStatusSQL = updateSignerStatusSQLRaw + ';';

export async function addSigner(documentId: string, signerId: string | null, email: string, status: string = 'pending') {
    const result = await query(addSignerSQL, [documentId, signerId, email, status]);
    return result.rows[0];
}

export async function listSigners(documentId: string) {
    const result = await query(listSignersSQL, [documentId]);
    return result.rows;
}

export async function updateSignerStatus(signerId: string, status: string) {
    const result = await query(updateSignerStatusSQL, [signerId, status]);
    return result.rows[0];
}
