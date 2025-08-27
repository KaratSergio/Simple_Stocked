'use client';
import { useState } from "react";

interface TemplateCreateProps {
    onCreate: (template: any) => void;
}

export const TemplateCreate: React.FC<TemplateCreateProps> = ({ onCreate }) => {
    const [name, setName] = useState("");
    const [jsonSchema, setJsonSchema] = useState("{}");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/templates/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, json_schema: JSON.parse(jsonSchema) }),
            });
            const data = await res.json();
            if (data.success) onCreate(data.data);
        } catch (err) {
            console.error(err);
            alert("Failed to create template");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Template name" className="border p-2 w-full" />
            <textarea value={jsonSchema} onChange={e => setJsonSchema(e.target.value)} rows={6} className="border p-2 w-full" />
            <button onClick={handleCreate} disabled={loading} className="btn">{loading ? "Creating..." : "Create Template"}</button>
        </div>
    );
};
