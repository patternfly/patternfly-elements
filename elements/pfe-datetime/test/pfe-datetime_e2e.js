const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    // Hide the real-time item from e2e snapshot    
    browser.execute( function (element) {
      element.style.display = "none";
    }, $("#realtime"));
  });

  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") percySnapshot(browser, element, { widths: [1200] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveFullPageScreen(element);
      expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
    }
  });
});