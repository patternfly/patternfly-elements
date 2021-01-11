const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);
    
    const dropdown = $("#dropdown");
    dropdown.$(function () { return this.open() });
    
    browser.pause(500);
    
    dropdown.$(function () {
      this.shadowRoot.querySelector("button").focus()
    });
    
    browser.pause(500);
    
    browser.keys(['Down arrow']);
    browser.pause(1000);
  });

  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") percySnapshot(browser, element, { widths: [768] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveFullPageScreen(element);
      expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
    }
  });
});