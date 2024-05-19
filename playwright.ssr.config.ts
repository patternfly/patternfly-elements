import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: '**/test/*.ssr.ts',
  testIgnore: /node_modules|_site|create-element\/templates/,
  timeout: 120 * 1000,
  workers: process.env.CI ? 2 : 8,
  use: {
    viewport: { width: 1920, height: 1080 },
  },
});

