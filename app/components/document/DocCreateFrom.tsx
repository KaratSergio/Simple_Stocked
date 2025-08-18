'use client';
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import { apiFetch } from '@/api/auth/refresh/refresh';

export default function DocCreateForm({ onDone, onCancel }: { onDone?: () => void; onCancel?: () => void }) {
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
            onDone?.();
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

            <div className="flex gap-2">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Submit
                </button>

                <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
