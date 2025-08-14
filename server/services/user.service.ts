import * as userRepo from '@/server/data/repo/user.repository';
import { hashPassword, verifyPassword } from '@/server/utils/password';
import type { RegistrationDTO, LoginDTO, UserResponse } from '@/server/types/user.types';

// registration user + hash pass
export async function registerUser({ email, name, password }: RegistrationDTO):
    Promise<UserResponse> {
    const passwordHash = await hashPassword(password);
    const user = await userRepo.createUser(email, name, passwordHash);
    return user;
}

// login user + verify pass
export async function loginUser({ email, password }: LoginDTO):
    Promise<UserResponse | null> {
    const user = await userRepo.getUserByEmail(email);
    const valid = await verifyPassword(user.password_hash, password);
    return valid ? user : null;
}