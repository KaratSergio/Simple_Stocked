import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function POST(req: NextRequest) {
    try {
        const { documentId, email } = await req.json();
        const recipient = await recipientController.addRecipient(documentId, email);
        return NextResponse.json({ success: true, data: recipient });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
