import * as signatureService from "@/server/services/signature.service";
import { Signature } from "@/server/types/signature.types";

export async function addSignature(documentId: number, recipientId: number, signatureData: string): Promise<Signature> {
    return signatureService.addSignature(documentId, recipientId, signatureData);
}

export async function listSignatures(documentId: number): Promise<Signature[]> {
    return signatureService.listSignatures(documentId);
}
