'use client';

import { useState } from "react";
import { Rnd } from "react-rnd";

export interface DocumentElement {
    id: string;
    type: 'text' | 'textarea' | 'signature';
    x: number;
    y: number;
    width: number;
    height: number;
    placeholder?: string;
    value?: string;
}

export const TemplateEditor = () => {
    const [elements, setElements] = useState<DocumentElement[]>([]);
    const [templateName, setTemplateName] = useState("");
    const [loading, setLoading] = useState(false);

    const addElement = (type: DocumentElement['type']) => {
        const newEl: DocumentElement = {
            id: `el_${Date.now()}`,
            type,
            x: 50,
            y: 50,
            width: type === 'textarea' ? 200 : 150,
            height: type === 'textarea' ? 80 : 30,
            placeholder: type === 'text' ? 'Enter text' : undefined
        };
        setElements(prev => [...prev, newEl]);
    };

    const updateElement = (updatedEl: DocumentElement) => {
        setElements(prev => prev.map(el => el.id === updatedEl.id ? updatedEl : el));
    };

    const handleCreateTemplate = async () => {
        if (!templateName) return alert("Template name is required");
        const jsonSchema = { elements, pageWidth: 600, pageHeight: 800 };

        setLoading(true);
        try {
            const res = await fetch("/api/templates/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: templateName, json_schema: jsonSchema }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Template created: " + data.data.id);
                setElements([]);
                setTemplateName("");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to create template");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-4">
            {/* Header: name + save */}
            <div className="flex items-center space-x-2">
                <input
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    placeholder="Template Name"
                    className="border p-2 flex-1"
                />
                <button onClick={handleCreateTemplate} disabled={loading} className="btn">
                    {loading ? "Creating..." : "Create Template"}
                </button>
            </div>

            {/* Add elements */}
            <div className="flex space-x-2 mb-4">
                <button onClick={() => addElement('text')} className="btn">Text</button>
                <button onClick={() => addElement('textarea')} className="btn">Textarea</button>
                <button onClick={() => addElement('signature')} className="btn">Signature</button>
            </div>

            {/* Canvas */}
            <div className="border w-[600px] h-[800px] relative bg-white">
                {elements.map(el => (
                    <Rnd
                        key={el.id}
                        size={{ width: el.width, height: el.height }}
                        position={{ x: el.x, y: el.y }}
                        onDragStop={(e, d) => updateElement({ ...el, x: d.x, y: d.y })}
                        onResizeStop={(e, direction, ref, delta, position) =>
                            updateElement({ ...el, width: ref.offsetWidth, height: ref.offsetHeight, ...position })
                        }
                    >
                        {el.type === 'text' && (
                            <input
                                className="w-full h-full border-none px-1"
                                placeholder={el.placeholder}
                                value={el.value || ''}
                                onChange={e => updateElement({ ...el, value: e.target.value })}
                            />
                        )}
                        {el.type === 'textarea' && (
                            <textarea
                                className="w-full h-full border-none p-1"
                                placeholder={el.placeholder}
                                value={el.value || ''}
                                onChange={e => updateElement({ ...el, value: e.target.value })}
                            />
                        )}
                        {el.type === 'signature' && <div className="bg-gray-100 w-full h-full text-center">Sign Here</div>}
                    </Rnd>
                ))}
            </div>
        </div>
    );
}
