'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Document {
    id: number;
    title: string;
}

export default function DocumentsPage() {
    const [docs, setDocs] = useState<Document[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDocs() {
            try {
                const res = await fetch('/api/documents/list', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!res.ok) {
                    setError(`Ошибка: ${res.status}`);
                    return;
                }
                const data = await res.json();
                setDocs(data);
            } catch (err: any) {
                setError(err.message || 'Ошибка запроса');
            }
        }
        fetchDocs();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <ul className="space-y-2">
                {docs.map(doc => (
                    <li key={doc.id} className="p-2 bg-white rounded shadow hover:bg-gray-100 transition">
                        <Link href={`/private/documents/${doc.id}`}>
                            {doc.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
