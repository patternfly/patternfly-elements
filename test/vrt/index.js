describe("PatternFly Elements", () => {
  before(() => {
    browser.url("/examples");
  });

  it("should take a screenshot", () => {
    browser.saveScreen("examplePage");
  });

  it("should compare to the baseline", () => {
    expect(browser.checkScreen("examplePage")).toEqual(0);
  });
});