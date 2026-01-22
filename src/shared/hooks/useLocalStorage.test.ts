import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useLocalStorage } from './useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('initial');
    expect(typeof result.current.setValue).toBe('function');
    expect(typeof result.current.removeValue).toBe('function');
  });

  it('should return stored value from localStorage', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('stored-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current.setValue('new-value');
    });

    expect(result.current.value).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
  });

  it('should remove item when removeValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    // Set a value first
    act(() => {
      result.current.setValue('some-value');
    });

    // Then remove it
    act(() => {
      result.current.removeValue();
    });

    expect(result.current.value).toBe('initial'); // Should reset to initial
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current.setValue((prev) => prev + 1);
    });

    expect(result.current.value).toBe(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(1));
  });

  it('should handle complex objects', () => {
    const initialValue = { name: 'test', count: 0 };
    const { result } = renderHook(() => useLocalStorage('test-key', initialValue));

    const newValue = { name: 'updated', count: 5 };
    act(() => {
      result.current.setValue(newValue);
    });

    expect(result.current.value).toEqual(newValue);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(newValue));
  });

  it('should handle JSON parsing errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json{');

    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));

    expect(result.current.value).toBe('fallback');
  });
});
