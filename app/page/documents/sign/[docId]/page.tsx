"use client";
import { useState } from "react";
import { SignatureAdd } from "@/components/signatures";

export default function SignPage({ params }: { params: { docId: string } }) {
    const [signature, setSignature] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!signature) return alert("Please sign before submitting");

        setLoading(true);
        try {
            const res = await fetch(`/api/sign/${params.docId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ signature }),
            });

            if (!res.ok) throw new Error("Failed to submit signature");
            alert("Signature saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Error while saving signature");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Sign Document {params.docId}</h1>

            {/* Canvas for signature */}
            <SignatureAdd onChange={setSignature} />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? "Submitting..." : "Submit Signature"}
            </button>
        </div>
    );
}
