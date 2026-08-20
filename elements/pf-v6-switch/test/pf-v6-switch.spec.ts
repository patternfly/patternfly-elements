import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfV6Switch } from '@patternfly/elements/pf-v6-switch/pf-v6-switch.js';

describe('<pf-v6-switch>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-switch')).to.be.an.instanceof(PfV6Switch);
  });

  describe('simply instantiating', function() {
    let element: PfV6Switch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch accessible-label="Test"></pf-v6-switch>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-switch' });
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v6-switch');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV6Switch);
    });

    it('has accessible role', function() {
      expect(snapshot.role).to.equal('switch');
    });

    it('has accessible name', function() {
      expect(snapshot.name).to.equal('Test');
    });

    it('is not checked by default', function() {
      expect(snapshot.checked).to.be.false;
    });
  });

  describe('with accessible-label attribute', function() {
    let element: PfV6Switch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch accessible-label="Dark Mode"></pf-v6-switch>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-switch' });
    });

    it('has an accessible name from accessible-label', function() {
      expect(snapshot.name).to.equal('Dark Mode');
    });

    it('keeps the same accessible name regardless of checked state', async function() {
      element.focus();
      await sendKeys({ press: ' ' });
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: 'pf-v6-switch' });
      expect(snapshot.name).to.equal('Dark Mode');
    });
  });

  describe('with slotted label text', function() {
    let element: PfV6Switch;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch>Wi-Fi enabled</pf-v6-switch>
      `);
      await element.updateComplete;
    });

    it('renders the label text', function() {
      expect(element.textContent?.trim()).to.equal('Wi-Fi enabled');
    });

    it('displays the label in the accessibility tree', async function() {
      const snapshot = await a11ySnapshot({ selector: 'pf-v6-switch' });
      expect(snapshot.name).to.equal('Wi-Fi enabled');
    });
  });

  describe('with external label', function() {
    let element: PfV6Switch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      const container = await createFixture<PfV6Switch>(html`
        <div>
          <pf-v6-switch id="switch"></pf-v6-switch>
          <label for="switch">Dark Mode</label>
        </div>
      `);
      element = container.querySelector('pf-v6-switch')!;
      snapshot = await a11ySnapshot({ selector: '#switch' });
    });

    it('is accessible', function() {
      expect(snapshot.role).to.equal('switch');
      expect(snapshot.name).to.equal('Dark Mode');
      expect(snapshot.checked).to.be.false;
    });

    describe('toggling the switch', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ press: 'Enter' });
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: '#switch' });
      });

      it('should be checked', function() {
        expect(element.checked).to.be.true;
        expect(snapshot.checked).to.be.true;
      });

      it('keeps the same label', function() {
        expect(snapshot.name).to.equal('Dark Mode');
      });
    });
  });

  describe('when checked attr is present', function() {
    let element: PfV6Switch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch id="switch" accessible-label="Test" checked></pf-v6-switch>
      `);
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: '#switch' });
    });

    it('should be checked', function() {
      expect(element.checked).to.be.true;
      expect(snapshot.checked).to.be.true;
    });
  });

  describe('when checked attr is not present', function() {
    let element: PfV6Switch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch id="switch" accessible-label="Test"></pf-v6-switch>
      `);
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: '#switch' });
    });

    it('should not be checked', function() {
      expect(element.checked).to.be.false;
      expect(snapshot.checked).to.be.false;
    });
  });

  describe('when checked and show-check-icon attrs are present', function() {
    let element: PfV6Switch;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch show-check-icon checked>Check icon example</pf-v6-switch>
      `);
    });

    it('has the show-check-icon attribute', function() {
      expect(element.showCheckIcon).to.be.true;
      expect(element.hasAttribute('show-check-icon')).to.be.true;
    });
  });

  describe('when disabled', function() {
    let element: PfV6Switch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch accessible-label="Test" disabled></pf-v6-switch>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-switch' });
    });

    it('reports disabled in accessibility tree', function() {
      expect(snapshot.disabled).to.be.true;
    });

    it('does not toggle when clicked', function() {
      element.click();
      expect(element.checked).to.be.false;
    });
  });

  describe('when reversed', function() {
    let element: PfV6Switch;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch reversed checked>Reversed label</pf-v6-switch>
      `);
    });

    it('has the reversed attribute', function() {
      expect(element.reversed).to.be.true;
      expect(element.hasAttribute('reversed')).to.be.true;
    });
  });

  describe('when nested inside a label element', function() {
    let label: HTMLLabelElement;
    let element: PfV6Switch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      label = await createFixture<HTMLLabelElement>(html`
        <label>
          <span>Dark Mode</span>
          <pf-v6-switch id="switch"></pf-v6-switch>
        </label>
      `);
      element = label.querySelector('pf-v6-switch')!;
      snapshot = await a11ySnapshot({ selector: 'pf-v6-switch' });
    });

    it('does not hide label', function() {
      expect(label.hidden).to.be.false;
    });

    it('has an accessible name', function() {
      expect(snapshot.name).to.equal('Dark Mode');
    });

    describe('clicking the label', function() {
      beforeEach(function() {
        label.click();
      });

      it('toggles the state', function() {
        expect(element.checked).to.be.true;
      });
    });

    describe('pressing Space on the switch', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ press: ' ' });
        await element.updateComplete;
      });

      it('toggles the state', function() {
        expect(element.checked).to.be.true;
      });
    });
  });

  describe('keyboard interaction', function() {
    let element: PfV6Switch;
    beforeEach(async function() {
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch accessible-label="Keyboard test"></pf-v6-switch>
      `);
      element.focus();
    });

    describe('pressing Space', function() {
      beforeEach(async function() {
        await sendKeys({ press: ' ' });
        await element.updateComplete;
      });

      it('toggles the state', function() {
        expect(element.checked).to.be.true;
      });
    });

    describe('pressing Enter', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'Enter' });
        await element.updateComplete;
      });

      it('toggles the state', function() {
        expect(element.checked).to.be.true;
      });
    });
  });

  describe('change event', function() {
    let element: PfV6Switch;
    let changeCount: number;
    beforeEach(async function() {
      changeCount = 0;
      element = await createFixture<PfV6Switch>(html`
        <pf-v6-switch accessible-label="Event test"></pf-v6-switch>
      `);
      element.addEventListener('change', () => changeCount++);
    });

    describe('toggling the switch', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ press: ' ' });
        await element.updateComplete;
      });

      it('fires change event', function() {
        expect(changeCount).to.equal(1);
      });
    });

    describe('clicking a disabled switch', function() {
      beforeEach(function() {
        element.disabled = true;
        element.click();
      });

      it('does not fire change event', function() {
        expect(changeCount).to.equal(0);
      });
    });

    describe('preventing default on the change event', function() {
      beforeEach(async function() {
        element.addEventListener('change', e => e.preventDefault());
        element.focus();
        await sendKeys({ press: ' ' });
        await element.updateComplete;
      });

      it('reverts the checked state', function() {
        expect(element.checked).to.be.false;
      });
    });
  });

  describe('form association', function() {
    let form: HTMLFormElement;
    let element: PfV6Switch;
    let submitData: FormData | null;
    beforeEach(async function() {
      submitData = null;
      const container = await createFixture(html`
        <form>
          <pf-v6-switch name="toggle" accessible-label="Form test"></pf-v6-switch>
          <button type="submit">Submit</button>
        </form>
      `);
      form = container as HTMLFormElement;
      element = form.querySelector('pf-v6-switch')!;
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitData = new FormData(form);
      });
    });

    describe('submitting when unchecked', function() {
      beforeEach(function() {
        form.requestSubmit();
      });

      it('does not include value in form data', function() {
        expect(submitData!.has('toggle')).to.be.false;
      });
    });

    describe('submitting when checked', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ press: ' ' });
        await element.updateComplete;
        form.requestSubmit();
      });

      it('includes "on" value in form data', function() {
        expect(submitData!.get('toggle')).to.equal('on');
      });
    });
  });
});
