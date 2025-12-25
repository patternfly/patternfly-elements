import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfLabelGroup } from '@patternfly/elements/pf-label-group/pf-label-group.js';
import { PfLabel } from '@patternfly/elements/pf-label/pf-label.js';

describe('<pf-label-group>', function() {
  let element: PfLabelGroup;

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-label-group')).to.be.an.instanceof(PfLabelGroup);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfLabelGroup>(html`<pf-label-group></pf-label-group>`);
      const klass = customElements.get('pf-label-group');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfLabelGroup);
    });
  });

  describe('basic behavior', function() {
    beforeEach(async function() {
      element = await createFixture<PfLabelGroup>(html`
        <pf-label-group num-labels="2">
          <pf-label>one</pf-label>
          <pf-label>two</pf-label>
          <pf-label>three</pf-label>
          <pf-label>four</pf-label>
        </pf-label-group>
      `);
      await element.updateComplete;
    });

    it('renders an overflow label when remaining > 0', async function() {
      const overflow = element.shadowRoot?.querySelector('#overflow') as HTMLElement;
      expect(overflow).to.be.ok;
      expect(overflow.hidden).to.be.false;
      expect(overflow.textContent?.trim()).to.equal('2 more');
    });

    it('hides labels beyond num-labels when closed', function() {
      const labels = Array.from(element.querySelectorAll('pf-label')) as PfLabel[];
      expect(labels.length).to.equal(4);
      expect(labels[0].hidden).to.be.false;
      expect(labels[1].hidden).to.be.false;
      expect(labels[2].hidden).to.be.true;
      expect(labels[3].hidden).to.be.true;
    });

    it('toggles open on overflow click and fires expand event', async function() {
      const overflow = element.shadowRoot?.querySelector('#overflow') as HTMLElement;
      let fired = false;
      element.addEventListener('expand', () => (fired = true));

      overflow.click();
      await element.updateComplete;

      expect(element.open).to.be.true;
      expect(fired).to.be.true;
      expect(overflow.textContent?.trim()).to.equal('show less');

      const labels = Array.from(element.querySelectorAll('pf-label')) as PfLabel[];
      expect(labels.every(l => l.hidden === false)).to.be.true;
    });

    it('shows close button and dispatches remove when closeable', async function() {
      element.closeable = true;
      await element.updateComplete;

      const btn = element.shadowRoot?.querySelector('#close-button') as HTMLElement;
      expect(btn).to.be.ok;
      let removed = false;
      element.addEventListener('remove', () => (removed = true));

      btn.click();
      await element.updateComplete;

      expect(removed).to.be.true;
    });
  });
});
