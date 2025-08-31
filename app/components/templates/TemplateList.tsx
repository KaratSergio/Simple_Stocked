import { FC } from "react";

export interface Template {
    id: number;
    name: string;
    json_schema?: object;
    pdf_base?: string;
}

interface TemplateListProps {
    templates: Template[];
    selectedTemplate: Template | null;
    onSelect: (template: Template) => void;
}

export const TemplateList: FC<TemplateListProps> = ({ templates, selectedTemplate, onSelect }) => {
    return (
        <ul>
            {templates.map(t => (
                <li
                    key={t.id}
                    onClick={() => onSelect(t)}
                    className={`cursor-pointer p-1 ${selectedTemplate?.id === t.id ? 'bg-gray-200' : ''}`}
                >
                    {t.name}
                </li>
            ))}
        </ul>
    );
};
