import {expect, test} from "@playwright/test";
import {HOST} from "./constants";

test('Maps fills fields', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto(HOST +'/objects/1')
    await page.waitForTimeout(400)
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h1');
    await page.waitForTimeout(400)
    await expect(page.locator('h1')).toContainText('Новый Арбат')
    await page.fill('.ymaps-2-1-79-searchbox-input__input', 'Красногорск, Жуковского 19');
    await page.waitForTimeout(400)
    await page.waitForLoadState('networkidle');
    await page.click('.ymaps-2-1-79-search__suggest-item')
    await page.waitForTimeout(400)
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#register_address')).toHaveValue('Россия, Московская область, Красногорск, улица Жуковского, 19')
    await expect(page.locator('#lat-input')).toHaveValue('55.814472')
    await expect(page.locator('#long-input')).toHaveValue('37.324874')
})