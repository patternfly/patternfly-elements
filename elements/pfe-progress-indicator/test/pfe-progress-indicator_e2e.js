const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);
    browser.pause(1000);
  });
  
  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") percySnapshot(browser, element, { widths: [768] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveScreen(element);
      expect(browser.checkScreen(element)).toBeLessThan(1.25);
    }
  });
});