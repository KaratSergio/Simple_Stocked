'use client';
import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";

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

interface TemplateEditorProps {
    initialData?: {
        name: string;
        elements: DocumentElement[];
    };
    onChange?: (data: { name: string; elements: DocumentElement[] }) => void;
}

export const TemplateEditor = ({ initialData, onChange }: TemplateEditorProps) => {
    const [templateName, setTemplateName] = useState(initialData?.name || "");
    const [elements, setElements] = useState<DocumentElement[]>(initialData?.elements || []);

    useEffect(() => {
        onChange?.({ name: templateName, elements });
    }, [templateName, elements, onChange]);

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

    return (
        <div className="">
            {/* Header: name */}
            <div className="flex items-center space-x-2">
                <input
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    placeholder="Template Name"
                    className="border p-2 flex-1"
                />
            </div>

            {/* Add elements */}
            <div className="flex border-r">
                <button onClick={() => addElement('text')} className="border-l py-1 px-2 cursor-pointer">Text</button>
                <button onClick={() => addElement('textarea')} className="border-x py-1 px-2 cursor-pointer">Textarea</button>
                <button onClick={() => addElement('signature')} className="border-r py-1 px-2 cursor-pointer">Signature</button>
            </div>

            {/* Canvas */}
            <div className="border w-[600px] h-[700px] relative bg-white">
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
};
