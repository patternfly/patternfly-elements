const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  let navigation;

  before(() => {
    browser.url(`/elements/${element}/demo`);

    navigation = $("#products");
    navigation.$(function() {
      this.click();
    });

    browser.pause(1000);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
  });
});