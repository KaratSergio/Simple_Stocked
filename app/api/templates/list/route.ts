import { NextResponse } from "next/server";
import * as templateController from "@/server/controllers/template.controller";

export async function GET() {
    try {
        const list = await templateController.listTemplates();

        return NextResponse.json({ success: true, data: list });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
