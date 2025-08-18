import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret";
const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

export function generateAccessToken(payload: object) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}

export function generateRefreshToken(payload: object) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

export function getUserIdFromRequest(req: NextRequest): string | null {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return null;

    try {
        const payload = jwt.verify(token, ACCESS_SECRET) as JwtPayload & { userId: string };
        return payload.userId;
    } catch {
        return null;
    }
}
