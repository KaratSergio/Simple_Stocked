'use client';

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TemplateSelect } from "../templates";
import { DynamicForm } from "./DynamicForm";
import { useUser } from "@/app/shared/hooks/useUser";
import { useTemplates } from "@/app/shared/hooks/useTemplates";
import { DocumentValues, FieldValue } from "./types";
import { Recipient } from "../recipients/types";

export const DocumentCreate = () => {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: templates = [], isLoading: templatesLoading } = useTemplates();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [values, setValues] = useState<DocumentValues>({});

  const selectedTemplate = useMemo(() => templates.find(t => t.id === selectedId)?.json_schema || null, [templates, selectedId]);

  const handleSelect = useCallback(
    (id: number | null) => {
      setSelectedId(id);
      const tmpl = templates.find(t => t.id === id)?.json_schema;

      if (!tmpl) {
        setValues({});
        return;
      }

      const initialValues: DocumentValues = {};

      tmpl.elements.forEach(el => {
        if (el.type === "textarea") {
          initialValues[el.id] = "";
        }

        if (el.type === "signature") {
          initialValues[el.id] = el.value?.length
            ? el.value.map((r): Recipient => ({
              id: r.id,
              name: r.name || "",
              email: r.email || "",
              signature: r.signature || null,
            }))
            : [{ id: 0, name: "", email: "", signature: null }];
        }
      });

      setValues(initialValues);
    },
    [templates]
  );

  const handleChange = (id: number, value: FieldValue) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id || !selectedId) return;

    const res = await fetch("/api/documents/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId: selectedId,
        ownerId: user.id,
        title,
        values,
      }),
    });

    const data = await res.json();
    if (data.success) router.push(`/page/documents/${data.data.id}`);
    else console.error("Failed to create document:", data);
  };

  const isReady = !userLoading && !templatesLoading && selectedId !== null;

  return (
    <div className="space-y-6 flex flex-col">

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Document title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-70 bg-gray-100"
        />

        <TemplateSelect
          templates={useMemo(() => templates.map(t => ({ id: t.id, name: t.name })), [templates])}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      {selectedTemplate && (
        <>
          <DynamicForm template={selectedTemplate} values={values} onChange={handleChange} />

          <button
            onClick={handleSubmit}
            disabled={!isReady}
            className="btn mt-2 bg-teal-900 p-2 text-white disabled:opacity-50"
          >
            Create Document
          </button>
        </>
      )}

    </div>
  );
};
