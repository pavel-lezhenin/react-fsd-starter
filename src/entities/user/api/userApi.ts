import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

export function useUsers(page = 1, limit = 10): UseQueryResult<UsersResponse> {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () =>
      apiClient.get<UsersResponse>(API_ENDPOINTS.USERS.LIST, {
        params: { page: String(page), limit: String(limit) },
      }),
  });
}

export function useUser(id: string): UseQueryResult<UserResponse> {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => apiClient.get<UserResponse>(API_ENDPOINTS.USERS.BY_ID(id)),
    enabled: !!id,
  });
}

// Function for getting current user profile
export function useUserProfile(): UseQueryResult<User> {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await apiClient.get<{ data: User }>('/user/profile');
      return response.data;
    },
  });
}

// Function for updating user profile
export function useUpdateProfile(): UseMutationResult<User, Error, Partial<User>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const response = await apiClient.put<{ data: User }>('/user/profile', userData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user profile query to refetch data
      void queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
}
