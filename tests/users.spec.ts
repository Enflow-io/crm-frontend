import { test, expect } from '@playwright/test'
import {getRandomInt} from "../utils/math";

//
test('should show users page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/users')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Пользователи')
    await expect(page.locator('.ant-table-body')).toBeVisible()
})

let createdUserId: string;

test('should create a user', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/users')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Пользователи')
    await expect(page.locator('.ant-table-body')).toBeVisible()
    await page.waitForSelector('button.ant-btn');
    await page.click('.sub-menu button.ant-btn');
    await page.waitForTimeout(700)

    await page.click('#role-selector label:nth-child(2)');
    await page.waitForTimeout(700)

    const randEmail = `user${getRandomInt(10000000)}@mail.com`;
    await page.waitForTimeout(700)

    await page.fill('#email', randEmail)
    await page.waitForTimeout(700)

    await page.fill('#name', `testuser`)
    await page.waitForTimeout(700)

    await page.fill('#password', `qwertyy131313`)
    await page.waitForTimeout(700)

    await page.click('.ant-modal-footer .ant-btn-primary')
    await page.waitForTimeout(700)

    await page.waitForSelector('.user-card-page');
    await expect(page.locator('#name')).toHaveValue('testuser')
    await expect(page.locator('#email')).toHaveValue(randEmail)
    const url = await page.url()
    createdUserId = url.split('/').reverse()[0]


})

test('should update a user', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto(`http://localhost:3000/users/${createdUserId}`)
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText(createdUserId)
    await page.fill('#name', `testuser22`)
    await page.click('.user-card-page .ant-btn-primary')
    await page.waitForSelector('.ant-notification-notice-message');
    await expect(page.locator('#name')).toHaveValue('testuser22')
    await page.goto(`http://localhost:3000/users/${createdUserId}`)
    await page.waitForSelector('h1');
    await expect(page.locator('#name')).toHaveValue('testuser22')




})