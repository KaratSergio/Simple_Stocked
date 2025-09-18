import { NextRequest, NextResponse } from "next/server";
import * as userController from "@/server/controllers/user.controller";

export async function GET(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get("refreshToken")?.value;
        if (!refreshToken) return NextResponse.json({ error: "No refresh token" }, { status: 401 });

        const user = await userController.getUser(refreshToken);

        return NextResponse.json(user);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}
