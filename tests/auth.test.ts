const BASE_URL = 'http://localhost:3822/api/auth';

/**
 * Extracting a specific cookie from set-cookie
 */
function extractCookie(setCookieHeader: string, key: string) {
  const match = setCookieHeader.match(new RegExp(`${key}=([^;]+)`));
  return match ? `${key}=${match[1]}` : null;
}

describe('Full Auth Flow', () => {
  let email: string;
  const password = '12345678';
  const name = 'Test User';
  let accessTokenCookie: string = '';
  let refreshTokenCookie: string = '';

  beforeAll(() => {
    email = `test${Date.now()}@example.com`;
  });

  // ---------------- REGISTER ----------------
  test('Register new user', async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await res.json();
    const setCookie = res.headers.get('set-cookie') || '';

    // take out the cookies
    accessTokenCookie = extractCookie(setCookie, 'accessToken')!;
    refreshTokenCookie = extractCookie(setCookie, 'refreshToken')!;

    console.log('--- REGISTER ---');
    console.log('Status:', res.status);
    console.log('Body:', data);
    console.log('Set-Cookie:', setCookie);

    expect(res.status).toBe(201);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email', email);
    expect(data).toHaveProperty('name', name);
    expect(accessTokenCookie).toBeTruthy();
    expect(refreshTokenCookie).toBeTruthy();
  });

  // ---------------- LOGIN ----------------
  test('Login user and get cookies', async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    const setCookie = res.headers.get('set-cookie') || '';

    accessTokenCookie = extractCookie(setCookie, 'accessToken')!;
    refreshTokenCookie = extractCookie(setCookie, 'refreshToken')!;

    console.log('--- LOGIN ---');
    console.log('Status:', res.status);
    console.log('Body:', data);
    console.log('Set-Cookie:', setCookie);

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email', email);
    expect(data).toHaveProperty('name', name);
    expect(accessTokenCookie).toBeTruthy();
    expect(refreshTokenCookie).toBeTruthy();
  });

  // ---------------- REFRESH ----------------
  test('Refresh token', async () => {
    const res = await fetch(`${BASE_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': refreshTokenCookie,
      },
    });

    const data = await res.json();
    const setCookie = res.headers.get('set-cookie') || '';

    // обновляем куки
    accessTokenCookie = extractCookie(setCookie, 'accessToken')!;
    refreshTokenCookie = extractCookie(setCookie, 'refreshToken')!;

    console.log('--- REFRESH ---');
    console.log('Status:', res.status);
    console.log('Body:', data);
    console.log('Set-Cookie:', setCookie);

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('ok', true);
    expect(accessTokenCookie).toBeTruthy();
    expect(refreshTokenCookie).toBeTruthy();
  });

  // ---------------- LOGOUT ----------------
  test('Logout user', async () => {
    if (!refreshTokenCookie) throw new Error('No refresh token for logout test');

    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': refreshTokenCookie,
      },
    });

    const data = await res.json();
    const clearedCookies = res.headers.get('set-cookie') || '';

    console.log('--- LOGOUT ---');
    console.log('Status:', res.status);
    console.log('Body:', data);
    console.log('Cleared-Cookies:', clearedCookies);

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('ok', true);
    expect(clearedCookies).toContain('accessToken=');
    expect(clearedCookies).toContain('refreshToken=');
  });
});
