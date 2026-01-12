import { readFileSync } from 'fs';
try {
  const envFile = readFileSync('.dev.vars', 'utf-8');
  envFile.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
      const joinedValue = value.join('=').trim();
      // remove quotes
      const finalValue = joinedValue.startsWith('"') && joinedValue.endsWith('"') ? joinedValue.slice(1, -1) : joinedValue;
      process.env[key.trim()] = finalValue;
    }
  });
  console.log('Finished loading .dev.vars.');
} catch (e) {
  console.error('Error loading .dev.vars:', e);
}

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
