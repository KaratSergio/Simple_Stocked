import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { documentId, recipientId } = body;

        if (!documentId || !recipientId) {
            return NextResponse.json({ success: false, error: "documentId and recipientId are required" }, { status: 400 });
        }

        await recipientController.inviteRecipient(recipientId, documentId);
        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Send invite error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
