const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    if (browser.capabilities.browserName !== "IE") {
      browser.url(`/elements/${element}/demo`);

      // Hide the real-time item from e2e snapshot    
      browser.execute( function (element) {
        element.style.display = "none";
      }, $("pfe-jump-links-nav"));
    } else {
      browser.url(`/elements/${element}/demo/index_ie11.html`);
    }
  });

  it("should take a screenshot", () => {    
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(2.4);
  });
});