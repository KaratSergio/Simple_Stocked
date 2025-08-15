'use client';

import Link from 'next/link';

export default function DocumentsPage() {
    const docs = [
        { id: 1, name: 'Contract A' },
        { id: 2, name: 'NDA B' },
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <ul className="space-y-2">
                {docs.map(doc => (
                    <li key={doc.id} className="p-2 bg-white rounded shadow hover:bg-gray-100 transition">
                        <Link href={`/private/documents/${doc.id}`}>
                            {doc.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
