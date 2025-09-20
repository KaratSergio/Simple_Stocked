import * as templateRepo from "@/server/data/repo/template.repository";
import { DocumentTemplate } from "@/server/types/template.types";

export async function createTemplate(
    name: string,
    jsonSchema: any,
    pdfBase?: string
): Promise<DocumentTemplate> {
    if (!name) throw new Error("Template name is required");
    if (!jsonSchema) throw new Error("jsonSchema is required");

    return templateRepo.createTemplate(name, jsonSchema, pdfBase);
}

export async function getTemplateById(id: number):
    Promise<DocumentTemplate | null> {
    if (!id) throw new Error("Template ID is required");
    return templateRepo.getTemplateById(id);
}

export async function listTemplates():
    Promise<DocumentTemplate[]> {
    return templateRepo.listTemplates();
}
