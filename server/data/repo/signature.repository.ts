import path from "path";
import { query } from "@/server/config/db.config";
import { loadQuery } from "@/server/utils/sqlLoader";
import { Signature } from "@/server/types/signature.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/signatures");

export async function addSignature(
    documentId: string,
    recipientId: string,
    signatureData: string
): Promise<Signature> {
    const sql = loadQuery(basePath, "add.sql");
    const result = await query(sql, [documentId, recipientId, signatureData]);
    return result.rows[0];
}

export async function listSignaturesByDocument(documentId: string): Promise<Signature[]> {
    const sql = loadQuery(basePath, "listByDocument.sql");
    const result = await query(sql, [documentId]);
    return result.rows;
}
