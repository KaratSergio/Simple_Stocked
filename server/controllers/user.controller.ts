import * as userService from "@/server/services/user.service";
import * as authService from "@/server/services/auth.service";
import { validateRegistration, validateLogin, userExists } from "@/server/utils/validators";
import type { RegistrationDTO, LoginDTO, UserWithTokens } from "@/server/types/user.types";

/**
 * Registration: create user + issue tokens
 */
export async function register(
  reqBody: RegistrationDTO,
  deviceInfo?: string,
  ip?: string
): Promise<UserWithTokens> {
  validateRegistration(reqBody);
  await userExists(reqBody.email);

  const newUser = await userService.registerUser(reqBody);
  const tokens = await authService.issueTokens(newUser.id, deviceInfo, ip);

  return { ...newUser, ...tokens };
}

/**
 * Login: check password + issue tokens
 */
export async function login(
  reqBody: LoginDTO,
  deviceInfo?: string,
  ip?: string
): Promise<UserWithTokens> {
  validateLogin(reqBody);

  const user = await userService.loginUser(reqBody);
  if (!user) throw new Error("Invalid email or password");

  const tokens = await authService.issueTokens(user.id, deviceInfo, ip);
  return { ...user, ...tokens };
}

/**
 * Logout: revoke refresh token
 */
export async function logout(userId: number, rawRefreshToken: string) {
  await authService.revokeRefreshToken(userId, rawRefreshToken);
  return { success: true };
}

/**
 * Refresh: rotate refresh token
 */
export async function refresh(oldRefreshToken: string, deviceInfo?: string, ip?: string) {
  const payload = authService.verifyRefreshJWT(oldRefreshToken);
  if (!payload?.userId) throw new Error("Invalid refresh token");

  return authService.rotateRefreshToken(payload.userId, oldRefreshToken, deviceInfo, ip);
}

