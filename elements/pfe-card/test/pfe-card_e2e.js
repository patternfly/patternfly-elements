const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo/index.html`);
  });

  if (browser.capabilities.browserName !== "IE") {
    it("should take a screenshot", async () => {
      const header = await $$("#header");
      const nav = await $$("pfe-jump-links-nav");

      browser.execute(function () {
        const element = document.querySelector("#context-band");
        Promise.all([customElements.whenDefined("pfe-band")]).then(() => {
          element.removeAttribute("has_aside");
        });
      });
      
      browser.saveFullPageScreen(element, {
        removeElements: [header, nav]
      });
    });
  } else {
    it("should take a screenshot", () => {      
      browser.saveScreen(element);
    });
  }

  it("should compare to the baseline", () => {
    if (browser.capabilities.browserName !== "IE") {
      expect(browser.checkFullPageScreen(element)).toBeLessThan(2.9);
    } else {
      expect(browser.checkScreen(element)).toBeLessThan(2.9);
    }
  });
});