'use client';

import { useRouter } from 'next/navigation';
import { formatDate } from '@/app/shared/utils';
import { useDocuments } from '@/app/shared/hooks/useDocuments';
import { Document } from './types';
import { StatusBadge } from '../Badge';

export const DocumentList = () => {
    const router = useRouter();
    const { data: documents = [], isLoading } = useDocuments();

    if (isLoading) return <p>Loading documents...</p>;
    if (!documents.length) return <p>No documents found.</p>;

    return (
        <ul>
            {documents.map((d: Document) => (
                <li
                    key={d.id}
                    onClick={() => router.push(`/page/documents/${d.id}`)}
                    className="flex gap-4 cursor-pointer p-1 hover:bg-gray-100"
                >
                    <span>{formatDate(d.created_at)}</span>
                    <StatusBadge status={d.status} />
                    <span>{d.title}</span>
                </li>
            ))}
        </ul>
    );
};
