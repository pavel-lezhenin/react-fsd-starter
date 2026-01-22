import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Enterprise-Ready React Template');
    await expect(page.getByText(/Feature-Sliced Design/)).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /get started/i })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /login/i }).click();
    await expect(page).toHaveURL('/login');
  });

  test('should have skip link for accessibility', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeAttached();
  });
});
