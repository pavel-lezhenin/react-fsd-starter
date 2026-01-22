import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@shared/api';
import { API_ENDPOINTS } from '@shared/config';
import type { User } from '@shared/types';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export function useLogin(): UseMutationResult<AuthResponse, Error, LoginRequest> {
  return useMutation({
    mutationFn: (data: LoginRequest) =>
      apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data),
  });
}

export function useRegister(): UseMutationResult<AuthResponse, Error, RegisterRequest> {
  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data),
  });
}

export function useLogout(): UseMutationResult<void, Error, void> {
  return useMutation({
    mutationFn: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),
  });
}
