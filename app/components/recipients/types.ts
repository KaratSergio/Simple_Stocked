// ============================
// Recipient Types
// ============================

export interface Recipient {
    name: string;
    signature?: string | null;   // base64 canvas signatures
}