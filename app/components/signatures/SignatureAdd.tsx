"use client";
import { useRef, useState } from "react";

interface Props {
    documentId: number;
    recipientId: number;
}

export default function SignatureAdd({ documentId, recipientId }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(false);

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleSign = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return alert("Canvas not found");

        const signatureData = canvas.toDataURL(); // base64
        if (!signatureData) return alert("Draw your signature first");

        setLoading(true);
        try {
            const res = await fetch("/api/signatures/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ documentId, recipientId, signatureData }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Failed to sign");

            alert("Signature saved!");
            handleClear();
        } catch (err) {
            console.error(err);
            alert("Failed to save signature");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <canvas ref={canvasRef} width={400} height={200} className="border" />
            <div className="flex gap-2">
                <button onClick={handleClear} className="btn">Clear</button>
                <button onClick={handleSign} disabled={loading} className="btn bg-blue-500 text-white">
                    {loading ? "Signing..." : "Sign Document"}
                </button>
            </div>
        </div>
    );
}
