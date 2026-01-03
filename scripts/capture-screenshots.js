import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const screenshotsDir = join(__dirname, '..', 'screenshots');

// Ensure screenshots directory exists
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true });
}

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 }
];

const PAGES = [
  { name: 'login', path: '/', auth: false },
  { name: 'login-error', path: '/', auth: false, triggerError: true },
  { name: 'marketing', path: '/#marketing', auth: true },
  { name: 'sales', path: '/#sales', auth: true },
  { name: 'projects', path: '/#projects', auth: true }
];

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  for (const viewport of VIEWPORTS) {
    console.log(`\n=== Capturing ${viewport.name} (${viewport.width}x${viewport.height}) ===`);

    await page.setViewport({
      width: viewport.width,
      height: viewport.height
    });

    for (const pageConfig of PAGES) {
      // Navigate first, then handle auth
      await page.goto(`http://localhost:5173${pageConfig.path}`, {
        waitUntil: 'networkidle0'
      });

      // Handle auth if needed (after page load)
      if (pageConfig.auth) {
        await page.evaluate(() => {
          localStorage.setItem('hhp_auth', JSON.stringify({
            authenticated: true,
            timestamp: Date.now()
          }));
        });
        // Reload to apply auth
        await page.reload({ waitUntil: 'networkidle0' });
      } else {
        // Clear auth for login page
        await page.evaluate(() => {
          localStorage.removeItem('hhp_auth');
        });
      }

      // Trigger error state if needed
      if (pageConfig.triggerError) {
        await page.type('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');
        await new Promise(resolve => setTimeout(resolve, 300)); // Wait for error to appear
      }

      await new Promise(resolve => setTimeout(resolve, 500)); // Allow render

      const filename = join(screenshotsDir, `${viewport.name}-${pageConfig.name}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`✓ Captured: ${viewport.name}-${pageConfig.name}.png`);
    }
  }

  await browser.close();
  console.log('\n✓ All screenshots captured successfully!');
}

captureScreenshots().catch(error => {
  console.error('Error capturing screenshots:', error);
  process.exit(1);
});
