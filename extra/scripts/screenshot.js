const puppeteer = require('puppeteer');
const path = require('path');
const server = require('./server');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'old', // tránh drama iframe
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2,
  });

  await page.goto('http://localhost:3000/index.html', {
    waitUntil: 'load',
  });

  // Đợi iframe load ĐÚNG NGHĨA
  await page.waitForSelector('iframe');
  const frameHandle = await page.$('iframe');
  const frame = await frameHandle.contentFrame();
  await frame.waitForSelector('body', { timeout: 0 });

  // Đợi font/layout ổn định
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 200));

  await page.screenshot({
    path: path.resolve(__dirname, '..', 'extra/og-image.png'),
  });

  await browser.close();
  server.close();

  console.log('✅ Đã chụp OG image');
})();
