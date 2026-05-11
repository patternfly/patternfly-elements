import { expect, html, fixture } from '@open-wc/testing';

import { PfV6Tooltip, TooltipShowEvent, TooltipHideEvent } from '../pf-v6-tooltip.js';
import { setViewport, sendMouse } from '@web/test-runner-commands';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pf-v6-tooltip>', function() {
  let element: PfV6Tooltip;

  beforeEach(async function() {
    await setViewport({ width: 1000, height: 1000 });
  });

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-tooltip')).to.be.an.instanceof(PfV6Tooltip);
  });

  it('should upgrade', async function() {
    element = await fixture<PfV6Tooltip>(html`<pf-v6-tooltip></pf-v6-tooltip>`);
    const klass = customElements.get('pf-v6-tooltip');
    expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfV6Tooltip);
  });

  describe('with content attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Tooltip text">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should hide tooltip content from assistive technology when closed', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainName('Trigger');
      expect(snapshot).to.not.axContainName('Tooltip text');
    });

    describe('after calling show()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
      });

      it('should show tooltip content to assistive technology', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Trigger');
        expect(snapshot).to.axContainName('Tooltip text');
      });
    });

    describe('after calling hide()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
        await element.hide();
        await element.updateComplete;
      });

      it('should hide tooltip content from assistive technology', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Trigger');
        expect(snapshot).to.not.axContainName('Tooltip text');
      });
    });

    describe('hovering the element', function() {
      beforeEach(async function() {
        const { x, y } = element.getBoundingClientRect();
        await sendMouse({ position: [x + 5, y + 5], type: 'move' });
        await new Promise(r => setTimeout(r, 400));
        await element.updateComplete;
      });

      it('should show tooltip content to assistive technology', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Trigger');
        expect(snapshot).to.axContainName('Tooltip text');
      });
    });
  });

  describe('with content slot', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip>
          <button>Trigger</button>
          <span slot="content">Rich <em>tooltip</em> content</span>
        </pf-v6-tooltip>
      `);
    });

    describe('after calling show()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
      });

      it('should show slotted content', async function() {
        const snapshot = await a11ySnapshot();
        const text = JSON.stringify(snapshot);
        expect(text).to.include('Rich');
        expect(text).to.include('tooltip');
      });
    });
  });

  describe('with position attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Bottom tip" position="bottom">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should accept position attribute', function() {
      expect(element.position).to.equal('bottom');
    });
  });

  describe('with no-flip attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="No flip" no-flip>
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should accept no-flip attribute', function() {
      expect(element.noFlip).to.be.true;
    });
  });

  describe('with entry-delay and exit-delay', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Delayed" entry-delay="100" exit-delay="50">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should accept delay attributes', function() {
      expect(element.entryDelay).to.equal(100);
      expect(element.exitDelay).to.equal(50);
    });
  });

  describe('with alignment attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Left aligned" alignment="start">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should accept alignment attribute', function() {
      expect(element.alignment).to.equal('start');
    });
  });

  describe('with trigger attribute', function() {
    let triggerButton: HTMLButtonElement;

    beforeEach(async function() {
      const container = await fixture(html`
        <div>
          <button id="ext-trigger">External trigger</button>
          <pf-v6-tooltip trigger="ext-trigger" content="External tooltip"></pf-v6-tooltip>
        </div>
      `);
      triggerButton = container.querySelector('#ext-trigger')!;
      element = container.querySelector('pf-v6-tooltip')!;
      await element.updateComplete;
    });

    it('should accept trigger attribute', function() {
      expect(element.trigger).to.equal('ext-trigger');
    });

    describe('after calling show()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
      });

      it('should show tooltip content', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('External tooltip');
      });
    });
  });

  describe('show event', function() {
    let showEvent: TooltipShowEvent | null;

    beforeEach(async function() {
      showEvent = null;
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Event test">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
      element.addEventListener('show', function(e) {
        showEvent = e as TooltipShowEvent;
      });
    });

    describe('hovering the element', function() {
      beforeEach(async function() {
        const { x, y } = element.getBoundingClientRect();
        await sendMouse({ position: [x + 5, y + 5], type: 'move' });
        await new Promise(r => setTimeout(r, 50));
      });

      it('should fire show event with reason', function() {
        expect(showEvent).to.be.an.instanceOf(TooltipShowEvent);
        expect(showEvent!.reason).to.equal('mouseenter');
      });
    });
  });

  describe('cancelling show event', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Prevented" entry-delay="0">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
      element.addEventListener('show', function(e) {
        e.preventDefault();
      });
    });

    describe('hovering the element', function() {
      beforeEach(async function() {
        const { x, y } = element.getBoundingClientRect();
        await sendMouse({ position: [x + 5, y + 5], type: 'move' });
        await new Promise(r => setTimeout(r, 100));
        await element.updateComplete;
      });

      it('should not show tooltip', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.not.axContainName('Prevented');
      });
    });
  });

  describe('Escape key', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Escapable">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
      await element.show();
      await element.updateComplete;
    });

    describe('pressing Escape', function() {
      beforeEach(async function() {
        element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await element.updateComplete;
        await new Promise(r => setTimeout(r, 50));
      });

      it('should hide tooltip', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.not.axContainName('Escapable');
      });
    });
  });
});
