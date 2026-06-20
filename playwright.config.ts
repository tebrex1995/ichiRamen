import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    // Every page.goto('/') starts here
    baseURL: 'https://www.aleksatvrdisic.dev/dojo/app',

    // Record a trace on failure so you can debug
    trace: 'on-first-retry',
  },
});