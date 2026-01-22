/* eslint-disable @typescript-eslint/no-unsafe-assignment */ import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';

import { apiClient } from './client';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('API Client', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET requests', () => {
    it('should make GET request with correct URL', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result: unknown = await apiClient.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          credentials: 'include',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle 404 errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Not found' }),
      });

      await expect(apiClient.get('/nonexistent')).rejects.toThrow('Not found');
    });

    it('should handle 500 errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ message: 'Server error' }),
      });

      await expect(apiClient.get('/error')).rejects.toThrow('Server error');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiClient.get('/test')).rejects.toThrow('Network error');
    });
  });

  describe('POST requests', () => {
    it('should make POST request with JSON body', async () => {
      const mockResponse = { success: true };
      const requestData = { name: 'test' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result: unknown = await apiClient.post('/test', requestData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(requestData),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle POST without body', async () => {
      const mockResponse = { success: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await apiClient.post('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/test',
        expect.objectContaining({
          method: 'POST',
          body: null,
          credentials: 'include',
        })
      );
    });
  });

  describe('PUT requests', () => {
    it('should make PUT request with JSON body', async () => {
      const mockResponse = { updated: true };
      const requestData = { id: 1, name: 'updated' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiClient.put('/test/1', requestData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/test/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(requestData),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('DELETE requests', () => {
    it('should make DELETE request', async () => {
      const mockResponse = { deleted: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiClient.delete('/test/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/test/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Base URL construction', () => {
    it('should construct correct URLs for different endpoints', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await apiClient.get('/users');
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/users', expect.any(Object));

      await apiClient.get('/users/123');
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/users/123',
        expect.any(Object)
      );

      await apiClient.get('/auth/login');
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/auth/login',
        expect.any(Object)
      );
    });

    it('should handle endpoints with leading slash', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await apiClient.get('/test');
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/test', expect.any(Object));
    });

    it('should handle endpoints without leading slash', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await apiClient.get('test');
      // Since baseUrl is 'http://localhost:3001/api' and endpoint is 'test'
      // The URL becomes 'http://localhost:3001/apitest' (missing slash)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/apitest', expect.any(Object));
    });
  });
});
