const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  let autocomplete;
  let input

  before(() => {
    browser.url(`/elements/${element}/demo`);
    autocomplete = $(element);
    input = $(element + " input");
    
    browser.execute(function (element) {
      element.focus();
    }, input);
    
    browser.keys(['i']);
    browser.pause(1000);
    browser.keys(['Down arrow']);
    browser.pause(1000);
  });

  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") percySnapshot(browser, element, { widths: [768] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveFullPageScreen(element);
      expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
    }
  });
});