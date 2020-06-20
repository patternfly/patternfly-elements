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
    browser.pause(500);
    browser.keys(['Down arrow']);
    browser.pause(500);
  });

  it("should take a screenshot", () => {
    browser.saveScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(1.25);
  });
});