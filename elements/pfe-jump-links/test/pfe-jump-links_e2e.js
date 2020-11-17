const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    // Give it time to load the dynamic jump links
    browser.pause(1000);

    $("#section1").scrollIntoView();
  });

  // @TODO: Need a way to take full page shots of this component
  it("should take a screenshot", () => {
    browser.saveScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(1.25);
  });
});