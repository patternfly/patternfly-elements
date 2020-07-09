const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo/index_e2e.html`);
    browser.pause(1000);
  });

  it("should take a screenshot", () => {
    browser.saveScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(1.25);
  });
});