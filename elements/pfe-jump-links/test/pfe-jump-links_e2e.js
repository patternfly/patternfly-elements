const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  let section;

  before(() => {
    browser.url(`/elements/${element}/demo`);

    section = $(`a[href="#section4"]`);
    section.$(function() {
      this.click();
    });

    browser.pause(1000);
  });

  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") {
      // percySnapshot(browser, element, { widths: [768, 1200] });
    } else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveScreen(element);
      expect(browser.checkScreen(element)).toBeLessThan(1.25);
    }
  });
});