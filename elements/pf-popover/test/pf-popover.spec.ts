import { expect, html, fixture, fixtureCleanup, nextFrame } from '@open-wc/testing';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import { sendKeys, resetMouse } from '@web/test-runner-commands';
import { PfPopover } from '@patternfly/elements/pf-popover/pf-popover.js';
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-popover>', function() {
  let element: PfPopover;

  /** create a simple test fixture */
  async function setupSimpleInstance() {
    element = await fixture<PfPopover>(html`<pf-popover></pf-popover>`);
  }

  /** Wait on the element's update cycle */
  async function updateComplete() {
    await element.updateComplete;
  }

  /** Asserts that an aXe audit on the page passes */
  async function expectA11yAxe() {
    await expect(element).to.be.accessible();
  }

  /**
   * Assert that the accessibility tree reports the expected snapshot
   * e.g. for a closed popover, does not announce popover child content
   * e.g. for an opened popover, it does announce popover child content
   * If the expected children snapshot is undefined, then assistive technology
   * reports nothing at all, e.g. a popover element with no attrs and no children
   */
  async function expectA11ySnapshot(expected: A11yTreeSnapshot = { role: 'WebArea', name: '' }) {
    const snapshot = await a11ySnapshot();
    expect(snapshot).to.deep.equal(expected);
  }

  function resetElement() {
    document.querySelectorAll('pf-popover').forEach(e => e.remove());
    // @ts-expect-error: resetting test state, so we don't mind the ts error.
    element = undefined;
  }

  afterEach(resetElement);
  afterEach(fixtureCleanup);

  describe('simply instantiating', function() {
    beforeEach(setupSimpleInstance);
    it('should upgrade', async function() {
      const klass = customElements.get('pf-popover');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfPopover);
    });
    it('should be accessible', expectA11yAxe);
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-popover'))
        .to.be.an.instanceof(PfPopover);
    });
    it('should not report anything to assistive technology', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children).to.not.be.ok;
    });
  });

  describe('with a slotted trigger; and with heading, body, and footer attributes', function() {
    // these tests are flaky, soo...
    beforeEach(resetElement);
    beforeEach(nextFrame);
    beforeEach(resetElement);
    beforeEach(nextFrame);
    beforeEach(resetElement);
    beforeEach(nextFrame);

    /** create a test fixture with slotted trigger and content attrs */
    beforeEach(async function setupPopoverWithSlottedTriggerAndContentAttrs() {
      element = await fixture<PfPopover>(html`
        <pf-popover heading="Popover heading"
                    body="Popovers are triggered by click rather than hover."
                    footer="Popover footer">
          <pf-button>Toggle popover</pf-button>
        </pf-popover>
      `);
    });

    it('should be accessible', expectA11yAxe);

    it('should hide popover content from assistive technology', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.find(x => x.role === 'dialog')).to.not.be.ok;
    });

    describe('tabbing to the trigger', function() {
      beforeEach(resetElement);
      beforeEach(async function setupPopoverWithSlottedTriggerAndContentAttrs() {
        element = await fixture<PfPopover>(html`
          <pf-popover heading="Popover heading"
                      body="Popovers are triggered by click rather than hover."
                      footer="Popover footer">
            <pf-button>Toggle popover</pf-button>
          </pf-popover>
        `);
      });

      beforeEach(updateComplete);
      beforeEach(press('Tab'));
      beforeEach(updateComplete);

      it('doesn\'t steal tab order', function() {
        expect(document.activeElement).to.be.an.instanceof(PfButton);
      });

      describe('and pressing Enter', function() {
        beforeEach(updateComplete);
        beforeEach(press('Enter'));
        beforeEach(updateComplete);
        it('should show popover content to assistive technology', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.find(x => x.role === 'dialog')).to.be.ok;
        });
        describe('then pressing Enter again', function() {
          beforeEach(updateComplete);
          beforeEach(press('Enter'));
          beforeEach(updateComplete);
          it('should hide popover content from assistive technology', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot?.children?.length).to.equal(1);
            const dialog = snapshot.children?.find(x => x.role === 'dialog');
            expect(dialog).to.not.be.ok;
          });
        });
        describe('then pressing Escape', function() {
          beforeEach(updateComplete);
          beforeEach(press('Escape'));
          beforeEach(updateComplete);
          it('should hide popover content from assistive technology', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot?.children?.length).to.equal(1);
            const dialog = snapshot.children?.find(x => x.role === 'dialog');
            expect(dialog).to.not.be.ok;
          });
        });
      });
    });
  });

  describe('with a trigger and a sibling button', function() {
    let btn1: HTMLButtonElement;
    let btn2: HTMLButtonElement;

    async function clickButton1() {
      await clickElementAtCenter(btn1);
      await resetMouse();
    }

    async function clickButton2() {
      await clickElementAtCenter(btn2);
      await resetMouse();
    }

    beforeEach(async function() {
      const container = await fixture(html`
        <div>
          <pf-popover id="popover"
                      trigger="btn-1"
                      heading="Popover heading"
                      body="Popovers are triggered by click rather than hover."
                      footer="Popover footer"></pf-popover>
          <button id="btn-1">Toggle popover 1</button>
          <button id="btn-2">Toggle popover 2</button>
        </div>
      `);
      element = container.querySelector('pf-popover')!;
      btn1 = container.querySelector('#btn-1')!;
      btn2 = container.querySelector('#btn-2')!;
    });

    it('starts closed', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.find(x => x.role === 'dialog')).to.not.be.ok;
    });

    describe('clicking the trigger', function() {
      beforeEach(updateComplete);
      beforeEach(clickButton1);
      beforeEach(updateComplete);
      it('shows the popover', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.find(x => x.role === 'dialog')).to.be.ok;
      });
    });

    describe('setting the trigger to the sibling button', function() {
      beforeEach(updateComplete);
      beforeEach(function() {
        element.setAttribute('trigger', 'btn-2');
      });
      beforeEach(updateComplete);
      describe('clicking the first button', function() {
        beforeEach(updateComplete);
        beforeEach(clickButton1);
        beforeEach(updateComplete);
        it('remains closed', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot).to.deep.equal({
            name: '',
            role: 'WebArea',
            children: [
              { role: 'button', name: 'Toggle popover 1', focused: true },
              { role: 'button', name: 'Toggle popover 2' },
            ],
          });
        });
      });
      describe('clicking the sibling button', function() {
        beforeEach(updateComplete);
        beforeEach(clickButton2);
        beforeEach(updateComplete);
        it('shows the popover', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.find(x => x.role === 'dialog')).to.be.ok;
        });
      });
    });
    describe('then pressing the Enter key', function() {
      beforeEach(updateComplete);
      // Close the popover
      beforeEach(press('Enter'));
      beforeEach(updateComplete);
      it('closes the popover', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.deep.equal({
          role: 'WebArea',
          name: '',
          children: [
            {
              name: 'Toggle popover 1',
              role: 'button',
            },
            {
              name: 'Toggle popover 2',
              role: 'button',
            },
          ]
        });
      });
    });
  });
});
