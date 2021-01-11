const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    const toastBtn = $("#example2");
    toastBtn.click();
    browser.pause(3000);
  });

  it(`should take a screenshot in ${browser.capabilities.browserName}`, async () => {
    if (browser.capabilities.browserName === "chrome") await percySnapshot(browser, element, { widths: [1200] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      await browser.saveScreen(element);
      expect(await browser.checkScreen(element)).toBeLessThan(1.25);
    }
  });
});