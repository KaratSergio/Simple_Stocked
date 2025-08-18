import { useState } from 'react';

export default function Uploader({ onUploaded }: { onUploaded: (url: string) => void }) {
    const [loading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();

            if (data.fileUrl) {
                setFileUrl(data.fileUrl);
                onUploaded(data.fileUrl);
            } else {
                alert(data.error || 'Upload failed');
                setFileUrl(null);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleUpload} />
            {loading && <p>Uploading...</p>}
        </div>
    );
}
