import { html, expect, aTimeout, nextFrame } from '@open-wc/testing';
import { ifDefined } from 'lit/directives/if-defined.js';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

// Import the element we're testing.
import { PfeProgressSteps } from '@patternfly/pfe-progress-steps';
import { PfeProgressStepsItem } from '@patternfly/pfe-progress-steps/pfe-progress-steps-item';

const itemTemplate = (
  title = '',
  description = '',
  state?: PfeProgressStepsItem['state'],
  current = false
) => html`
   <pfe-progress-steps-item state="${ifDefined(state)}" ?current=${current}>
   ${title ? html`<span slot="title">${title}</span>` : ''}
   ${description ? html`<span slot="description">${description}</span>` : ''}
   </pfe-progress-steps-item>`;

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const TEMPLATE = html`
  <pfe-progress-steps>
    ${itemTemplate('First', 'View first step', 'done')}
    ${itemTemplate('Current', 'View current step', 'active', true)}
    ${itemTemplate('Last', 'View last step')}
  </pfe-progress-steps>
  `;

// @TODO pfe-progress-steps needs more tests written
describe('<pfe-progress-steps>', function() {
  it('it should upgrade', async function() {
    const el = await createFixture<PfeProgressSteps>(TEMPLATE);
    expect(el)
      .to.be.an.instanceOf(customElements.get('pfe-progress-steps'))
      .and
      .to.be.an.instanceOf(PfeProgressSteps);
  });

  // Vertical attribute test.
  it('should cascade the vertical attribute to it\'s children', async function() {
    // Use the same markup that's declared at the top of the file.
    const el = await createFixture<PfeProgressSteps>(TEMPLATE);
    const items = el.querySelectorAll('pfe-progress-steps-item');
    el.setAttribute('vertical', '');

    // a little sleep to shake out the drowsiness
    await aTimeout(100);

    for (const item of items) {
      expect(item.hasAttribute('vertical')).to.be.true;
    }
  });

  // Title slot test.
  it('should have a title slot', async function() {
    // If you need custom markup for this single test, pass it into the
    // fixture wrapper.
    const el = await createFixture<PfeProgressSteps>(TEMPLATE);
    const item = el.querySelector('pfe-progress-steps-item')!;

    const shadowTitle = item.shadowRoot!.querySelector('slot[name=title]');
    expect(shadowTitle).to.exist;

    const title = item.querySelector('[slot=title]')!;
    expect(title.textContent).to.equal('First');
  });

  // Description slot test.
  it('should have a description slot', async function() {
    // If you need custom markup for this single test, pass it into the
    // fixture wrapper.
    const el = await createFixture<PfeProgressSteps>(TEMPLATE);
    const item = el.querySelector('pfe-progress-steps-item')!;

    const shadowDescription = item.shadowRoot!.querySelector('slot[name=description]');
    expect(shadowDescription).to.exist;

    const description = item.querySelector('[slot=description]')!;
    expect(description.textContent).to.equal('View first step');
  });

  describe('<pfe-progress-steps-item>', function() {
    it('should be horizontal by default', async function() {
      const el = await createFixture<PfeProgressSteps>(TEMPLATE);
      // get an array of the positions of each item
      const items = [...el.querySelectorAll('pfe-progress-steps-item')]
        .map(i => i.offsetTop);
        // see if these positions are stacked on top of one another
        // we use every so we can exit early.
      const isEven = items.every((_, index) => {
        // if there is a next item to work with
        if (typeof items[index + 1] === 'undefined') {
          return true;
        }
        // check if the item offsets are equal to see if it's a row
        return items[index + 1] === items[index];
      });
      expect(isEven).to.be.true;
    });

    it('should have a stacked layout on vertical', async function() {
      const el = await createFixture<PfeProgressSteps>(TEMPLATE);
      el.setAttribute('vertical', '');
      // get an array of the positions of each item
      const items = [...el.querySelectorAll('pfe-progress-steps-item')]
        .map(i => i.offsetTop);
        // see if these positions are stacked on top of one another
        // we use every so we can exit early.
      const isStacked = items.every((_, index) => {
        // if there is a next item to work with
        if (typeof items[index + 1] === 'undefined') {
          return true;
        }
        // if the next item offset is greater than the current then it's stacked
        return items[index + 1] >= items[index];
      });
      expect(isStacked).to.be.true;
    });
  });

  describe('progress bar', function() {
    it(`should have a length that spans from the middle of the first item to the middle of the last item`, async function() {
      const element = await createFixture<PfeProgressSteps>(TEMPLATE);
      const [firstItem, middleItem, lastItem] = [...element.querySelectorAll('pfe-progress-steps-item')];

      await Promise.all([firstItem.updateComplete, middleItem.updateComplete, lastItem.updateComplete]);
      await nextFrame();

      // get the centerpoint of the items
      const firstItemMidpoint = firstItem.offsetLeft + firstItem.offsetWidth / 2;
      const lastItemMidpoint = lastItem.offsetLeft + (middleItem.offsetWidth / 2);
      const { offsetWidth } = element.shadowRoot!.querySelector<HTMLElement>('.pfe-progress-steps__progress-bar')!;

      expect(offsetWidth).to.equal(lastItemMidpoint - firstItemMidpoint);
    });
  });
});
