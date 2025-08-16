export interface SignatureDTO {
    document_id: string;
    signer_id: string;
    email: string;
    status: string;
    signed_at: string;
}

export interface SignaturePayload {
    documentId: string;
    signerId?: string | null;
    email: string;
}
