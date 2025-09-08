import { DocumentTemplate } from "../templates/types";

// ============================
// Documents & Lists
// ============================
export interface DocumentType {
    id: string;
    title: string;
    pdf_generated: string; // URL or path to generated PDF
}

export interface DocumentProps {
    documentId: string;
}

export interface DocumentListProps {
    ownerId: number;
}

// ============================
// Dynamic Form
// ============================

// Field value can be a string or null (not signed yet)
export type FieldValue = string | null;

// Values of the document by element ID
export type DocumentValues = Record<string, FieldValue>;

export interface DynamicFormProps {
    template: DocumentTemplate;       // template to render
    values: DocumentValues;           // current field values
    onChange: (id: string, value: FieldValue) => void; // called when a field changes
}
