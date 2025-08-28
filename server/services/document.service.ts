import * as docRepo from "@/server/data/repo/document.repository";
import * as recipientRepo from "@/server/data/repo/recipient.repository";
import { Document } from "@/server/types/document.types";
import { Recipient } from "@/server/types/recipient.types";

export async function createDocument(
    templateId: number,
    ownerId: number,
    title: string,
    values: any
): Promise<Document> {
    if (!templateId) throw new Error("Template ID is required");
    if (!ownerId) throw new Error("Owner ID is required");
    if (!values) throw new Error("Document values are required");

    return docRepo.createDocument(templateId, ownerId, title, values, null, "draft");
}

export async function getDocumentById(id: number): Promise<Document | null> {
    if (!id) throw new Error("Document ID is required");
    return docRepo.getDocumentById(id);
}

export async function listDocumentsByOwner(ownerId: number): Promise<Document[]> {
    if (!ownerId) throw new Error("Owner ID is required");
    return docRepo.listDocumentsByOwner(ownerId);
}

export async function updateDocumentStatus(
    documentId: number,
    status: string,
    pdfGenerated?: string
): Promise<Document> {
    if (!documentId) throw new Error("Document ID is required");
    if (!status) throw new Error("Status is required");

    return docRepo.updateDocumentStatus(documentId, status, pdfGenerated);
}

export async function addRecipient(
    documentId: number,
    email: string
): Promise<Recipient> {
    if (!documentId) throw new Error("Document ID is required");
    if (!email) throw new Error("Email is required");

    return recipientRepo.addRecipient(documentId, email);
}

export async function listRecipients(documentId: number): Promise<Recipient[]> {
    if (!documentId) throw new Error("Document ID is required");
    return recipientRepo.listRecipientsByDocument(documentId);
}
