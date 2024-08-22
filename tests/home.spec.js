const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const screenshotDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

test('should display the Next.js logo on the home page', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000');
    
    const logo = page.locator('img[alt="Next.js Logo"]');
    await expect(logo).toBeVisible();
  } catch (error) {
    const screenshotPath = path.join(screenshotDir, 'Next-js-logo.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);
    throw error; // Re-throw the error after taking the screenshot
  }
});

test('should have a title', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000');
    
    await page.waitForLoadState('domcontentloaded');
    console.log(await page.title());
    await expect(page).toHaveTitle("Create Net App");
  } catch (error) {
    const screenshotPath = path.join(screenshotDir, 'Title.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);
    throw error; // Re-throw the error after taking the screenshot
  }
});
