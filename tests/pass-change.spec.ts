import {test, expect, chromium} from '@playwright/test'
import {HOST, TEST_USER_LOGIN, TEST_USER_PASSWORD} from "./constants";

// test('should redirect to login if not authorized', async () => {
//     const browser = await chromium.launch();
//     const page = await browser.newPage({
//         storageState: {
//             cookies: [],
//             origins: []
//         }
//     });
//     await page.goto(HOST )
//     await page.waitForSelector('form');
//     await expect(page.locator('body')).toContainText('Запомнить меня')
// })


test('should change password', async ({ page }) => {
    await page.goto(HOST +'/settings')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Настройки')

    await page.click('#password-form-submit-btn')
    const alerts = await page.$$('div[role=alert]');
    expect(alerts.length).toBe(2)

    const newPassword = 'qwerty';
    await page.fill('#password', TEST_USER_PASSWORD)
    await page.fill('#newPassword', newPassword)
    await page.click('#password-form-submit-btn')
    await page.waitForSelector('.ant-notification-notice-message')

    await page.click('#menu-item-exit')
    await page.waitForNavigation()
    await page.waitForSelector('input[id=basic_username]')

    await page.fill('#basic_username', TEST_USER_LOGIN)
    await page.fill('#basic_password', newPassword)
    await page.click('button.ant-btn.ant-btn-primary')
    await page.waitForNavigation()

    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Рабочий стол')


    await page.goto(HOST +'/settings')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Настройки')

    await page.fill('#password',newPassword )
    await page.fill('#newPassword', TEST_USER_PASSWORD)

    await page.click('#password-form-submit-btn')
    await page.waitForSelector('.ant-notification-notice-message')


    await page.click('#menu-item-exit')
    await page.waitForNavigation()
    await page.waitForSelector('input[id=basic_username]')


    await page.fill('#basic_username', TEST_USER_LOGIN)
    await page.fill('#basic_password', TEST_USER_PASSWORD)
    await page.click('button.ant-btn.ant-btn-primary')
    await page.waitForNavigation()

    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Рабочий стол')





})