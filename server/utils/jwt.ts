import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

export function generateAccessToken(payload: object) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}

export function generateRefreshToken(payload: object) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_SECRET);
}
