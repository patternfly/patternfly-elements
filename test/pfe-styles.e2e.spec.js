import { expect } from "@playwright/test";
import { test } from "@patternfly/pfe-tools/test/playwright/fixtures.js";
test.describe("pfe-styles", () => {
  test("snapshot", async ({ page }) => {
    await page.goto("https://localhost:8080/core/pfe-styles/");
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot()).toMatchSnapshot("pfe-styles.png");
  });
});
