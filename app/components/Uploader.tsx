import { useState } from 'react';

export default function Uploader({ onUploaded }: { onUploaded: (url: string) => void }) {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        setLoading(false);

        if (data.fileUrl) onUploaded(data.fileUrl);
        else alert(data.error || 'Upload failed');
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleUpload} />
            {loading && <p>Uploading...</p>}
        </div>
    );
}
