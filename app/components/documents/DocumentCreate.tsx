'use client';
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TemplateSelect } from "../templates";
import { DynamicForm } from "./DynamicForm";

interface Template {
  id: number;
  name: string;
  json_schema?: DocumentTemplate;
}

interface DocumentTemplate {
  elements: DocumentElement[];
  pageWidth: number;
  pageHeight: number;
}

interface DocumentElement {
  id: string;
  type: "text" | "textarea" | "signature";
  placeholder?: string;
}

export const DocumentCreate = ({ ownerId }: { ownerId: number }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [values, setValues] = useState<Record<string, any>>({});
  const router = useRouter();

  useEffect(() => {
    fetch("/api/templates/list")
      .then(res => res.json())
      .then(data => {
        if (data.success) setTemplates(data.data);
      });
  }, []);

  const selectedTemplate = templates.find(t => t.id === selectedId) || null;

  const handleChange = (id: string, value: any) =>
    setValues(prev => ({ ...prev, [id]: value }));

  const handleSubmit = async () => {
    if (!selectedTemplate) return alert("Select a template");

    const res = await fetch("/api/documents/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId: selectedTemplate.id,
        ownerId,
        title,
        values,
      }),
    });

    const data = await res.json();
    if (data.success) router.push(`/private/documents/${data.id}`);
    else alert("Failed to create document");
  };

  const handleSelect = useCallback((id: number | null) => {
    setSelectedId(id);
    setValues({});
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Document</h1>

      <input
        type="text"
        placeholder="Document title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />

      <TemplateSelect
        templates={templates.map(t => ({ id: t.id, name: t.name }))}
        selectedId={selectedId}
        onSelect={handleSelect}
      />

      {selectedTemplate?.json_schema && (
        <DynamicForm
          template={selectedTemplate.json_schema}
          values={values}
          onChange={handleChange}
        />
      )}

      <button onClick={handleSubmit} className="btn mt-2">
        Create Document
      </button>
    </div>
  );
};
