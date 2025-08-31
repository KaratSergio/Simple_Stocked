// import { NextRequest } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";
//
// type MyPayload = JwtPayload & { userId: string };
//
// const ACCESS_SECRET = process.env.ACCESS_SECRET!;
// const REFRESH_SECRET = process.env.REFRESH_SECRET!;
// const ACCESS_EXPIRES = "15m";
// const REFRESH_EXPIRES = "7d";
//
// export function generateAccessToken(payload: object) {
//     return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
// }
//
// export function generateRefreshToken(payload: object) {
//     return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
// }
//
// export function verifyRefreshToken(token: string): MyPayload | null {
//     try {
//         const decoded = jwt.verify(token, REFRESH_SECRET);
//         if (typeof decoded === "string") return null;
//         return decoded as MyPayload;
//     } catch {
//         return null;
//     }
// }
//
// export function getUserIdFromRequest(req: NextRequest): string | null {
//     const token = req.cookies.get("accessToken")?.value;
//     if (!token) return null;
//
//     try {
//         const decoded = jwt.verify(token, ACCESS_SECRET);
//         if (typeof decoded === "string") return null;
//         return (decoded as MyPayload).userId;
//     } catch {
//         return null;
//     }
// }
