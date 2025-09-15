import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, ownerId } = body;

        if (!name || !ownerId) throw new Error("Name and ownerId required");

        const newRecipient = await recipientController.addRecipient(String(ownerId), name);

        return NextResponse.json({ success: true, data: newRecipient });
    } catch (err: any) {
        console.error("Create recipient error:", err);
        return NextResponse.json({ success: false, error: err.message });
    }
}
