import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const documentId = searchParams.get("documentId");
        const ownerId = searchParams.get("ownerId");

        let recipients;

        if (documentId) {
            // Get document recipients
            recipients = await recipientController.listRecipientsByDocument(documentId);
        } else if (ownerId) {
            // Get all recipients of the owner
            recipients = await recipientController.listRecipientsByOwner(Number(ownerId));
        } else {
            throw new Error("Either documentId or ownerId query required");
        }

        return NextResponse.json({ success: true, data: recipients });
    } catch (err: any) {
        console.error("List recipients error:", err);
        return NextResponse.json({ success: false, error: err.message });
    }
}
