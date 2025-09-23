import * as recipientRepo from "@/server/data/repo/recipient.repository";
import * as documentRepo from "@/server/data/repo/document.repository"
import { sendInvite } from "@/server/services/mailer.service";
import { Recipient } from "@/server/types/recipient.types";

export async function addRecipient(
    documentId: number,
    name: string,
    email: string = ""
): Promise<Recipient> {
    return recipientRepo.addRecipient(documentId, name, email);
}

export async function listRecipientsByDocument(documentId: number):
    Promise<Recipient[]> {
    return recipientRepo.listRecipientsByDocument(documentId);
}

export async function listRecipientsByOwner(ownerId: number):
    Promise<Recipient[]> {
    return recipientRepo.listRecipientsByOwner(ownerId);
}

export async function getRecipientById(recipientId: number):
    Promise<Recipient | null> {
    return recipientRepo.getRecipientById(recipientId);
}

export async function updateRecipient(recipientId: number, email: string):
    Promise<Recipient> {
    return recipientRepo.updateRecipient(recipientId, email);
}

export async function updateStatus(recipientId: number, status: "pending" | "signed" | "declined"):
    Promise<Recipient> {
    return recipientRepo.updateRecipientStatus(recipientId, status);
}

export async function inviteRecipient(documentId: number, recipientId: number): Promise<void> {
    const recipient = await recipientRepo.getRecipientById(recipientId);

    if (!recipient) throw new Error("Recipient not found");
    if (!recipient.email) throw new Error("Recipient email is not set, cannot send invite");

    // 1. Получаем документ
    const doc = await documentRepo.getDocumentById(documentId);
    if (!doc) throw new Error("Document not found");

    const updatedValues = { ...doc.values };

    console.log("[inviteRecipient] Before update:", JSON.stringify(updatedValues.recipients, null, 2));

    // 2. Обновляем email у конкретного recipient внутри values.recipients
    if (Array.isArray(updatedValues.recipients)) {
        updatedValues.recipients = updatedValues.recipients.map((r: any) => {
            console.log("[compare]", typeof r.id, r.id, "|", typeof recipientId, recipientId);
            return String(r.id) === String(recipientId)
                ? { ...r, email: recipient.email }
                : r;
        });
    }

    console.log("[inviteRecipient] After update:", JSON.stringify(updatedValues.recipients, null, 2));

    // 3. Сохраняем только values
    const savedDoc = await documentRepo.updateValues(documentId, updatedValues);

    console.log("[inviteRecipient] Saved values:", JSON.stringify(savedDoc.values.recipients, null, 2));

    // 4. Отправляем письмо
    await sendInvite(recipient.email, documentId, recipient.id);
}

