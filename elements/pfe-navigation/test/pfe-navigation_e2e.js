const element = require("../package.json").pfelement.elementName;
let windowSize;

describe(element, () => {
  before(() => {
    // Capture window size
    windowSize = browser.getWindowSize();

    browser.url(`/elements/${element}/demo`);
  });

  after(function() {
    browser.setWindowSize(windowSize.width, windowSize.height);
  });

  // Note: Navigation does not need to be a full-page screenshot
  it("should validate a screenshot at desktop", () => {
    browser.setWindowSize(1200, 1000);

    // Open a navigation tray
    browser.execute(function () {
      document.querySelector("pfe-navigation-item:first-child").open();
    });

    browser.saveFullPageScreen(`${element}--desktop`);
    expect(browser.checkScreen(`${element}--desktop`)).toBeLessThan(3.5);
  });

  // Note: Navigation does not need to be a full-page screenshot
  it("should validate a screenshot at mobile", () => {
    browser.setWindowSize(500, 800);

    // Open a navigation tray
    browser.execute(function () {
      document.querySelector("pfe-navigation-item:first-child").close();
    });

    browser.saveFullPageScreen(`${element}--mobile`);
    expect(browser.checkScreen(`${element}--mobile`)).toBeLessThan(3.5);
  });
});
