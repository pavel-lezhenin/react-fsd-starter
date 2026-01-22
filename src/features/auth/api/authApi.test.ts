/* eslint-disable @typescript-eslint/unbound-method */
import { createElement, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the entire API module
vi.mock('../../../shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// Import after mocking
import { apiClient } from '../../../shared/api';

import { useLogin, useRegister } from './authApi';

// Get the mocked functions
const mockApiClient = vi.mocked(apiClient);

describe('authApi', () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: ReactNode }): JSX.Element =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe('useLogin', () => {
    it('should return mutate function and loading state', () => {
      const { result } = renderHook(() => useLogin(), { wrapper });

      expect(typeof result.current.mutate).toBe('function');
      expect(result.current.isPending).toBe(false);
    });

    it('should successfully login user', async () => {
      const mockResponse = {
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
        token: 'jwt-token-here',
      };

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(() => useLogin(), { wrapper });

      result.current.mutate(loginData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual({ data: mockResponse });
      expect(vi.mocked(mockApiClient.post)).toHaveBeenCalledWith('/auth/login', loginData);
    });

    it('should handle login error', async () => {
      const mockError = new Error('Invalid credentials');
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      vi.mocked(mockApiClient.post).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useLogin(), { wrapper });

      result.current.mutate(loginData);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useRegister', () => {
    it('should return mutate function and loading state', () => {
      const { result } = renderHook(() => useRegister(), { wrapper });

      expect(typeof result.current.mutate).toBe('function');
      expect(result.current.isPending).toBe(false);
    });

    it('should successfully register user', async () => {
      const mockResponse = {
        user: {
          id: '1',
          email: 'newuser@example.com',
          name: 'New User',
          role: 'user',
        },
        token: 'jwt-token-here',
      };

      const registerData = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User',
      };

      mockApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(() => useRegister(), { wrapper });

      result.current.mutate(registerData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual({ data: mockResponse });
      expect(vi.mocked(mockApiClient.post)).toHaveBeenCalledWith('/auth/register', registerData);
    });

    it('should handle registration error', async () => {
      const mockError = new Error('Email already exists');
      const registerData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'New User',
      };

      vi.mocked(mockApiClient.post).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useRegister(), { wrapper });

      result.current.mutate(registerData);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });
});
