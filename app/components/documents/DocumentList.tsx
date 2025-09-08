'use client';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentListProps } from './types';
import { extractDate } from '@/app/shared/utils';
import { StatusBadge } from '../Badge';

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
                    className="flex gap-4 cursor-pointer p-1 hover:bg-gray-100"
                >
                    <span className=''>{extractDate(d.created_at)}</span>
                    <StatusBadge status={d.status} />
                    <span>{d.title}</span>
                </li>
            ))}
        </ul>
    );
};
