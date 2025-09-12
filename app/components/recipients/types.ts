// ============================
// Recipient Types
// ============================

export interface Recipient {
    id: string;
    name: string;
    email: string;
    signature?: string | null;   // base64 canvas signatures
}