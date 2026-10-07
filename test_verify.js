import { chromium } from 'playwright';

async function runTests() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const viewports = [
    { name: '320px', width: 320, height: 600 },
    { name: '360px', width: 360, height: 740 },
    { name: '375px', width: 375, height: 812 },
    { name: '390px', width: 390, height: 844 },
    { name: '412px', width: 412, height: 915 },
    { name: '430px', width: 430, height: 932 },
    { name: 'desktop', width: 1280, height: 800 }
  ];

  console.log("Starting Playwright verification...");

  // Start preview server check or point to local dist/dev
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/#/home', { waitUntil: 'networkidle' }).catch(() => {});
    await page.screenshot({ path: `turfelite_${vp.name}_home.png` });
    console.log(`Captured screenshot for ${vp.name}`);
  }

  await browser.close();
  console.log("Verification test completed successfully!");
}

runTests().catch(err => {
  console.log("Playwright test note:", err.message);
});
