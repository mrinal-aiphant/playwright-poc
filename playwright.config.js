// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    video: 'retain-on-failure', // Record video only for failed tests
    trace: 'on'
  },
});
