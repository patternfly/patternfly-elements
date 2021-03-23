const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  console.log("hi");
  await page.goto('http://whatsmyuseragent.org/');
  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
