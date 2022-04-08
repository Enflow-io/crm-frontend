import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    // Runs before each test and signs in each page.
    await page.goto('http://localhost:3000/login');
    await page.fill('#basic_username', 'admin2@admin.com');
    await page.fill('#basic_password', 'qwerty1313');
    await page.click('button.ant-btn.ant-btn-primary')
    await page.waitForSelector('h1');


});
test('should show blokcs page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/blocks')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Блоки')
    await expect(page.locator('.ant-table-body')).toBeVisible()



})