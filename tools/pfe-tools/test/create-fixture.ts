import type { TemplateResult } from 'lit';

type TestHelpers = {
  fixture: <T extends Element = HTMLElement>(testCase: string|TemplateResult) => Promise<T>;
};

/**
 * Dynamically import dependencies depending on which test wrapper we're using.
 *
 * With this approach we can register wrapper specific `beforeEach` side effects that automatically
 * reset our fixtures to a clean slate before creating a new fixture.
 *
 * Most `beforeEach` side effects are stored in the helper file. The exception to this are
 * the @open-wc/testing-helpers. By default they add a `afterEach` function for fixture clean up
 * which we _do not_ want. (See https://docs.cypress.io/guides/references/best-practices#Using-after-or-afterEach-hooks)
 * By using the `index-no-side-effects` file we can move the cleanup to `beforeEach`.
 */
const helpers: Promise<TestHelpers> = new Promise(resolve => {
  // Check to see if we need to return a React wrapper.
  if ('React' in window) {
    // Dynamically import the reactWrapper helper.
    import('./react-wrapper.js').then(resolve);

  // Check to see if we need to return a Vue wrapper.
  } else if ('Vue' in window) {
    // Dynamically import the vueWrapper helper.
    import('./vue-wrapper.js').then(resolve);

  // If not, use a standard fixture for creating a rendered element.
  } else {
    import('@open-wc/testing').then(testingHelpers => {
      // Manually cleanup after each fixture using beforEach().
      beforeEach(() => {
        testingHelpers.fixtureCleanup();
      });
      resolve({
        fixture: el => testingHelpers.fixture(el),
      });
    });
  }
});

/**
 * Creates a new testing fixture.
 *
 * - If React is available the fixture will be wrapped in a React app.
 * - By default standard a fixture will be created using lit html.
 *
 * @param element The element code you'd like to generate a fixture for.
 *
 * @returns  Returns the new web component fixture rendered and ready for tests.
 */
export async function createFixture<T extends Element = HTMLElement>(
  code: string|TemplateResult
): Promise<T> {
  const { fixture } = await helpers;
  return fixture<T>(code);
}
