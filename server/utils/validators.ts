import { toCamelCaseKeys } from './convertCase';
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

/**
* Generic validation of object fields.
* @param obj - the object to validate
* @param fields - an array of field names that must be non-empty
* @param camelCaseConvert - if true, converts the object keys to camelCase
* @returns an object with validated (and optionally camelCase) keys
 */

export function validateFields<T extends Record<string, any>, R extends Record<string, any>>(
    obj: T,
    fields: (keyof R)[],
    camelCaseConvert = true
): R {
    const data = camelCaseConvert ? toCamelCaseKeys(obj) : obj;

    for (const field of fields) {
        const key = String(field);

        if (data[key] === undefined || data[key] === null || data[key] === '') {
            throw new Error(`Missing or invalid field: ${key}`);
        }
    }

    return data as R;
}
