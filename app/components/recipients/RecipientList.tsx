"use client";
import { useEffect, useState } from "react";

export const RecipientList = ({ documentId }: { documentId: number }) => {
    const [recipients, setRecipients] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/recipients/list?documentId=${documentId}`)
            .then((res) => res.json())
            .then((res) => setRecipients(res.data || []))
            .finally(() => setLoading(false));
    }, [documentId]);

    if (loading) return <p>Loading recipients...</p>;

    return (
        <ul>
            {recipients.map((r) => (
                <li key={r.id}>{r.email} - {r.status}</li>
            ))}
        </ul>
    );
};
