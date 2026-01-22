
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
  {
    id: '3',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: '2024-02-01T00:00:00Z',
  },
];

export const userHandlers = [
  http.get(`*${API_ENDPOINTS.USERS.LIST}`, async ({ request }) => {
    await delay(500);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedUsers = mockUsers.slice(start, end);

    return HttpResponse.json({
      data: paginatedUsers,
      meta: {
        total: mockUsers.length,
        page,
        limit,
        totalPages: Math.ceil(mockUsers.length / limit),
      },
    });
  }),

  http.get(`*${API_ENDPOINTS.USERS.BY_ID(':id')}`.replace(':id', '*'), async ({ params }) => {
    await delay(300);

    const { id } = params as { id: string };
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return HttpResponse.json({ user });
  }),
];
