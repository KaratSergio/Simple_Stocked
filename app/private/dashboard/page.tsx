'use client'
import { useState } from 'react';
import Uploader from "@/components/Uploader";
import { createDocument } from '@/api/documents/create/document';

export default function DashboardPage() {
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

    const handleUploaded = async (fileUrl: string) => {
        setUploadedFileUrl(fileUrl);


        const ownerId = "1";
        const title = "My PDF Document";
        const doc = await createDocument(ownerId, title, fileUrl);

        alert(`doc create with ID: ${doc.id}`);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <p>Here you see your recent activity and stats.</p>

            <Uploader onUploaded={handleUploaded} />
        </div>
    );
}
