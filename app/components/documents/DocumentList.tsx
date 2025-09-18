'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { extractDate } from '@/app/shared/utils';
import { StatusBadge } from '../Badge';
import { useUser } from "@/app/shared/hooks/useUser";

export const DocumentList = () => {
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const router = useRouter();

    const { data: user } = useUser();

    console.log('====================================');
    console.log('user', user);
    console.log('====================================');

    const fetchDocuments = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/documents/list?ownerId=${user.id}`);
            const data = await res.json();
            if (data.success) setDocuments(data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { void fetchDocuments() }, [user?.id]);

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
