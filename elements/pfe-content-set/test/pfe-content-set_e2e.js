const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    if (browser.capabilities.browserName === "internet explorer") {
      browser.url(`/elements/${element}/demo/index_ie11.html`);
      browser.pause(1000);
    } else {
      browser.url(`/elements/${element}/demo/index.html`);

      // Hide the real-time item from e2e snapshot    
      browser.execute( function (element) {
        element.style.display = "none";
      }, $("pfe-jump-links-nav"));
    }
  });

  it("should take a screenshot", () => {    
    browser.saveFullPageScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkFullPageScreen(element)).toBeLessThan(2.4);
  });
});