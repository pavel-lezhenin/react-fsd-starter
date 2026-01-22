import { test, expect } from '@playwright/test';

test.describe('Protected Routes', () => {
  test('should redirect to login when accessing cabinet without auth', async ({ page }) => {
    await page.goto('/cabinet');
    await expect(page).toHaveURL('/login');
  });

  test('should redirect to login when accessing admin without auth', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL('/login');
  });

  test('should show 404 page for unknown routes', async ({ page }) => {
    await page.goto('/unknown-route');
    await expect(page).toHaveURL('/404');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  });
});
