const element = require("../package.json").pfelement.elementName;

describe(element, () => {
  let snapshotOptions;

  before(() => {
    browser.url(`/elements/${element}/demo`);

    snapshotOptions = {
      removeElements: [
        $("#toc"),
        $$(".skip-e2e")
      ]
    };
  });

  ["light", "dark", "saturated"].forEach(context => {
    it(`should take a screenshot and compare for ${context} context`, () => {
      $("#context").selectByAttribute("value", context);
      browser.saveFullPageScreen(`${element}--${context}`, snapshotOptions);
      expect(browser.checkFullPageScreen(`${element}--${context}`, snapshotOptions)).toBeLessThan(3.1);
    });
  });
});