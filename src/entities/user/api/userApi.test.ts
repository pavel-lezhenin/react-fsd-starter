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

import { useUserProfile, useUpdateProfile } from './userApi';

// Get the mocked functions
const mockApiClient = vi.mocked(apiClient);

describe('userApi', () => {
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

  describe('useUserProfile', () => {
    it('should return loading state initially', () => {
      mockApiClient.get.mockReturnValue(new Promise(() => {})); // Never resolves

      const { result } = renderHook(() => useUserProfile(), { wrapper });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });

    it('should return user profile data on success', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        avatar: null,
      };

      mockApiClient.get.mockResolvedValueOnce({ data: mockUser });

      const { result } = renderHook(() => useUserProfile(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUser);
      expect(vi.mocked(mockApiClient.get)).toHaveBeenCalledWith('/user/profile');
    });

    it('should handle error when fetching user profile fails', async () => {
      const mockError = new Error('Failed to fetch user profile');
      vi.mocked(mockApiClient.get).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUserProfile(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useUpdateProfile', () => {
    it('should return mutate function and loading state', () => {
      const { result } = renderHook(() => useUpdateProfile(), { wrapper });

      expect(typeof result.current.mutate).toBe('function');
      expect(result.current.isPending).toBe(false);
    });

    it('should successfully update user profile', async () => {
      const mockUpdatedUser = {
        id: '1',
        email: 'updated@example.com',
        name: 'Updated User',
        role: 'user',
        avatar: null,
      };

      const updateData = {
        name: 'Updated User',
        email: 'updated@example.com',
      };

      mockApiClient.put.mockResolvedValueOnce({ data: mockUpdatedUser });

      const { result } = renderHook(() => useUpdateProfile(), { wrapper });

      result.current.mutate(updateData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUpdatedUser);
      expect(vi.mocked(mockApiClient.put)).toHaveBeenCalledWith('/user/profile', updateData);
    });

    it('should handle error when updating profile fails', async () => {
      const mockError = new Error('Failed to update profile');
      const updateData = { name: 'Updated User' };

      vi.mocked(mockApiClient.put).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUpdateProfile(), { wrapper });

      result.current.mutate(updateData);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });
});
