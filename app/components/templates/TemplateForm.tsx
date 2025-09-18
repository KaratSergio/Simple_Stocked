'use client';
import { useState, useEffect } from "react";
import { TemplateEditor } from "./TemplateEditor";
import { TemplateData, TemplateFormProps } from "./types";
import { ChevronDown, FileCode2 } from "lucide-react";

export const TemplateForm = ({ templateId, onSaved }: TemplateFormProps) => {
  const [editorData, setEditorData] = useState<TemplateData>({ name: "", elements: [] });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(2);

  // Load template from server
  useEffect(() => {
    if (!templateId) return;
    setLoading(true);
    fetch(`/api/templates/${templateId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEditorData({
            name: data.data.name,
            elements: data.data.jsonSchema.elements || [],
            pdfBase: data.data.pdfUrl || null
          });
          setCurrentPdfUrl(data.data.pdfUrl || null);
        } else {
          console.error(data.error || "Failed to load template");
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [templateId]);

  // Initialize template (textarea + recipients)
  useEffect(() => {
    TemplateEditor({
      initialData: editorData,
      onChange: setEditorData,
      recipientCount: recipient,
    });
  }, [editorData.name, recipient]);

  const handleSave = async () => {
    if (!editorData.name) return;
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
        body: JSON.stringify({
          name: editorData.name,
          pdfBase: pdfUrl,
          jsonSchema: { ...editorData, pageWidth: 600, pageHeight: 800 }
        }),
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
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 align-center mb-4">
          <FileCode2 size={32} className="text-teal-900" />
          <h1 className="text-2xl font-bold text-teal-900">create a Template</h1>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Template name:</label>
          <input
            value={editorData.name}
            onChange={e => setEditorData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter template name"
            className="border p-2 w-full  bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Recipients:</label>
          <div className="relative w-full">
            <select
              value={recipient}
              onChange={e => setRecipient(Number(e.target.value))}
              className="appearance-none border p-2 pr-8 w-full bg-gray-100 text-black"
            >
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <ChevronDown size={16} className="text-gray-600" />
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Upload base pdf:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setPdfFile(e.target.files?.[0] || null)}
            className="border p-2 w-full bg-gray-100 text-black"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="py-2 px-4 flex justify-center w-96 border cursor-pointer border-black bg-teal-900 text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : templateId ? "Update Template" : "Create Template"}
        </button>
      </div>

      <div className="border w-full h-[822px] flex items-center justify-center bg-gray-50">
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
  );
};
