import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useToastStore, useToast } from './toastStore';

describe('useToastStore', () => {
  beforeEach(() => {
    // Clear all toasts before each test
    act(() => {
      useToastStore.getState().clearToasts();
    });
  });

  it('should have initial empty state', () => {
    const { result } = renderHook(() => useToastStore());

    expect(result.current.toasts).toEqual([]);
  });

  it('should add success toast', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.success('Success message');
    });

    expect(storeResult.current.toasts).toHaveLength(1);
    expect(storeResult.current.toasts[0]!.type).toBe('success');
    expect(storeResult.current.toasts[0]!.message).toBe('Success message');
    expect(storeResult.current.toasts[0]!.id).toBeDefined();
  });

  it('should add error toast', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.error('Error message');
    });

    expect(storeResult.current.toasts).toHaveLength(1);
    expect(storeResult.current.toasts[0]!.type).toBe('error');
    expect(storeResult.current.toasts[0]!.message).toBe('Error message');
  });

  it('should add warning toast', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.warning('Warning message');
    });

    expect(storeResult.current.toasts).toHaveLength(1);
    expect(storeResult.current.toasts[0]!.type).toBe('warning');
    expect(storeResult.current.toasts[0]!.message).toBe('Warning message');
  });

  it('should add info toast', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.info('Info message');
    });

    expect(storeResult.current.toasts).toHaveLength(1);
    expect(storeResult.current.toasts[0]!.type).toBe('info');
    expect(storeResult.current.toasts[0]!.message).toBe('Info message');
  });

  it('should add multiple toasts', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.success('Success 1');
      toastResult.current.error('Error 1');
      toastResult.current.warning('Warning 1');
    });

    expect(storeResult.current.toasts).toHaveLength(3);
    expect(storeResult.current.toasts[0]!.message).toBe('Success 1');
    expect(storeResult.current.toasts[1]!.message).toBe('Error 1');
    expect(storeResult.current.toasts[2]!.message).toBe('Warning 1');
  });

  it('should remove toast by id', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.success('Success message');
      toastResult.current.error('Error message');
    });

    expect(storeResult.current.toasts).toHaveLength(2);

    const firstToastId = storeResult.current.toasts[0]!.id;

    act(() => {
      storeResult.current.removeToast(firstToastId);
    });

    expect(storeResult.current.toasts).toHaveLength(1);
    expect(storeResult.current.toasts[0]!.message).toBe('Error message');
  });

  it('should clear all toasts', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.success('Success 1');
      toastResult.current.error('Error 1');
      toastResult.current.warning('Warning 1');
    });

    expect(storeResult.current.toasts).toHaveLength(3);

    act(() => {
      storeResult.current.clearToasts();
    });

    expect(storeResult.current.toasts).toHaveLength(0);
  });

  it('should generate unique ids for toasts', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.success('Message 1');
      toastResult.current.success('Message 2');
      toastResult.current.success('Message 3');
    });

    expect(storeResult.current.toasts).toHaveLength(3);

    const ids = storeResult.current.toasts.map((toast) => toast.id);
    const uniqueIds = [...new Set(ids)];

    expect(uniqueIds).toHaveLength(3); // All ids should be unique
  });

  it('should handle removing non-existent toast gracefully', () => {
    const { result: toastResult } = renderHook(() => useToast());
    const { result: storeResult } = renderHook(() => useToastStore());

    act(() => {
      toastResult.current.success('Test message');
    });

    expect(storeResult.current.toasts).toHaveLength(1);

    // Try to remove non-existent toast
    act(() => {
      storeResult.current.removeToast('non-existent-id');
    });

    // Should still have the original toast
    expect(storeResult.current.toasts).toHaveLength(1);
    expect(storeResult.current.toasts[0]!.message).toBe('Test message');
  });
});
