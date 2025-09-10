import * as documentService from "@/server/services/document.service";
import { Document } from "@/server/types/document.types";
import { Recipient } from "@/server/types/recipient.types";

export async function createDocument(payload: any): Promise<Document> {
    const { templateId, ownerId, title, values } = payload;

    if (!payload.templateId) throw new Error("Template ID required");
    if (!payload.ownerId) throw new Error("Owner ID required");
    if (!payload.title) throw new Error("Document title required");
    if (!payload.values) throw new Error("Document values required");

    return documentService.createDocument(templateId, ownerId, title, values);
}

export async function listDocuments(ownerId: number): Promise<Document[]> {
    if (!ownerId) throw new Error("Owner ID required");

    return documentService.listDocumentsByOwner(ownerId);
}

export async function getDocument(id: string): Promise<Document | null> {
    if (!id) throw new Error("Document ID required");

    return documentService.getDocumentById(id);
}

export async function updateDocumentStatus(documentId: string, status: string, pdfGenerated?: string): Promise<Document> {
    if (!documentId) throw new Error("Document ID required");
    if (!status) throw new Error("Status required");

    return documentService.updateDocumentStatus(documentId, status, pdfGenerated);
}

export async function addRecipient(documentId: string, email: string): Promise<Recipient> {
    if (!documentId) throw new Error("Document ID required");
    if (!email) throw new Error("Email required");

    return documentService.addRecipient(documentId, email);
}

export async function listRecipients(documentId: string): Promise<Recipient[]> {
    if (!documentId) throw new Error("Document ID required");

    return documentService.listRecipients(documentId);
}
