import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfV6Checkbox } from '@patternfly/elements/pf-v6-checkbox/pf-v6-checkbox.js';

/**
 * Access the internals object the core controller exposes for a11y tooling.
 * @param element the custom element
 */
function internalsOf(element: HTMLElement): ElementInternals {
  return globalThis._elementInternals.get(element)!;
}

describe('<pf-v6-checkbox>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-checkbox')).to.be.an.instanceof(PfV6Checkbox);
  });

  describe('simply instantiating', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Test"></pf-v6-checkbox>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v6-checkbox');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV6Checkbox);
    });

    it('has accessible role', function() {
      expect(snapshot.role).to.equal('checkbox');
    });

    it('has accessible name from label', function() {
      expect(snapshot.name).to.equal('Test');
    });

    it('is not checked by default', function() {
      expect(element.checked).to.be.false;
      expect(snapshot.checked).to.be.false;
    });

    it('sets the checkbox role on internals', function() {
      expect(internalsOf(element).role).to.equal('checkbox');
    });
  });

  describe('with accessible-label attribute', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox accessible-label="Dark mode"></pf-v6-checkbox>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('has an accessible name from accessible-label', function() {
      expect(snapshot.name).to.equal('Dark mode');
    });

    it('keeps the same accessible name regardless of checked state', async function() {
      element.click();
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      expect(snapshot.name).to.equal('Dark mode');
    });
  });

  describe('with external label', function() {
    let container: HTMLElement;
    let element: PfV6Checkbox;
    let label: HTMLLabelElement;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      container = await createFixture<HTMLElement>(html`
        <div>
          <pf-v6-checkbox id="checkbox"></pf-v6-checkbox>
          <label for="checkbox">External label</label>
        </div>
      `);
      element = container.querySelector('pf-v6-checkbox')!;
      label = container.querySelector('label')!;
      snapshot = await a11ySnapshot({ selector: '#checkbox' });
    });

    it('is accessible', function() {
      expect(snapshot.role).to.equal('checkbox');
      expect(snapshot.name).to.equal('External label');
      expect(snapshot.checked).to.be.false;
    });

    it('exposes the associated label', function() {
      expect(Array.from(element.labels)).to.include(label);
    });

    describe('clicking the external label', function() {
      beforeEach(function() {
        label.click();
      });

      it('toggles the checkbox', function() {
        expect(element.checked).to.be.true;
      });
    });
  });

  describe('when checked attr is present', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Checked" checked></pf-v6-checkbox>
      `);
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('is checked', function() {
      expect(element.checked).to.be.true;
      expect(snapshot.checked).to.be.true;
    });
  });

  describe('clicking the checkbox', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Toggle me"></pf-v6-checkbox>
      `);
      element.click();
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('toggles the checked state', function() {
      expect(element.checked).to.be.true;
    });

    it('updates the accessible checked state', function() {
      expect(snapshot.checked).to.be.true;
    });

    it('reflects the checked attribute', function() {
      expect(element.hasAttribute('checked')).to.be.true;
    });
  });

  describe('clicking a checked checkbox', function() {
    let element: PfV6Checkbox;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Toggle me" checked></pf-v6-checkbox>
      `);
      element.click();
      await element.updateComplete;
    });

    it('unchecks the checkbox', function() {
      expect(element.checked).to.be.false;
      expect(element.hasAttribute('checked')).to.be.false;
    });
  });

  describe('visible label', function() {
    let element: PfV6Checkbox;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Click the label"></pf-v6-checkbox>
      `);
      await element.updateComplete;
    });

    it('shows a pointer cursor over the label', function() {
      const label = element.shadowRoot!.getElementById('label')!;
      expect(getComputedStyle(label).cursor).to.equal('pointer');
    });

    describe('clicking the label', function() {
      beforeEach(async function() {
        element.shadowRoot!.getElementById('label')!.click();
        await element.updateComplete;
      });

      it('toggles the checkbox', function() {
        expect(element.checked).to.be.true;
      });
    });
  });

  describe('with a native aria-label attribute', function() {
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      await createFixture(html`
        <pf-v6-checkbox aria-label="Select all rows"></pf-v6-checkbox>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('has an accessible name from aria-label', function() {
      expect(snapshot.name).to.equal('Select all rows');
    });
  });

  describe('with a native aria-labelledby attribute', function() {
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      await createFixture(html`
        <span id="name-source">Select all rows</span>
        <pf-v6-checkbox aria-labelledby="name-source"></pf-v6-checkbox>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('has an accessible name from aria-labelledby', function() {
      expect(snapshot.name).to.equal('Select all rows');
    });
  });

  describe('with a visible label and an author-provided name', function() {
    let snapshot: A11yTreeSnapshot;

    describe('with a non-empty aria-label', function() {
      beforeEach(async function() {
        await createFixture(html`
          <pf-v6-checkbox label="Visible label" aria-label="Aria label"></pf-v6-checkbox>
        `);
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('prefers the author-provided aria-label', function() {
        expect(snapshot.name).to.equal('Aria label');
      });
    });

    describe('with an empty aria-label', function() {
      beforeEach(async function() {
        const container = await createFixture<HTMLElement>(html`<div></div>`);
        const element = document.createElement('pf-v6-checkbox');
        element.label = 'Visible label';
        element.setAttribute('aria-label', '');
        container.append(element);
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('falls back to the visible label', function() {
        expect(snapshot.name).to.equal('Visible label');
      });
    });

    describe('with a non-empty aria-labelledby', function() {
      beforeEach(async function() {
        await createFixture(html`
          <span id="name-source">Labelled by</span>
          <pf-v6-checkbox label="Visible label" aria-labelledby="name-source"></pf-v6-checkbox>
        `);
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('prefers the author-provided aria-labelledby', function() {
        expect(snapshot.name).to.equal('Labelled by');
      });
    });

    describe('with an empty aria-labelledby', function() {
      beforeEach(async function() {
        const container = await createFixture<HTMLElement>(html`<div></div>`);
        const element = document.createElement('pf-v6-checkbox');
        element.label = 'Visible label';
        element.setAttribute('aria-labelledby', '');
        container.append(element);
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('falls back to the visible label', function() {
        expect(snapshot.name).to.equal('Visible label');
      });
    });

    describe('with an accessible-label', function() {
      beforeEach(async function() {
        await createFixture(html`
          <pf-v6-checkbox label="Visible label" accessible-label="Accessible label"></pf-v6-checkbox>
        `);
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('prefers the visible label', function() {
        expect(snapshot.name).to.equal('Visible label');
      });
    });
  });

  describe('tab order', function() {
    let first: PfV6Checkbox;
    let second: PfV6Checkbox;
    beforeEach(async function() {
      const container = await createFixture<HTMLElement>(html`
        <div>
          <pf-v6-checkbox label="First"></pf-v6-checkbox>
          <pf-v6-checkbox label="Second"></pf-v6-checkbox>
        </div>
      `);
      first = container.querySelectorAll('pf-v6-checkbox')[0]!;
      second = container.querySelectorAll('pf-v6-checkbox')[1]!;
    });

    it('moves focus forward with Tab and backward with Shift + Tab', async function() {
      first.focus();
      expect(document.activeElement).to.equal(first);
      await sendKeys({ press: 'Tab' });
      expect(document.activeElement).to.equal(second);
      await sendKeys({ down: 'Shift' });
      await sendKeys({ press: 'Tab' });
      await sendKeys({ up: 'Shift' });
      expect(document.activeElement).to.equal(first);
    });
  });

  describe('keyboard interaction', function() {
    let element: PfV6Checkbox;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Keyboard test"></pf-v6-checkbox>
      `);
      element.focus();
    });

    it('is focusable', function() {
      expect(element.tabIndex).to.equal(0);
      expect(document.activeElement).to.equal(element);
    });

    describe('pressing Space', function() {
      beforeEach(async function() {
        await sendKeys({ press: ' ' });
        await element.updateComplete;
      });

      it('toggles the checkbox', function() {
        expect(element.checked).to.be.true;
      });
    });

    describe('pressing Enter', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'Enter' });
        await element.updateComplete;
      });

      it('does not toggle the checkbox', function() {
        expect(element.checked).to.be.false;
      });
    });
  });

  describe('change and input events', function() {
    let element: PfV6Checkbox;
    let inputCount: number;
    let changeCount: number;
    beforeEach(async function() {
      inputCount = 0;
      changeCount = 0;
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Event test"></pf-v6-checkbox>
      `);
      element.addEventListener('input', () => inputCount++);
      element.addEventListener('change', () => changeCount++);
    });

    describe('clicking the checkbox', function() {
      beforeEach(async function() {
        element.click();
        await element.updateComplete;
      });

      it('fires input event', function() {
        expect(inputCount).to.equal(1);
      });

      it('fires change event', function() {
        expect(changeCount).to.equal(1);
      });
    });

    describe('clicking a disabled checkbox', function() {
      beforeEach(function() {
        element.disabled = true;
        element.click();
      });

      it('does not fire events', function() {
        expect(inputCount).to.equal(0);
        expect(changeCount).to.equal(0);
      });
    });
  });

  describe('indeterminate state', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Partial"></pf-v6-checkbox>
      `);
      element.indeterminate = true;
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('sets the inner input indeterminate property', function() {
      const input = element.shadowRoot!.getElementById('input') as HTMLInputElement;
      expect(input.indeterminate).to.be.true;
    });

    it('does not create an indeterminate attribute', function() {
      expect(element.hasAttribute('indeterminate')).to.be.false;
    });

    it('exposes aria-checked="mixed"', function() {
      expect(internalsOf(element).ariaChecked).to.equal('mixed');
      expect(snapshot.checked).to.equal('mixed');
    });

    describe('clicking the indeterminate checkbox', function() {
      beforeEach(async function() {
        element.click();
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('becomes checked', function() {
        expect(element.checked).to.be.true;
        expect(element.indeterminate).to.be.false;
      });

      it('clears the mixed state', function() {
        expect(snapshot.checked).to.be.true;
      });
    });
  });

  describe('when disabled', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Disabled" disabled></pf-v6-checkbox>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('reports disabled in the accessibility tree', function() {
      expect(snapshot.disabled).to.be.true;
    });

    it('is not focusable', function() {
      expect(element.tabIndex).to.equal(-1);
    });

    it('does not toggle when clicked', function() {
      element.click();
      expect(element.checked).to.be.false;
    });

    it('disables the inner input', function() {
      const input = element.shadowRoot!.getElementById('input') as HTMLInputElement;
      expect(input.disabled).to.be.true;
    });
  });

  describe('when inside a disabled fieldset', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      const form = await createFixture<HTMLFormElement>(html`
        <form>
          <fieldset disabled>
            <pf-v6-checkbox label="Disabled by fieldset"></pf-v6-checkbox>
          </fieldset>
        </form>
      `);
      element = form.querySelector('pf-v6-checkbox')!;
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('reports disabled in the accessibility tree', function() {
      expect(snapshot.disabled).to.be.true;
    });

    it('does not toggle when clicked', function() {
      element.click();
      expect(element.checked).to.be.false;
    });

    it('is not focusable', function() {
      expect(element.tabIndex).to.equal(-1);
    });
  });

  describe('moving in the DOM', function() {
    let container: HTMLElement;
    let element: PfV6Checkbox;
    beforeEach(async function() {
      container = await createFixture<HTMLElement>(html`
        <div><pf-v6-checkbox label="Movable"></pf-v6-checkbox></div>
      `);
      element = container.querySelector('pf-v6-checkbox')!;
      await element.updateComplete;
      element.disabled = true;
      await element.updateComplete;
      container.append(element);
      await element.updateComplete;
      element.disabled = false;
      await element.updateComplete;
    });

    it('is tabbable again after being re-enabled', function() {
      expect(element.tabIndex).to.equal(0);
    });
  });

  describe('moving in the DOM with an authored tabindex', function() {
    let container: HTMLElement;
    let element: PfV6Checkbox;
    beforeEach(async function() {
      container = await createFixture<HTMLElement>(html`
        <div><pf-v6-checkbox label="Custom" tabindex="-2"></pf-v6-checkbox></div>
      `);
      element = container.querySelector('pf-v6-checkbox')!;
      await element.updateComplete;
      element.disabled = true;
      await element.updateComplete;
      container.append(element);
      await element.updateComplete;
      element.disabled = false;
      await element.updateComplete;
    });

    it('preserves the authored tabindex across reconnection', function() {
      expect(element.tabIndex).to.equal(-2);
    });
  });

  describe('when required', function() {
    let element: PfV6Checkbox;
    beforeEach(async function() {
      const form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-checkbox label="Required" required></pf-v6-checkbox>
        </form>
      `);
      element = form.querySelector('pf-v6-checkbox')!;
    });

    it('is invalid while unchecked', function() {
      expect(element.validity.valueMissing).to.be.true;
      expect(element.checkValidity()).to.be.false;
    });

    it('exposes aria-required', function() {
      expect(internalsOf(element).ariaRequired).to.equal('true');
    });

    it('announces the checkbox as invalid while unchecked', async function() {
      await nextFrame();
      const snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      expect(snapshot.invalid).to.equal('true');
    });

    it('does not announce the checkbox as invalid once checked', async function() {
      element.click();
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      expect(snapshot.invalid).to.not.equal('true');
    });

    it('renders a required indicator', function() {
      const required = element.shadowRoot!.getElementById('required');
      expect(required).to.be.ok;
    });

    it('excludes the required indicator from the accessible name', async function() {
      await nextFrame();
      const snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      expect(snapshot.name).to.equal('Required');
    });

    it('is valid once checked', async function() {
      element.click();
      await element.updateComplete;
      expect(element.validity.valid).to.be.true;
      expect(element.checkValidity()).to.be.true;
    });
  });

  describe('custom validity', function() {
    let element: PfV6Checkbox;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Custom validity"></pf-v6-checkbox>
      `);
    });

    it('reports a custom error', function() {
      element.setCustomValidity('Nope');
      expect(element.validity.customError).to.be.true;
      expect(element.validationMessage).to.equal('Nope');
    });

    it('announces the custom error as invalid', function() {
      element.setCustomValidity('Nope');
      expect(internalsOf(element).ariaInvalid).to.equal('true');
    });

    it('clears a custom error', function() {
      element.setCustomValidity('Nope');
      element.setCustomValidity('');
      expect(element.validity.valid).to.be.true;
    });

    it('clears the invalid announcement when the custom error is cleared', function() {
      element.setCustomValidity('Nope');
      element.setCustomValidity('');
      expect(internalsOf(element).ariaInvalid).to.not.equal('true');
    });
  });

  describe('invalid state', function() {
    let element: PfV6Checkbox;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Invalid" invalid></pf-v6-checkbox>
      `);
      await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('exposes aria-invalid', function() {
      expect(internalsOf(element).ariaInvalid).to.equal('true');
    });
  });

  describe('description and body content', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="With content">
          <span slot="description">Helpful description</span>
          <span id="body-content">Custom body content</span>
        </pf-v6-checkbox>
      `);
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('renders the description slot', function() {
      const description = element.shadowRoot!.getElementById('description');
      expect(description?.hidden).to.be.false;
    });

    it('renders the body slot', function() {
      const body = element.shadowRoot!.getElementById('body');
      expect(body?.hidden).to.be.false;
      expect(element.querySelector('#body-content')).to.be.ok;
    });

    it('uses the description as the accessible description', function() {
      expect(snapshot.description).to.equal('Helpful description');
    });
  });

  describe('with an author-provided aria-describedby', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;

    describe('and a description slot', function() {
      beforeEach(async function() {
        const container = await createFixture<HTMLElement>(html`
          <div>
            <span id="external-description">External description</span>
            <pf-v6-checkbox label="With content" aria-describedby="external-description">
              <span slot="description">Slot description</span>
            </pf-v6-checkbox>
          </div>
        `);
        element = container.querySelector('pf-v6-checkbox')!;
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('uses the author-provided description', function() {
        expect(snapshot.description).to.equal('External description');
      });

      it('keeps the author-provided attribute', function() {
        expect(element.getAttribute('aria-describedby')).to.equal('external-description');
      });
    });

    describe('without a description slot', function() {
      beforeEach(async function() {
        const container = await createFixture<HTMLElement>(html`
          <div>
            <span id="external-description">External description</span>
            <pf-v6-checkbox label="With content" aria-describedby="external-description"></pf-v6-checkbox>
          </div>
        `);
        element = container.querySelector('pf-v6-checkbox')!;
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
      });

      it('uses the author-provided description', function() {
        expect(snapshot.description).to.equal('External description');
      });
    });
  });

  describe('label position', function() {
    let element: PfV6Checkbox;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Before" label-position="start"></pf-v6-checkbox>
      `);
    });

    it('renders the label before the input', function() {
      const children = Array.from(element.shadowRoot!.children);
      const labelIndex = children.findIndex(child => child.id === 'label');
      const inputIndex = children.findIndex(child => child.id === 'input');
      expect(labelIndex).to.be.lessThan(inputIndex);
    });

    it('reflects the label-position attribute', function() {
      expect(element.labelPosition).to.equal('start');
      expect(element.getAttribute('label-position')).to.equal('start');
    });
  });

  describe('controlled nested checkboxes', function() {
    let form: HTMLFormElement;
    let element: PfV6Checkbox;
    let nested: PfV6Checkbox[];
    beforeEach(async function() {
      form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-checkbox label="Select all">
            <pf-v6-checkbox label="One"></pf-v6-checkbox>
            <pf-v6-checkbox label="Two" checked></pf-v6-checkbox>
            <pf-v6-checkbox label="Three"></pf-v6-checkbox>
          </pf-v6-checkbox>
        </form>
      `);
      element = form.querySelector('pf-v6-checkbox')!;
      nested = Array.from(element.querySelectorAll('pf-v6-checkbox'));
      await element.updateComplete;
    });

    it('starts indeterminate when some nested checkboxes are checked', async function() {
      await nextFrame();
      expect(element.checked).to.be.false;
      expect(element.indeterminate).to.be.true;
    });

    describe('clicking the parent', function() {
      beforeEach(async function() {
        element.click();
        await element.updateComplete;
      });

      it('checks all nested checkboxes', function() {
        expect(nested.every(checkbox => checkbox.checked)).to.be.true;
      });

      it('becomes checked', function() {
        expect(element.checked).to.be.true;
        expect(element.indeterminate).to.be.false;
      });
    });

    describe('changing a nested checkbox', function() {
      beforeEach(async function() {
        nested[0].click();
        await element.updateComplete;
        await nextFrame();
      });

      it('becomes indeterminate', function() {
        expect(element.checked).to.be.false;
        expect(element.indeterminate).to.be.true;
      });

      it('exposes aria-checked="mixed"', function() {
        expect(internalsOf(element).ariaChecked).to.equal('mixed');
      });
    });

    describe('disabling a nested checkbox', function() {
      beforeEach(async function() {
        nested[1].disabled = true;
        await nested[1].updateComplete;
        await element.updateComplete;
      });

      it('excludes it from the aggregate state', function() {
        expect(element.checked).to.be.false;
        expect(element.indeterminate).to.be.false;
      });

      describe('re-enabling it', function() {
        beforeEach(async function() {
          nested[1].disabled = false;
          await nested[1].updateComplete;
          await element.updateComplete;
        });

        it('includes it in the aggregate state again', function() {
          expect(element.checked).to.be.false;
          expect(element.indeterminate).to.be.true;
        });
      });
    });
  });

  // The checkbox role sits on the host, so slotted content is a descendant of
  // the checkbox in the accessibility tree. `checkbox` is a children-presentational
  // role, so the exposure of those descendants relies on the UA keeping
  // interactive nodes. This test guards against nested checkboxes silently
  // disappearing from the accessibility tree. Firefox behaviour is not covered here.
  describe('accessibility tree exposure of slotted content', function() {
    let element: PfV6Checkbox;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Checkbox>(html`
        <pf-v6-checkbox label="Select all">
          <pf-v6-checkbox label="One"></pf-v6-checkbox>
          <pf-v6-checkbox label="Two"></pf-v6-checkbox>
        </pf-v6-checkbox>
      `);
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: 'pf-v6-checkbox' });
    });

    it('exposes the nested checkboxes', function() {
      expect(snapshot.children?.map(child => [child.role, child.name])).to.deep.equal([
        ['checkbox', 'One'],
        ['checkbox', 'Two'],
      ]);
    });
  });

  describe('form association', function() {
    let form: HTMLFormElement;
    let element: PfV6Checkbox;
    beforeEach(async function() {
      form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-checkbox label="Form checkbox" name="choice"></pf-v6-checkbox>
        </form>
      `);
      element = form.querySelector('pf-v6-checkbox')!;
    });

    it('exposes the name attribute as a property', function() {
      expect(element.name).to.equal('choice');
    });

    describe('when unchecked', function() {
      it('does not submit a value', function() {
        expect(new FormData(form).has('choice')).to.be.false;
      });
    });

    describe('when checked', function() {
      beforeEach(async function() {
        element.click();
        await element.updateComplete;
      });

      it('submits the default value "on"', function() {
        expect(new FormData(form).get('choice')).to.equal('on');
      });
    });

    describe('with a custom value', function() {
      beforeEach(async function() {
        element.value = 'custom';
        element.checked = true;
        await element.updateComplete;
      });

      it('submits the custom value', function() {
        expect(new FormData(form).get('choice')).to.equal('custom');
      });
    });

    describe('when disabled', function() {
      beforeEach(async function() {
        element.checked = true;
        element.disabled = true;
        await element.updateComplete;
      });

      it('does not submit a value', function() {
        expect(new FormData(form).has('choice')).to.be.false;
      });
    });

    describe('the name property', function() {
      beforeEach(async function() {
        element.checked = true;
        element.name = 'renamed';
        await element.updateComplete;
      });

      it('reflects to the name attribute', function() {
        expect(element.getAttribute('name')).to.equal('renamed');
      });

      it('submits under the new name', function() {
        const data = new FormData(form);
        expect(data.get('renamed')).to.equal('on');
        expect(data.has('choice')).to.be.false;
      });
    });
  });

  describe('form reset', function() {
    let form: HTMLFormElement;
    let element: PfV6Checkbox;
    beforeEach(async function() {
      form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-checkbox label="Reset me" checked></pf-v6-checkbox>
        </form>
      `);
      element = form.querySelector('pf-v6-checkbox')!;
      element.click();
      await element.updateComplete;
    });

    it('restores the initial checked state', async function() {
      expect(element.checked).to.be.false;
      form.reset();
      await element.updateComplete;
      expect(element.checked).to.be.true;
    });
  });
});
