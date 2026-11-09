import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/scenarios',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome'
      },
    },
  ],
});