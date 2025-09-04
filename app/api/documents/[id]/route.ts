import { NextRequest, NextResponse } from "next/server";
import * as documentController from "@/server/controllers/document.controller";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        if (!id) return NextResponse.json({ error: "Document ID required" }, { status: 400 });

        const doc = await documentController.getDocument(id);
        if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json({ success: true, data: doc });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
