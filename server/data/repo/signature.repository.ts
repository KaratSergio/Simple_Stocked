import fs from "fs";
import path from "path";
import { query } from "@/server/config/db.config";
import { Signature } from "@/server/types/signature.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/signatures");

function loadQuery(name: string) {
    return fs.readFileSync(path.join(basePath, name), "utf8");
}

export async function addSignature(
    documentId: number,
    recipientId: number,
    signatureData: string
): Promise<Signature> {
    const sql = loadQuery("add.sql");
    const result = await query(sql, [documentId, recipientId, signatureData]);
    return result.rows[0];
}

export async function listSignaturesByDocument(documentId: number): Promise<Signature[]> {
    const sql = loadQuery("listByDocument.sql");
    const result = await query(sql, [documentId]);
    return result.rows;
}
