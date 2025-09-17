import * as userRepo from '@/server/data/repo/user.repository';
import { hashPassword, verifyPassword } from '@/server/utils/password';
import type { RegistrationDTO, LoginDTO, User } from '@/server/types/user.types';

/**
 * Creates a user - returns only the entity (no tokens, no password).
 */
export async function registerUser({ email, name, password }: RegistrationDTO): Promise<User> {
  const passwordHash = await hashPassword(password);
  return userRepo.createUser(email, name, passwordHash);
}

/**
 * Login: checks the password, returns user (without password_hash) or null.
 */
export async function loginUser({ email, password }: LoginDTO): Promise<User | null> {
  const dbUser = await userRepo.getUserByEmail(email);
  if (!dbUser) return null;

  const valid = await verifyPassword(dbUser.password_hash, password);
  if (!valid) return null;

  // sanitize — removed password_hash
  const { id, email: userEmail, name, created_at } = dbUser;
  return { id, email: userEmail, name, created_at } as User;
}

/**
 * Get User data by ID
 */
export async function getUser(id: number): Promise<User | null> {
  return userRepo.getUserById(id);
}