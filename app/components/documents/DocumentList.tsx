'use client';
import { useState, useEffect } from 'react';

interface DocumentListProps {
    documents: any[];
    ownerId: number;
    onSelect: (doc: any) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents, ownerId, onSelect }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/documents/list?ownerId=${ownerId}`)
            .then(res => res.json())
            .then(data => { if (data.success) onSelect?.(data.data[0]) })
            .finally(() => setLoading(false));
    }, [ownerId, onSelect]);

    if (loading) return <p>Loading documents...</p>;
    if (!documents.length) return <p>No documents found.</p>;

    return (
        <ul>
            {documents.map(d => (
                <li key={d.id} onClick={() => onSelect(d)} className="cursor-pointer p-1 hover:bg-gray-200">
                    {d.title || d.id}
                </li>
            ))}
        </ul>
    );
};

