import { test, expect } from '@playwright/test'


test.describe('Objects list page', () => {
    test('should show objects page', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('http://localhost:3000/objects')
        await page.waitForSelector('h1');
        await expect(page.locator('h1')).toContainText('Объекты')
        await expect(page.locator('.ant-table-body')).toBeVisible()

    })

    test('should open object page', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('http://localhost:3000/objects')
        await page.waitForSelector('h1');
        await expect(page.locator('h1')).toContainText('Объекты')
        await expect(page.locator('.ant-table-body')).toBeVisible()

        await page.click('.ant-table-row')
        await page.waitForLoadState('networkidle');
        await expect(page.locator('h1')).toContainText('Новый Арбат')

    })
})
