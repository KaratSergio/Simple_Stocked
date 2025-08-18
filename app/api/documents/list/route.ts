import { NextRequest, NextResponse } from "next/server";
import { documentService } from "@/server/services/document.service";
import { getUserIdFromRequest } from "@/server/utils/jwt";

export async function GET(req: NextRequest) {
    const userId = getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const docs = await documentService.list(userId);
        return NextResponse.json(docs);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
