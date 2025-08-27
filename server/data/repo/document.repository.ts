import fs from "fs";
import path from "path";
import { query } from "@/server/config/db.config";
import { Document } from "@/server/types/document.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/documents");

function loadQuery(name: string) {
    return fs.readFileSync(path.join(basePath, name), "utf8");
}

export async function createDocument(
    templateId: number,
    ownerId: number,
    values: any,
    pdfGenerated: string | null,
    status: string = "draft"
): Promise<Document> {
    const sql = loadQuery("create.sql");
    const result = await query(sql, [templateId, ownerId, values, pdfGenerated, status]);
    return result.rows[0];
}

export async function getDocumentById(id: number): Promise<Document | null> {
    const sql = loadQuery("getById.sql");
    const result = await query(sql, [id]);
    return result.rows[0] ?? null;
}

export async function listDocumentsByOwner(ownerId: number): Promise<Document[]> {
    const sql = loadQuery("listByOwner.sql");
    const result = await query(sql, [ownerId]);
    return result.rows;
}

export async function updateDocumentStatus(
    id: number,
    status: string,
    pdfGenerated?: string
): Promise<Document> {
    const sql = loadQuery("updateStatus.sql");
    const result = await query(sql, [id, status, pdfGenerated ?? null]);
    return result.rows[0];
}
