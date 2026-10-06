import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Take Desktop Home Page screenshot
  await page.screenshot({ path: 'turfelite_desktop_home.png' });
  console.log('Captured turfelite_desktop_home.png');

  // Click Pronostics tab
  await page.click('text="Pronostics & Courses"');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'turfelite_desktop_pronostics.png' });
  console.log('Captured turfelite_desktop_pronostics.png');

  // Mobile Viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'turfelite_mobile_home.png' });
  console.log('Captured turfelite_mobile_home.png');

  await browser.close();
})();
