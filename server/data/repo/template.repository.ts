import path from "path";
import { query } from "@/server/config/db.config";
import { loadQuery } from "@/server/utils/sqlLoader";
import { DocumentTemplate } from "@/server/types/template.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/templates");

export async function createTemplate(
    name: string,
    jsonSchema: any,
    pdfBase?: string
): Promise<DocumentTemplate> {
    const sql = loadQuery(basePath, "create.sql");
    const result = await query(sql, [name, jsonSchema, pdfBase ?? null]);
    return result.rows[0];
}

export async function getTemplateById(id: number):
    Promise<DocumentTemplate | null> {
    const sql = loadQuery(basePath, "getById.sql");
    const result = await query(sql, [id]);
    return result.rows[0] ?? null;
}

export async function listTemplates():
    Promise<DocumentTemplate[]> {
    const sql = loadQuery(basePath, "list.sql");
    const result = await query(sql);
    return result.rows;
}
