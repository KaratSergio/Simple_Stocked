import { NextRequest, NextResponse } from "next/server";
import * as recipientController from "@/server/controllers/recipient.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const documentId = searchParams.get("documentId");
        // const ownerId = searchParams.get("ownerId");
        const ownerId = 5

        let recipients;

        if (documentId) {
            // Получаем ресипиентов документа
            recipients = await recipientController.listRecipientsByDocument(documentId);
        } else if (ownerId) {
            // Получаем всех ресипиентов владельца
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
