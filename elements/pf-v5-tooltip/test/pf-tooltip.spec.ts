import { expect, html, fixture } from '@open-wc/testing';

import { PfV5Tooltip } from '../pf-v5-tooltip.js';
import { setViewport, sendMouse } from '@web/test-runner-commands';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pf-v5-tooltip>', function() {
  let element: PfV5Tooltip;

  beforeEach(async function() {
    await setViewport({ width: 1000, height: 1000 });
  });

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-tooltip')).to.be.an.instanceof(PfV5Tooltip);
  });

  it('should upgrade', async function() {
    element = await fixture<PfV5Tooltip>(html`<pf-v5-tooltip></pf-v5-tooltip>`);
    const klass = customElements.get('pf-v5-tooltip');
    expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfV5Tooltip);
  });

  describe('typical usage', function() {
    beforeEach(async function() {
      element = await fixture<PfV5Tooltip>(html`
        <pf-v5-tooltip content="Content">Tooltip</pf-v5-tooltip>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should hide tooltip content from assistive technology', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainName('Tooltip');
      expect(snapshot).to.not.axContainName('Content');
    });

    describe('hovering the element', function() {
      beforeEach(async function() {
        const { x, y } = element.getBoundingClientRect();
        await sendMouse({ position: [x + 5, y + 5], type: 'move' });
        await element.updateComplete;
      });
      it('should show tooltip content to assistive technology', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Tooltip');
        expect(snapshot).to.axContainName('Content');
      });
    });
  });
});
