import { NextResponse } from "next/server";

export function setAuthCookies(res: NextResponse, accessToken: string, refreshToken: string) {
    // access token 
    res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 15 * 60, // 15min
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    // refresh token 
    res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7d
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });
}
