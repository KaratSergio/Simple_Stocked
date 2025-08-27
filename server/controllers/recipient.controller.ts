import * as documentService from "@/server/services/document.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(documentId: number, email: string): Promise<Recipient> {
    return documentService.addRecipient(documentId, email);
}

export async function listRecipients(documentId: number): Promise<Recipient[]> {
    return documentService.listRecipients(documentId);
}
