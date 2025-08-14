import * as userRepo from '@/server/data/repo/user.repository';

// validate email
export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// check if user exists by email
export async function userExists(email: string) {
    const existingUser = await userRepo.getUserByEmail(email);
    if (existingUser) throw new Error('User already exists');
}

// validate registration
export function validateRegistration(data: { email: string; name: string; password: string }) {
    const { email, name, password } = data;
    if (!email || !name || !password) throw new Error('All fields are required');
    if (!isValidEmail(email)) throw new Error('Invalid email format');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
}

// validate login
export function validateLogin(data: { email: string; password: string }) {
    const { email, password } = data;
    if (!email || !password) throw new Error('Email and password are required');
    if (!isValidEmail(email)) throw new Error('Invalid email format');
}
