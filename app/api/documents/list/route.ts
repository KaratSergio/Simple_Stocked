import { NextRequest, NextResponse } from "next/server";
import * as documentController from "@/server/controllers/document.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const ownerIdParam = searchParams.get("ownerId");
        if (!ownerIdParam) throw new Error("ownerId query required");

        const docs = await documentController.listDocuments(Number(ownerIdParam));
        return NextResponse.json({ success: true, data: docs });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
