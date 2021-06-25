const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo/pfe-band--markup.html`);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    // @TODO: Baseline images can't seem to get the custom green background correct
    expect(browser.checkFullPageScreen(element)).toBeLessThan(5.5);
  });
});