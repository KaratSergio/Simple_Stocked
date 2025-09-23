import { DocumentTemplate } from "../templates/types";
import { Recipient } from "../recipients/types";

export interface Document {
    id: number;
    title: string;
    status: string;
    created_at: string;
}

// ============================
// Documents & Lists
// ============================
export interface DocumentType {
    id: number;
    title: string;
    pdf_generated: string; // URL or path to generated PDF
}

export interface DocumentProps {
    documentId: number;
}

// ============================
// Dynamic Form
// ============================

// Field value can be a string or array of recipients
export type FieldValue = string | Recipient[];

// Values of the document by element ID
export interface DocumentValues {
    [key: string]: FieldValue;
}

// Props for DynamicForm component
export interface DynamicFormProps {
    template: DocumentTemplate;       // template to render
    values: DocumentValues;          // document fields
    onChange: (id: number, value: FieldValue) => void; // called when a field changes
}
