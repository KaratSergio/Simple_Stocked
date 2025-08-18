'use client';
import { apiFetch } from '@/api/auth/refresh/refresh';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Document {
    id: number;
    title: string;
    fileUrl: string;
}

export default function DocumentViewPage() {
    const params = useParams();
    const [doc, setDoc] = useState<Document | null>(null);

    useEffect(() => {
        async function fetchDoc() {
            const res = await apiFetch(`/api/documents/${params.id}`);
            const data = await res?.json();
            setDoc(data);
        }
        fetchDoc();
    }, [params.id]);

    if (!doc) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{doc.title}</h2>
            <p>
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Open document
                </a>
            </p>
        </div>
    );
}
