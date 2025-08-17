import { query } from '@/server/config/db.config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { toSnakeCaseKeys } from '@/server/utils/convertCase';

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

// Add signer
export async function addSigner(payload: {
    documentId: string;
    signerId?: string | null;
    email: string;
    role: string;
    status: string;
    orderIndex: number;
}) {
    const dbPayload = toSnakeCaseKeys(payload);
    const result = await query(addSignerSQL, [
        dbPayload.document_id,
        dbPayload.signer_id ?? null,
        dbPayload.email,
        dbPayload.role,
        dbPayload.status,
        dbPayload.order_index
    ]);
    return result.rows[0];
}

// List signers
export async function listSigners(documentId: string) {
    const result = await query(listSignersSQL, [documentId]);
    return result.rows;
}

// Update signer status
export async function updateSignerStatus(payload: {
    signerId: string;
    status: string;
    reason?: string;
    signatureFileUrl?: string;
}) {
    const dbPayload = toSnakeCaseKeys(payload);
    const result = await query(updateSignerStatusSQL, [
        dbPayload.signer_id,
        dbPayload.status,
        dbPayload.reason ?? null,
        dbPayload.signature_file_url ?? null
    ]);
    return result.rows[0];
}
