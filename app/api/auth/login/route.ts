import { NextRequest, NextResponse } from 'next/server';
import * as userController from '@/server/controllers/user.controller';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { email, password }
    const user = await userController.login(body);
    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
