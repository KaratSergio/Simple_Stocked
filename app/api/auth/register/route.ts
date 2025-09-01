import { NextRequest, NextResponse } from "next/server";
import * as userController from "@/server/controllers/user.controller";
import { setAuthCookies } from "@/server/utils/cookies";
import { getRequestInfo } from "@/server/utils/requestInfo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ip, deviceInfo } = getRequestInfo(req);

    const user = await userController.register(body, deviceInfo, ip);

    const res = NextResponse.json({ userId: user.id, name: user.name, email: user.email }, { status: 201 });
    setAuthCookies(res, user.accessToken, user.refreshToken);
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}


