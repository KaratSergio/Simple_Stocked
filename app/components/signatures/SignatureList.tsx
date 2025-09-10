"use client";
import { useEffect, useState } from "react";

export const SignatureList = ({ documentId }: { documentId: string }) => {
    const [sigs, setSigs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/signatures/list?documentId=${documentId}`)
            .then((res) => res.json())
            .then((res) => setSigs(res.data || []))
            .finally(() => setLoading(false));
    }, [documentId]);

    if (loading) return <p>Loading signatures...</p>;

    return (
        <ul>
            {sigs.map((s) => (
                <li key={s.id}>{s.email} - {s.status}</li>
            ))}
        </ul>
    );
};
