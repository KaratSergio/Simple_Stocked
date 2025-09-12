"use client";
import { useState, useEffect } from "react";
import { Recipient } from "./types";

export const RecipientAdd = ({ documentId }: { documentId: string }) => {
    const [recipients, setRecipients] = useState<Recipient[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch all recipients of this document
    useEffect(() => {
        fetch(`/api/recipients/list?documentId=${documentId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setRecipients(data.data);
            });
    }, [documentId]);

    // Handle input change for a recipient email
    const handleChangeEmail = (id: string, email: string) => {
        setRecipients((prev) =>
            prev.map((r) => (r.id === id ? { ...r, email } : r))
        );
    };

    // Send invite to a single recipient
    const sendInviteToRecipient = async (recipient: Recipient) => {
        if (!recipient.email.trim()) return alert(`Please enter email for ${recipient.name}`);

        try {
            // Update recipient email in database
            await fetch(`/api/recipients/update-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipientId: recipient.id, email: recipient.email }),
            });

            // Send invite email
            await fetch(`/api/recipients/invite`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ documentId, recipientId: recipient.id }),
            });

            alert(`Invite sent to ${recipient.email}`);
        } catch (err) {
            console.error(err);
            alert(`Failed to send invite to ${recipient.name}`);
        }
    };

    // Send invites to all recipients
    const sendInviteToAll = async () => {
        setLoading(true);
        for (const r of recipients) {
            await sendInviteToRecipient(r);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-4">

            {recipients.map((r) => (
                <div key={r.id} className="flex items-center gap-2">
                    <span className="w-32">{r.name}</span>
                    <input
                        type="email"
                        value={r.email}
                        placeholder="Enter email"
                        onChange={(e) => handleChangeEmail(r.id, e.target.value)}
                        className="border p-2 flex-1"
                    />
                    <button
                        onClick={() => sendInviteToRecipient(r)}
                        className="btn bg-green-500 text-white py-1 px-3 rounded"
                    >
                        Send Invite
                    </button>
                </div>
            ))}

            {recipients.length > 1 && (
                <button
                    onClick={sendInviteToAll}
                    disabled={loading}
                    className="btn bg-blue-500 text-white py-2 px-4 rounded mt-2"
                >
                    {loading ? "Sending..." : "Send Invites to All"}
                </button>
            )}
        </div>
    );
};
