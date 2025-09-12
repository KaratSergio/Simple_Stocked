import * as recipientRepo from "@/server/data/repo/recipient.repository";
import { sendInvite } from "@/server/services/mailer.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(
    documentId: string,
    name: string,
    email: string = ""
): Promise<Recipient> {
    const recipient = await recipientRepo.addRecipient(documentId, name, email);

    // await sendInvite(email, documentId, recipient.id.toString());

    return recipient;
}

export async function inviteRecipient(
    documentId: string,
    recipientId: number
): Promise<void> {
    const recipient = await recipientRepo.getRecipientById(recipientId);
    if (!recipient) throw new Error("Recipient not found");

    if (!recipient.email) {
        throw new Error("Recipient email is not set, cannot send invite");
    }

    await sendInvite(recipient.email, documentId, recipient.id.toString());
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