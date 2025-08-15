export interface RegistrationDTO {
    email: string;
    name: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    email: string;
    name: string;
    created_at: string;
}

export interface UserWithTokens extends UserResponse {
    accessToken: string;
    refreshToken: string;
}