'use client';
import { useState, useEffect } from "react";
import { TemplateEditor, DocumentElement } from "./TemplateEditor";

interface TemplateFormProps {
    templateId?: string;
    onSaved?: (data: any) => void;
}

export const TemplateForm = ({ templateId, onSaved }: TemplateFormProps) => {
    const [editorData, setEditorData] = useState<{ name: string; elements: DocumentElement[] }>({ name: "", elements: [] });
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // load template if editing
    useEffect(() => {
        if (!templateId) return;
        setLoading(true);
        fetch(`/api/templates/${templateId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setEditorData({ name: data.data.name, elements: data.data.jsonSchema.elements || [] });
                    setCurrentPdfUrl(data.data.pdfUrl || null);
                } else {
                    console.error(data.error || "Failed to load template");
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [templateId]);

    const handleSave = async () => {
        if (!editorData.name) return; // name required, parent can handle notification
        setLoading(true);

        try {
            const pdfUrl = pdfFile
                ? await (async () => {
                    const formData = new FormData();
                    formData.append("file", pdfFile);
                    const res = await fetch("/api/upload", { method: "POST", body: formData });
                    const data = await res.json();
                    if (!data.fileUrl) throw new Error("Upload failed");
                    return data.fileUrl;
                })()
                : currentPdfUrl;

            const res = await fetch(templateId ? `/api/templates/${templateId}` : "/api/templates/create", {
                method: templateId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editorData.name, pdfBase: pdfUrl, jsonSchema: { elements: editorData.elements, pageWidth: 600, pageHeight: 800 } }),
            });

            const data = await res.json();
            if (data.success) onSaved?.(data.data);
            else console.error(data.error || "Save failed");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <TemplateEditor initialData={editorData} onChange={setEditorData} />

          <div className="flex flex-col">
            <input
              type="file"
              accept="application/pdf"
              onChange={e => setPdfFile(e.target.files?.[0] || null)}
              className="border p-2 w-full bg-gray-100 text-black"
            />

            <button onClick={handleSave} disabled={loading} className='py-1 border-x cursor-pointer'>
              {loading ? "Saving..." : templateId ? "Update" : "Create"}
            </button>

            <div className="border w-[600px] h-[700px] flex items-center justify-center bg-gray-50">
              {pdfFile || currentPdfUrl ? (
                <embed
                  src={pdfFile ? URL.createObjectURL(pdfFile) : currentPdfUrl || ""}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              ) : (
                <p className="text-gray-400">No PDF selected</p>
              )}
            </div>
          </div>
        </div>
    );
};
