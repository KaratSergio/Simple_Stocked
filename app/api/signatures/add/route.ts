import { NextResponse } from "next/server";
import * as signatureController from "@/server/controllers/signature.controller";

export async function POST(req: Request) {
    try {
        const { documentId, recipientId, signatureData } = await req.json();

        if (!documentId || !recipientId || !signatureData) {
            return NextResponse.json(
                { error: "Missing required fields: documentId, recipientId, signatureData" },
                { status: 400 }
            );
        }

        const signature = await signatureController.addSignature(documentId, recipientId, signatureData);

        return NextResponse.json(signature);
    } catch (err: any) {
        console.error("Error saving signature:", err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
