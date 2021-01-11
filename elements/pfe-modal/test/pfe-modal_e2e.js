const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    browser.pause(1000);

    browser.execute(function () {
      window.scrollTo(0, 0);
      document.querySelector("pfe-modal").open();
    });

    browser.pause(1000);
  });
  
  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") percySnapshot(browser, element, { widths: [1200] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveFullPageScreen(element);
      expect(browser.checkFullPageScreen(element)).toBeLessThan(3.5);
    }
  });
});
