'use client';
import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import { apiFetch } from '@/api/auth/refresh/refresh';
import DocumentUploaderForm from '@/components/document/DocCreateFrom';

type Document = {
    id: number;
    title: string;
    status: string;
    createdAt: string;
};

type PendingSignature = {
    id: number;
    email: string;
    documentTitle: string;
    invitedAt: string;
};

export default function DashboardPage() {
    const [recentDocs, setRecentDocs] = useState<Document[]>([]);
    const [pendingSignatures, setPendingSignatures] = useState<PendingSignature[]>([]);
    const [loadingDocs, setLoadingDocs] = useState(true);
    const [loadingSignatures, setLoadingSignatures] = useState(true);

    const { openModal, closeModal } = useModalStore();

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await apiFetch('/api/documents/list');
                const data = await res?.json();
                setRecentDocs(data);
            } catch (e) {
                console.error('Failed to fetch documents', e);
            } finally {
                setLoadingDocs(false);
            }
        };

        const fetchPending = async () => {
            try {
                const fakeData: PendingSignature[] = [
                    {
                        id: 1,
                        email: 'john@example.com',
                        documentTitle: 'Contract #123',
                        invitedAt: '2025-08-15',
                    },
                    {
                        id: 2,
                        email: 'sarah@example.com',
                        documentTitle: 'NDA #77',
                        invitedAt: '2025-08-16',
                    },
                ];
                setPendingSignatures(fakeData);
            } catch (e) {
                console.error('Failed to fetch pending signatures', e);
            } finally {
                setLoadingSignatures(false);
            }
        };

        fetchDocs();
        fetchPending();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Dashboard</h2>

            {/* Quick Actions */}
            <section>
                <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                <div className="flex gap-3">
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() =>
                            openModal(<DocumentUploaderForm onDone={closeModal} />)
                        }
                    >
                        Upload Document
                    </button>

                    <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                        Invite to Sign
                    </button>
                </div>
            </section>

            {/* Recent Documents */}
            <section>
                <h3 className="text-lg font-medium mb-2">Recent Documents</h3>
                {loadingDocs ? (
                    <p>Loading...</p>
                ) : recentDocs.length === 0 ? (
                    <p className="text-gray-500">No documents yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-200 bg-white rounded shadow">
                        {recentDocs.map((doc) => (
                            <li key={doc.id} className="p-3 flex justify-between">
                                <span>{doc.title}</span>
                                <span
                                    className={`px-2 py-1 text-sm rounded ${doc.status === 'signed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                >
                                    {doc.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Pending Signatures */}
            <section>
                <h3 className="text-lg font-medium mb-2">Pending Signatures</h3>
                {loadingSignatures ? (
                    <p>Loading...</p>
                ) : pendingSignatures.length === 0 ? (
                    <p className="text-gray-500">No pending signatures.</p>
                ) : (
                    <ul className="divide-y divide-gray-200 bg-white rounded shadow">
                        {pendingSignatures.map((sig) => (
                            <li key={sig.id} className="p-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{sig.email}</p>
                                        <p className="text-sm text-gray-500">
                                            Document: {sig.documentTitle}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        Invited: {sig.invitedAt}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
