import { test, expect } from '@playwright/test'
import {HOST} from "./constants";


test.describe('Objects page', () => {


    test('Should create object', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto(HOST +'/objects')

        await page.waitForSelector('h1')
        await expect(page.locator('h1')).toContainText('Объекты')
        await page.waitForSelector('#create-object-btn');

        await page.click('#create-object-btn');
        await page.fill('#register_name', 'Красногорск, Жуковского 19');
        await page.fill('#register_buildingYear', '1990');
        await page.fill('#register_area', '50000');
        await page.fill('#register_name', 'Тестовый объект');
        await page.fill('.ymaps-2-1-79-searchbox-input__input', 'Россия, Москва, Тверская улица, 23 ');
        await page.waitForLoadState('networkidle');
        await page.click('.ymaps-2-1-79-search__suggest-item')



        // Stations selector

        await page.click('#select-stations');
        await page.click('text[data-id=Belomorskaya]');
        await page.click('#stations-scheme-apply');

        const items = await page.$$('.metro-station-from-amount');

        expect(items.length).toEqual(1)

        await page.fill('#stations-selector .amount-list .metro-station-from-amount input', "10")

        // / Stations selector

        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click('.ant-modal-footer button.ant-btn-primary'),
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/objects/)),
            // page.waitForResponse(new RegExp(/users-crud/)),
        ]);

        await page.waitForSelector('h1#object-page-title')
        await expect(page.locator('h1')).toContainText('Тестовый объект')

        const itemsAfter = await page.$$('.metro-station-from-amount');
        expect(itemsAfter.length).toEqual(1)

        const val = await page.textContent('#stations-selector .amount-list .ant-form-item-label label');
        expect(val).toBe('Беломорская')

        const val2 = await page.inputValue('#stations-selector .amount-list .metro-station-from-amount input')
        expect(val2).toBe('10')






        const today = new Date();
        const todayDate = `${today.getDate()}.${("0" + (today.getMonth() + 1)).slice(-2)}.${today.getFullYear()}`;
        console.log(todayDate)
        // check user created
         expect(await page.locator('#register_updatedAt')).toHaveValue(todayDate)
         expect(await page.locator('#register_createdAt')).toHaveValue(todayDate)

        const userText = await page.textContent('#creator-user .ant-select-selection-item');
        expect(userText).toBe('Konstantin [#1]')



    })




    test('Maps fills fields', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto(HOST +'/objects/1')
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('h1');

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

        const [response] = await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/objects/)),
            // page.waitForResponse(new RegExp(/users-crud/)),
            // Triggers the response
            page.goto(HOST +'/objects/1092')
        ]);

        await page.waitForSelector('h1#object-page-title')
        await expect(page.locator('h1')).toContainText('Тестовый объект 1000')


        await page.fill('#register_name', 'Тестовый объект 2000');


        await page.click('#select-stations');
        await page.click('text[data-id=Belomorskaya]');
        await page.click('#stations-scheme-apply');

        await page.waitForSelector('.metro-station-from-amount')
        const items = await page.$$('.metro-station-from-amount');

        expect(items.length).toEqual(1)

        await page.fill('#stations-selector .amount-list .metro-station-from-amount input', "10")


        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/objects/)),
            page.waitForResponse(new RegExp(/objects/)),
            // Triggers the response
            page.click('button.ant-btn-primary')
        ]);
        await page.waitForTimeout(100);


        const val = await page.textContent('#stations-selector .amount-list .ant-form-item-label label');
        expect(val).toBe('Беломорская')

        const val2 = await page.inputValue('#stations-selector .amount-list .metro-station-from-amount input')
        expect(val2).toBe('10')
        await expect(page.locator('h1')).toContainText('Тестовый объект 2000')



        await page.click('#select-stations');
        await page.click('#stations-scheme-reset');
        await page.click('#stations-scheme-apply');

        await page.fill('#register_name', 'Тестовый объект 1000');

        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/objects/)),
            page.waitForResponse(new RegExp(/objects/)),
            // Triggers the response
            page.click('button.ant-btn-primary')
        ]);
        await page.waitForTimeout(100);


        await Promise.all([
            // Waits for the next response with the specified url
            page.waitForResponse(new RegExp(/objects/)),
            // page.waitForResponse(new RegExp(/users-crud/)),
            // Triggers the response
            page.goto(HOST +'/objects/1092')
        ]);
        await page.waitForSelector('h1#object-page-title')

        await expect(page.locator('h1')).toContainText('Тестовый объект 1000')

    })



    test('Should upload document', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto(HOST +'/objects/1092')

        await page.waitForSelector('h1#object-page-title')

        await expect(page.locator('h1')).toContainText('Тестовый объект 1000')

        await page.click('.ant-tabs-tab:nth-of-type(3)');

        const itemsBefore = await page.$$('.ant-upload-list-text-container');
        const itemsBeforeLength = itemsBefore.length
        await page.setInputFiles('input[type=file]', "/Users/constantine/Downloads/teste2e.pdf");
        await page.waitForTimeout(5000)

        // ant-upload-list-text-container
        const itemsAfter = await page.$$('.ant-upload-list-text-container')
        expect(itemsAfter.length).toBe(itemsBeforeLength + 1)

    })


})


