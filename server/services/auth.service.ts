import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
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

// Generate raw token
export function generateRawRefreshToken() {
  return randomBytes(40).toString("hex");
}

// Hashing the token for storage in the DB
export async function hashRefreshToken(rawToken: string) {
  return await argon2.hash(rawToken, { type: argon2.argon2id });
}

// JWT inside refresh token
export function generateRefreshJWT(userId: number) {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });
}

// Checking the JWT refresh tokenа
export function verifyRefreshJWT(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: number };
  } catch {
    return null;
  }
}

// ---------------- OPERATIONS ----------------

// Issue new tokens
export async function issueTokens(userId: number, deviceInfo?: string, ip?: string) {
  const accessToken = generateAccessToken(userId);
  const rawRefresh = generateRawRefreshToken();
  const refreshHash = await hashRefreshToken(rawRefresh);

  const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
  await refreshRepo.storeRefreshToken(userId, refreshHash, expiresAt, deviceInfo, ip);

  // We give the client a raw token, and the hash is stored in the DB
  return { accessToken, refreshToken: rawRefresh };
}

// Rotate refresh token
export async function rotateRefreshToken(userId: number, oldRawRefresh: string, deviceInfo?: string, ip?: string) {
  const allTokens = await refreshRepo.getAllTokensByUser(userId);

  const matched = allTokens.find(
    t => !t.revoked && new Date(t.expires_at) > new Date() && argon2.verify(t.token_hash, oldRawRefresh)
  );

  if (!matched) throw new Error("Invalid or expired refresh token");

  await refreshRepo.revokeRefreshTokenByHash(matched.token_hash);

  return issueTokens(userId, deviceInfo, ip);
}

// Revoke single refresh token
export async function revokeRefreshToken(userId: number, rawToken: string) {
  const allTokens = await refreshRepo.getAllTokensByUser(userId);
  const matched = await Promise.all(
    allTokens.map(async t => (await argon2.verify(t.token_hash, rawToken)) ? t : null)
  ).then(r => r.find(Boolean));

  if (!matched) throw new Error("Refresh token not found");

  return refreshRepo.revokeRefreshTokenByHash(matched.token_hash);
}

// Revoke all tokens for user
export async function revokeAllUserTokens(userId: number) {
  return refreshRepo.revokeAllTokensForUser(userId);
}

// Cleanup expired tokens
export async function deleteExpiredTokens() {
  return refreshRepo.deleteExpiredTokens();
}
