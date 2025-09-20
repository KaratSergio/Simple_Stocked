import * as recipientRepo from "@/server/data/repo/recipient.repository";
import { sendInvite } from "@/server/services/mailer.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(
    documentId: string,
    name: string,
    email: string = ""
): Promise<Recipient> {
    return recipientRepo.addRecipient(documentId, name, email);
}

export async function listRecipientsByDocument(documentId: string):
    Promise<Recipient[]> {
    return recipientRepo.listRecipientsByDocument(documentId);
}

export async function listRecipientsByOwner(ownerId: number):
    Promise<Recipient[]> {
    return recipientRepo.listRecipientsByOwner(ownerId);
}

export async function getRecipientById(recipientId: string):
    Promise<Recipient | null> {
    return recipientRepo.getRecipientById(recipientId);
}

export async function updateRecipient(recipientId: string, email: string):
    Promise<Recipient> {
    return recipientRepo.updateRecipient(recipientId, email);
}

export async function updateStatus(recipientId: string, status: "pending" | "signed" | "declined"):
    Promise<Recipient> {
    return recipientRepo.updateRecipientStatus(recipientId, status);
}

export async function inviteRecipient(documentId: string, recipientId: string):
    Promise<void> {
    const recipient = await recipientRepo.getRecipientById(recipientId);

    if (!recipient) throw new Error("Recipient not found");
    if (!recipient.email) throw new Error("Recipient email is not set, cannot send invite");

    await sendInvite(recipient.email, documentId, recipient.id.toString());
}
