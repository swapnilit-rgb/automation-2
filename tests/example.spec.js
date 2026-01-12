import { test , expect } from '@playwright/test';
import createSession from '../fixtures/browserbase.fixture.js';


  test('Browserbase smoke test', async ({ browser }) => {
    const {session, page} = await createSession();
    await page.goto('https://binaytara.org/');
    await page.getByRole('link', { name: 'About Us' }).click();
    await page.getByRole('link', { name: 'CME Conferences' }).click();
    await page.getByRole('link', { name: 'Funding Opportunities' }).click();
    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await page.getByRole('link', { name: 'Get Involved' }).click();
    await page.close();
    await browser.close();
    console.log(`Session completeddddd! View replay at https://browserbase.com/sessions/${session.id}`);
  });
  
