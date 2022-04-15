import { test, expect } from '@playwright/test'
import {HOST} from "./constants";
import exp from "constants";


test('should show settings page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto(HOST +'/settings')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Настройки')

    // register_name
    const nameOrigin = await page.inputValue('#register_name');
    await page.fill('#register_name', nameOrigin+'2');
    await page.click('#setting-form-submit-btn')
    await page.waitForSelector('.ant-notification-notice-message')

    await page.goto(HOST +'/settings')
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('Настройки')
    const nameAfterChange = await page.inputValue('#register_name');
    expect(nameAfterChange).toEqual(nameOrigin+'2')

    await page.fill('#register_name', nameOrigin);
    await page.click('#setting-form-submit-btn')
    await page.waitForSelector('.ant-notification-notice-message')
    await page.goto(HOST +'/settings')
    const nameAfterSecChange = await page.inputValue('#register_name');
    expect(nameAfterSecChange).toEqual(nameOrigin)



})