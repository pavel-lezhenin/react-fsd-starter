import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useMediaQuery } from './useMediaQuery';

// Mock matchMedia
const createMatchMedia = (matches: boolean): typeof window.matchMedia =>
  vi.fn().mockImplementation(
    (query: string): MediaQueryList => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
  );

describe('useMediaQuery', () => {
  let matchMediaMock: ReturnType<typeof createMatchMedia>;

  beforeEach(() => {
    matchMediaMock = createMatchMedia(false);
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return false initially when media query does not match', () => {
    matchMediaMock = createMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false);
  });

  it('should return true when media query matches', () => {
    matchMediaMock = createMatchMedia(true);
    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(true);
  });

  it('should add event listener on mount', () => {
    const mockMediaQueryList = {
      matches: false,
      media: '(min-width: 768px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };

    vi.mocked(window.matchMedia).mockReturnValue(mockMediaQueryList);
    window.matchMedia = matchMediaMock;

    renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('should remove event listener on unmount', () => {
    const mockMediaQueryList = {
      matches: false,
      media: '(min-width: 768px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };

    vi.mocked(window.matchMedia).mockReturnValue(mockMediaQueryList);

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    unmount();

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('should handle common breakpoint queries', () => {
    // Mobile
    matchMediaMock = createMatchMedia(true);
    window.matchMedia = matchMediaMock;
    const { result: mobileResult } = renderHook(() => useMediaQuery('(max-width: 767px)'));
    expect(mobileResult.current).toBe(true);

    // Desktop
    matchMediaMock = createMatchMedia(false);
    window.matchMedia = matchMediaMock;
    const { result: desktopResult } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
    expect(desktopResult.current).toBe(false);
  });

  it('should work with prefers-color-scheme queries', () => {
    matchMediaMock = createMatchMedia(true);
    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));

    expect(result.current).toBe(true);
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });
});
