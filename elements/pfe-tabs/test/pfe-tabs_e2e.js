const element = require("../package.json").pfelement.elementName;
let windowSize;

describe(element, () => {
  before(() => {
    // Capture window size
    windowSize = browser.getWindowSize();

    browser.url(`/elements/${element}/demo/index_e2e.html`);
    
    browser.setWindowSize(1200, 1000);
  });

  after(function() {
    browser.setWindowSize(windowSize.width, windowSize.height);
  });

  ["light", "dark", "saturated"].forEach(context => {
    it(`should take a screenshot and compare for ${context} context`, () => {
      let color = "lightest";
      if (context === "dark") color = "darkest";
      else if (context === "saturated") color = "accent";

      browser.execute(function (color) {
        if (color) document.querySelector("pfe-band").setAttribute("color", color);
      }, color);

      browser.saveFullPageScreen(`${element}--${context}`, {});
      expect(browser.checkFullPageScreen(`${element}--${context}`, {})).toBeLessThan(3.1);
    });
  });
});