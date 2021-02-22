const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  before(() => {
    browser.url(`/elements/${element}/demo`);
    browser.pause(4000);

    browser.execute(function () {
      var nav = document.querySelector("#jumplinks1");
      if (nav) {
        var link = nav.shadowRoot.querySelector("a[href='#section4'].pfe-jump-links-nav__link");
        if (link) link.click();
      }
    });

    browser.pause(1000);
  });

  // @TODO: Need a way to take full page shots of this component
  it("should take a screenshot", () => {
    browser.saveScreen(element);
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen(element)).toBeLessThan(1.25);
  });

  // it("should take a full-page screenshot", () => {
  //   browser.saveFullPageScreen(`${element}--fullpage`);
  // });

  // it("should compare to the full-page baseline", () => {
  //   expect(browser.checkFullPageScreen(`${element}--fullpage`)).toBeLessThan(1.25);
  // });
});