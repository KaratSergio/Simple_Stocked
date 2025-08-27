import { NextRequest, NextResponse } from "next/server";
import * as documentController from "@/server/controllers/document.controller";

export async function POST(req: NextRequest) {
    try {
        const { documentId, status, pdfGenerated } = await req.json();
        const doc = await documentController.updateDocumentStatus(documentId, status, pdfGenerated);
        return NextResponse.json({ success: true, data: doc });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
