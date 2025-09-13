import * as documentRepo from "@/server/data/repo/document.repository";
import * as recipientRepo from "@/server/data/repo/recipient.repository";
import * as templateRepo from "@/server/data/repo/template.repository";
import { Document } from "@/server/types/document.types";
import { generatePdf } from "@/server/utils/pdfGenerator";
import { uploadPdf } from "@/server/utils/s3Storage";

export async function createDocument(
    templateId: number,
    ownerId: number,
    title: string,
    values: any
): Promise<Document> {
    if (!templateId) throw new Error("Template ID is required");
    if (!ownerId) throw new Error("Owner ID is required");
    if (!values) throw new Error("Document values are required");

    const template = await templateRepo.getTemplateById(templateId);
    if (!template) throw new Error("Template not found");

    // PDF
    const pdfBytes = await generatePdf(template.json_schema, values, template.pdf_base);

    // S3
    const key = `documents/${ownerId}/${Date.now()}.pdf`;
    const pdfUrl = await uploadPdf(pdfBytes, key);

    const doc = await documentRepo.createDocument(templateId, ownerId, title, values, pdfUrl, "draft");

    if (Array.isArray(values.recipients)) {
        for (const recipient of values.recipients) {
            await recipientRepo.addRecipient(doc.id, recipient.name, "");
        }
    }

    return doc;
}

export async function getDocumentById(id: string): Promise<Document | null> {
    if (!id) throw new Error("Document ID is required");
    return documentRepo.getDocumentById(id);
}

export async function listDocumentsByOwner(ownerId: number): Promise<Document[]> {
    if (!ownerId) throw new Error("Owner ID is required");
    return documentRepo.listDocumentsByOwner(ownerId);
}

export async function updateDocumentStatus(
    documentId: string,
    status: string,
    pdfGenerated?: string
): Promise<Document> {
    if (!documentId) throw new Error("Document ID is required");
    if (!status) throw new Error("Status is required");

    return documentRepo.updateDocumentStatus(documentId, status, pdfGenerated);
}
