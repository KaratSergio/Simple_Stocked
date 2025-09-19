import { NextResponse } from "next/server";

const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 min
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production" ? true : false,
};

/**
 * Sets accessToken and refreshToken to httpOnly cookies
 */
export function setAuthCookies(res: NextResponse, accessToken: string, refreshToken: string) {
  res.cookies.set({
    name: "accessToken",
    value: accessToken,
    maxAge: ACCESS_TOKEN_MAX_AGE,
    ...COOKIE_OPTIONS,
  });

  res.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    maxAge: REFRESH_TOKEN_MAX_AGE,
    ...COOKIE_OPTIONS,
  });
}

/**
 * Clears the accessToken and refreshToken cookies
 */
export function clearAuthCookies(res: NextResponse) {
  res.cookies.set({
    name: "accessToken",
    value: "",
    maxAge: 0,
    expires: new Date(0),
    ...COOKIE_OPTIONS,
  });

  res.cookies.set({
    name: "refreshToken",
    value: "",
    maxAge: 0,
    expires: new Date(0),
    ...COOKIE_OPTIONS,
  });
}

