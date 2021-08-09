// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect } from '@open-wc/testing/index-no-side-effects.js';

import { setViewport } from '@web/test-runner-commands';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '../../../test/utils/create-fixture.js';

// Import the element we're testing.
import '../dist/pfe-modal';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testElement =
  `<pfe-modal>
   </pfe-modal>
   `;

const smallModal = `
  <pfe-modal width="small">
    <pfe-button slot="pfe-modal--trigger">
      <button>Open a small modal</button>
    </pfe-button>
    <h2 slot="pfe-modal--header">Small modal</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </pfe-modal>
`;

const mediumModal = `
  <pfe-modal width="medium">
    <pfe-button slot="pfe-modal--trigger">
      <button>Open a medium modal</button>
    </pfe-button>
    <h2 slot="pfe-modal--header">Medium modal</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </pfe-modal>
`;

const largeModal = `
  <pfe-modal width="large">
    <pfe-button slot="pfe-modal--trigger">
      <button>Open a large modal</button>
    </pfe-button>
    <h2 slot="pfe-modal--header">Large modal</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </pfe-modal>
`;

describe("<pfe-modal>", () => {

  it("it should upgrade", async () => {
    const el = await createFixture(testElement);

    expect(el).to.be.an.instanceOf(
      customElements.get("pfe-modal"),
      'pfe-modal should be an instance of PfeModal'
    );
  });

  // Example test.
  it("should apply attributes correctly", async () => {
    // Use the same markup that's declared at the top of the file.
    const el = await createFixture(`
      <pfe-modal>
        <pfe-button slot="pfe-modal--trigger">
          <button>Open a modal</button>
        </pfe-button>
        <h2 slot="pfe-modal--header">Modal with a header</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </pfe-modal>
    `);
    const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
    const button = el.shadowRoot.querySelector('.pfe-modal__close');

    await new Promise(r => setTimeout(r, 25));
    expect(el.hasAttribute('has_trigger'), 'has_trigger').to.be.true;
    expect(el.hasAttribute('has_header'), 'has_header').to.be.true;
    expect(el.hasAttribute('has_body'), 'has_body').to.be.true;
    expect(modalWindow.getAttribute('tabindex'), 'modal__window tabindex').to.equal('0');
    expect(modalWindow.hasAttribute('hidden'), 'hidden').to.be.true;
    expect(button.getAttribute('aria-label'), 'button aria-label').to.equal('Close dialog');
  });

  it('should open the modal window when the trigger is clicked', async () => {
    const el = await createFixture(`
      <pfe-modal>
        <pfe-button slot="pfe-modal--trigger">
          <button>Open a modal</button>
        </pfe-button>
        <h2 slot="pfe-modal--header">Modal with a header</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </pfe-modal>
    `);
    const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
    const button = el.shadowRoot.querySelector('.pfe-modal__close');
    const trigger = el.querySelector('[slot=pfe-modal--trigger');

    trigger.click();

    expect(modalWindow.hasAttribute('hidden')).to.not.be.true;

    // reset
    button.click();
    expect(modalWindow.hasAttribute('hidden')).to.be.true;
  });

  it('it should remove the hidden attribute from the host on upgrade', async () => {
    const el = await createFixture(testElement);

    await new Promise(r => setTimeout(r, 25));
    // test for the hidden attribute on the host
    expect(el.hasAttribute('hidden')).to.not.be.true;
  });

  describe('on extra large screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 1600, height: 1200 });
    })

    describe('with width=small attribute', () => {
      it('has small modal width', async () => {
        const el = await createFixture(smallModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('560px');
      });
    });

    describe('with width=medium attribute', () => {
      it('has medium modal width', async () => {
        const el = await createFixture(mediumModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('840px');
      });
    });

    describe('with width=large attribute', () => {
      it('has large modal width', async () => {
        const el = await createFixture(largeModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('1120px');
      });
    });
  });

  describe('on large screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 1000, height: 800 });
    })

    describe('with width=small attribute', () => {
      it('has small modal width', async () => {
        const el = await createFixture(smallModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('560px');
      });
    });

    describe('with width=medium attribute', () => {
      it('has medium modal width', async () => {
        const el = await createFixture(mediumModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('840px');
      });
    });

    describe('with width=large attribute', () => {
      it('has large modal width', async () => {
        const el = await createFixture(largeModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('940px');
      });
    });
  });

  describe('on medium screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 768, height: 600 });
    })

    describe('with width=small attribute', () => {
      it('has small modal width', async () => {
        const el = await createFixture(smallModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('560px');
      });
    });

    describe('with width=medium attribute', () => {
      it('has medium modal width', async () => {
        const el = await createFixture(mediumModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('721.92px');
      });
    });

    describe('with width=large attribute', () => {
      it('has large modal width', async () => {
        const el = await createFixture(largeModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('721.92px');
      });
    });
  });

  describe('on small screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 480, height: 540 });
    })

    describe('with width=small attribute', () => {
      it('has small modal width', async () => {
        const el = await createFixture(smallModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('451.2px');
      });
    });

    describe('with width=medium attribute', () => {
      it('has medium modal width', async () => {
        const el = await createFixture(mediumModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('451.2px');
      });
    });

    describe('with width=large attribute', () => {
      it('has large modal width', async () => {
        const el = await createFixture(largeModal);
        const modalWindow = el.shadowRoot.querySelector('.pfe-modal__window');
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
          .to.equal('451.2px');
      });
    });
  });
});
