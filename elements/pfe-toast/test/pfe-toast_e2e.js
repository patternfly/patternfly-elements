const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    const toastBtn = $("#example2");
    toastBtn.click();
    browser.pause(3000);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
  });
});