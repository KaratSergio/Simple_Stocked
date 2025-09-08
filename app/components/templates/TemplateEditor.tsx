import { TemplateData, TemplateEditorProps, DocumentElement } from "./types";

export const TemplateEditor = <Data extends TemplateData = TemplateData>({
    initialData,
    onChange,
}: TemplateEditorProps<Data>): Data => {
    const defaultElement: DocumentElement = { id: 'textarea_1', type: 'textarea' };

    const templateData = {
        name: initialData?.name ?? '',
        elements: initialData?.elements?.length ? initialData.elements : [defaultElement],
        pdfBase: initialData?.pdfBase,
    } as Data;

    onChange?.(templateData);

    return templateData;
};







// =========  another version ===========

// 'use client';
// import { Rnd } from "react-rnd";
// import { useState, useEffect } from "react";

// export interface DocumentElement {
//     id: string;
//     type: 'text' | 'textarea' | 'signature';
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     placeholder?: string;
//     value?: string;
// }

// interface TemplateEditorProps {
//     initialData?: {
//         name: string;
//         elements: DocumentElement[];
//     };
//     onChange?: (data: { name: string; elements: DocumentElement[] }) => void;
// }

// export const TemplateEditor = ({ initialData, onChange }: TemplateEditorProps) => {
//     const [templateName, setTemplateName] = useState(initialData?.name || "");
//     const [elements, setElements] = useState<DocumentElement[]>(initialData?.elements || []);
//     const [selectedId, setSelectedId] = useState<string | null>(null);

//     useEffect(() => {
//         onChange?.({ name: templateName, elements });
//     }, [templateName, elements, onChange]);

//     const addElement = (type: DocumentElement['type']) => {
//         const newEl: DocumentElement = {
//             id: `el_${Date.now()}`,
//             type,
//             x: 50,
//             y: 50,
//             width: type === 'textarea' ? 200 : 150,
//             height: type === 'textarea' ? 80 : 30,
//             placeholder: type === 'text' ? 'Enter text' : undefined
//         };
//         setElements(prev => [...prev, newEl]);
//     };

//     const updateElement = (updatedEl: DocumentElement) => {
//         setElements(prev => prev.map(el => el.id === updatedEl.id ? updatedEl : el));
//     };

//     return (
//         <div>
//             {/* Header: name */}
//             <div className="flex items-center space-x-2">
//                 <input
//                     value={templateName}
//                     onChange={e => setTemplateName(e.target.value)}
//                     placeholder="Template Name"
//                     className="border p-2 flex-1"
//                 />
//             </div>

//             {/* Add elements */}
//             <div className="flex">
//                 <button onClick={() => addElement('text')} className="py-1 px-2 border-x">Text</button>
//                 <button onClick={() => addElement('textarea')} className="py-1 px-2">Textarea</button>
//                 <button onClick={() => addElement('signature')} className="py-1 px-2 border-x">Signature</button>
//             </div>

//             {/* Canvas */}
//             <div className="border w-[600px] h-[700px] relative bg-white">
//                 {elements.map(el => (
//                     <Rnd
//                         key={el.id}
//                         size={{ width: el.width, height: el.height }}
//                         position={{ x: el.x, y: el.y }}
//                         onDragStop={(e, d) => updateElement({ ...el, x: d.x, y: d.y })}
//                         onResizeStop={(e, direction, ref, delta, position) =>
//                             updateElement({ ...el, width: ref.offsetWidth, height: ref.offsetHeight, ...position })
//                         }
//                         onClick={() => setSelectedId(el.id)}
//                         className={`${selectedId === el.id ? "border-2 border-gray-500" : "border border-gray-300"
//                             } bg-gray-50`}
//                     >
//                         {el.type === 'text' && (
//                             <input
//                                 className="w-full h-full border-none px-1 bg-transparent outline-none"
//                                 placeholder={el.placeholder}
//                                 value={el.value || ''}
//                                 onChange={e => updateElement({ ...el, value: e.target.value })}
//                             />
//                         )}
//                         {el.type === 'textarea' && (
//                             <textarea
//                                 className="w-full h-full border-none p-1 bg-transparent outline-none resize-none"
//                                 placeholder={el.placeholder}
//                                 value={el.value || ''}
//                                 onChange={e => updateElement({ ...el, value: e.target.value })}
//                             />
//                         )}
//                         {el.type === 'signature' && (
//                             <div className="flex items-center justify-center w-full h-full text-gray-500">
//                                 Sign Here
//                             </div>
//                         )}
//                     </Rnd>
//                 ))}
//             </div>
//         </div>
//     );
// };
