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

  if (browser.capabilities.browserName === "IE") {
    it(`should take a screenshot and compare`, () => {
      browser.saveFullPageScreen(element, {});
      expect(browser.checkFullPageScreen(element, {})).toBeLessThan(3.1);
    });
  } else {

    ["light", "dark", "saturated"].forEach(context => {
      it(`should take a screenshot and compare for ${context} context`, () => {
        if (context !== "light") {
          let color = "darker";
          if (context === "saturated") color = "accent";

          browser.execute(function (color) {
            document.querySelector("#wrapper").className = `surface--${color}`;
            Promise.all([customElements.whenDefined("pfe-tabs")]).then(function () {
              document.querySelectorAll("pfe-tabs").forEach(function (tab) {
                tab.resetContext();
              });
            });
          }, color);
        }

        browser.saveFullPageScreen(`${element}--${context}`, {});
        expect(browser.checkFullPageScreen(`${element}--${context}`, {})).toBeLessThan(3.1);
      });
    });
  }
});
