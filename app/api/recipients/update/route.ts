import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { recipientId, email } = body;

        if (!recipientId || !email) {
            return NextResponse.json({ success: false, error: "recipientId and email are required" }, { status: 400 });
        }

        const updatedRecipient = await recipientController.updateRecipient(recipientId, email);
        return NextResponse.json({ success: true, data: updatedRecipient });
    } catch (err: any) {
        console.error("Update recipient email error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}