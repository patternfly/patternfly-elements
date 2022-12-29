import { expect, html, fixture, nextFrame } from '@open-wc/testing';
import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

import { PfeTooltip } from '../pfe-tooltip.js';
import { setViewport, sendMouse } from '@web/test-runner-commands';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pfe-tooltip>', function() {
  let element: PfeTooltip;
  let snapshot: A11yTreeSnapshot;

  beforeEach(async function() {
    await setViewport({ width: 1000, height: 1000 });
  });
  it('should upgrade', async function() {
    element = await fixture<PfeTooltip>(html`<pfe-tooltip></pfe-tooltip>`);
    const klass = customElements.get('pfe-tooltip');
    expect(element)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeTooltip);
  });

  describe('typical usage', function() {
    beforeEach(async function() {
      element = await fixture<PfeTooltip>(html`
        <pfe-tooltip content="Content">Tooltip</pfe-tooltip>
      `);
      snapshot = await a11ySnapshot();
    });

    it('should be accessible', async function() {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should hide tooltip content from assistive technology', async function() {
      expect(snapshot.children).to.deep.equal([
        { name: 'Tooltip', role: 'text' },
      ]);
    });

    describe('hovering the element', function() {
      beforeEach(async function() {
        const { x, y } = element.getBoundingClientRect();
        await sendMouse({ position: [x + 5, y + 5], type: 'move' });
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });
      it('should show tooltip content to assistive technology', async function() {
        expect(snapshot.children).to.deep.equal([
          { name: 'Tooltip', role: 'text' },
          { name: 'Content', role: 'text' },
        ]);
      });
    });
  });
});

