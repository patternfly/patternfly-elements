const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo/index_e2e.html`);
  });

  // @TODO: Currently test environment cannot handle dynamic nature of pfe-icon
  if (browser.capabilities.browserName !== "IE") {
    it("should take a screenshot", () => {
      browser.pause(5000);
      browser.saveFullPageScreen(element);
    });

    it("should compare to the baseline", () => {
      expect(browser.checkFullPageScreen(element)).toBeLessThan(1.4);
    });
  }
});
