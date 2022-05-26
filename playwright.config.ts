import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./tests/global-setup'),
    use: {
        // Tell all tests to load signed-in state from 'storageState.json'.
        storageState: 'storageState.json',
        actionTimeout: 20000,
    },
    timeout: 120000,
    globalTimeout: 1000 * 60 * 10,
    retries: 3,
    expect: {
        timeout: 10000,   // <---------
    },
    workers: 1

};
export default config;