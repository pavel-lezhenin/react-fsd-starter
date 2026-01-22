import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useSessionStore } from './sessionStore';

describe('useSessionStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    act(() => {
      useSessionStore.getState().clearSession();
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useSessionStore());

    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.expiresAt).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should set session data', () => {
    const { result } = renderHook(() => useSessionStore());

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00Z',
    };

    act(() => {
      result.current.setSession(mockUser, 'test-token', 3600);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.accessToken).toBe('test-token');
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.expiresAt).toBeGreaterThan(Date.now());
  });

  it('should clear session data', () => {
    const { result } = renderHook(() => useSessionStore());

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00Z',
    };

    // Set session first
    act(() => {
      result.current.setSession(mockUser, 'test-token', 3600);
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Clear session
    act(() => {
      result.current.clearSession();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.expiresAt).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should detect expired session', () => {
    const { result } = renderHook(() => useSessionStore());

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00Z',
    };

    // Set session with negative expiry (already expired)
    act(() => {
      result.current.setSession(mockUser, 'test-token', -1);
    });

    expect(result.current.isSessionExpired()).toBe(true);
  });

  it('should detect valid session', () => {
    const { result } = renderHook(() => useSessionStore());

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00Z',
    };

    // Set session with future expiry
    act(() => {
      result.current.setSession(mockUser, 'test-token', 3600);
    });

    expect(result.current.isSessionExpired()).toBe(false);
  });

  it('should calculate expiry correctly', () => {
    const { result } = renderHook(() => useSessionStore());

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00Z',
    };

    const beforeTime = Date.now();

    act(() => {
      result.current.setSession(mockUser, 'test-token', 1800); // 30 minutes
    });

    const afterTime = Date.now();
    const expectedExpiry = beforeTime + 1800 * 1000;
    const maxExpectedExpiry = afterTime + 1800 * 1000;

    expect(result.current.expiresAt).toBeGreaterThanOrEqual(expectedExpiry);
    expect(result.current.expiresAt).toBeLessThanOrEqual(maxExpectedExpiry);
  });
});
