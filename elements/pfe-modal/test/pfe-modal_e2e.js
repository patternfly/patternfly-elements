const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    browser.execute(function () {
      window.scrollTo(0, 0);
      Promise.all([customElements.whenDefined("pfe-modal")]).then(function () {
        document.querySelector("#first-modal").click();
      });
    });

    browser.pause(1000);
  });

  it("should take a screenshot", () => {
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(7.6);
  });
});
