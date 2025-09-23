// ============================
// Recipient Types
// ============================

export interface Recipient {
    id: number;
    name: string;
    email: string;
    signature?: string | null;   // base64 canvas signatures
}