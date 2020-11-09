const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    // Open a navigation tray
    browser.execute(function () {
      document.querySelector("pfe-navigation-item:first-child").open();
    });

    browser.pause(1000);
  });

  // Note: Navigation does not need to be a full-page screenshot
  it("should take a screenshot", () => {
    browser.saveScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(3.5);
  });
});