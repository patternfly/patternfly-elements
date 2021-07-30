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
  
  if (browser.capabilities.browserName !== "IE") {
    ["light", "dark", "saturated"].forEach(context => {
      it(`should take a screenshot and compare for ${context} context`, () => {
        if (context !== "light") {
          let color = "darker";
          if (context === "saturated") color = "accent";

          browser.execute(function (color, element) {
            var wrapper = document.querySelector("#wrapper");
            wrapper.className = wrapper.className.replace(/(surface--[a-zA-Z]+)/g, `surface--${color}`);
            Promise.all([customElements.whenDefined(element)]).then(function () {
              document.querySelectorAll(element).forEach(function (accordion) {
                accordion.resetContext();
              });
            });
          }, color, element);
        }

        browser.saveFullPageScreen(`${element}--${context}`, {});
        expect(browser.checkFullPageScreen(`${element}--${context}`, {})).toBeLessThan(2.7);
      });
    });
  } else {
    it(`should take a screenshot and compare`, () => {
      browser.saveFullPageScreen(element, {});
      expect(browser.checkFullPageScreen(element, {})).toBeLessThan(2.7);
    });
  }
});