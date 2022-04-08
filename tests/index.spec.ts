import { test, expect } from '@playwright/test'

test('should redirect to login if not authorized', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.waitForSelector('form');
    await expect(page.locator('body')).toContainText('Запомнить меня')
})


test('should redirect to dashboard if authorized', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/')
    await page.waitForSelector('form');
    await expect(page.locator('body')).toContainText('Запомнить меня')
    await page.fill('#basic_username', 'admin2@admin.com');
    await page.fill('#basic_password', 'qwerty1313');
    await page.click('button.ant-btn.ant-btn-primary')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Рабочий стол')

})