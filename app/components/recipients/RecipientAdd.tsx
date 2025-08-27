"use client";
import { useState } from "react";

interface RecipientAddProps {
    documentId: number;
    onAdd?: (recipient: any) => void;
}

export const RecipientAdd: React.FC<RecipientAddProps> = ({ documentId, onAdd }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!email.trim()) return alert("Email is required");

        setLoading(true);
        try {
            const res = await fetch("/api/recipients/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ documentId, email }),
            });
            const data = await res.json();
            alert("Recipient added: " + data.data.email);

            onAdd?.(data.data);

            setEmail("");
        } catch (err) {
            console.error(err);
            alert("Failed to add recipient");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex space-x-2">
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Recipient email"
                className="border p-2 flex-1"
            />
            <button onClick={handleAdd} disabled={loading} className="btn">
                {loading ? "Adding..." : "Add"}
            </button>
        </div>
    );
};
