import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function POST(req: NextRequest) {
    try {
        const { documentId, email } = await req.json();

        if (!documentId || !email) throw new Error("documentId and email are required");

        const recipient = await recipientController.addRecipient(documentId, email);

        return NextResponse.json({ success: true, data: recipient });
    } catch (err: any) {
        console.error("Add recipient error:", err);
        return NextResponse.json({ success: false, error: err.message });
    }
}
