import { describe, it, expect } from 'vitest';

import { env } from './env';

describe('env configuration', () => {
  it('should export env object', () => {
    expect(env).toBeDefined();
    expect(typeof env).toBe('object');
  });

  it('should have required properties', () => {
    expect(env).toHaveProperty('VITE_API_URL');
    expect(env).toHaveProperty('VITE_PORT');
    expect(env).toHaveProperty('VITE_PREVIEW_PORT');
    expect(env).toHaveProperty('VITE_ENABLE_MSW');
  });

  it('should have string values for URL and ports', () => {
    expect(typeof env.VITE_API_URL).toBe('string');
    expect(typeof env.VITE_PORT).toBe('string');
    expect(typeof env.VITE_PREVIEW_PORT).toBe('string');
    expect(typeof env.VITE_ENABLE_MSW).toBe('string');
  });

  it('should have valid URL format for API_URL', () => {
    expect(() => new URL(env.VITE_API_URL)).not.toThrow();
  });

  it('should have numeric port values', () => {
    expect(Number.isInteger(parseInt(env.VITE_PORT))).toBe(true);
    expect(Number.isInteger(parseInt(env.VITE_PREVIEW_PORT))).toBe(true);
    expect(parseInt(env.VITE_PORT)).toBeGreaterThan(0);
    expect(parseInt(env.VITE_PREVIEW_PORT)).toBeGreaterThan(0);
  });

  it('should have boolean-like value for ENABLE_MSW', () => {
    expect(['true', 'false'].includes(env.VITE_ENABLE_MSW)).toBe(true);
  });

  it('should have default values when not provided', () => {
    // These should have defaults even if not in .env
    expect(env.VITE_PORT).toBeDefined();
    expect(env.VITE_PREVIEW_PORT).toBeDefined();
    expect(env.VITE_ENABLE_MSW).toBeDefined();
  });
});
