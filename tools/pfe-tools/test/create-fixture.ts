import type { TemplateResult } from 'lit';
import { chai, fixtureCleanup, fixture } from '@open-wc/testing';
import Color from 'colorjs.io';

/**
 * Creates a new testing fixture.
 *
 * - If React is available the fixture will be wrapped in a React app.
 * - By default standard a fixture will be created using lit html.
 * @param code The element code you'd like to generate a fixture for.
 * @returns  Returns the new web component fixture rendered and ready for tests.
 */
export async function createFixture<T extends Element = HTMLElement>(
  code: string | TemplateResult
): Promise<T> {
  beforeEach(fixtureCleanup);
  return fixture<T>(code);
}

chai.use(function(_chai) {
  _chai.Assertion.addMethod('colored', function(
    this: Chai.AssertionPrototype,
    expected,
    msg?: string,
  ) {
    const actual = this._obj;
    const actualParsed = new Color(actual);
    const expectParsed = new Color(expected);
    const actualNormalized = actualParsed.toString({ format: 'hex' });
    const expectNormalized = expectParsed.toString({ format: 'hex' });
    const message = msg ? `${msg} ` : '';
    this.assert(
      actualNormalized === expectNormalized,
      `expected ${message}#{act} to be the same color as #{exp}`,
      `expected ${message}#{act} to be a different color than #{exp}`,
      expectNormalized,
      actualNormalized
    );
  });
});


declare global {
  // That's just the way the chai boils
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      /**
       * Given a CSS color string, assert that it matches the expected value.
       * Color strings are normalized using colorjs.io
       */
      colored(expected: string, msg?: string): void;
    }
  }
}
