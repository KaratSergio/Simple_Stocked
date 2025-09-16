"use client";
import { useRef, useState, useEffect } from "react";
import { SignAddProps } from "./types";

export function SignatureAdd({ documentId, recipientId }: SignAddProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(false);
    const [drawing, setDrawing] = useState(false);

    // Setting up the drawing context
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
    }, []);

    // Start drawing
    const handleMouseDown = (e: React.MouseEvent) => {
        setDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    // Drawing
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    // End of drawing
    const handleMouseUp = () => setDrawing(false);
    const handleMouseLeave = () => setDrawing(false);

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleSign = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return alert("Canvas not found");

        const signatureData = canvas.toDataURL();
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
            <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className="border border-black"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            />
            <div className="flex gap-2">
                <button onClick={handleClear} className="btn">
                    Clear
                </button>
                <button
                    onClick={handleSign}
                    disabled={loading}
                    className="btn bg-blue-500 text-white"
                >
                    {loading ? "Signing..." : "Sign Document"}
                </button>
            </div>
        </div>
    );
}
