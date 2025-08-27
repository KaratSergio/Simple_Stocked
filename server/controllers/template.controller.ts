import * as templateService from "@/server/services/template.service";
import { DocumentTemplate } from "@/server/types/template.types";

export async function createTemplate(payload: any): Promise<DocumentTemplate> {
    if (!payload.name) throw new Error("Template name is required");
    if (!payload.jsonSchema) throw new Error("jsonSchema is required");

    return templateService.createTemplate(payload.name, payload.jsonSchema, payload.pdfBase);
}

export async function getTemplateById(id: number): Promise<DocumentTemplate | null> {
    if (!id) throw new Error("Template ID is required");
    return templateService.getTemplateById(id);
}

export async function listTemplates(): Promise<DocumentTemplate[]> {
    return templateService.listTemplates();
}
