import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeSwitch } from '@patternfly/pfe-switch';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pfe-switch>', function() {
  describe('simply instantiating', function() {
    let element: PfeSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      const container = await createFixture<PfeSwitch>(html`
        <div>
          <pfe-switch></pfe-switch>
        </div>
      `);
      element = container.querySelector('pfe-switch')!;
      snapshot = await a11ySnapshot({ selector: 'pfe-switch' });
    });
    it('should upgrade', async function() {
      const klass = customElements.get('pfe-switch');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfeSwitch);
    });
    it('has accessible role', function() {
      expect(snapshot.role).to.equal('checkbox');
    });
    it('has accessible checked field', function() {
      expect(snapshot.role).to.equal('checkbox');
    });
    it('requires accessible name', function() {
      // Double negative - this would fail an accessibility audit,
      // but that failure would be correct, because the template instantiated
      // in this test's beforeeach hook does not have an accessible name
      expect(snapshot.name).to.not.be.ok;
    });
  });

  describe('with labels for on and off state', function() {
    let element: PfeSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      const container = await createFixture<PfeSwitch>(html`
        <div>
          <pfe-switch id="switch"></pfe-switch>
          <label for="switch" data-state="on">Message when on</label>
          <label for="switch" data-state="off" hidden>Message when off</label>
        </div>
        `);
      element = container.querySelector('pfe-switch')!;
      snapshot = await a11ySnapshot({ selector: '#switch' });
    });

    it('is accessible', function() {
      expect(snapshot.role).to.equal('checkbox');
      expect(snapshot.name).to.be.ok;
      expect(snapshot.checked).to.be.false;
    });

    it('should show the label for the unchecked state', function() {
      expect(snapshot.name).to.equal('Message when off');
    });

    describe('clicking the checkbox', function() {
      beforeEach(async function() {
        element.click();
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: '#switch' });
      });
      it('should be checked', function() {
        expect(element.checked).to.be.true;
        expect(snapshot.checked).to.be.true;
      });
      it('should show the label for the checked state', function() {
        expect(snapshot.name).to.equal('Message when on');
      });
    });
  });

  describe('when checked attr is present', function() {
    let element: PfeSwitch;
    beforeEach(async function() {
      element = await createFixture<PfeSwitch>(html`
        <pfe-switch checked></pfe-switch>
      `);
    });
    it('should display a check icon', async function() {
      // TODO: can we test this without inspecting the private shadowRoot?
      const svg = element.shadowRoot.querySelector('svg');
      expect(svg).to.be.ok;
      expect(svg?.hasAttribute('hidden')).to.be.false;
    });
  });

  describe('when checked and show-check-icon attrs are present', function() {
    let element: PfeSwitch;
    beforeEach(async function() {
      const container = await createFixture<PfeSwitch>(html`
        <div>
          <pfe-switch id="switch" show-check-icon checked></pfe-switch>
          <label for="switch" data-state="on">Message when on</label>
          <label for="switch" data-state="off">Message when off</label>
        </div>
      `);
      element = container.querySelector('pfe-switch')!;
    });
    it('should display a check icon', async function() {
      // TODO: can we test this without inspecting the private shadowRoot?
      const svg = element.shadowRoot.querySelector('svg');
      expect(svg).to.be.ok;
      expect(svg?.hasAttribute('hidden')).to.be.false;
    });
  });

  describe('when checked and show-check-icon attrs are present', function() {
    let element: PfeSwitch;
    beforeEach(async function() {
      element = await createFixture<PfeSwitch>(html`
        <pfe-switch id="switch" show-check-icon checked></pfe-switch>
        <label for="switch" data-state="on">Message when on</label>
        <label for="switch" data-state="off">Message when off</label>
      `);
    });
    it('should display a check icon', async function() {
      // TODO: can we test this without inspecting the private shadowRoot?
      const svg = element.shadowRoot.querySelector('svg');
      expect(svg).to.be.ok;
      expect(svg?.hasAttribute('hidden')).to.be.false;
    });
  });

  describe('when nested inside a label element', function() {
    let label: HTMLLabelElement;
    let element: PfeSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      label = await createFixture<HTMLLabelElement>(html`
        <label>
          <span>Dark Mode</span>
          <pfe-switch id="switch"></pfe-switch>
        </label>
      `);
      element = label.querySelector('pfe-switch')!;
      snapshot = await a11ySnapshot({ selector: 'pfe-switch' });
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
    describe('clicking the switch', function() {
      beforeEach(function() {
        element.click();
      });
      it('toggles the state', function() {
        expect(element.checked).to.be.true;
      });
    });
  });

  // TODO: test keyboard a11y with wtr sendKeys
});
