import { chromium, FullConfig } from '@playwright/test';
import {HOST, TEST_USER_LOGIN, TEST_USER_PASSWORD} from "./constants";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(HOST +'/login');
    await page.fill('#basic_username', TEST_USER_LOGIN);
    await page.fill('#basic_password', TEST_USER_PASSWORD);
    await page.click('button.ant-btn.ant-btn-primary')
    await page.waitForSelector('h1');

    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;


// npx playwright codegen --load-storage=auth.json http://localhost:3000
// npx playwright test --headed   --global-timeout=60000
// https://playwright.dev/docs/codegen