import { query } from '@/server/config/db.config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqlFilePath = path.join(__dirname, '../sql/queries/documents.sql');
const sqlFile = fs.readFileSync(sqlFilePath, 'utf-8');

const [createDocSQLRaw, getDocByIdSQLRaw, listDocsByOwnerSQLRaw] = sqlFile
    .split(';')
    .map(q => q.trim())
    .filter(Boolean);

const createDocSQL = createDocSQLRaw + ';';
const getDocByIdSQL = getDocByIdSQLRaw + ';';
const listDocsByOwnerSQL = listDocsByOwnerSQLRaw + ';';

export async function createDocument(ownerId: number, title: string, fileUrl: string, status: string = 'draft') {
    const result = await query(createDocSQL, [ownerId, title, fileUrl, status]);
    return result.rows[0];
}

export async function getDocumentById(id: number) {
    const result = await query(getDocByIdSQL, [id]);
    return result.rows[0];
}

export async function listDocumentsByOwner(ownerId: number) {
    const result = await query(listDocsByOwnerSQL, [ownerId]);
    return result.rows;
}
