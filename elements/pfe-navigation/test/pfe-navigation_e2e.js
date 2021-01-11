const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    browser.pause(1000);

    // Open a navigation tray
    browser.execute(function () {
      document.querySelector("pfe-navigation-item:first-child").open();
    });

    browser.pause(1000);
  });

  // Note: Navigation does not need to be a full-page screenshot
  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") percySnapshot(browser, element, { widths: [639, 1200] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveScreen(element);
      expect(browser.checkScreen(element)).toBeLessThan(3.5);
    }
  });
});
