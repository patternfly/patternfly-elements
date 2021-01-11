const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);

    const collapse = $("#collapse");
    collapse.$(function () {
      this.toggle();
    });
    browser.pause(1000);
  });

  // Note: There are no visuals assigned to this component
  // it(`should take a screenshot in ${browser.capabilities.browserName}`, async () => {
  //   if (browser.capabilities.browserName === "chrome") await percySnapshot(browser, element, { widths: [768, 1200] });
  //   else {
  //     // if (browser.capabilities.browserName === "IE") {
  //     browser.saveFullPageScreen(element);
  //     expect(browser.checkFullPageScreen(element)).toBeLessThan(1.25);
  //   }
  // });
});