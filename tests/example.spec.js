import { test, expect } from '../fixtures/browserbase.fixture.js';

test('Browserbase smoke test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://example.com');
  await expect(page.locator('h1')).toHaveText('Example Domain');

  await context.close();
});
