import { registerUser, loginUser } from '@/server/services/user.service';
import { validateRegistration, validateLogin, userExists } from '@/server/utils/validate';
import type { RegistrationDTO, LoginDTO, UserResponse } from '@/server/types/user.types';

// registration user + validate
export async function register(reqBody: RegistrationDTO):
    Promise<UserResponse> {
    validateRegistration(reqBody);
    userExists(reqBody.email)

    const newUser = await registerUser(reqBody);
    return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        created_at: newUser.created_at,
    };
}

// login user + validate
export async function login(reqBody: LoginDTO):
    Promise<UserResponse> {
    validateLogin(reqBody);

    const user = await loginUser(reqBody);
    if (!user) throw new Error('Invalid email or password');

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
    };
}
