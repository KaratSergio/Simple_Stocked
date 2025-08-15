import { registerUser, loginUser } from '@/server/services/user.service';
import { validateRegistration, validateLogin, userExists } from '@/server/utils/validate';
import type { RegistrationDTO, LoginDTO, UserWithTokens } from '@/server/types/user.types';

// registration user + validate
export async function register(reqBody: RegistrationDTO):
    Promise<UserWithTokens> {
    validateRegistration(reqBody);
    userExists(reqBody.email)

    const newUser = await registerUser(reqBody);
    return newUser;
}

// login user + validate
export async function login(reqBody: LoginDTO):
    Promise<UserWithTokens> {
    validateLogin(reqBody);

    const user = await loginUser(reqBody);
    if (!user) throw new Error('Invalid email or password');

    return user;
}
