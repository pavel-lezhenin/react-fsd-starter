import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test('should redirect to cabinet after login', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('user@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page).toHaveURL('/cabinet');
  });

  test('should display register form', async ({ page }) => {
    await page.goto('/register');

    await expect(page.getByRole('heading', { name: /create an account/i })).toBeVisible();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/^email$/i)).toBeVisible();
    await expect(page.getByLabel(/^password$/i)).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
  });

  test('should navigate between login and register', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('link', { name: /sign up/i }).click();
    await expect(page).toHaveURL('/register');

    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL('/login');
  });
});
