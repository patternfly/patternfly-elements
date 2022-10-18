import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeSwitch } from '@patternfly/pfe-switch';
import { a11ySnapshot } from '@web/test-runner-commands';

interface A11yTreeSnapshot {
  name: string;
  children: A11yTreeSnapshot[];
  role: string;
  checked?: boolean;
}

describe('<pfe-switch>', function() {
  describe('simply instantiating', function() {
    let element: PfeSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfeSwitch>(html`<pfe-switch></pfe-switch>`);
      snapshot = await a11ySnapshot({ selector: 'pfe-switch' }) as unknown as A11yTreeSnapshot;
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
    it('has accessible name', function() {
      // TRUE failure
      expect(snapshot.name).to.be.ok;
    });
  });

  describe('with labels for on and off state', function() {
    let element: PfeSwitch;
    let snapshot: A11yTreeSnapshot;
    beforeEach(async function() {
      element = await createFixture<PfeSwitch>(html`
        <pfe-switch id="switch"></pfe-switch>
        <label for="switch" data-state="on">Message when on</label>
        <label for="switch" data-state="off" hidden>Message when off</label>
      `);
      snapshot = await a11ySnapshot({ selector: 'pfe-switch' }) as unknown as A11yTreeSnapshot;
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
        snapshot = await a11ySnapshot({ selector: 'pfe-switch' }) as unknown as A11yTreeSnapshot;
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

  // TODO: test keyboard a11y with wtr sendKeys
});
