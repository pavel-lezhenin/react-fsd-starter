import { http, HttpResponse, delay } from 'msw';

import { API_ENDPOINTS } from '@shared/config';
import type { User } from '@shared/types';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export const authHandlers = [
  http.post(`*${API_ENDPOINTS.AUTH.LOGIN}`, async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as LoginRequest;
    const user = mockUsers.find((u) => u.email === body.email);

    if (!user || body.password.length < 6) {
      return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return HttpResponse.json({
      user,
      accessToken: 'mock-access-token',
      expiresIn: 3600,
    });
  }),

  http.post(`*${API_ENDPOINTS.AUTH.REGISTER}`, async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as RegisterRequest;

    if (mockUsers.some((u) => u.email === body.email)) {
      return HttpResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: body.email,
      name: body.name,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return HttpResponse.json({
      user: newUser,
      accessToken: 'mock-access-token',
      expiresIn: 3600,
    });
  }),

  http.post(`*${API_ENDPOINTS.AUTH.LOGOUT}`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true });
  }),

  http.get(`*${API_ENDPOINTS.AUTH.ME}`, async ({ request }) => {
    await delay(300);

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({ user: mockUsers[0] });
  }),
];
