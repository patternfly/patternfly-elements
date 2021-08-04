const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);
  });


  // There is no rendering experience for progress stepper in IE11
  if (browser.capabilities.browserName !== "internet explorer") {
    it("should take a screenshot", () => {
      browser.saveFullPageScreen(element);
    });

    it("should compare to the baseline", () => {
      expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
    });
  }
});