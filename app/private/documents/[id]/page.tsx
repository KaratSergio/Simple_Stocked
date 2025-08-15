'use client';
import { useParams } from 'next/navigation';

export default function DocumentViewPage() {
    const params = useParams();
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Viewing Document ID: {params.id}</h2>
            <p>Document content preview goes here...</p>
        </div>
    );
}