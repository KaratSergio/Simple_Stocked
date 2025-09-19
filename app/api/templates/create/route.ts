import { NextRequest, NextResponse } from "next/server";
import * as templateController from "@/server/controllers/template.controller";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = await templateController.createTemplate(body);

        return NextResponse.json({ success: true, data: result });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
