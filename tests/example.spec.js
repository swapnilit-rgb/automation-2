import { test , expect } from '@playwright/test';
import createSession from '../fixtures/browserbase.fixture.js';

test('Browserbase smoke test', async ({ browser }) => {
  const session = await createSession();
  // const context = await browser.newContext();
  // const page = await context.newPage();

  // await page.goto('https://example.com');
  // await expect(page.locator('h1')).toHaveText('Example Domain');

  // await context.close();
});
