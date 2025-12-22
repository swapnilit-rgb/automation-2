import { test as base } from '@playwright/test';
import playwright from 'playwright';

export const test = base.extend({
  browser: async ({}, use) => {
    const browser = await playwright.chromium.connect(
      process.env.BROWSERBASE_WS_URL,
      {
        headers: {
          'x-bb-api-key': process.env.BROWSERBASE_API_KEY,
        },
      }
    );

    await use(browser);
    await browser.close();
  },
});

export { expect } from '@playwright/test';
