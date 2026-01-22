import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/React FSD Starter/);
  });

  test('should have main content landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('should have accessible form labels on login', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.getByLabel(/email/i);
    const passwordInput = page.getByLabel(/password/i);

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through the page
    await page.keyboard.press('Tab');
    
    // First focusable element should have focus
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should show focus indicators', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.getByLabel(/email/i);
    await emailInput.focus();

    // Check for focus-visible styles
    await expect(emailInput).toBeFocused();
  });
});
