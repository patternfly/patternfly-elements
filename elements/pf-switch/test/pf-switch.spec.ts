import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

import { PfSwitch } from '@patternfly/elements/pf-switch/pf-switch.js';

describe('<pf-switch>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-switch')).to.be.an.instanceof(PfSwitch);
  });

  describe('simply instantiating', function() {
    let element: PfSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      const container = await createFixture<PfSwitch>(html`
        <div>
          <pf-switch></pf-switch>
        </div>
      `);
      element = container.querySelector('pf-switch')!;
      snapshot = await a11ySnapshot({ selector: 'pf-switch' });
    });
    it('should upgrade', async function() {
      const klass = customElements.get('pf-switch');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfSwitch);
    });
    it('has accessible role', function() {
      expect(snapshot.role).to.equal('switch');
    });
    it('has accessible checked field', function() {
      expect(snapshot.role).to.equal('switch');
    });
    it('requires accessible name', function() {
      // Double negative - this would fail an accessibility audit,
      // but that failure would be correct, because the template instantiated
      // in this test's beforeeach hook does not have an accessible name
      expect(snapshot.name).to.not.be.ok;
    });
  });

  describe('with labels for on and off state', function() {
    let element: PfSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      const container = await createFixture<PfSwitch>(html`
        <div>
          <pf-switch id="switch"></pf-switch>
          <label for="switch">
            <span data-state="on">Message when on</span>
            <span data-state="off" hidden>Message when off</span>
          </label>
        </div>
        `);
      element = container.querySelector('pf-switch')!;
      snapshot = await a11ySnapshot({ selector: '#switch' });
    });

    it('is accessible', function() {
      expect(snapshot.role).to.equal('switch');
      expect(snapshot.name).to.be.ok;
      expect(snapshot.checked).to.be.false;
    });

    it('should show the label for the unchecked state', function() {
      expect(snapshot.name).to.equal('Message when off');
    });

    describe('clicking the switch', function() {
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
    let element: PfSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfSwitch>(html`
        <pf-switch id="switch" checked></pf-switch>
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
    let element: PfSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfSwitch>(html`
        <pf-switch id="switch"></pf-switch>
      `);

      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot({ selector: '#switch' });
    });

    it('should be checked', function() {
      expect(element.checked).to.be.false;
      expect(snapshot.checked).to.be.false;
    });
  });


  describe('when checked and show-check-icon attrs are present', function() {
    let element: PfSwitch;
    beforeEach(async function() {
      const container = await createFixture<PfSwitch>(html`
        <div>
          <pf-switch id="switch" show-check-icon checked></pf-switch>
          <label for="switch">
            <span data-state="on">Message when on</span>
            <span data-state="off" hidden>Message when off</span>
          </label>
        </div>
      `);
      element = container.querySelector('pf-switch')!;
    });
    it('should display a check icon', async function() {
      // TODO: can we test this without inspecting the private shadowRoot?
      const svg = element.shadowRoot.querySelector('svg');
      expect(svg).to.be.ok;
      expect(svg?.hasAttribute('hidden')).to.be.false;
    });
  });

  describe('when checked and show-check-icon attrs are present', function() {
    let element: PfSwitch;
    beforeEach(async function() {
      element = await createFixture<PfSwitch>(html`
        <pf-switch id="switch" show-check-icon checked></pf-switch>
        <label for="switch">
          <span data-state="on">Message when on</span>
          <span data-state="off" hidden>Message when off</span>
        </label>
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
    let element: PfSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      label = await createFixture<HTMLLabelElement>(html`
        <label>
          <span>Dark Mode</span>
          <pf-switch id="switch"></pf-switch>
        </label>
      `);
      element = label.querySelector('pf-switch')!;
      snapshot = await a11ySnapshot({ selector: 'pf-switch' });
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
