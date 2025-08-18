'use client'
import { useState } from "react";
import Uploader from "@/components/Uploader";

export default function DashboardPage() {
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

    const handleUploaded = async (fileUrl: string) => {
        setUploadedFileUrl(fileUrl);
        const title = "My PDF Document";

        const res = await fetch("/api/documents/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, fileUrl }),
        });

        if (!res.ok) {
            alert("Error creating document");
            return;
        }

        const doc = await res.json();
        alert(`Document created with ID: ${doc.id}`);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <p>Here you see your recent activity and stats.</p>

            <Uploader onUploaded={handleUploaded} />
        </div>
    );
}
