import { NextRequest, NextResponse } from "next/server";
import * as userController from "@/server/controllers/user.controller";
import { setAuthCookies } from "@/server/utils/cookies";
import { getRequestInfo } from "@/server/utils/requestInfo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ip, deviceInfo } = getRequestInfo(req);

    const user = await userController.login(body, deviceInfo, ip);

    const response = NextResponse.json({ id: user.id, name: user.name, email: user.email });

    setAuthCookies(response, user.accessToken, user.refreshToken);

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
