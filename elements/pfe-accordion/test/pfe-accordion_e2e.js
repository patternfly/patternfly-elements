const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  let accordion;

  before(() => {
    browser.url(`/elements/${element}/demo`);

    // not sure why a simple click on a div in IE
    // is not working. this workaround makes it so
    // we can click any element in IE11
    // https://www.intricatecloud.io/2018/11/webdriverio-tips-element-wrapped-in-div-is-not-clickable/
    var clickElement = function (element) {
      element.click();
    };

    accordion = $(element);
    const firstHeader = $("#first-header");
    browser.execute(clickElement, firstHeader);
    browser.pause(1000);
  });

  it("should take a screenshot", () => {
    browser.saveScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(1.25);
  });
});