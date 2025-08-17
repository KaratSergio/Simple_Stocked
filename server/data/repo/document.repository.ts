import { query } from '@/server/config/db.config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { toSnakeCaseKeys } from '@/server/utils/convertCase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqlFilePath = path.join(__dirname, '../sql/queries/documents.sql');
const sqlFile = fs.readFileSync(sqlFilePath, 'utf-8');

const [createDocSQLRaw, getDocByIdSQLRaw, listDocsByOwnerSQLRaw, updateDocStatusSQLRaw] = sqlFile
    .split(';')
    .map(q => q.trim())
    .filter(Boolean);

const createDocSQL = createDocSQLRaw + ';';
const getDocByIdSQL = getDocByIdSQLRaw + ';';
const listDocsByOwnerSQL = listDocsByOwnerSQLRaw + ';';
const updateDocStatusSQL = updateDocStatusSQLRaw + ';';

export async function createDocument(ownerId: string, title: string, fileUrl: string, status: string = 'draft') {

    const dbPayload = toSnakeCaseKeys({ title, fileUrl, status });
    const result = await query(createDocSQL, [ownerId, dbPayload.title, dbPayload.file_url, dbPayload.status]);
    return result.rows[0];
}

export async function getDocumentById(id: string) {
    const result = await query(getDocByIdSQL, [id]);
    return result.rows[0];
}

export async function listDocumentsByOwner(ownerId: string) {
    const result = await query(listDocsByOwnerSQL, [ownerId]);
    return result.rows;
}

export async function updateDocumentStatus(id: string, status: string, signedFileUrl?: string) {
    const dbPayload = toSnakeCaseKeys({ status, signedFileUrl });
    const result = await query(updateDocStatusSQL, [id, dbPayload.status, dbPayload.signed_file_url ?? null]);
    return result.rows[0];
}