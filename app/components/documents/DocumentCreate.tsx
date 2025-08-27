"use client";
import { useState } from "react";

interface DocumentCreateProps {
    templateId: string;
    onCreate?: (doc: any) => void;
}

export const DocumentCreate: React.FC<DocumentCreateProps> = ({ templateId, onCreate }) => {
    const [values, setValues] = useState("{}");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/documents/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ template_id: templateId, values: JSON.parse(values) }),
            });
            const data = await res.json();
            alert("Document created: " + data.data.id);
            onCreate?.(data.data);
        } catch (err) {
            console.error(err);
            alert("Failed to create document");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <textarea
                value={values}
                onChange={(e) => setValues(e.target.value)}
                rows={6}
                className="border p-2 w-full"
            />
            <button onClick={handleCreate} disabled={loading} className="btn">
                {loading ? "Creating..." : "Create Document"}
            </button>
        </div>
    );
};

