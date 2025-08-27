export interface DocumentTemplate {
    id: number;
    name: string;
    json_schema: any;
    pdf_base?: string;
    created_at: string;
}
