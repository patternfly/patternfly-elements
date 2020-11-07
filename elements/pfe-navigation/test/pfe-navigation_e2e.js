const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  let navigation;
  before(() => {
    browser.url(`/elements/${element}/demo`);

    // Open a navigation tray

    navigation = $(`${element} #products`);
    navigation.$(function() {
      this.click();
    });

    browser.pause(1000);
  });

  // Note: Navigation does not need to be a full-page screenshot
  it("should take a screenshot", () => {
    browser.saveScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(1.25);
  });
});