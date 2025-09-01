import * as authLogRepo from "@/server/data/repo/auth.log.repository";

export async function logAuthEvent(
  event: string,
  userId?: number | null,
  extra?: { ip?: string; deviceInfo?: string }
) {
  const timestamp = new Date().toISOString();
  console.log(`[AUTH][${timestamp}] ${event}${userId ? `: user ${userId}` : ""}`, extra ?? {});

  // сохраняем в БД
  await authLogRepo.createAuthLog(userId ?? null, event, extra?.ip, extra?.deviceInfo);
}
