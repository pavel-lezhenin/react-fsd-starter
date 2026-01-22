import { describe, it, expect } from 'vitest';

import { ROUTES, API_ENDPOINTS } from './routes';

describe('ROUTES configuration', () => {
  it('should export ROUTES object', () => {
    expect(ROUTES).toBeDefined();
    expect(typeof ROUTES).toBe('object');
  });

  it('should have all required route constants', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.LOGIN).toBe('/login');
    expect(ROUTES.REGISTER).toBe('/register');
    expect(ROUTES.CABINET).toBe('/cabinet');
    expect(ROUTES.ADMIN).toBe('/admin');
    expect(ROUTES.NOT_FOUND).toBe('/404');
  });

  it('should have string values for all routes', () => {
    Object.values(ROUTES).forEach((route) => {
      expect(typeof route).toBe('string');
      expect(route.startsWith('/')).toBe(true);
    });
  });

  it('should not have duplicate routes', () => {
    const routeValues = Object.values(ROUTES);
    const uniqueRoutes = new Set(routeValues);
    expect(uniqueRoutes.size).toBe(routeValues.length);
  });
});

describe('API_ENDPOINTS configuration', () => {
  it('should export API_ENDPOINTS object', () => {
    expect(API_ENDPOINTS).toBeDefined();
    expect(typeof API_ENDPOINTS).toBe('object');
  });

  it('should have AUTH endpoints', () => {
    expect(API_ENDPOINTS.AUTH).toBeDefined();
    expect(API_ENDPOINTS.AUTH.LOGIN).toBe('/auth/login');
    expect(API_ENDPOINTS.AUTH.REGISTER).toBe('/auth/register');
    expect(API_ENDPOINTS.AUTH.LOGOUT).toBe('/auth/logout');
    expect(API_ENDPOINTS.AUTH.ME).toBe('/auth/me');
  });

  it('should have USERS endpoints', () => {
    expect(API_ENDPOINTS.USERS).toBeDefined();
    expect(API_ENDPOINTS.USERS.LIST).toBe('/users');
    expect(typeof API_ENDPOINTS.USERS.BY_ID).toBe('function');
  });

  it('should generate correct user ID endpoints', () => {
    expect(API_ENDPOINTS.USERS.BY_ID('123')).toBe('/users/123');
    expect(API_ENDPOINTS.USERS.BY_ID('user-456')).toBe('/users/user-456');
  });

  it('should have string values for static endpoints', () => {
    expect(typeof API_ENDPOINTS.AUTH.LOGIN).toBe('string');
    expect(typeof API_ENDPOINTS.AUTH.REGISTER).toBe('string');
    expect(typeof API_ENDPOINTS.AUTH.LOGOUT).toBe('string');
    expect(typeof API_ENDPOINTS.AUTH.ME).toBe('string');
    expect(typeof API_ENDPOINTS.USERS.LIST).toBe('string');
  });

  it('should have endpoints starting with slash', () => {
    const staticEndpoints = [
      API_ENDPOINTS.AUTH.LOGIN,
      API_ENDPOINTS.AUTH.REGISTER,
      API_ENDPOINTS.AUTH.LOGOUT,
      API_ENDPOINTS.AUTH.ME,
      API_ENDPOINTS.USERS.LIST,
    ];

    staticEndpoints.forEach((endpoint) => {
      expect(endpoint.startsWith('/')).toBe(true);
    });
  });

  it('should generate dynamic endpoints with slash', () => {
    const dynamicEndpoint = API_ENDPOINTS.USERS.BY_ID('test');
    expect(dynamicEndpoint.startsWith('/')).toBe(true);
  });
});
