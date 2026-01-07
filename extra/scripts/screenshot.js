const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--allow-file-access-from-files',
      '--disable-web-security',
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2,
  });

  const filePath = path.resolve(__dirname, '..', '..', 'index.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'load' });

  // Đợi iframe load thật
  await page.waitForSelector('iframe');
  const frameHandle = await page.$('iframe');
  const frame = await frameHandle.contentFrame();
  await frame.waitForSelector('body', { timeout: 0 });

  // Đợi font/layout ổn định
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(resolve => setTimeout(resolve, 300));

  await page.screenshot({ path: 'extra/og-image.png' });

  await browser.close();
  console.log('Đã chụp');
})();
