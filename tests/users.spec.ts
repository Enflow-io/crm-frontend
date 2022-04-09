import { test, expect } from '@playwright/test'


test('should show users page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/users')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Пользователи')
    await expect(page.locator('.ant-table-body')).toBeVisible()



})