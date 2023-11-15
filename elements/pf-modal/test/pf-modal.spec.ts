import { expect, nextFrame, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport } from '@web/test-runner-commands';
import { PfModal } from '@patternfly/elements/pf-modal/pf-modal.js';
import '@patternfly/pfe-tools/test/stub-logger.js';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const TEMPLATES = {
  testElement: html`<pf-modal></pf-modal>`,

  smallModal: html`
    <pf-modal variant="small">
      <h2 slot="header">Small modal</h2>
      <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </pf-modal>
  `,

  mediumModal: html`
    <pf-modal variant="medium">
      <h2 slot="header">Medium modal</h2>
      <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </pf-modal>
  `,

  largeModal: html`
    <pf-modal variant="large">
      <h2 slot="header">Large modal</h2>
      <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </pf-modal>
  `,

};

describe('<pf-modal>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-modal')).to.be.an.instanceof(PfModal);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfModal>(TEMPLATES.testElement);
    expect(el, 'pf-modal should be an instance of PfModal')
        .to.be.an.instanceOf(customElements.get('pf-modal'))
        .and
        .to.be.an.instanceOf(PfModal);
  });

  // Example test.
  it('should apply attributes correctly', async function() {
    // Use the same markup that's declared at the top of the file.
    const el = await createFixture<PfModal>(html`
      <pf-modal>
        <h2 slot="header">Modal with a header</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </pf-modal>
    `);
    const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
    const button = el.shadowRoot!.querySelector('[part=close-button]')!;

    await nextFrame();

    expect(modalWindow.getAttribute('tabindex'), 'dialog tabindex').to.equal('0');
    expect(modalWindow.hasAttribute('hidden'), 'hidden').to.be.true;
    expect(button.getAttribute('aria-label'), 'button aria-label').to.equal('Close dialog');
  });

  it('should open the modal window when the trigger is clicked', async function() {
    const el = await createFixture<PfModal>(html`
      <pf-modal trigger="trigger">
        <h2 slot="header">Modal with a header</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </pf-modal>
      <pf-button id="trigger">Open a modal</pf-button>
    `);
    const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
    const trigger = document.getElementById('trigger')!;

    trigger.click();
    await el.updateComplete;

    expect(modalWindow.hasAttribute('hidden')).to.not.be.true;

    // reset
    el.close();
    await el.updateComplete;

    expect(modalWindow.hasAttribute('hidden')).to.be.true;
  });

  it('should remove the hidden attribute from the host on upgrade', async function() {
    const el = await createFixture<PfModal>(TEMPLATES.testElement);

    await new Promise(r => setTimeout(r, 25));
    // test for the hidden attribute on the host
    expect(el.hasAttribute('hidden')).to.not.be.true;
  });

  describe('on extra large screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 1600, height: 1200 });
    });

    describe('with variant=small attribute', function() {
      it('has small modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.smallModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=medium attribute', function() {
      it('has medium modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.mediumModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=large attribute', function() {
      it('has large modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.largeModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });
  });

  describe('on large screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 1000, height: 800 });
    });

    describe('with variant=small attribute', function() {
      it('has small modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.smallModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=medium attribute', function() {
      it('has medium modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.mediumModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=large attribute', function() {
      it('has large modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.largeModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });
  });

  describe('on medium screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 768, height: 600 });
    });

    describe('with variant=small attribute', function() {
      it('has small modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.smallModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=medium attribute', function() {
      it('has medium modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.mediumModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=large attribute', function() {
      it('has large modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.largeModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });
  });

  describe('on small screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 480, height: 540 });
    });

    describe('with variant=small attribute', function() {
      it('has small modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.smallModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=medium attribute', function() {
      it('has medium modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.mediumModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });

    describe('with variant=large attribute', function() {
      it('has large modal width', async function() {
        const el = await createFixture<PfModal>(TEMPLATES.largeModal);
        const modalWindow = el.shadowRoot!.querySelector('#dialog')!;
        expect(getComputedStyle(modalWindow).getPropertyValue('max-width'))
            .to.equal('calc(100% - 32px)');
      });
    });
  });
});
