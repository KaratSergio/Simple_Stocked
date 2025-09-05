'use client';
import { useState, useEffect } from "react";

interface DocumentType {
    id: string;
    title: string;
    pdf_generated: string;
}

interface DocumentProps {
    documentId: string;
}

export const Document = ({ documentId }: DocumentProps) => {
    const [document, setDocument] = useState<DocumentType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/documents/${documentId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setDocument(data.data);
            })
            .finally(() => setLoading(false));
    }, [documentId]);

    if (loading) return <p>Loading PDF...</p>;
    if (!document) return <p>Document not found</p>;

    // Public URL for PDF
    const publicPdfUrl = document.pdf_generated.replace(
        process.env.NEXT_PUBLIC_S3_BASE_URL!,
        process.env.NEXT_PUBLIC_S3_PUBLIC_URL!
    );

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">{document.title}</h1>
            <iframe
                src={publicPdfUrl}
                width="900px"
                height="1230px"
                className="border"
            />
        </div>
    )
};
