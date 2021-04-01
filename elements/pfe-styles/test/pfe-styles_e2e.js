const element = require("../package.json").pfelement.elementName;

describe(element, () => {

  before(() => {
    browser.url(`/elements/${element}/demo`);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(3.4);
  });
  
});