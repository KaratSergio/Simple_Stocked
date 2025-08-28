'use client';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DocumentListProps {
    ownerId: number;
    documents: any[];
    onDocumentsChange: (docs: any[]) => void; // for refresh list
}

export const DocumentList: FC<DocumentListProps> = ({ ownerId, documents, onDocumentsChange }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/documents/list?ownerId=${ownerId}`);
            const data = await res.json();
            if (data.success) onDocumentsChange(data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDocuments() }, [ownerId]);

    if (loading) return <p>Loading documents...</p>;
    if (!documents.length) return <p>No documents found.</p>;

    return (
        <ul>
            {documents.map(d => (
                <li
                    key={d.id}
                    onClick={() => router.push(`/private/documents/${d.id}`)}
                    className="cursor-pointer p-1 hover:bg-gray-200"
                >
                    {d.name || d.id}
                </li>
            ))}
        </ul>
    );
};
