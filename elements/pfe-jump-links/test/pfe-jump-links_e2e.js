const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo/test_page.html`);

    const el = $("#section1");
    if (el) el.scrollIntoView();

    browser.pause(1000);
  });

  // @TODO: Need a way to take full page shots of this component
  it(`should take a screenshot in ${browser.capabilities.browserName}`, async () => {
    if (browser.capabilities.browserName === "chrome") {
      await percySnapshot(browser, element, { widths: [768, 1200] });
    } else {
      // if (browser.capabilities.browserName === "IE") {
      await browser.saveScreen(element);
      expect(await browser.checkScreen(element)).toBeLessThan(1.25);
    }
  });
});