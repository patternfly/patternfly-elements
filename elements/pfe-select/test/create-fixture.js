import { fixture, html } from '@open-wc/testing';
import { reactWrapper } from './react-wrapper';
import { vueWrapper } from './vue-wrapper';

/**
 * Creates a new testing fixture.
 *
 * - If React is available the fixture will be wrapped in a React app.
 * - By default standard a fixture will be created using lit html.
 *
 * @param {string} element The element code you'd like to generate a fixture for.
 *
 * @returns {Promise} Returns the new web component fixture rendered and ready for tests.
 */
export async function createFixture(element) {
  let el;
  // Check to see if we need to return a React wrapper.
  if ('React' in window) {
    el = await reactWrapper(element);
  // Check to see if we need to return a Vue wrapper.
  } else if ('Vue' in window) {
    el = await vueWrapper(element);
  // If not, use a standard fixture for creating a rendered element.
  } else {
    el = await fixture(html([element]));
  }
  return el;
}
