import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const screenshotsDir = join(__dirname, '..', 'screenshots');
const reportsDir = join(__dirname, '..', 'validation-reports');

// Ensure directories exist
[screenshotsDir, reportsDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667, priority: 'PRIMARY' },
  { name: 'tablet', width: 768, height: 1024, priority: 'secondary' },
  { name: 'desktop', width: 1280, height: 800, priority: 'secondary' }
];

const PAGES = [
  { name: 'login', path: '/', auth: false, section: 'auth' },
  { name: 'login-error', path: '/', auth: false, triggerError: true, section: 'auth' },
  { name: 'marketing', path: '/#marketing', auth: true, section: 'portal' },
  { name: 'sales', path: '/#sales', auth: true, section: 'portal' },
  { name: 'projects', path: '/#projects', auth: true, section: 'portal' }
];

const validationResults = {
  screenshots: [],
  accessibility: [],
  performance: [],
  interactions: [],
  errors: []
};

async function comprehensiveValidation() {
  console.log('🚀 Starting Comprehensive Puppeteer Validation\n');
  console.log('=' .repeat(60));

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  // Enable console logging from page
  page.on('console', msg => {
    if (msg.type() === 'error') {
      validationResults.errors.push({
        type: 'console-error',
        message: msg.text()
      });
    }
  });

  for (const viewport of VIEWPORTS) {
    console.log(`\n📱 ${viewport.name.toUpperCase()} (${viewport.width}x${viewport.height}) - ${viewport.priority}`);
    console.log('-'.repeat(60));

    await page.setViewport({
      width: viewport.width,
      height: viewport.height
    });

    for (const pageConfig of PAGES) {
      console.log(`\n  Testing: ${pageConfig.name}`);

      // Navigate to page
      const startTime = Date.now();
      await page.goto(`http://localhost:5173${pageConfig.path}`, {
        waitUntil: 'networkidle0'
      });
      const loadTime = Date.now() - startTime;

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

      // 1. CAPTURE SCREENSHOT
      const screenshotPath = join(screenshotsDir, `${viewport.name}-${pageConfig.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`    ✓ Screenshot: ${viewport.name}-${pageConfig.name}.png`);

      validationResults.screenshots.push({
        viewport: viewport.name,
        page: pageConfig.name,
        path: screenshotPath
      });

      // 2. PERFORMANCE METRICS (Desktop only to avoid redundancy)
      if (viewport.name === 'desktop') {
        const metrics = await page.metrics();
        const performanceData = {
          page: pageConfig.name,
          loadTime: `${loadTime}ms`,
          jsHeapSize: `${(metrics.JSHeapUsedSize / 1048576).toFixed(2)}MB`,
          layoutCount: metrics.LayoutCount,
          recalcStyleCount: metrics.RecalcStyleCount
        };

        validationResults.performance.push(performanceData);
        console.log(`    ✓ Performance: Load ${loadTime}ms | Heap ${performanceData.jsHeapSize}`);
      }

      // 3. ACCESSIBILITY CHECKS (Mobile priority viewport only)
      if (viewport.priority === 'PRIMARY' && pageConfig.section === 'portal') {
        // Check touch target sizes
        const buttons = await page.$$('button');
        const touchTargets = [];

        for (const button of buttons) {
          const box = await button.boundingBox();
          if (box) {
            const meetsMinimum = box.width >= 44 && box.height >= 44;
            touchTargets.push({
              width: Math.round(box.width),
              height: Math.round(box.height),
              meetsMinimum
            });
          }
        }

        const allMeetMinimum = touchTargets.every(t => t.meetsMinimum);
        validationResults.accessibility.push({
          page: pageConfig.name,
          viewport: viewport.name,
          touchTargets: {
            total: touchTargets.length,
            allMeet44px: allMeetMinimum,
            sizes: touchTargets
          }
        });

        console.log(`    ✓ Touch Targets: ${touchTargets.length} buttons, all ≥44px: ${allMeetMinimum ? 'YES' : 'NO'}`);
      }

      // 4. KEYBOARD NAVIGATION TEST (Desktop only, portal pages)
      if (viewport.name === 'desktop' && pageConfig.section === 'portal') {
        // Test Tab navigation
        await page.keyboard.press('Tab');
        await new Promise(resolve => setTimeout(resolve, 200));

        // Capture focus state
        const focusScreenshot = join(screenshotsDir, `${viewport.name}-${pageConfig.name}-focus.png`);
        await page.screenshot({ path: focusScreenshot });

        validationResults.interactions.push({
          type: 'keyboard-navigation',
          page: pageConfig.name,
          action: 'Tab key press',
          screenshot: focusScreenshot
        });

        console.log(`    ✓ Keyboard Nav: Tab navigation tested`);
      }

      // 5. HOVER STATE CAPTURE (Desktop only, portal pages)
      if (viewport.name === 'desktop' && pageConfig.section === 'portal') {
        const firstCard = await page.$('.card-hover');
        if (firstCard) {
          await firstCard.hover();
          await new Promise(resolve => setTimeout(resolve, 300));

          const hoverScreenshot = join(screenshotsDir, `${viewport.name}-${pageConfig.name}-hover.png`);
          await page.screenshot({ path: hoverScreenshot });

          validationResults.interactions.push({
            type: 'hover-state',
            page: pageConfig.name,
            element: 'resource-card',
            screenshot: hoverScreenshot
          });

          console.log(`    ✓ Hover State: Resource card hover captured`);
        }
      }
    }
  }

  // 6. GENERATE VALIDATION REPORT
  const reportPath = join(reportsDir, `validation-report-${Date.now()}.json`);
  writeFileSync(reportPath, JSON.stringify(validationResults, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Screenshots captured: ${validationResults.screenshots.length}`);
  console.log(`Performance metrics: ${validationResults.performance.length}`);
  console.log(`Accessibility checks: ${validationResults.accessibility.length}`);
  console.log(`Interaction tests: ${validationResults.interactions.length}`);
  console.log(`Console errors: ${validationResults.errors.length}`);
  console.log(`\nReport saved: ${reportPath}`);

  // Print accessibility summary
  if (validationResults.accessibility.length > 0) {
    console.log('\n📋 ACCESSIBILITY SUMMARY (Mobile - 375px)');
    console.log('-'.repeat(60));
    validationResults.accessibility.forEach(check => {
      console.log(`${check.page}: ${check.touchTargets.total} touch targets`);
      console.log(`  All meet 44px minimum: ${check.touchTargets.allMeet44px ? '✅ YES' : '❌ NO'}`);
    });
  }

  // Print performance summary
  if (validationResults.performance.length > 0) {
    console.log('\n⚡ PERFORMANCE SUMMARY (Desktop)');
    console.log('-'.repeat(60));
    validationResults.performance.forEach(perf => {
      console.log(`${perf.page}: ${perf.loadTime} load | ${perf.jsHeapSize} heap`);
    });
  }

  await browser.close();
  console.log('\n✅ Comprehensive validation complete!\n');
}

comprehensiveValidation().catch(error => {
  console.error('❌ Validation error:', error);
  process.exit(1);
});
