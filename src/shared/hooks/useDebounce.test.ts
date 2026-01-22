import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useDebounce } from './useDebounce';

// Mock timers
vi.useFakeTimers();

describe('useDebounce', () => {
  it('should return a function', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));
    expect(typeof result.current).toBe('function');
  });

  it('should debounce callback execution', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));
    const debouncedCallback = result.current;

    // Call multiple times rapidly
    act(() => {
      debouncedCallback('arg1');
      debouncedCallback('arg2');
      debouncedCallback('arg3');
    });

    // Callback should not be called yet
    expect(callback).not.toHaveBeenCalled();

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now callback should be called once with last arguments
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg3');
  });

  it('should reset timer on rapid calls', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));
    const debouncedCallback = result.current;

    // First call
    act(() => {
      debouncedCallback('first');
    });

    // Wait 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(callback).not.toHaveBeenCalled();

    // Second call before first completes
    act(() => {
      debouncedCallback('second');
    });

    // Wait another 250ms (total 500ms from first call)
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(callback).not.toHaveBeenCalled();

    // Wait final 250ms (500ms from second call)
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');
  });

  it('should handle different delay values', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));
    const debouncedCallback = result.current;

    act(() => {
      debouncedCallback('test');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledWith('test');
  });

  it('should cleanup timeout on unmount', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback, 500));
    const debouncedCallback = result.current;

    act(() => {
      debouncedCallback('test');
    });

    // Unmount before timeout
    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Callback should not be called after unmount
    expect(callback).not.toHaveBeenCalled();
  });
});
