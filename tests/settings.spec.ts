import { test, expect } from '@playwright/test'


test('should show settings page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/settings')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Настройки')



})