'use client';
import { apiFetch } from '@/api/auth/refresh/refresh';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignPage() {
    const searchParams = useSearchParams();
    const documentId = searchParams?.get('doc');
    // const signatureId = searchParams?.get('signatureId'); 
    const [document, setDocument] = useState<any>(null);

    useEffect(() => {
        if (!documentId) return;
        apiFetch(`/api/documents/${documentId}`)
            .then(res => res?.json())
            .then(setDocument)
            .catch(console.error);
    }, [documentId]);

    if (!document) return <div>Loading document...</div>;

    return (
        <div>
            <h1>Sign Document #{documentId}</h1>
            <pre>{JSON.stringify(document, null, 2)}</pre>  {/* тут делаем рендер пдф + электронная подпись  */}
            {/* Здесь кнопка "Подписать", которая POST /api/signatures/sign */}
        </div>
    );
}
