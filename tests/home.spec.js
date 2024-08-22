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
    await expect(page).toHaveTitle("Create Next App");
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

test('should redirect to Vercel when clicking the "By Vercel" button', async ({ page, context }) => {
  let newPage;

  try {
    await page.goto('http://localhost:3000');
    
    // Refine the locator to be more specific
    const vercelButton = page.locator('a[href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"]');
    
    // Click the button and wait for the new page to open
    [newPage] = await Promise.all([
      context.waitForEvent('page'), // Wait for the new page to open
      vercelButton.click(), // Trigger the action
    ]);

    // Wait for the new page to load
    await newPage.waitForLoadState('load');

    // Ensure the new page URL matches the expected URL
    await expect(newPage).toHaveURL('https://vercel.com/?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app');
  } catch (error) {
    // Wait for video capture to complete
    await new Promise(resolve => setTimeout(resolve, 5000)); // Increase delay if needed

    // Capture video
    if (newPage) {
      const videoPath = path.join(videoDir, 'Vercel-redirect.mp4');
      if (fs.existsSync(videoPath)) {
        console.log(`Video saved at: ${videoPath}`);
      } else {
        console.log('No video found for this test.');
      }
    }

    throw error; // Re-throw the error after attempting to retrieve the video
  }
});