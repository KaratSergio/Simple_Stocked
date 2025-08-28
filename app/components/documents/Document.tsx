'use client';
import { useState, useEffect } from "react";

interface Document {
    id: string;
    title: string;
    values: Record<string, any>;
}

export const Document = ({ documentId }: { documentId: string }) => {
    const [document, setDocument] = useState<Document | null>(null);

    useEffect(() => {
        fetch(`/api/documents/${documentId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setDocument(data.data);
            });
    }, [documentId]);

    if (!document) return <p>Loading...</p>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{document.title}</h1>
            <pre className="border p-4 bg-gray-50">{JSON.stringify(document.values, null, 2)}</pre>
        </div>
    );
}
