'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Document {
    id: number;
    name: string;
    values: Record<string, any>;
}

export default function DocumentPage() {
    const params = useParams();
    const [document, setDocument] = useState<Document | null>(null);

    useEffect(() => {
        fetch(`/api/documents/${params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setDocument(data.data);
            });
    }, [params.id]);

    if (!document) return <p>Loading...</p>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{document.name}</h1>
            <pre className="border p-4 bg-gray-50">{JSON.stringify(document.values, null, 2)}</pre>

            {/* Здесь можно добавить редактирование документа или управление ресипиентами */}
        </div>
    );
}
