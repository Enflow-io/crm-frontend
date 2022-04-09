import { test, expect } from '@playwright/test'


test('should open blocks page and open block page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/blocks')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Блоки')
    await expect(page.locator('.ant-table-body')).toBeVisible()

    await page.click('.ant-table-row')
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Блок #1')

})
test('should create  block ', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/blocks')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Блоки')
    await expect(page.locator('.ant-table-body')).toBeVisible()



    await page.click('.anticon.anticon-plus');
    await page.waitForSelector('.ant-modal-title');
    await page.fill('#register_name', '11')
    await page.fill('#register_buildingId', 'тестовый объект 1000')
    await page.click('.ant-select-item-option-content');
    await page.click('.ant-modal-footer button.ant-btn-primary');

    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Блок #')






})