import { NextRequest, NextResponse } from "next/server";
import * as userController from "@/server/controllers/user.controller";
import { setAuthCookies } from "@/server/utils/cookies";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await userController.register(body, req.headers.get("user-agent") || undefined, req.ip);

    const res = NextResponse.json({ userId: user.id, name: user.name, email: user.email }, { status: 201 });
    setAuthCookies(res, user.accessToken, user.refreshToken);
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

