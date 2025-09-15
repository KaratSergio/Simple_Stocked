'use client'
import { useState, useEffect } from "react";
import { Recipient } from "../recipients/types";

interface Props {
    elementId: string;
    values: Recipient[];
    onChange: (elId: string, newRecipients: Recipient[]) => void;
}

export const RecipientSelect = ({ elementId, values, onChange }: Props) => {
    const [allRecipients, setAllRecipients] = useState<Recipient[]>([]);
    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        fetch("/api/recipients/list")
            .then(res => res.json())
            .then(data => {
                if (data.success) setAllRecipients(data.data);
            });
    }, []);

    const handleAddExisting = (recipient: Recipient) => {
        if (!values.find(r => r.id === recipient.id)) {
            onChange(elementId, [...values, recipient]);
        }
    };

    const handleCreateNew = async () => {
        if (!newName) return;
        setLoading(true);
        const res = await fetch("/api/recipients/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, email: "" }),
        });
        const data = await res.json();
        if (data.success) {
            onChange(elementId, [...values, data.data]);
            setNewName("");
            setAllRecipients(prev => [...prev, data.data]);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-2">
            <p>Recipients:</p>
            {values.map(r => (
                <div key={r.id} className="flex gap-2 items-center">
                    <span>{r.name}</span>
                </div>
            ))}

            <select
                onChange={e => {
                    const recipient = allRecipients.find(r => r.id === Number(e.target.value));
                    if (recipient) handleAddExisting(recipient);
                }}
                value=""
                className="border p-1"
            >
                <option value="">-- Select existing --</option>
                {allRecipients.map(r => (
                    <option key={r.id} value={r.id}>
                        {r.name}
                    </option>
                ))}
            </select>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="New recipient name"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="border p-1 flex-1"
                />
                <button onClick={handleCreateNew} disabled={loading} className="btn">
                    Add
                </button>
            </div>
        </div>
    );
};
