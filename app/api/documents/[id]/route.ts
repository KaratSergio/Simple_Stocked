import { NextRequest, NextResponse } from "next/server";
import { documentService } from "@/server/services/document.service";
import { getUserIdFromRequest } from "@/server/utils/jwt";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const userId = getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const doc = await documentService.get(params.id);

    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (doc.owner_id !== userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    return NextResponse.json(doc);
}
