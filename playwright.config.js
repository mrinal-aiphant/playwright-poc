// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    video: 'on', // Record video for all tests
    trace: 'on'
  },
});
