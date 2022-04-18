import { test, expect } from '@playwright/test'
import {HOST} from "./constants";


test.describe('Objects list page', () => {
    test('should show objects page', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto(HOST +'/objects')
        await page.waitForSelector('h1');
        await expect(page.locator('h1')).toContainText('Объекты')
        await expect(page.locator('.ant-table-body')).toBeVisible()

    })

    test('should open object page', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto(HOST +'/objects')
        await page.waitForSelector('h1');
        await expect(page.locator('h1')).toContainText('Объекты')
        await expect(page.locator('.ant-table-body')).toBeVisible()

        await page.click('.ant-table-row')

        const [response] = await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/objects/)),
            page.waitForResponse(new RegExp(/users-crud/)),
            // Triggers the response
            page.click('.ant-table-row')
        ]);

        await expect(page.locator('h1')).toContainText('Новый Арбат')

    })
})
