import { NextRequest, NextResponse } from "next/server";
import * as documentController from "@/server/controllers/document.controller";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const idParam = searchParams.get("id");
        if (!idParam) return NextResponse.json({ error: "Document ID required" }, { status: 400 });

        const id = Number(idParam);
        const doc = await documentController.getDocument(id);
        if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json(doc, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
