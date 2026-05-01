import { expect, html, fixture, fixtureCleanup, nextFrame } from '@open-wc/testing';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import { sendKeys, resetMouse } from '@web/test-runner-commands';
import { PfV5Popover } from '@patternfly/elements/pf-v5-popover/pf-v5-popover.js';
import { PfV5Button } from '@patternfly/elements/pf-v5-button/pf-v5-button.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-v5-popover>', function() {
  let element: PfV5Popover;

  /** create a simple test fixture */
  async function setupSimpleInstance() {
    element = await fixture<PfV5Popover>(html`<pf-v5-popover></pf-v5-popover>`);
  }

  /** Wait on the element's update cycle */
  async function updateComplete() {
    await element.updateComplete;
  }

  /** Asserts that an aXe audit on the page passes */
  async function expectA11yAxe() {
    await expect(element).to.be.accessible();
  }

  function resetElement() {
    document.querySelectorAll('pf-v5-popover').forEach(e => e.remove());
    // @ts-expect-error: resetting test state, so we don't mind the ts error.
    element = undefined;
  }

  afterEach(resetElement);
  afterEach(fixtureCleanup);

  describe('simply instantiating', function() {
    beforeEach(setupSimpleInstance);
    it('should upgrade', async function() {
      const klass = customElements.get('pf-v5-popover');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5Popover);
    });
    it('should be accessible', expectA11yAxe);
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-popover'))
          .to.be.an.instanceof(PfV5Popover);
    });
    it('should not report anything to assistive technology', async function() {
      expect(await a11ySnapshot()).to.not.axContainRole('button');
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
      element = await fixture<PfV5Popover>(html`
        <pf-v5-popover heading="Popover heading"
                    body="Popovers are triggered by click rather than hover."
                    footer="Popover footer">
          <pf-v5-button>Toggle popover</pf-v5-button>
        </pf-v5-popover>
      `);
    });

    it('should be accessible', expectA11yAxe);

    it('should hide popover content from assistive technology', async function() {
      expect(await a11ySnapshot()).to.not.axContainRole('dialog');
    });

    describe('tabbing to the trigger', function() {
      beforeEach(resetElement);
      beforeEach(async function setupPopoverWithSlottedTriggerAndContentAttrs() {
        element = await fixture<PfV5Popover>(html`
          <pf-v5-popover heading="Popover heading"
                      body="Popovers are triggered by click rather than hover."
                      footer="Popover footer">
            <pf-v5-button>Toggle popover</pf-v5-button>
          </pf-v5-popover>
        `);
      });

      beforeEach(updateComplete);
      beforeEach(press('Tab'));
      beforeEach(updateComplete);

      it('doesn\'t steal tab order', function() {
        expect(document.activeElement).to.be.an.instanceof(PfV5Button);
      });

      describe('and pressing Enter', function() {
        beforeEach(updateComplete);
        beforeEach(press('Enter'));
        beforeEach(updateComplete);
        it('should show popover content to assistive technology', async function() {
          expect(await a11ySnapshot()).to.axContainRole('dialog');
        });
        describe('then pressing Enter again', function() {
          beforeEach(updateComplete);
          beforeEach(press('Enter'));
          beforeEach(updateComplete);
          it('should hide popover content from assistive technology', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('dialog');
          });
        });
        describe('then pressing Escape', function() {
          beforeEach(updateComplete);
          beforeEach(press('Escape'));
          beforeEach(updateComplete);
          it('should hide popover content from assistive technology', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('dialog');
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
          <pf-v5-popover id="popover"
                      trigger="btn-1"
                      heading="Popover heading"
                      body="Popovers are triggered by click rather than hover."
                      footer="Popover footer"></pf-v5-popover>
          <button id="btn-1">Toggle popover 1</button>
          <button id="btn-2">Toggle popover 2</button>
        </div>
      `);
      element = container.querySelector('pf-v5-popover')!;
      btn1 = container.querySelector('#btn-1')!;
      btn2 = container.querySelector('#btn-2')!;
    });

    it('starts closed', async function() {
      expect(await a11ySnapshot()).to.not.axContainRole('dialog');
    });

    describe('clicking the trigger', function() {
      beforeEach(updateComplete);
      beforeEach(clickButton1);
      beforeEach(updateComplete);
      it('shows the popover', async function() {
        expect(await a11ySnapshot()).to.axContainRole('dialog');
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
          expect(snapshot).to.not.axContainRole('dialog');
          expect(snapshot).to.axContainQuery({ role: 'button', name: 'Toggle popover 1', focused: true });
          expect(snapshot).to.axContainQuery({ role: 'button', name: 'Toggle popover 2' });
        });
      });
      describe('clicking the sibling button', function() {
        beforeEach(updateComplete);
        beforeEach(clickButton2);
        beforeEach(updateComplete);
        it('shows the popover', async function() {
          expect(await a11ySnapshot()).to.axContainRole('dialog');
        });
      });
    });
    describe('then pressing the Enter key', function() {
      beforeEach(updateComplete);
      beforeEach(press('Enter'));
      beforeEach(updateComplete);
      it('closes the popover', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot).to.not.axContainRole('dialog');
        expect(snapshot).to.axContainQuery({ role: 'button', name: 'Toggle popover 1' });
        expect(snapshot).to.axContainQuery({ role: 'button', name: 'Toggle popover 2' });
      });
    });
  });
});
