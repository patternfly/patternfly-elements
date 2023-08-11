import { expect, html, fixture, fixtureCleanup } from '@open-wc/testing';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementCenter } from '@patternfly/pfe-tools/test/utils.js';
import { sendKeys, resetMouse } from '@web/test-runner-commands';
import { PfPopover } from '@patternfly/elements/pf-popover/pf-popover.js';
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';

const takeProps = (props: string[]) => (obj: object) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-popover>', function() {
  describe('simply instantiating', function() {
    let element: PfPopover;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await fixture<PfPopover>(html`<pf-popover></pf-popover>`);
      snapshot = await a11ySnapshot();
    });
    it('should upgrade', async function() {
      const klass = customElements.get('pf-popover');
      expect(element).to.be.an.instanceOf(klass).and.to.be.an.instanceOf(PfPopover);
    });
    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-popover')).to.be.an.instanceof(PfPopover);
    });
    it('should hide popover content from assistive technology', function() {
      expect(snapshot.children).to.be.undefined;
    });
  });

  describe('with a slotted trigger and heading, body, and footer attributes', function() {
    let element: PfPopover;

    async function expectClosed() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children.map(takeProps(['name', 'role']))).to.deep.equal([{
        name: 'Toggle popover',
        role: 'button',
      }]);
    }

    async function expectOpen() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children.map(takeProps(['name', 'role']))).to.deep.equal([
        {
          name: 'Toggle popover',
          role: 'button',
        },
        {
          name: 'Close popover',
          role: 'button',
        },
        {
          name: 'Popover heading',
          role: 'heading',
        },
        {
          name: 'Popovers are triggered by click rather than hover.',
          role: 'text',
        },
        {
          name: 'Popover footer',
          role: 'text',
        },
      ]);
    }

    beforeEach(async function() {
      element = await fixture<PfPopover>(html`
        <pf-popover heading="Popover heading"
                    body="Popovers are triggered by click rather than hover."
                    footer="Popover footer">
          <pf-button>Toggle popover</pf-button>
        </pf-popover>
      `);
    });
    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
    it('should hide popover content from assistive technology', expectClosed);
    describe('tabbing to the trigger', function() {
      beforeEach(press('Tab'));
      beforeEach(function() {
        expect(document.activeElement).to.be.an.instanceof(PfButton);
      });

      describe('and pressing Enter', function() {
        beforeEach(press('Enter'));
        it('should show popover content to assistive technology', expectOpen);
        describe('then pressing enter again', function() {
          beforeEach(press('Enter'));
          it('should hide popover content from assistive technology', expectClosed);
        });
        describe('then pressing Escape', function() {
          beforeEach(press('Escape'));
          it('should hide popover content from assistive technology', expectClosed);
        });
      });
    });
  });

  describe('with a trigger and a sibling button', function() {
    let element: PfPopover;
    let btn1: HTMLButtonElement;
    let btn2: HTMLButtonElement;

    async function expectClose() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children.length).to.equal(2);
      expect(snapshot.children.map(takeProps(['name', 'role']))).to.deep.equal([
        {
          name: 'Toggle popover 1',
          role: 'button',
        },
        {
          name: 'Toggle popover 2',
          role: 'button',
        },
      ]);
    }

    async function expectOpen() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children.length).to.equal(6);
      expect(snapshot.children.map(takeProps(['name', 'role']))).to.deep.equal([
        {
          name: 'Close popover',
          role: 'button',
        },
        {
          name: 'Popover heading',
          role: 'heading',
        },
        {
          name: 'Popovers are triggered by click rather than hover.',
          role: 'text',
        },
        {
          name: 'Popover footer',
          role: 'text',
        },
        {
          name: 'Toggle popover 1',
          role: 'button',
        },
        {
          name: 'Toggle popover 2',
          role: 'button',
        },
      ]);
    }

    beforeEach(async function() {
      resetMouse();
      fixtureCleanup();
      const container = await fixture(html`
        <div>
          <pf-popover
            id="popover"
            trigger="btn-1"
            heading="Popover heading"
            body="Popovers are triggered by click rather than hover."
            footer="Popover footer"
          >
          </pf-popover>
          <button id="btn-1">Toggle popover 1</button>
          <button id="btn-2">Toggle popover 2</button>
        </div>
      `);
      element = container.querySelector('pf-popover')!;
      btn1 = container.querySelector('#btn-1')!;
      btn2 = container.querySelector('#btn-2')!;
    });

    it('starts closed', expectClose);
    describe('clicking the trigger', function() {
      beforeEach(async function() {
        await element.updateComplete;
        await clickElementCenter(btn1);
        await element.updateComplete;
      });
      it('shows the popover', expectOpen);
    });
    describe('then setting the trigger to the sibling button', function() {
      beforeEach(async function() {
        await element.updateComplete;
        // Update trigger element
        element.setAttribute('trigger', 'btn-2');
        await element.updateComplete;
      });
      describe('clicking the first button', function() {
        beforeEach(async function() {
          await element.updateComplete;
          await clickElementCenter(btn1);
          await element.updateComplete;
        });
        it('remains closed', expectClose);
      });
      describe('clicking the sibling button', function() {
        beforeEach(async function() {
          await element.updateComplete;
          await clickElementCenter(btn2);
          await element.updateComplete;
        });
        it('shows the popup', expectOpen);
      });
    });
    describe('then pressing the Enter key', function() {
      beforeEach(async function() {
        // Close the popover
        await element.updateComplete;
        await sendKeys({ press: 'Enter' });
        await element.updateComplete;
      });
      it('closes the popover', expectClose);
    });
  });
});
