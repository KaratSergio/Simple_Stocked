export interface Document {
    id: number;
    title: string;
    template_id: number;
    owner_id: number;
    values: any;
    pdf_generated?: string;
    status: "draft" | "pending" | "in_progress" | "signed" | "declined";
    created_at: string;
}
