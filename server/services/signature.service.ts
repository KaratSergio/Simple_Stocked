import * as signatureRepo from "@/server/data/repo/signature.repository";
import * as documentRepo from "@/server/data/repo/document.repository"
import { Signature } from "@/server/types/signature.types";

export async function addSignature(
    documentId: string,
    recipientId: number,
    signatureData: string
): Promise<Signature> {
    if (!documentId) throw new Error("Document ID is required");
    if (!recipientId) throw new Error("Recipient ID is required");
    if (!signatureData) throw new Error("Signature data is required");

    const signature = await signatureRepo.addSignature(documentId, recipientId, signatureData);

    await documentRepo.updateDocumentStatus(documentId, "signed");

    // TODO: Regenerate PDF with signature(s)
    // await generatePdf(documentId);

    return signature
}

export async function listSignatures(documentId: string): Promise<Signature[]> {
    if (!documentId) throw new Error("Document ID is required");
    return signatureRepo.listSignaturesByDocument(documentId);
}
