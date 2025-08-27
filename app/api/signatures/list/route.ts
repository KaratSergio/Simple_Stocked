import { NextRequest, NextResponse } from "next/server";
import * as signatureController from "@/server/controllers/signature.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const documentIdParam = searchParams.get("documentId");
        if (!documentIdParam) throw new Error("documentId query required");

        const sigs = await signatureController.listSignatures(Number(documentIdParam));
        return NextResponse.json({ success: true, data: sigs });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
