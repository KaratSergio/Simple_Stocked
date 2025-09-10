import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const documentIdParam = searchParams.get("documentId");

        if (!documentIdParam) throw new Error("documentId query required");

        const recipients = await recipientController.listRecipients(Number(documentIdParam));

        return NextResponse.json({ success: true, data: recipients });
    } catch (err: any) {
        console.error("List recipients error:", err);
        return NextResponse.json({ success: false, error: err.message });
    }
}
