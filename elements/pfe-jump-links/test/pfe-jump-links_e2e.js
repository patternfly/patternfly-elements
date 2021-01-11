const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo/test_page.html`);

    $("#section1").scrollIntoView();

    browser.pause(1000);
  });

  // @TODO: Need a way to take full page shots of this component
  it(`should take a screenshot in ${browser.capabilities.browserName}`, () => {
    if (browser.capabilities.browserName === "chrome") percySnapshot(browser, element, { widths: [768, 1200] });
    else {
      // if (browser.capabilities.browserName === "IE") {
      browser.saveScreen(element);
      expect(browser.checkScreen(element)).toBeLessThan(1.25);
    }
  });
});