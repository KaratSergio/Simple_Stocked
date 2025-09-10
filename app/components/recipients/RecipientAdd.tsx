"use client";
import { useState } from "react";

export const RecipientAdd = ({ documentId }: { documentId: string }) => {
    const [emails, setEmails] = useState("");
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState<string[]>([]);

    const handleSend = async () => {
        if (!emails.trim()) return alert("Enter at least one email");

        // Split the string by space, comma or semicolon
        const emailList = emails
            .split(/[\s,;]+/)
            .map(e => e.trim())
            .filter(e => e);

        setLoading(true);

        try {
            const addedRecipients: string[] = [];

            for (const email of emailList) {
                const res = await fetch("/api/recipients/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ documentId, email }),
                });
                const data = await res.json();
                if (data.success) addedRecipients.push(data.data.email);
            }

            setAdded(addedRecipients);
            alert("Recipients added: " + addedRecipients.join(", "));
            setEmails("");
        } catch (err) {
            console.error(err);
            alert("Failed to add recipients");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <textarea
                value={emails}
                onChange={e => setEmails(e.target.value)}
                placeholder="Enter emails separated by space, comma or semicolon"
                className="border p-2 h-24"
            />
            <button
                onClick={handleSend}
                disabled={loading}
                className="btn bg-blue-500 text-white py-2 px-4 rounded"
            >
                {loading ? "Adding..." : "Send for signature"}
            </button>

            {added.length > 0 && (
                <div className="mt-2">
                    <h3 className="font-semibold">Added recipients:</h3>
                    <ul className="list-disc pl-5">
                        {added.map(email => (
                            <li key={email}>{email}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
