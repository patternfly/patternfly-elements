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

      // Documents the cross-root ARIA gap: ariaDescribedByElements doesn't
      // work light→shadow today (WICG/aom#192). This test will intentionally
      // fail once Reference Target ships, signaling it's time to gate/remove
      // the live-region announcer to avoid double-announcement.
      it('trigger has no computed description (cross-root ARIA gap)', async function() {
        const snapshot = await a11ySnapshot();
        const trigger = snapshot.children?.find(
          (n: { role: string }) => n.role === 'button',
        );
        expect(trigger?.description).to.be.undefined;
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

    it('should hide slotted content from assistive technology when closed', async function() {
      const snapshot = await a11ySnapshot();
      const text = JSON.stringify(snapshot);
      expect(text).to.not.include('Rich');
      expect(text).to.not.include('tooltip content');
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

  describe('with both content attribute and content slot', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Attribute content">
          <button>Trigger</button>
          <span slot="content">Slot content</span>
        </pf-v6-tooltip>
      `);
    });

    describe('after calling show()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
      });

      it('should show slotted content instead of attribute content', async function() {
        const snapshot = await a11ySnapshot();
        const text = JSON.stringify(snapshot);
        expect(text).to.include('Slot content');
        expect(text).to.not.include('Attribute content');
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

  describe('with flip-behavior attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Flip" flip-behavior="top,bottom">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should parse comma-separated placements', function() {
      expect(element.flipBehavior).to.deep.equal(['top', 'bottom']);
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

  describe('with visible attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Visible" visible>
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
      await element.updateComplete;
      await new Promise(r => setTimeout(r, 100));
    });

    it('should show tooltip content', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainName('Visible');
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

  describe('with trigger property set to Element reference', function() {
    let triggerButton: HTMLButtonElement;

    beforeEach(async function() {
      triggerButton = await fixture<HTMLButtonElement>(html`
        <button>Ref trigger</button>
      `);
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Ref tooltip"></pf-v6-tooltip>
      `);
      element.trigger = triggerButton;
      await element.updateComplete;
    });

    describe('after calling show()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
      });

      it('should show tooltip content', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Ref tooltip');
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

  describe('hide event', function() {
    let hideEvent: TooltipHideEvent | null;

    beforeEach(async function() {
      hideEvent = null;
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Hide test" entry-delay="0">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
      element.addEventListener('hide', function(e) {
        hideEvent = e as TooltipHideEvent;
      });
    });

    describe('hovering then leaving the element', function() {
      beforeEach(async function() {
        const { x, y } = element.getBoundingClientRect();
        await sendMouse({ position: [x + 5, y + 5], type: 'move' });
        await new Promise(r => setTimeout(r, 50));
        await sendMouse({ position: [0, 0], type: 'move' });
        await new Promise(r => setTimeout(r, 50));
      });

      it('should fire hide event with reason', function() {
        expect(hideEvent).to.be.an.instanceOf(TooltipHideEvent);
        expect(hideEvent!.reason).to.equal('mouseleave');
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

  describe('cancelling hide event', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Stay visible" entry-delay="0" exit-delay="0">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
      await element.show();
      await element.updateComplete;
      element.addEventListener('hide', function(e) {
        e.preventDefault();
      });
    });

    describe('leaving the element', function() {
      beforeEach(async function() {
        await sendMouse({ position: [0, 0], type: 'move' });
        await new Promise(r => setTimeout(r, 100));
        await element.updateComplete;
      });

      it('should remain visible', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Stay visible');
      });
    });
  });

  describe('focus triggers', function() {
    let button: HTMLButtonElement;

    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Focus tip" entry-delay="0" exit-delay="0">
          <button>Focus me</button>
        </pf-v6-tooltip>
      `);
      button = element.querySelector('button')!;
    });

    describe('focusing the trigger', function() {
      beforeEach(async function() {
        button.focus();
        await new Promise(r => setTimeout(r, 50));
        await element.updateComplete;
      });

      it('should show tooltip', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Focus tip');
      });

      describe('then blurring the trigger', function() {
        beforeEach(async function() {
          button.blur();
          await new Promise(r => setTimeout(r, 50));
          await element.updateComplete;
        });

        it('should hide tooltip', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot).to.not.axContainName('Focus tip');
        });
      });
    });
  });

  describe('Escape key', function() {
    let hideEvent: TooltipHideEvent | null;

    beforeEach(async function() {
      hideEvent = null;
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Escapable">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
      element.addEventListener('hide', function(e) {
        hideEvent = e as TooltipHideEvent;
      });
      await element.show();
      await element.updateComplete;
    });

    describe('pressing Escape', function() {
      beforeEach(async function() {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await element.updateComplete;
        await new Promise(r => setTimeout(r, 50));
      });

      it('should fire non-cancelable hide with reason escape', function() {
        expect(hideEvent).to.be.an.instanceOf(TooltipHideEvent);
        expect(hideEvent!.reason).to.equal('escape');
        expect(hideEvent!.cancelable).to.be.false;
      });

      it('should hide tooltip', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.not.axContainName('Escapable');
      });
    });

    describe('pressing Escape with preventDefault on hide', function() {
      beforeEach(async function() {
        element.addEventListener('hide', function(e) {
          e.preventDefault();
        });
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await element.updateComplete;
        await new Promise(r => setTimeout(r, 50));
      });

      it('should still hide tooltip', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.not.axContainName('Escapable');
      });
    });
  });

  describe('Escape key with external trigger', function() {
    let triggerButton: HTMLButtonElement;

    beforeEach(async function() {
      const container = await fixture(html`
        <div>
          <button id="esc-trigger">Escape trigger</button>
          <pf-v6-tooltip trigger="esc-trigger" content="Escape external"></pf-v6-tooltip>
        </div>
      `);
      triggerButton = container.querySelector('#esc-trigger')!;
      element = container.querySelector('pf-v6-tooltip')!;
      await element.updateComplete;
      await element.show();
      await element.updateComplete;
    });

    describe('pressing Escape on document', function() {
      beforeEach(async function() {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await element.updateComplete;
        await new Promise(r => setTimeout(r, 50));
      });

      it('should hide tooltip', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.not.axContainName('Escape external');
      });
    });
  });

  describe('announcer live region', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Announced text">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    describe('after calling show()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
      });

      it('should populate the live region with tooltip content', async function() {
        const snapshot = await a11ySnapshot();
        const text = JSON.stringify(snapshot);
        expect(text).to.include('Announced text');
      });

      describe('then calling hide()', function() {
        beforeEach(async function() {
          await element.hide();
          await element.updateComplete;
        });

        it('should clear the live region', async function() {
          const snapshot = await a11ySnapshot();
          const text = JSON.stringify(snapshot);
          expect(text).to.not.include('Announced text');
        });
      });
    });
  });

  describe('tooltip content inert state', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Inert test">
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should exclude tooltip content from ax tree when hidden', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.not.axContainName('Inert test');
    });

    describe('after calling show()', function() {
      beforeEach(async function() {
        await element.show();
        await element.updateComplete;
      });

      it('should include tooltip content in ax tree when visible', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.axContainName('Inert test');
      });
    });
  });

  describe('with silent attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfV6Tooltip>(html`
        <pf-v6-tooltip content="Silent tip" silent>
          <button>Trigger</button>
        </pf-v6-tooltip>
      `);
    });

    it('should accept silent attribute', function() {
      expect(element.silent).to.be.true;
    });

    it('should not announce when shown', async function() {
      const announcer = document.querySelector('[role="status"]')!;
      announcer.textContent = '';
      await element.show();
      await element.updateComplete;
      expect(announcer.textContent).to.equal('');
    });
  });
});
