export interface RegistrationDTO {
    email: string;
    name: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    password_hash: string;
    created_at: string;
}

export interface UserWithTokens extends User {
    accessToken: string;
    refreshToken: string;
}