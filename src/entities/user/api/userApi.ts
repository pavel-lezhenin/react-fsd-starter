import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@shared/api';
import { API_ENDPOINTS } from '@shared/config';
import type { User } from '@shared/types';

interface UsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UserResponse {
  user: User;
}

export function useUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () =>
      apiClient.get<UsersResponse>(API_ENDPOINTS.USERS.LIST, {
        params: { page: String(page), limit: String(limit) },
      }),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => apiClient.get<UserResponse>(API_ENDPOINTS.USERS.BY_ID(id)),
    enabled: !!id,
  });
}
