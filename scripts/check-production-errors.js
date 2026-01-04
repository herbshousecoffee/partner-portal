import puppeteer from 'puppeteer';

const PRODUCTION_URL = 'https://herbshousecoffee.github.io/partner-portal/';

async function checkErrors() {
  console.log('🔍 Checking production site for errors...\n');

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const errors = [];
  const consoleMessages = [];

  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    errors.push(`Page Error: ${error.message}`);
  });

  page.on('requestfailed', request => {
    errors.push(`Failed Request: ${request.url()} - ${request.failure().errorText}`);
  });

  try {
    await page.goto(PRODUCTION_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('📄 Page loaded');
    console.log('🌐 URL:', page.url());

    const pageContent = await page.content();
    const hasContent = pageContent.length > 500;
    console.log('📊 Content length:', pageContent.length, hasContent ? '✓' : '⚠️ Too short');

    const title = await page.title();
    console.log('📝 Title:', title);

    console.log('\n❌ Errors:', errors.length);
    errors.forEach(err => console.log('  -', err));

    console.log('\n💬 Console Messages:');
    consoleMessages.forEach(msg => console.log('  ', msg));

  } catch (error) {
    console.log('❌ Failed to load:', error.message);
  }

  await browser.close();
}

checkErrors();
