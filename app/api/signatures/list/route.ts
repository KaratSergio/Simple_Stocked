import { NextRequest, NextResponse } from "next/server";
import * as signatureController from "@/server/controllers/signature.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const documentId = searchParams.get("documentId");

        if (!documentId) throw new Error("documentId query required");

        const sigs = await signatureController.listSignatures(documentId);

        return NextResponse.json({ success: true, data: sigs });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
