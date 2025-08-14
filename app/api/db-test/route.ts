import { prisma } from '@/lib/db';

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json({ users });
}