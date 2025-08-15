import * as userRepo from '@/server/data/repo/user.repository';
import { hashPassword, verifyPassword } from '@/server/utils/password';
import { generateAccessToken, generateRefreshToken } from '@/server/utils/jwt';
import type { RegistrationDTO, LoginDTO, UserWithTokens } from '@/server/types/user.types';

// registration user + hash pass
export async function registerUser({ email, name, password }: RegistrationDTO):
    Promise<UserWithTokens> {
    const passwordHash = await hashPassword(password);
    const user = await userRepo.createUser(email, name, passwordHash);

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    return { ...user, accessToken, refreshToken };
}

// login user + verify pass
export async function loginUser({ email, password }: LoginDTO):
    Promise<UserWithTokens | null> {
    const user = await userRepo.getUserByEmail(email);
    if (!user) return null;

    const valid = await verifyPassword(user.password_hash, password);
    if (!valid) return null;

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    return { ...user, accessToken, refreshToken };
}