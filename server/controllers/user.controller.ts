import * as userService from "@/server/services/user.service";
import * as authService from "@/server/services/auth.service";
import { validateRegistration, validateLogin, userExists } from "@/server/utils/validators";
import type { RegistrationDTO, LoginDTO, UserWithTokens, User } from "@/server/types/user.types";
import { logAuthEvent } from "@/server/utils/logAuth";

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

  await logAuthEvent("register", newUser.id, { ip, deviceInfo });

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

  if (!user) {
    await logAuthEvent("failed_login", null, { ip, deviceInfo });
    throw new Error("Invalid email or password");
  }

  await logAuthEvent("login", user.id, { ip, deviceInfo });

  const tokens = await authService.issueTokens(user.id, deviceInfo, ip);
  return { ...user, ...tokens };
}

/**
 * Logout: revoke refresh token
 */
export async function logout(userId: number, rawRefreshToken: string, deviceInfo?: string, ip?: string) {
  try {
    await authService.revokeRefreshToken(userId, rawRefreshToken);
    await logAuthEvent("logout", userId, { ip, deviceInfo });
    return { success: true };
  } catch (err) {
    await logAuthEvent("failed_logout", userId, { ip, deviceInfo });
    throw err;
  }
}

/**
 * Refresh: rotate refresh token
 */
export async function refresh(oldRefreshToken: string, deviceInfo?: string, ip?: string) {
  const payload = authService.verifyRefreshJWT(oldRefreshToken);

  if (!payload?.userId) {
    await logAuthEvent("failed_refresh", null, { ip, deviceInfo });
    throw new Error("Invalid refresh token");
  }

  await logAuthEvent("refresh", payload.userId, { ip, deviceInfo });

  return authService.rotateRefreshToken(payload.userId, oldRefreshToken, deviceInfo, ip);
}

export async function getUser(accessToken: string): Promise<User> {
  const payload = authService.verifyAccessJWT(accessToken);
  if (!payload?.userId) throw new Error("Invalid or missing token");

  const user = await userService.getUser(payload.userId);
  if (!user) throw new Error("User not found");

  // await logAuthEvent("get_user", user.id, {});
  return user;
}
