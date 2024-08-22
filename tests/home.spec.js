const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const videoDir = path.join(__dirname, '../test-results/videos');
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

test('should display the Next.js logo on the home page', async ({ page, context }) => {
  try {
    await page.goto('http://localhost:3000');
    
    const logo = page.locator('img[alt="Next.js Logo"]');
    await expect(logo).toBeVisible();
  } catch (error) {
    // Wait for the video file to be written
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const videoPath = path.join(videoDir, 'Next-js-logo.mp4');
    if (fs.existsSync(videoPath)) {
      console.log(`Video saved at: ${videoPath}`);
    } else {
      console.log('No video found for this test.');
    }
    throw error; // Re-throw the error after attempting to retrieve the video
  }
});

test('should have a title', async ({ page, context }) => {
  try {
    await page.goto('http://localhost:3000');
    
    await page.waitForLoadState('domcontentloaded');
    console.log(await page.title());
    await expect(page).toHaveTitle("Create Next sApp");
  } catch (error) {
    // Wait for the video file to be written
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const videoPath = path.join(videoDir, 'Title.mp4');
    if (fs.existsSync(videoPath)) {
      console.log(`Video saved at: ${videoPath}`);
    } else {
      console.log('No video found for this test.');
    }
    throw error; // Re-throw the error after attempting to retrieve the video
  }
});
