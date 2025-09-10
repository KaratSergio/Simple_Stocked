import path from "path";
import { loadQuery } from "@/server/utils/sqlLoader";
import { query } from "@/server/config/db.config";
import { Document } from "@/server/types/document.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/documents");

export async function createDocument(
    templateId: number,
    ownerId: number,
    title: string,
    values: any,
    pdfGenerated: string | null,
    status: string = "draft"
): Promise<Document> {
    const sql = loadQuery(basePath, "create.sql");
    const result = await query(sql, [templateId, ownerId, title, values, pdfGenerated, status]);
    return result.rows[0];
}

export async function getDocumentById(id: number): Promise<Document | null> {
    const sql = loadQuery(basePath, "getById.sql");
    const result = await query(sql, [id]);
    return result.rows[0] ?? null;
}

export async function listDocumentsByOwner(ownerId: number): Promise<Document[]> {
    const sql = loadQuery(basePath, "listByOwner.sql");
    const result = await query(sql, [ownerId]);
    return result.rows;
}

export async function updateDocumentStatus(
    id: string,
    status: string,
    pdfGenerated?: string
): Promise<Document> {
    const sql = loadQuery(basePath, "updateStatus.sql");
    const result = await query(sql, [id, status, pdfGenerated ?? null]);
    return result.rows[0];
}
