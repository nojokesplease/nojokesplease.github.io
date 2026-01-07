const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Đặt kích thước chuẩn Open Graph (1200x630)
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2, // Chụp nét căng (Retina)
  });

  const filePath = path.resolve(__dirname, '..', '..', 'en/index.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Chụp ảnh và lưu thành og-image.png
  await page.screenshot({ path: 'extra/og-image.png' });

  await browser.close();
  console.log('Đã chụp');
})();