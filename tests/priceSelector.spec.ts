import {test, expect} from '@playwright/test'
import {HOST, TEST_OBJECT_ID} from "./constants";
import {openSelect} from "./helpers";

test.describe('Price Selector', () => {

    test('should check autofill currencies fields', async ({page}) => {

        await page.goto(HOST + '/objects/' + TEST_OBJECT_ID)


        await page.waitForSelector('h1');
        await expect(page.locator('h1')).toContainText('Тестовый объект ')


        await page.fill('#register_basePriceRent_RUB', '1');
        await page.waitForTimeout(500)
        const usdVal = await page.inputValue('#register_basePriceRent_USD');
        const eurVal = await page.inputValue('#register_basePriceRent_EUR');


        await page.fill('#register_basePriceRent_RUB', '1990');
        await page.waitForTimeout(500)
        const newUsdVal = await page.inputValue('#register_basePriceRent_USD');
        const newEurVal = await page.inputValue('#register_basePriceRent_EUR');

        expect(usdVal).not.toEqual(newUsdVal)
        expect(eurVal).not.toEqual(newEurVal)


        await openSelect('#currency-selector', page)
        await page.waitForTimeout(400)

        // click $
        await page.click('.ant-select-item-option:nth-child(2)')
        await page.waitForTimeout(600)

        const usdValAfterCurrChanged = await page.inputValue('#register_basePriceRent_USD');
        const eurValAfterCurrChanged = await page.inputValue('#register_basePriceRent_EUR');


        expect(newUsdVal).toEqual(usdValAfterCurrChanged)
        expect(newEurVal).toEqual(eurValAfterCurrChanged)

        await page.fill('#register_basePriceRent_USD', '100');
        await page.waitForTimeout(500)

        await page.click('button.ant-btn-primary');

        await page.waitForSelector('.ant-notification-notice-message')

        await page.goto(HOST + '/objects/' + TEST_OBJECT_ID)
        const usdValUpdated = await page.inputValue('#register_basePriceRent_USD');
        expect(usdValUpdated).toEqual("100")

        await openSelect('#currency-selector', page)
        await page.waitForTimeout(400)
        await page.click('.ant-select-item-option:nth-child(1)')
        await page.waitForTimeout(300)
        await page.waitForSelector('#register_basePriceRent_RUB')
        await page.fill('#register_basePriceRent_RUB', '10');
        await page.click('button.ant-btn-primary');

        await page.waitForSelector('.ant-notification-notice-message')








    });
})