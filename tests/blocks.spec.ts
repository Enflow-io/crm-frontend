import { test, expect } from '@playwright/test'
import {HOST} from "./constants";

//
test('should open blocks page and open block page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto(HOST+'/blocks')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Блоки')
    await expect(page.locator('.ant-table-body')).toBeVisible()
    await page.waitForSelector('.ant-table-row');


    // await page.waitForTimeout(1000)
    // await page.waitForSelector('h1');

    const [response] = await Promise.all([
        page.waitForNavigation(),
        await page.click('.ant-table-row'),
        // Waits for the next response with the specified url
        page.waitForResponse(new RegExp(/offices/)),
    ]);
    await page.waitForTimeout(100)


    await expect(page.locator('h1')).toContainText('Блок #')

})


test('should create  block ', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto(HOST+'/blocks')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Блоки')
    await expect(page.locator('.ant-table-body')).toBeVisible()

    await page.click('.anticon.anticon-plus');
    await page.waitForSelector('.ant-modal-title');
    await page.fill('#register_name', '11')
    await page.fill('#register_buildingId', 'тестовый объект 1000')
    await page.click('.ant-select-item-option-content');
    // await page.click('.ant-modal-footer button.ant-btn-primary');

    // await page.waitForLoadState('networkidle');


    const [response] = await Promise.all([
        page.waitForNavigation(),



        // Waits for the next response with the specified url
        page.waitForResponse(new RegExp(/offices/)),
        page.waitForResponse(new RegExp(/offices/)),
        page.waitForResponse(new RegExp(/objects/)),
        page.click('.ant-modal-footer button.ant-btn-primary'),
    ]);
    await page.waitForTimeout(100)

    await expect(page.locator('h1')).toContainText('Блок #')

})
//
//
test('should update  block ', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto(HOST+'/blocks/2346')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Блок #')

    await page.fill('#register_name', 'Name 2365')
    await page.click('button.block-save-btn');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.ant-notification-notice-message')


    await page.goto(HOST +'/blocks/2346')
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText('Блок #')
    await expect(page.locator('#register_name')).toHaveValue('Name 2365')

    await page.fill('#register_name', 'Name 2366')
    await page.click('button.block-save-btn');
    await page.waitForLoadState('networkidle');
    // await page.goto(HOST +'/blocks/2346')
    // await page.waitForLoadState('networkidle');


    const [response] = await Promise.all([
        page.waitForNavigation(),
        // Waits for the next response with the specified url
        page.waitForResponse(new RegExp(/offices/)),
        page.goto(HOST +'/blocks/2346')
    ]);
    await page.waitForTimeout(100)

    await expect(page.locator('h1')).toContainText('Блок #')
    await expect(page.locator('#register_name')).toHaveValue('Name 2366')



})