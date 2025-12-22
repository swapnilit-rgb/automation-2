// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * Browserbase + Cloudflare–safe Playwright config
 * - No local browsers
 * - No projects
 * - Browser controlled via fixture
 */
export default defineConfig({
  testDir: './tests',

  timeout: 60_000,

  forbidOnly: !!process.env.CI,

  // Keep retries low to avoid session waste
  retries: process.env.CI ? 1 : 0,

  
  workers: 1,

  reporter: 'html',

  use: {
    headless: true,

    // Traces still work (stored by Playwright runner)
    trace: 'on-first-retry',
  },
});
