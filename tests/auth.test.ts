const BASE_URL = 'http://localhost:3822/api/auth';

describe('Full Auth Flow', () => {
  let email: string;
  const password = '12345678';
  const name = 'Test User';
  let cookies: string | null = null;

  beforeAll(() => {
    email = `test${Date.now()}@example.com`;
  });

  test('Register new user', async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await res.json();
    expect(res.status).toBe(201);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email', email);
    expect(data).toHaveProperty('name', name);
  });

  test('Login user and set cookies', async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    cookies = res.headers.get('set-cookie');

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(cookies).toBeDefined();
    expect(cookies).toContain('accessToken');
    expect(cookies).toContain('refreshToken');
  });

  test('Refresh token', async () => {
    if (!cookies) throw new Error('No cookies from login');

    const res = await fetch(`${BASE_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookies },
    });

    const data = await res.json();
    const newCookies = res.headers.get('set-cookie');

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(newCookies).toBeDefined();
    expect(newCookies).toContain('accessToken');
  });

  test('Logout user', async () => {
    if (!cookies) throw new Error('No cookies from login');

    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookies },
    });

    const newCookies = res.headers.get('set-cookie');

    expect(res.status).toBe(200);
    expect(newCookies).toContain('accessToken='); // Обнуляем cookie
    expect(newCookies).toContain('refreshToken=');
  });
});
