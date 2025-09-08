import { FC } from "react";
import { TemplateListProps } from "./types";

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
