const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  let accordion;

  before(() => {
    browser.url(`/elements/${element}/demo`);

    accordion = $(element);
    accordion.$(function() {
      this.toggle(0);
    });
    
    browser.pause(1000);
  });

  it(`should take a screenshot in ${browser.capabilities.browserName}`, async () => {
    if (browser.capabilities.browserName === "chrome") {
      await percySnapshot(browser, element, { widths: [1200] });
    } else {
      // if (browser.capabilities.browserName === "IE") {
      await browser.saveFullPageScreen(element);
      expect(await browser.checkFullPageScreen(element)).toBeLessThan(1.25);
    }
  });
});