import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/server/utils/jwt";
import { setAuthCookies } from "@/server/utils/cookies";

export async function POST(req: NextRequest) {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) return NextResponse.json({ error: "No refresh token" }, { status: 401 });

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
        // if the token is invalid - logout
        return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    const newAccess = generateAccessToken({ userId: payload.userId });
    const newRefresh = generateRefreshToken({ userId: payload.userId });

    const res = NextResponse.json({ ok: true });
    setAuthCookies(res, newAccess, newRefresh);
    return res;
}
