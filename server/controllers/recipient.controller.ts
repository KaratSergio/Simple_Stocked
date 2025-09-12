import * as recipientService from "@/server/services/recipient.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(documentId: string, email: string): Promise<Recipient> {
    const recipient = await recipientService.addRecipient(documentId, email);

    return recipient;
}

export async function listRecipients(documentId: string): Promise<Recipient[]> {
    return recipientService.listRecipients(documentId);
}

export async function updateRecipient(recipientId: number, email: string): Promise<Recipient> {
    // Updates email in DB via service
    const updatedRecipient = await recipientService.updateRecipient(recipientId, email);
    return updatedRecipient;
}

export async function inviteRecipient(recipientId: number, documentId: string): Promise<void> {
    // Service checks email is set and sends invite with unique link
    await recipientService.inviteRecipient(documentId, recipientId);
}