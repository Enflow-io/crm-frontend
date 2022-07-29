import {test, expect} from '@playwright/test'
import {HOST} from "./constants";
import {openSelect} from "./helpers";

test.describe('Price Selector', () => {

    const TEST_OBJECT_ID = 1150;
    test('should check autofill currencies fields', async ({page}) => {

        await page.goto(HOST + '/objects/' + TEST_OBJECT_ID)



        await page.waitForSelector('h1');
        await expect(page.locator('h1')).toContainText('Объект для теста валют')

        await openSelect('#currency-selector', page)
        await page.waitForTimeout(200)
        await page.click('.ant-select-item-option:nth-child(1)')

        const [response] = await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/convert/)),
            page.waitForResponse(new RegExp(/convert/)),
            // Triggers the response
            page.fill('#register_basePriceRent_RUB', '1')
        ]);

        // await page.fill('#register_basePriceRent_RUB', '1');
        const usdVal = await page.inputValue('#register_basePriceRent_USD');
        const eurVal = await page.inputValue('#register_basePriceRent_EUR');


        // await page.fill('#register_basePriceRent_RUB', '1990');
        // await page.waitForTimeout(1500)

        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/convert/)),
            page.waitForResponse(new RegExp(/convert/)),
            // Triggers the response
            page.fill('#register_basePriceRent_RUB', '1990')
        ]);

        await page.waitForTimeout(100)

        const newUsdVal = await page.inputValue('#register_basePriceRent_USD');
        const newEurVal = await page.inputValue('#register_basePriceRent_EUR');

        expect(usdVal).not.toEqual(newUsdVal)
        expect(eurVal).not.toEqual(newEurVal)


        await openSelect('#currency-selector', page)
        await page.waitForTimeout(100)

        // click $
        await page.click('.ant-select-item-option:nth-child(2)')
        await page.waitForTimeout(200)

        const usdValAfterCurrChanged = await page.inputValue('#register_basePriceRent_USD');
        const eurValAfterCurrChanged = await page.inputValue('#register_basePriceRent_EUR');


        expect(newUsdVal).toEqual(usdValAfterCurrChanged)
        expect(newEurVal).toEqual(eurValAfterCurrChanged)




        // await page.fill('#register_basePriceRent_USD', '100');
        // await page.waitForTimeout(1500)


        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/convert/)),
            page.waitForResponse(new RegExp(/convert/)),
            // Triggers the response
            page.fill('#register_basePriceRent_USD', '100')
        ]);

        await page.click('button.obj-save-btn');

        await page.waitForSelector('.ant-notification-notice-message')

        await page.goto(HOST + '/objects/' + TEST_OBJECT_ID)

        const regexp = `|api/objects/${TEST_OBJECT_ID}|`;
        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(regexp)),
            page.waitForSelector('#register_basePriceRent_USD'),
            page.goto(HOST + '/objects/' + TEST_OBJECT_ID),
        ]);

        const usdValUpdated = await page.inputValue('#register_basePriceRent_USD');
        expect(usdValUpdated).toEqual("100")

        await openSelect('#currency-selector', page)
        await page.click('.ant-select-item-option:nth-child(1)')
        // await page.waitForTimeout(1500)
        // await page.waitForSelector('#register_basePriceRent_RUB')
        // await page.fill('#register_basePriceRent_RUB', '10');

        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/convert/)),
            page.waitForResponse(new RegExp(/convert/)),
            // Triggers the response
            page.fill('#register_basePriceRent_RUB', '10')
        ]);



        await page.click('button.obj-save-btn');

        await page.waitForSelector('.ant-notification-notice-message')








    });
})