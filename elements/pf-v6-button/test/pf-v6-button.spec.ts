import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';

import { PfV6Button } from '@patternfly/elements/pf-v6-button/pf-v6-button.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-v6-button>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-button')).to.be.an.instanceof(PfV6Button);
  });

  it('should upgrade', async function() {
    const el = await createFixture(html`<pf-v6-button>Button</pf-v6-button>`);
    expect(el, 'pf-v6-button should be an instance of PfV6Button')
        .to.be.an.instanceof(customElements.get('pf-v6-button'))
        .and
        .to.be.an.instanceof(PfV6Button);
  });

  describe('simply instantiating', function() {
    let element: PfV6Button;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button>Save</pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('has button role', function() {
      expect(snapshot.role).to.equal('button');
    });

    it('exposes its label', function() {
      expect(snapshot.name).to.equal('Save');
    });

    it('defaults to the primary variant', function() {
      expect(element.variant).to.equal('primary');
    });
  });

  describe('with accessible-label', function() {
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      await createFixture<PfV6Button>(html`
        <pf-v6-button variant="plain" accessible-label="Close"></pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('uses accessible-label as the accessible name', function() {
      expect(snapshot.name).to.equal('Close');
    });
  });

  describe('disabled', function() {
    let element: PfV6Button;
    let clicks: number;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      clicks = 0;
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button disabled>Disabled</pf-v6-button>
      `);
      element.addEventListener('click', function() {
        clicks += 1;
      });
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('matches :disabled', function() {
      expect(element.matches(':disabled')).to.be.true;
    });

    it('reflects disabled in the accessibility tree', function() {
      expect(snapshot.disabled).to.be.true;
    });

    it('does not fire click handlers when activated', async function() {
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(clicks).to.equal(0);
    });
  });

  describe('disabled-focusable', function() {
    let element: PfV6Button;
    let clicks: number;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      clicks = 0;
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button disabled-focusable>Disabled focusable</pf-v6-button>
      `);
      element.addEventListener('click', function() {
        clicks += 1;
      });
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('remains in the accessibility tree as a button', function() {
      expect(snapshot.role).to.equal('button');
    });

    it('does not fire click handlers when activated', async function() {
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(clicks).to.equal(0);
    });
  });

  describe('favorite toggle', function() {
    let element: PfV6Button;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button
          variant="plain"
          favorite
          accessible-label="not starred"
        ></pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('exposes aria-pressed as false when not favorited', function() {
      expect(snapshot.pressed).to.equal(false);
    });

    describe('when favorited', function() {
      beforeEach(async function() {
        element.favorited = true;
        element.accessibleLabel = 'starred';
        await element.updateComplete;
        snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
      });

      it('exposes aria-pressed as true', function() {
        expect(snapshot.pressed).to.equal(true);
      });
    });
  });

  describe('variants', function() {
    for (const variant of [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'link',
      'plain',
      'control',
      'stateful',
    ] as const) {
      it(`accepts the ${variant} variant`, async function() {
        const element = await createFixture<PfV6Button>(html`
          <pf-v6-button variant="${variant}" accessible-label="${variant}"></pf-v6-button>
        `);
        expect(element.variant).to.equal(variant);
      });
    }
  });

  describe('loading', function() {
    describe('when loading is set', function() {
      let element: PfV6Button;

      beforeEach(async function() {
        element = await createFixture<PfV6Button>(html`
          <pf-v6-button loading loading-label="Saving">Loading</pf-v6-button>
        `);
      });

      it('reflects the loading attribute as true', function() {
        expect(element.loading).to.be.true;
        expect(element.hasAttribute('loading')).to.be.true;
      });

      it('exposes loading-label', function() {
        expect(element.loadingLabel).to.equal('Saving');
      });
    });

    describe('when loading is omitted', function() {
      let element: PfV6Button;

      beforeEach(async function() {
        element = await createFixture<PfV6Button>(html`
          <pf-v6-button>Idle</pf-v6-button>
        `);
      });

      it('defaults to null (no progress layout)', function() {
        expect(element.loading).to.be.null;
      });
    });

    describe('when loading="false"', function() {
      let element: PfV6Button;

      beforeEach(async function() {
        element = await createFixture<PfV6Button>(html`
          <pf-v6-button loading="false">Reserved</pf-v6-button>
        `);
      });

      it('parses as false for reserved progress padding', function() {
        expect(element.loading).to.be.false;
        expect(element.getAttribute('loading')).to.equal('false');
      });
    });

    describe('icon-only button loading with a custom loading-label', function() {
      let element: PfV6Button;
      let snapshot: A11yTreeSnapshot;

      beforeEach(async function() {
        element = await createFixture<PfV6Button>(html`
          <pf-v6-button
            variant="plain"
            loading
            loading-label="Uploading data"
          ></pf-v6-button>
        `);
        snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
      });

      it('exposes loading-label as the accessible name, not a generic default', function() {
        // Regression test: the nested `pf-v6-spinner` is an ARIA "range"
        // role. When a button's name is computed from content, browsers
        // substitute the embedded range widget's *value* (aria-valuetext)
        // rather than its name. Without `value-text` wired to match
        // `loading-label`, the button's name collapsed to a generic
        // "Loading..." regardless of the author-provided label.
        expect(snapshot.name).to.equal('Uploading data');
      });
    });
  });

  describe('icon-position', function() {
    it('accepts deprecated right as an end alias', async function() {
      const element = await createFixture<PfV6Button>(html`
        <pf-v6-button icon-position="right" icon="arrow-right">Next</pf-v6-button>
      `);
      expect(element.iconPosition).to.equal('right');
    });
  });

  describe('icon slot', function() {
    let withIcon: PfV6Button;
    let withoutIcon: PfV6Button;

    beforeEach(async function() {
      withIcon = await createFixture<PfV6Button>(html`
        <pf-v6-button>
          Download
          <svg slot="icon" width="16" height="16" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z"></path>
          </svg>
        </pf-v6-button>
      `);
      withoutIcon = await createFixture<PfV6Button>(html`
        <pf-v6-button>Download</pf-v6-button>
      `);
    });

    it('renders wider than an equivalent button with no slotted icon', function() {
      expect(withIcon.offsetWidth).to.be.greaterThan(withoutIcon.offsetWidth);
    });
  });

  describe('count slot', function() {
    let withCount: PfV6Button;
    let withoutCount: PfV6Button;

    beforeEach(async function() {
      withCount = await createFixture<PfV6Button>(html`
        <pf-v6-button>
          Issues
          <span slot="count">7</span>
        </pf-v6-button>
      `);
      withoutCount = await createFixture<PfV6Button>(html`
        <pf-v6-button>Issues</pf-v6-button>
      `);
    });

    it('renders wider than an equivalent button with no slotted count', function() {
      expect(withCount.offsetWidth).to.be.greaterThan(withoutCount.offsetWidth);
    });
  });

  describe('size', function() {
    let small: PfV6Button;
    let regular: PfV6Button;
    let large: PfV6Button;

    beforeEach(async function() {
      small = await createFixture<PfV6Button>(html`<pf-v6-button size="sm">Button</pf-v6-button>`);
      regular = await createFixture<PfV6Button>(html`<pf-v6-button>Button</pf-v6-button>`);
      large = await createFixture<PfV6Button>(html`<pf-v6-button size="lg">Button</pf-v6-button>`);
    });

    it('reflects sm and lg as attributes', function() {
      expect(small.getAttribute('size')).to.equal('sm');
      expect(large.getAttribute('size')).to.equal('lg');
      expect(regular.hasAttribute('size')).to.be.false;
    });

    it('renders sm shorter than the default size', function() {
      expect(small.offsetHeight).to.be.lessThan(regular.offsetHeight);
    });

    it('renders lg taller than the default size', function() {
      expect(large.offsetHeight).to.be.greaterThan(regular.offsetHeight);
    });
  });

  describe('block', function() {
    let wrapper: HTMLDivElement;
    let element: PfV6Button;

    beforeEach(async function() {
      wrapper = await createFixture<HTMLDivElement>(html`
        <div style="width: 320px;">
          <pf-v6-button block>Full width</pf-v6-button>
        </div>
      `);
      element = wrapper.querySelector('pf-v6-button')!;
    });

    it('spans the full width of its parent', function() {
      expect(element.offsetWidth).to.equal(wrapper.offsetWidth);
    });
  });

  describe('circle', function() {
    let nonCircle: PfV6Button;
    let circle: PfV6Button;

    beforeEach(async function() {
      nonCircle = await createFixture<PfV6Button>(html`
        <pf-v6-button variant="plain" accessible-label="Add">
          <svg slot="icon" width="16" height="16" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z"></path>
          </svg>
        </pf-v6-button>
      `);
      circle = await createFixture<PfV6Button>(html`
        <pf-v6-button variant="plain" circle accessible-label="Add">
          <svg slot="icon" width="16" height="16" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z"></path>
          </svg>
        </pf-v6-button>
      `);
    });

    it('reflects the circle attribute', function() {
      expect(circle.hasAttribute('circle')).to.be.true;
      expect(nonCircle.hasAttribute('circle')).to.be.false;
    });

    it('renders a roughly square footprint for an icon-only button', function() {
      expect(circle.offsetWidth).to.be.closeTo(circle.offsetHeight, 8);
    });
  });

  describe('state', function() {
    for (const state of ['read', 'unread', 'attention'] as const) {
      it(`accepts the ${state} state`, async function() {
        const element = await createFixture<PfV6Button>(html`
          <pf-v6-button variant="stateful" state="${state}">Messages</pf-v6-button>
        `);
        expect(element.state).to.equal(state);
      });
    }

    describe('when variant is stateful and state is unset', function() {
      let read: PfV6Button;
      let unread: PfV6Button;
      let defaulted: PfV6Button;
      let attention: PfV6Button;

      beforeEach(async function() {
        read = await createFixture<PfV6Button>(html`
          <pf-v6-button variant="stateful" state="read">Messages</pf-v6-button>
        `);
        unread = await createFixture<PfV6Button>(html`
          <pf-v6-button variant="stateful" state="unread">Messages</pf-v6-button>
        `);
        defaulted = await createFixture<PfV6Button>(html`
          <pf-v6-button variant="stateful">Messages</pf-v6-button>
        `);
        attention = await createFixture<PfV6Button>(html`
          <pf-v6-button variant="stateful" state="attention">Messages</pf-v6-button>
        `);
      });

      function background(element: PfV6Button): string {
        const part = element.shadowRoot!.querySelector('[part="button"]')!;
        return getComputedStyle(part).backgroundColor;
      }

      it('defaults to the same styling as the explicit unread state', function() {
        expect(background(defaulted)).to.equal(background(unread));
      });

      it('renders each state with a visually distinct background', function() {
        expect(background(read)).to.not.equal(background(unread));
        expect(background(read)).to.not.equal(background(attention));
        expect(background(unread)).to.not.equal(background(attention));
      });
    });
  });

  describe('hamburger', function() {
    let element: PfV6Button;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button
          variant="plain"
          hamburger
          expanded
          accessible-label="Toggle navigation"
        ></pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('reflects expanded in the accessibility tree', function() {
      expect(snapshot.expanded).to.be.true;
    });

    it('accepts a hamburger-variant', async function() {
      element.hamburgerVariant = 'collapse';
      await element.updateComplete;
      expect(element.getAttribute('hamburger-variant')).to.equal('collapse');
    });

    describe('when collapsed', function() {
      beforeEach(async function() {
        element.expanded = false;
        await element.updateComplete;
        snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
      });

      it('reflects expanded as false', function() {
        expect(snapshot.expanded).to.be.false;
      });
    });
  });

  describe('settings', function() {
    let element: PfV6Button;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button variant="plain" settings accessible-label="Settings"></pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('reflects the settings attribute', function() {
      expect(element.hasAttribute('settings')).to.be.true;
    });

    it('exposes an accessible name', function() {
      expect(snapshot.name).to.equal('Settings');
    });
  });

  describe('link with href', function() {
    let element: PfV6Button;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button variant="link" href="#destination">Docs</pf-v6-button>
      `);
    });

    it('exposes href for link buttons', function() {
      expect(element.href).to.equal('#destination');
      expect(element.variant).to.equal('link');
    });
  });

  describe('form association', function() {
    it('is a form-associated custom element', function() {
      expect(PfV6Button.formAssociated).to.be.true;
    });

    describe('submit', function() {
      let form: HTMLFormElement;
      let element: PfV6Button;
      let submitData: FormData | null;

      beforeEach(async function() {
        submitData = null;
        form = await createFixture(html`
          <form>
            <pf-v6-button type="submit" name="save" value="yes">Save</pf-v6-button>
          </form>
        `);
        element = form.querySelector('pf-v6-button')!;
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          submitData = new FormData(form);
        });
        await element.updateComplete;
      });

      it('associates with the owning form', function() {
        expect(element.form).to.equal(form);
      });

      it('submits name and value via ElementInternals', async function() {
        await clickElementAtCenter(element);
        expect(submitData).to.be.ok;
        expect(submitData!.get('save')).to.equal('yes');
      });
    });

    describe('reset', function() {
      let form: HTMLFormElement;
      let element: PfV6Button;
      let input: HTMLInputElement;

      beforeEach(async function() {
        form = await createFixture(html`
          <form>
            <input name="name" value="initial">
            <pf-v6-button type="reset">Reset</pf-v6-button>
          </form>
        `);
        element = form.querySelector('pf-v6-button')!;
        input = form.querySelector('input')!;
        input.value = 'changed';
        await element.updateComplete;
      });

      it('resets the owning form via ElementInternals', async function() {
        await clickElementAtCenter(element);
        expect(input.value).to.equal('initial');
      });
    });

    describe('type=button', function() {
      let form: HTMLFormElement;
      let element: PfV6Button;
      let submitted: boolean;

      beforeEach(async function() {
        submitted = false;
        form = await createFixture(html`
          <form>
            <pf-v6-button type="button">No submit</pf-v6-button>
          </form>
        `);
        element = form.querySelector('pf-v6-button')!;
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          submitted = true;
        });
        await element.updateComplete;
      });

      it('does not submit the form', async function() {
        await clickElementAtCenter(element);
        expect(submitted).to.be.false;
      });
    });

    describe('default type', function() {
      let form: HTMLFormElement;
      let element: PfV6Button;
      let submitted: boolean;

      beforeEach(async function() {
        submitted = false;
        form = await createFixture(html`
          <form>
            <pf-v6-button>Default</pf-v6-button>
          </form>
        `);
        element = form.querySelector('pf-v6-button')!;
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          submitted = true;
        });
        await element.updateComplete;
      });

      it('does not submit the form (React type=button default)', async function() {
        await clickElementAtCenter(element);
        expect(submitted).to.be.false;
      });
    });
  });

  describe('in a fieldset', function() {
    let element: PfV6Button;
    let fieldset: HTMLFieldSetElement;
    let form: HTMLFormElement;
    let submitEvent: SubmitEvent;

    beforeEach(async function() {
      form = await createFixture(html`
        <form>
          <input id="pre">
          <fieldset>
            <pf-v6-button type="submit">OK</pf-v6-button>
          </fieldset>
          <input id="post">
        </form>
      `);
      fieldset = form.querySelector('fieldset')!;
      element = form.querySelector('pf-v6-button')!;
      form.querySelector('input')?.focus();
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitEvent = event;
      });
      await element.updateComplete;
    });

    afterEach(function() {
      // @ts-expect-error: resetting fixture
      submitEvent = undefined;
    });

    describe('clicking the button', function() {
      beforeEach(async function() {
        await clickElementAtCenter(element);
      });
      it('submits the form', function() {
        expect(submitEvent).to.be.ok;
      });
    });

    describe('tabbing through', function() {
      beforeEach(press('Tab'));
      it('does focus the button', function() {
        expect(document.activeElement).to.be.an.instanceof(PfV6Button);
      });

      describe('pressing Space', function() {
        beforeEach(press(' '));
        it('submits the form', function() {
          expect(submitEvent).to.be.ok;
        });
      });

      describe('pressing Enter', function() {
        beforeEach(press('Enter'));
        it('submits the form', function() {
          expect(submitEvent).to.be.ok;
        });
      });
    });

    describe('disabling the fieldset', function() {
      beforeEach(async function() {
        fieldset.disabled = true;
        await element.updateComplete;
      });
      it('disables the button', function() {
        expect(element.matches(':disabled'), 'matches :disabled').to.be.true;
      });
      describe('tabbing through', function() {
        beforeEach(press('Tab'));
        it('does not focus the button', function() {
          expect(document.activeElement).to.not.be.an.instanceof(PfV6Button);
        });
      });
      describe('then disabling the button', function() {
        beforeEach(async function() {
          element.disabled = true;
          await element.updateComplete;
        });
        describe('then enabling the button', function() {
          beforeEach(async function() {
            element.disabled = false;
            await element.updateComplete;
          });
          describe('then enabling the fieldset', function() {
            beforeEach(async function() {
              fieldset.disabled = false;
              await element.updateComplete;
            });
            describe('tabbing through', function() {
              beforeEach(press('Tab'));
              it('does focus the button', function() {
                expect(document.activeElement).to.be.an.instanceof(PfV6Button);
              });
            });
          });
        });
      });
    });
  });
});
