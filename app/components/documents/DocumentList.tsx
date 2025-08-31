'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DocumentListProps {
    ownerId: number;
}

export const DocumentList: FC<DocumentListProps> = ({ ownerId }) => {
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const router = useRouter();

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/documents/list?ownerId=${ownerId}`);
            const data = await res.json();
            if (data.success) setDocuments(data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { void fetchDocuments() }, [ownerId]);

    if (loading) return <p>Loading documents...</p>;
    if (!documents.length) return <p>No documents found.</p>;

    return (
        <ul>
            {documents.map(d => (
                <li
                    key={d.id}
                    onClick={() => router.push(`/page/documents/${d.id}`)}
                    className="cursor-pointer p-1 hover:bg-gray-200"
                >
                    {d.name || d.id}
                </li>
            ))}
        </ul>
    );
};
