import fs from "fs";
import path from "path";
import { query } from "@/server/config/db.config";
import { DocumentTemplate } from "@/server/types/template.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/templates");

function loadQuery(name: string) {
    return fs.readFileSync(path.join(basePath, name), "utf8");
}

export async function createTemplate(
    name: string,
    jsonSchema: any,
    pdfBase?: string
): Promise<DocumentTemplate> {
    const sql = loadQuery("create.sql");
    const result = await query(sql, [name, jsonSchema, pdfBase ?? null]);
    return result.rows[0];
}

export async function getTemplateById(id: number): Promise<DocumentTemplate | null> {
    const sql = loadQuery("getById.sql");
    const result = await query(sql, [id]);
    return result.rows[0] ?? null;
}

export async function listTemplates(): Promise<DocumentTemplate[]> {
    const sql = loadQuery("list.sql");
    const result = await query(sql);
    return result.rows;
}
