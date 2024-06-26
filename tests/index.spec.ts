import {test, expect, chromium} from '@playwright/test'
import {HOST, TEST_USER_LOGIN, TEST_USER_PASSWORD} from "./constants";

test('should redirect to login if not authorized', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
            storageState: {
                cookies: [],
                origins: []
            }
    });
    await page.goto(HOST )
    await page.waitForSelector('form');
    await expect(page.locator('body')).toContainText('Запомнить меня')
})


test('should redirect to dashboard if authorized', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        storageState: {
            cookies: [],
            origins: []
        }
    });
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto(HOST )
    await page.waitForSelector('form');
    await expect(page.locator('body')).toContainText('Запомнить меня')
    await page.fill('#basic_username', TEST_USER_LOGIN);
    await page.fill('#basic_password', TEST_USER_PASSWORD);
    await page.click('button.ant-btn.ant-btn-primary')
    await page.waitForSelector('h1');
    await page.waitForTimeout(200)
    await expect(page.locator('h1')).toContainText('Рабочий стол')

})