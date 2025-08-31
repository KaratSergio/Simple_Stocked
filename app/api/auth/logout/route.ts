import { NextRequest, NextResponse } from "next/server";
import * as userController from "@/server/controllers/user.controller";
import * as authService from "@/server/services/auth.service";
import { clearAuthCookies } from "@/server/utils/cookies";

export async function POST(req: NextRequest) {
  const rawRefreshToken = req.cookies.get("refreshToken")?.value;
  if (!rawRefreshToken)
    return NextResponse.json({ error: "No refresh token provided" }, { status: 401 });

  const payload = authService.verifyRefreshJWT(rawRefreshToken);
  if (!payload?.userId)
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });

  await userController.logout(payload.userId, rawRefreshToken);

  const res = NextResponse.json({ ok: true });
  clearAuthCookies(res);
  return res;
}
