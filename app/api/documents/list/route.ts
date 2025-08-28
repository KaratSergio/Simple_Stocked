import { NextRequest, NextResponse } from "next/server";
import * as documentController from "@/server/controllers/document.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const ownerIdParam = searchParams.get("ownerId");
        if (!ownerIdParam) {
            return NextResponse.json(
                { success: false, error: "ownerId query required" },
                { status: 400 }
            );
        }

        const docs = await documentController.listDocuments(Number(ownerIdParam));
        return NextResponse.json({ success: true, data: docs }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
