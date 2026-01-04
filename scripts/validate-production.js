import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const screenshotsDir = join(__dirname, '..', 'screenshots', 'production');

// Ensure screenshots directory exists
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true });
}

const PRODUCTION_URL = 'https://herbshousecoffee.github.io/partner-portal/';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 }
];

const PAGES = [
  { name: 'login', path: '', auth: false },
  { name: 'login-error', path: '', auth: false, triggerError: true },
  { name: 'marketing', path: '#marketing', auth: true },
  { name: 'sales', path: '#sales', auth: true },
  { name: 'projects', path: '#projects', auth: true }
];

async function validateProduction() {
  console.log('🌐 Validating Production Deployment');
  console.log(`📍 URL: ${PRODUCTION_URL}`);
  console.log('=' .repeat(60));

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  for (const viewport of VIEWPORTS) {
    console.log(`\n📱 ${viewport.name.toUpperCase()} (${viewport.width}x${viewport.height})`);
    console.log('-'.repeat(60));

    await page.setViewport({
      width: viewport.width,
      height: viewport.height
    });

    for (const pageConfig of PAGES) {
      console.log(`  Testing: ${pageConfig.name}`);

      // Navigate to page
      const fullUrl = `${PRODUCTION_URL}${pageConfig.path}`;

      try {
        await page.goto(fullUrl, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        // Handle auth
        if (pageConfig.auth) {
          await page.evaluate(() => {
            localStorage.setItem('hhp_auth', JSON.stringify({
              authenticated: true,
              timestamp: Date.now()
            }));
          });
          await page.reload({ waitUntil: 'networkidle0' });
        } else {
          await page.evaluate(() => {
            localStorage.removeItem('hhp_auth');
          });
        }

        // Trigger error state if needed
        if (pageConfig.triggerError) {
          await page.type('input[type="password"]', 'wrongpassword');
          await page.click('button[type="submit"]');
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        // Capture screenshot
        const screenshotPath = join(screenshotsDir, `${viewport.name}-${pageConfig.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`    ✓ Screenshot: ${viewport.name}-${pageConfig.name}.png`);

        // Check for errors
        const hasErrors = await page.evaluate(() => {
          return document.body.innerText.includes('404') ||
                 document.body.innerText.includes('Cannot GET');
        });

        if (hasErrors) {
          console.log(`    ⚠️  WARNING: Page may contain errors`);
        }

      } catch (error) {
        console.log(`    ❌ ERROR: ${error.message}`);
      }
    }
  }

  await browser.close();
  console.log('\n' + '='.repeat(60));
  console.log('✅ Production validation complete!');
  console.log(`📁 Screenshots saved to: screenshots/production/`);
  console.log('='.repeat(60) + '\n');
}

validateProduction().catch(error => {
  console.error('❌ Validation error:', error);
  process.exit(1);
});
