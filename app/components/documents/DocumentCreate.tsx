'use client';
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TemplateSelect } from "../templates";
import { DynamicForm } from "./DynamicForm";

import { DocumentValues, FieldValue } from "./types";
import { DocumentTemplate } from "../templates/types";
import { Template } from "../templates/types";

export const DocumentCreate = ({ ownerId }: { ownerId: number }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState<DocumentTemplate | null>(null);
  const [values, setValues] = useState<DocumentValues>({});

  const router = useRouter();

  // Loading templates
  useEffect(() => {
    fetch("/api/templates/list")
      .then(res => res.json())
      .then(data => {
        if (data.success) setTemplates(data.data);
      });
  }, []);

  // Select template
  const handleSelect = useCallback((id: number | null) => {
    setSelectedId(id);
    const tmpl = templates.find(t => t.id === id) || null;
    setTemplate(tmpl?.json_schema || null);

    // Initialize empty values for all elements
    if (tmpl?.json_schema) {
      const initialValues: DocumentValues = {};
      tmpl.json_schema.elements.forEach(el => {
        if (el.type === "textarea") initialValues[el.id] = "";
        if (el.type === "signature") {
          initialValues[el.id] = el.value?.length
            ? el.value.map(r => ({ name: r.name || "", signature: r.signature || null }))
            : [{ name: "", signature: null }];
        }
      });
      setValues(initialValues);
    } else {
      setValues({});
    }
  }, [templates]);

  const handleChange = (id: string, value: FieldValue) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedId || !template) return alert("Select a template");

    const res = await fetch("/api/documents/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId: selectedId,
        ownerId,
        title,
        values,
      }),
    });

    const data = await res.json();
    if (data.success) router.push(`/page/documents/${data.data.id}`);
    else alert("Failed to create document");
  };

  return (
    <div className="space-y-6 flex flex-col">
      <h1 className="text-2xl font-bold">Create Document</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Document title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2"
        />

        <TemplateSelect
          templates={templates.map(t => ({ id: t.id, name: t.name }))}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      {template && (
        <>
          <DynamicForm
            template={template}
            values={values}
            onChange={handleChange}
          />

          <button onClick={handleSubmit} className="btn mt-2 bg-teal-900 p-2 text-white">
            Create Document
          </button>
        </>
      )}


    </div>
  );
};
