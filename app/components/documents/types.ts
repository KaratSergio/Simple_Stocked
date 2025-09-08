// List
export interface DocumentListProps {
    ownerId: number;
}

// Document
export interface DocumentType {
    id: string;
    title: string;
    pdf_generated: string;
}

export interface DocumentProps {
    documentId: string;
}

// Create

export interface Template {
    id: number;
    name: string;
    json_schema?: DocumentTemplate;
}

export interface DocumentTemplate {
    elements: DocumentElement[];
    pageWidth: number;
    pageHeight: number;
}

export interface DocumentElement {
    id: string;
    type: "text" | "textarea" | "signature";
    placeholder?: string;
}

// Dynamic Form
export interface DynamicFormProps {
    template: DocumentTemplate;
    values: Record<string, any>;
    onChange: (id: string, value: any) => void;
}