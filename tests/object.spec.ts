import { test, expect } from '@playwright/test'


test.describe('Objects page', () => {
    test('Maps fills fields', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('http://localhost:3000/objects/1')
        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1')).toContainText('Новый Арбат')
        await page.fill('.ymaps-2-1-79-searchbox-input__input', 'Красногорск, Жуковского 19');

        await page.waitForLoadState('networkidle');
        await page.click('.ymaps-2-1-79-search__suggest-item')
        await page.waitForLoadState('networkidle');
        await expect(page.locator('#register_address')).toHaveValue('Россия, Московская область, Красногорск, улица Жуковского, 19')
        await expect(page.locator('#lat-input')).toHaveValue('55.814472')
        await expect(page.locator('#long-input')).toHaveValue('37.324874')
    })

    test('Should be updated', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('http://localhost:3000/objects/1092')
        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1')).toContainText('Тестовый объект 1000')


        await page.fill('#register_name', 'Тестовый объект 2000');
        await page.click('button.ant-btn-primary')
        await page.waitForLoadState('networkidle');
        await expect(page.locator('h1')).toContainText('Тестовый объект 2000')

        await page.fill('#register_name', 'Тестовый объект 1000');
        await page.click('button.ant-btn-primary')
        await page.waitForLoadState('networkidle');
        await expect(page.locator('h1')).toContainText('Тестовый объект 1000')

    })



    test('Should load document', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('http://localhost:3000/objects/1092')
        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1')).toContainText('Тестовый объект 1000')

        await page.click('.ant-tabs-tab:nth-of-type(3)');

        const itemsBefore = await page.$$('.ant-upload-list-text-container');
        const itemsBeforeLength = itemsBefore.length
        await page.setInputFiles('input[type=file]', "/Users/constantine/Downloads/teste2e.pdf");
        await page.waitForTimeout(1000)

        // ant-upload-list-text-container
        const itemsAfter = await page.$$('.ant-upload-list-text-container')
        expect(itemsAfter.length).toBe(itemsBeforeLength + 1)

    })




})


