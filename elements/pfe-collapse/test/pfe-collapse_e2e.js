const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    const collapse = $("#collapse");
    collapse.$(function () {
      this.toggle();
    });
    browser.pause(1000);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(4.7);
  });
});