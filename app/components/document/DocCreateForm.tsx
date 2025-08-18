'use client';
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import { FormButtons } from '../FormButtons';
import { apiFetch } from '@/api/auth/refresh/refresh';

export default function DocCreateForm({ onCancel }: { onCancel?: () => void }) {
    const [title, setTitle] = useState('');
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim()) return setError('Title is required');
        if (!fileUrl) return setError('File is required');

        setLoading(true);
        try {
            const res = await apiFetch('/api/documents/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, fileUrl }),
            });

            const doc = await res?.json();
            alert(`Document created with ID: ${doc.id}`);

            setTitle('');
            setFileUrl(null);
            onCancel?.();
        } catch (err) {
            console.error(err);
            setError('Failed to create document');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError(null);
                    }}
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Enter document title"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <Uploader onUploaded={(url) => setFileUrl(url)} />

            <FormButtons
                submitText="Submit"
                onCancel={onCancel}
                loading={loading}
                submitColor="blue"
            />
        </div>
    );
}
