import * as signatureRepo from "@/server/data/repo/signature.repository";
import { Signature } from "@/server/types/signature.types";

export async function addSignature(
    documentId: number,
    recipientId: number,
    signatureData: string
): Promise<Signature> {
    if (!documentId) throw new Error("Document ID is required");
    if (!recipientId) throw new Error("Recipient ID is required");
    if (!signatureData) throw new Error("Signature data is required");

    return signatureRepo.addSignature(documentId, recipientId, signatureData);
}

export async function listSignatures(documentId: number): Promise<Signature[]> {
    if (!documentId) throw new Error("Document ID is required");
    return signatureRepo.listSignaturesByDocument(documentId);
}
