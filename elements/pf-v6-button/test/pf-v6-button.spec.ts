import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';

import { PfV6Button } from '@patternfly/elements/pf-v6-button/pf-v6-button.js';
import { PfV6Badge } from '@patternfly/elements/pf-v6-badge/pf-v6-badge.js';

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

  describe('tabindex', function() {
    it('defaults to 0', async function() {
      const element = await createFixture<PfV6Button>(html`
        <pf-v6-button>Save</pf-v6-button>
      `);
      await element.updateComplete;
      expect(element.tabIndex).to.equal(0);
    });

    it('preserves an authored tabindex=-1 across updates', async function() {
      const element = await createFixture<PfV6Button>(html`
        <pf-v6-button tabindex="-1">Save</pf-v6-button>
      `);
      await element.updateComplete;
      element.requestUpdate();
      await element.updateComplete;
      expect(element.getAttribute('tabindex')).to.equal('-1');
    });

    it('preserves a tabindex assigned after the first render', async function() {
      const element = await createFixture<PfV6Button>(html`
        <pf-v6-button>Save</pf-v6-button>
      `);
      await element.updateComplete;
      element.tabIndex = -1;
      element.requestUpdate();
      await element.updateComplete;
      expect(element.getAttribute('tabindex')).to.equal('-1');
    });

    it('restores an authored tabindex after being disabled', async function() {
      const element = await createFixture<PfV6Button>(html`
        <pf-v6-button tabindex="-1">Save</pf-v6-button>
      `);
      await element.updateComplete;
      element.disabled = true;
      await element.updateComplete;
      await nextFrame();
      expect(element.hasAttribute('tabindex')).to.be.false;
      element.disabled = false;
      await element.updateComplete;
      await nextFrame();
      expect(element.getAttribute('tabindex')).to.equal('-1');
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
        const part = element.shadowRoot!.querySelector('[part="button"]')!;
        expect(part.classList.contains(variant), `renders the ${variant} class`).to.be.true;
      });
    }

    describe('filled variants', function() {
      const variants = ['primary', 'secondary', 'tertiary', 'danger', 'warning'] as const;
      let elements: Record<string, PfV6Button>;

      beforeEach(async function() {
        elements = {};
        for (const variant of variants) {
          const element = await createFixture<PfV6Button>(html`
            <pf-v6-button variant="${variant}" accessible-label="${variant}"></pf-v6-button>
          `);
          await element.updateComplete;
          elements[variant] = element;
        }
      });

      function background(element: PfV6Button): string {
        const part = element.shadowRoot!.querySelector('[part="button"]')!;
        return getComputedStyle(part).backgroundColor;
      }

      it('renders the filled variants with distinct backgrounds', function() {
        const backgrounds = ['primary', 'danger', 'warning'].map(v => background(elements[v]!));
        expect(new Set(backgrounds).size, 'unique backgrounds').to.equal(3);
      });

      it('renders secondary and tertiary unfilled', function() {
        for (const variant of ['secondary', 'tertiary'] as const) {
          expect(background(elements[variant]!), `${variant} background`).to.equal('rgba(0, 0, 0, 0)');
        }
      });
    });

    describe('stateful variant', function() {
      it('remains a button in the accessibility tree', async function() {
        await createFixture<PfV6Button>(html`
          <pf-v6-button variant="stateful" state="unread">Messages</pf-v6-button>
        `);
        const snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
        expect(snapshot.role).to.equal('button');
        expect(snapshot.name).to.equal('Messages');
      });
    });
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

      it('renders no spinner', function() {
        expect(element.shadowRoot!.querySelector('pf-v6-spinner')).to.not.be.ok;
        expect(element.shadowRoot!.querySelector('[part="progress"]')).to.not.be.ok;
      });

      it('reserves progress padding', async function() {
        const idle = await createFixture<PfV6Button>(html`<pf-v6-button>Reserved</pf-v6-button>`);
        await idle.updateComplete;
        await element.updateComplete;
        expect(element.offsetWidth, 'wider than an idle button').to.be.greaterThan(idle.offsetWidth);
      });
    });

    describe('icon-only button loading with a custom loading-label', function() {
      let snapshot: A11yTreeSnapshot;

      beforeEach(async function() {
        await createFixture<PfV6Button>(html`
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

    it('applies icon-end styling for the deprecated right alias', async function() {
      const element = await createFixture<PfV6Button>(html`
        <pf-v6-button icon-position="right" icon="angle-right">Label</pf-v6-button>
      `);
      await element.updateComplete;
      const icon = element.shadowRoot!.querySelector('#icon')!;
      expect(icon.classList.contains('icon-end')).to.be.true;
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

  describe('dev warnings', function() {
    let errors: string[];
    let originalError: typeof console.error;

    beforeEach(function() {
      originalError = console.error;
      errors = [];
      console.error = function(...args: unknown[]) {
        errors.push(args.join(' '));
      };
    });

    afterEach(function() {
      console.error = originalError;
    });

    it('warns when hamburger is set without expanded', async function() {
      await createFixture<PfV6Button>(html`
        <pf-v6-button hamburger accessible-label="Toggle navigation"></pf-v6-button>
      `);
      expect(errors.some(x => x.includes('hamburger'))).to.be.true;
    });

    it('warns when icon-only has no accessible-label', async function() {
      await createFixture<PfV6Button>(html`
        <pf-v6-button variant="plain" icon="bars"></pf-v6-button>
      `);
      expect(errors.some(x => x.includes('accessible-label'))).to.be.true;
    });

    it('does not warn when the host has aria-label', async function() {
      await createFixture<PfV6Button>(html`
        <pf-v6-button variant="plain" icon="bars" aria-label="Menu"></pf-v6-button>
      `);
      expect(errors).to.have.length(0);
    });
  });

  describe('link with href', function() {
    let element: PfV6Button;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button variant="link" href="#destination">Docs</pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('exposes href for link buttons', function() {
      expect(element.href).to.equal('#destination');
      expect(element.variant).to.equal('link');
    });

    it('does not expose role button on the host', function() {
      expect(snapshot.role).to.not.equal('button');
    });

    it('exposes a link in the accessibility tree', async function() {
      const tree = await a11ySnapshot();
      expect(tree).to.axContainQuery({ role: 'link', name: 'Docs' });
    });

    it('renders an anchor with the href', function() {
      const anchor = element.shadowRoot!.querySelector('a#button')!;
      expect(anchor).to.be.ok;
      expect(anchor.getAttribute('href')).to.equal('#destination');
    });

    it('sets tabindex -1 on the anchor when disabled', async function() {
      element.disabled = true;
      await element.updateComplete;
      const anchor = element.shadowRoot!.querySelector('a#button')!;
      expect(anchor.tabIndex).to.equal(-1);
    });

    it('does not dispatch a synthetic click on Space or Enter', function() {
      let clicks = 0;
      element.addEventListener('click', function() {
        clicks += 1;
      });
      element.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter', bubbles: true, composed: true,
      }));
      element.dispatchEvent(new KeyboardEvent('keydown', {
        key: ' ', bubbles: true, composed: true,
      }));
      expect(clicks).to.equal(0);
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

    describe('type=button with a name and value', function() {
      let form: HTMLFormElement;
      let element: PfV6Button;
      let submitData: FormData | null;

      beforeEach(async function() {
        submitData = null;
        form = await createFixture(html`
          <form>
            <pf-v6-button type="button" name="action" value="noop">Nope</pf-v6-button>
          </form>
        `);
        element = form.querySelector('pf-v6-button')!;
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          submitData = new FormData(form);
        });
        await element.updateComplete;
      });

      it('does not contribute a name/value pair to form data', async function() {
        await clickElementAtCenter(element);
        form.requestSubmit();
        expect(submitData).to.be.ok;
        expect(submitData!.has('action')).to.be.false;
      });
    });

    describe('with multiple submit buttons', function() {
      let form: HTMLFormElement;
      let save: PfV6Button;
      let cancel: PfV6Button;
      let submitData: FormData | null;

      beforeEach(async function() {
        submitData = null;
        form = await createFixture(html`
          <form>
            <pf-v6-button type="submit" name="action" value="save">Save</pf-v6-button>
            <pf-v6-button type="submit" name="action" value="cancel">Cancel</pf-v6-button>
          </form>
        `);
        [save, cancel] = form.querySelectorAll('pf-v6-button');
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          submitData = new FormData(form);
        });
        await Promise.all([save.updateComplete, cancel.updateComplete]);
      });

      it('only contributes the activated submitter value', async function() {
        await clickElementAtCenter(cancel);
        expect(submitData).to.be.ok;
        expect(submitData!.getAll('action')).to.deep.equal(['cancel']);
      });
    });

    it('submits a programmatically set name and value', async function() {
      const form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-button type="submit">Save</pf-v6-button>
        </form>
      `);
      const element = form.querySelector('pf-v6-button')!;
      let submitData: FormData | null = null;
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitData = new FormData(form);
      });
      await element.updateComplete;
      element.name = 'save';
      element.value = 'yes';
      await element.updateComplete;
      await clickElementAtCenter(element);
      expect(submitData).to.be.ok;
      expect(submitData!.get('save')).to.equal('yes');
    });
  });

  describe('implicit submission helper', function() {
    it('adds one hidden native submit button per form', async function() {
      const form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-button type="submit">One</pf-v6-button>
          <pf-v6-button type="submit">Two</pf-v6-button>
        </form>
      `);
      const helpers = form.querySelectorAll<HTMLButtonElement>(':scope > div > button[type="submit"]');
      expect(helpers.length).to.equal(1);
      expect(helpers[0].getAttribute('aria-hidden')).to.equal('true');
      expect(helpers[0].tabIndex).to.equal(-1);
      expect(getComputedStyle(helpers[0]).position).to.equal('absolute');
    });

    it('removes the helper when the last submit button disconnects', async function() {
      const form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-button type="submit">Save</pf-v6-button>
        </form>
      `);
      const button = form.querySelector('pf-v6-button')!;
      button.remove();
      await nextFrame();
      expect(form.querySelector('button[type="submit"]')).to.be.null;
    });

    it('does not add a helper for type=button', async function() {
      const form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-button type="button">Nope</pf-v6-button>
        </form>
      `);
      expect(form.querySelector('button[type="submit"]')).to.be.null;
    });

    it('submits the form on Enter from a text field', async function() {
      let submitted = false;
      const form = await createFixture<HTMLFormElement>(html`
        <form>
          <input name="q">
          <input name="scope">
          <pf-v6-button type="submit">Search</pf-v6-button>
        </form>
      `);
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitted = true;
      });
      form.querySelector('input')!.focus();
      await sendKeys({ press: 'Enter' });
      expect(submitted).to.be.true;
    });
  });

  describe('in a fieldset', function() {
    let element: PfV6Button;
    let fieldset: HTMLFieldSetElement;
    let form: HTMLFormElement;
    let submitEvent: SubmitEvent | undefined;

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

  describe('count badge in a fieldset', function() {
    let element: PfV6Button;
    let badge: PfV6Badge;
    let fieldset: HTMLFieldSetElement;

    beforeEach(async function() {
      const form = await createFixture(html`
        <form>
          <fieldset>
            <pf-v6-button>
              Issues
              <pf-v6-badge slot="count">3</pf-v6-badge>
            </pf-v6-button>
          </fieldset>
        </form>
      `);
      fieldset = form.querySelector('fieldset')!;
      element = form.querySelector('pf-v6-button')!;
      badge = element.querySelector('pf-v6-badge')!;
      await element.updateComplete;
      await badge.updateComplete;
    });

    it('disables the slotted badge when the fieldset is disabled', async function() {
      fieldset.disabled = true;
      await element.updateComplete;
      await element.updateComplete;
      expect(badge.hasAttribute('disabled'), 'badge disabled attribute').to.be.true;
    });

    it('re-enables the slotted badge when the fieldset is re-enabled', async function() {
      fieldset.disabled = true;
      await element.updateComplete;
      await element.updateComplete;
      fieldset.disabled = false;
      await element.updateComplete;
      await element.updateComplete;
      expect(badge.hasAttribute('disabled'), 'badge disabled attribute').to.be.false;
    });
  });
});
