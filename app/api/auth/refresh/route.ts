import { NextRequest, NextResponse } from "next/server";
import * as userController from "@/server/controllers/user.controller";
import { setAuthCookies } from "@/server/utils/cookies";
import { getRequestInfo } from "@/server/utils/requestInfo";

export async function POST(req: NextRequest) {
  const oldRefreshToken = req.cookies.get("refreshToken")?.value;

  console.log('res', oldRefreshToken)

  if (!oldRefreshToken) return NextResponse.json({ error: "No refresh token provided" }, { status: 401 });

  const { ip, deviceInfo } = getRequestInfo(req);

  try {
    const tokens = await userController.refresh(oldRefreshToken, deviceInfo, ip);

    const res = NextResponse.json({ ok: true });
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

