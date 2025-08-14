import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/server/controllers/user.controller';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { email, name, password }
    const user = await register(body);
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
