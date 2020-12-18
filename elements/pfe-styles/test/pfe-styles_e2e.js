const element = require("../package.json").pfelement.elementName;

describe(element, () => {

  before(() => {
    browser.url(`/elements/${element}/demo`);
    browser.pause(1000);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
  });

  before(() => {
    browser.url(`/elements/${element}/demo/typography`);
    browser.pause(1000);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
  });
});