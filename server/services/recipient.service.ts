import * as recipientRepo from "@/server/data/repo/recipient.repository";
import { sendInvite } from "@/server/services/mailer.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(documentId: string, email: string): Promise<Recipient> {
    const recipient = await recipientRepo.addRecipient(documentId, email);

    // Send invite email (async)
    sendInvite(email, documentId, recipient.id.toString()).catch(err =>
        console.error("Failed to send invite:", err)
    );

    return recipient;
}

export async function listRecipients(documentId: string): Promise<Recipient[]> {
    return recipientRepo.listRecipientsByDocument(documentId);
}

export async function updateStatus(
    recipientId: number,
    status: "pending" | "signed" | "declined"
): Promise<Recipient> {
    return recipientRepo.updateRecipientStatus(recipientId, status);
}

export async function getRecipientById(recipientId: number): Promise<Recipient | null> {
    const recipient = await recipientRepo.getRecipientById(recipientId);
    return recipient || null;
}