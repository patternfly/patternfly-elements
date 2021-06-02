const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    browser.execute(function () {
      Promise.all([
        customElements.whenDefined("pfe-collapse")
      ]).then(function () {
        document.querySelector("pfe-collapse").toggle();
      });
    });
    
    browser.pause(2000);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(4.7);
  });
});