// ============================
// Element Types
// ============================

// Possible element types
export type ElementType = 'textarea' | 'signature';

// Base document element
export interface DocumentElement {
    id: string;       // Unique ID for frontend/editor usage
    type: ElementType;
}

// Textarea element
export interface TextareaElement extends DocumentElement {
    type: 'textarea';
    placeholder?: string;
}

// Signature element
export interface SignatureElement extends DocumentElement {
    type: 'signature';
    role: string;     // 'client' or 'company'
    name: string;
    title?: string;   // optional job title
    pageRepeat?: boolean; // should appear on every page
}

// Union of all document elements
export type AnyDocumentElement = TextareaElement | SignatureElement;

// ============================
// Document Template
// ============================
export interface DocumentTemplate {
    elements: AnyDocumentElement[];
    pageWidth: number;
    pageHeight: number;
}

// ============================
// Template Editor / Form
// ============================
export interface TemplateData<Elements extends AnyDocumentElement[] = AnyDocumentElement[]> {
    name: string;
    elements: Elements;
    pdfBase?: string; // optional base PDF file
}

export interface TemplateEditorProps<Data extends TemplateData = TemplateData> {
    initialData?: Data;
    onChange?: (data: Data) => void;
}

export interface TemplateFormProps {
    templateId?: string;
    onSaved?: (data: any) => void;
}

// ============================
// Template List / Selector
// ============================
export interface Template {
    id: number;
    name: string;
    json_schema?: DocumentTemplate;
    pdf_base?: string;
}

export interface TemplateListProps {
    templates: Template[];
    selectedTemplate: Template | null;
    onSelect: (template: Template) => void;
}

export interface TemplateSelectorProps {
    templates: { id: number; name: string }[];
    selectedId: number | null;
    onSelect: (id: number | null) => void;
}
