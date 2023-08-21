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
  let element: PfPopover;

  /** create a simple test fixture */
  async function setupSimpleInstance() {
    element = await fixture<PfPopover>(html`<pf-popover></pf-popover>`);
  }

  /** create a test fixture with slotted trigger and content attrs */
  async function setupPopoverWithSlottedTriggerAndContentAttrs() {
    element = await fixture<PfPopover>(html`
      <pf-popover heading="Popover heading"
                  body="Popovers are triggered by click rather than hover."
                  footer="Popover footer">
        <pf-button>Toggle popover</pf-button>
      </pf-popover>
    `);
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
  function expectA11ySnapshot(expected?: Pick<A11yTreeSnapshot, 'name' | 'role'>[]) {
    return async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.map(takeProps(['name', 'role'])))
        .to.deep.equal(expected);
    };
  }

  function resetElement() {
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
    it('should not report anything to assistive technology', expectA11ySnapshot());
  });

  describe('with a slotted trigger; and with heading, body, and footer attributes', function() {
    /** Setup the a11y tree snapshot expected results for this suite */
    const snapshots = {
      opened: [
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
      ],
      closed: [
        {
          name: 'Toggle popover',
          role: 'button',
        }
      ],
    };

    beforeEach(setupPopoverWithSlottedTriggerAndContentAttrs);

    it('should be accessible', expectA11yAxe);
    it('should hide popover content from assistive technology', expectA11ySnapshot(snapshots.closed));

    describe('tabbing to the trigger', function() {
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
        it('should show popover content to assistive technology', expectA11ySnapshot(snapshots.opened));
        describe('then pressing Enter again', function() {
          beforeEach(updateComplete);
          beforeEach(press('Enter'));
          beforeEach(updateComplete);
          it('should hide popover content from assistive technology', expectA11ySnapshot(snapshots.closed));
        });
        describe('then pressing Escape', function() {
          beforeEach(updateComplete);
          beforeEach(press('Escape'));
          beforeEach(updateComplete);
          it('should hide popover content from assistive technology', expectA11ySnapshot(snapshots.closed));
        });
      });
    });
  });

  describe('with a trigger and a sibling button', function() {
    let btn1: HTMLButtonElement;
    let btn2: HTMLButtonElement;

    /** Setup the a11y tree snapshot expected results for this suite */
    const snapshots = {
      opened: [
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
      ],
      closed: [
        {
          name: 'Toggle popover 1',
          role: 'button',
        },
        {
          name: 'Toggle popover 2',
          role: 'button',
        },
      ],
    };

    async function clickButton1() {
      await clickElementCenter(btn1);
      await resetMouse();
    }

    async function clickButton2() {
      await clickElementCenter(btn2);
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

    it('starts closed', expectA11ySnapshot(snapshots.closed));
    describe('clicking the trigger', function() {
      beforeEach(updateComplete);
      beforeEach(clickButton1);
      beforeEach(updateComplete);
      it('shows the popover', expectA11ySnapshot(snapshots.opened));
    });
    describe('then setting the trigger to the sibling button', function() {
      beforeEach(updateComplete);
      // set trigger attr to the id of the second button
      beforeEach(async function() {
        element.setAttribute('trigger', 'btn-2');
      });
      beforeEach(updateComplete);
      describe('clicking the first button', function() {
        beforeEach(updateComplete);
        beforeEach(clickButton1);
        beforeEach(updateComplete);
        it('remains closed', expectA11ySnapshot(snapshots.closed));
      });
      describe('clicking the sibling button', function() {
        beforeEach(updateComplete);
        beforeEach(clickButton2);
        beforeEach(updateComplete);
        it('shows the popup', expectA11ySnapshot(snapshots.opened));
      });
    });
    describe('then pressing the Enter key', function() {
      beforeEach(updateComplete);
      // Close the popover
      beforeEach(press('Enter'));
      beforeEach(updateComplete);
      it('closes the popover', expectA11ySnapshot(snapshots.closed));
    });
  });
});
