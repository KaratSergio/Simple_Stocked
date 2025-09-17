import { NextRequest, NextResponse } from "next/server";
import * as userController from "@/server/controllers/user.controller";

export async function GET(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("accessToken")?.value;

        if (!accessToken) return NextResponse.json({ error: "No access token" }, { status: 401 });

        const user = await userController.getUser(accessToken);

        return NextResponse.json({ id: user.id, name: user.name, email: user.email });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}
