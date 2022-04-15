import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./tests/global-setup'),
    use: {
        // Tell all tests to load signed-in state from 'storageState.json'.
        storageState: 'storageState.json'
    },
    retries: 3,
};
export default config;