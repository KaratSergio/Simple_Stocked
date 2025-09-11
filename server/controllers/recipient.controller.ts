import * as recipientService from "@/server/services/recipient.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(documentId: string, email: string): Promise<Recipient> {
    const recipient = await recipientService.addRecipient(documentId, email);

    return recipient;
}

export async function listRecipients(documentId: string): Promise<Recipient[]> {
    return recipientService.listRecipients(documentId);
}
