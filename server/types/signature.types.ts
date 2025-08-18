export interface SignatureDTO {
    emails: string[];
    documentIds: string[];
    signer_id: string;
    status: string;
    signed_at: string;
}

export interface SignaturePayload {
    emails: string[];
    documentIds: string[];
    signerId?: string | null;
    role: string;
    orderIndex: number;
}
