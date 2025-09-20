import * as recipientService from "@/server/services/recipient.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(documentId: string, name: string, email: string = ""): Promise<Recipient> {
    if (!documentId) throw new Error("Document ID required");
    if (!name) throw new Error("Recipient name required");
    return recipientService.addRecipient(documentId, name, email);
}

export async function listRecipientsByDocument(documentId: string): Promise<Recipient[]> {
    if (!documentId) throw new Error("Document ID required");
    return recipientService.listRecipientsByDocument(documentId);
}

export async function listRecipientsByOwner(ownerId: number): Promise<Recipient[]> {
    if (!ownerId) throw new Error("Owner ID required");
    return recipientService.listRecipientsByOwner(ownerId);
}

export async function updateRecipient(recipientId: string, email: string): Promise<Recipient> {
    return recipientService.updateRecipient(recipientId, email);
}

export async function inviteRecipient(recipientId: string, documentId: string): Promise<void> {
    await recipientService.inviteRecipient(documentId, recipientId);
}
