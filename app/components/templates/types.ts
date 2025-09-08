// Editor
type ElementType = 'textarea';
export interface DocumentElement<T extends ElementType = 'textarea'> {
    id: string;
    type: T;
    placeholder?: string;
}

export interface TemplateData<Elements extends DocumentElement[] = DocumentElement[]> {
    name: string;
    elements: Elements;
    pdfBase?: string;
}

export interface TemplateEditorProps<Data extends TemplateData = TemplateData> {
    initialData?: Data;
    onChange?: (data: Data) => void;
}

// Form
export interface TemplateFormProps {
    templateId?: string;
    onSaved?: (data: any) => void;
}

// List
export interface Template {
    id: number;
    name: string;
    json_schema?: object;
    pdf_base?: string;
}

export interface TemplateListProps {
    templates: Template[];
    selectedTemplate: Template | null;
    onSelect: (template: Template) => void;
}

// Select
export interface TemplateSelectorProps {
    templates: { id: number; name: string }[];
    selectedId: number | null;
    onSelect: (id: number | null) => void;
}