"use client";
import { useState } from "react";

export const SignatureAdd = ({ documentId, recipientId }: { documentId: number, recipientId: number }) => {
    const [signatureData, setSignatureData] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSign = async () => {
        if (!signatureData) return alert("Draw your signature first");
        setLoading(true);
        try {
            const res = await fetch("/api/signatures/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ documentId, recipientId, signatureData }),
            });
            await res.json();
            alert("Signature saved!");
        } catch (err) {
            console.error(err);
            alert("Failed to sign");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <textarea placeholder="Base64 signature" value={signatureData} onChange={(e) => setSignatureData(e.target.value)} className="border p-2 w-full" />
            <button onClick={handleSign} disabled={loading} className="btn">{loading ? "Signing..." : "Sign Document"}</button>
        </div>
    );
};
