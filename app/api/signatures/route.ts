import { redis } from '@/server/config/redis.config';

export async function GET() {
  await redis.set('hello', 'world', { ex: 60 });
  const value = await redis.get('hello');
  return Response.json({ value });
}