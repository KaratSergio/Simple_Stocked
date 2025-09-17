import jwt from "jsonwebtoken";
import argon2 from "argon2";
import * as refreshRepo from "@/server/data/repo/refresh.token.repository";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES_DAYS = 7;

// ---------------- ACCESS ----------------

export function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}

// ---------------- REFRESH ----------------

export function generateRefreshToken(userId: number) {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });
}

export async function hashRefreshToken(rawToken: string) {
  return await argon2.hash(rawToken, { type: argon2.argon2id });
}

export function verifyRefreshJWT(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: number };
  } catch (err) {
    return null;
  }
}

// ---------------- OPERATIONS ----------------

export async function issueTokens(userId: number, deviceInfo?: string, ip?: string) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  const refreshHash = await hashRefreshToken(refreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

  await refreshRepo.storeRefreshToken(userId, refreshHash, expiresAt, deviceInfo, ip);

  return { accessToken, refreshToken };
}


export async function rotateRefreshToken(userId: number, oldRawRefresh: string, deviceInfo?: string, ip?: string) {
  const allTokens = await refreshRepo.getAllTokensByUser(userId);

  const matched = await Promise.all(
    allTokens.map(async t => (t.revoked || new Date(t.expires_at) <= new Date()) ? null :
      await argon2.verify(t.token_hash, oldRawRefresh).then(ok => ok ? t : null)
    )
  ).then(r => r.find(Boolean));

  if (!matched) throw new Error("Refresh token revoked or expired");

  await refreshRepo.revokeRefreshTokenByHash(matched.token_hash);

  return issueTokens(userId, deviceInfo, ip);
}

export async function revokeRefreshToken(userId: number, rawToken: string) {
  const allTokens = await refreshRepo.getAllTokensByUser(userId);

  const matched = await Promise.all(
    allTokens.map(async t => (await argon2.verify(t.token_hash, rawToken).catch(() => false)) ? t : null)
  ).then(r => r.find(Boolean));

  if (!matched) throw new Error("Refresh token not found");

  return refreshRepo.revokeRefreshTokenByHash(matched.token_hash);
}

export async function revokeAllUserTokens(userId: number) {
  return refreshRepo.revokeAllTokensForUser(userId);
}

export async function deleteExpiredTokens() {
  return refreshRepo.deleteExpiredTokens();
}

// ---------------- VERIFY ACCESS ----------------

export function verifyAccessJWT(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, ACCESS_SECRET) as { userId: number };
  } catch (err) {
    return null;
  }
}
