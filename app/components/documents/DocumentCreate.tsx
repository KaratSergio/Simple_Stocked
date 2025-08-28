'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Template {
    id: number;
    name: string;
    json_schema?: DocumentTemplate;
}

interface DocumentElement {
    id: string;
    type: 'text' | 'textarea' | 'signature';
    placeholder?: string;
}

interface DocumentTemplate {
    elements: DocumentElement[];
    pageWidth: number;
    pageHeight: number;
}

export const DocumentCreate = ({ ownerId }: { ownerId: number }) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [values, setValues] = useState<Record<string, any>>({});
    const router = useRouter();

    useEffect(() => {
        fetch("/api/templates/list")
            .then(res => res.json())
            .then(data => {
                if (data.success) setTemplates(data.data);
            });
    }, []);

    const handleChange = (id: string, value: any) => {
        setValues(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        if (!selectedTemplate) return alert("Select a template");

        const res = await fetch("/api/documents/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ templateId: selectedTemplate.id, ownerId, values })
        });

        const data = await res.json();
        if (data.success) {
            router.push(`/private/documents/${data.id}`);
        } else {
            alert("Failed to create document");
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Create Document</h1>

            <select
                value={selectedTemplate?.id || ""}
                onChange={e => {
                    const t = templates.find(t => t.id === Number(e.target.value)) || null;
                    setSelectedTemplate(t);
                    setValues({});
                }}
                className="border p-2"
            >
                <option value="">Select template</option>
                {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>

            {selectedTemplate?.json_schema && (
                <DynamicForm
                    template={selectedTemplate.json_schema}
                    values={values}
                    onChange={handleChange}
                />
            )}

            <button onClick={handleSubmit} className="btn mt-2">Create Document</button>
        </div>
    );
}

interface DynamicFormProps {
    template: DocumentTemplate;
    values: Record<string, any>;
    onChange: (id: string, value: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ template, values, onChange }) => {
    return (
        <div className="border p-4 space-y-2 bg-gray-50">
            {template.elements.map(el => {
                if (el.type === 'text') {
                    return (
                        <input
                            key={el.id}
                            placeholder={el.placeholder}
                            value={values[el.id] || ''}
                            onChange={e => onChange(el.id, e.target.value)}
                            className="border p-2 w-full"
                        />
                    );
                }
                if (el.type === 'textarea') {
                    return (
                        <textarea
                            key={el.id}
                            placeholder={el.placeholder}
                            value={values[el.id] || ''}
                            onChange={e => onChange(el.id, e.target.value)}
                            className="border p-2 w-full"
                        />
                    );
                }
                if (el.type === 'signature') {
                    return (
                        <div key={el.id} className="border h-24 w-full bg-gray-100 text-center flex items-center justify-center">
                            Sign Here
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};
