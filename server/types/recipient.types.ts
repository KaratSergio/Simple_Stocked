export interface Recipient {
    id: number;
    document_id: number;
    email: string;
    status: "pending" | "signed" | "declined";
    created_at: string;
}
