import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys, resetMouse } from '@web/test-runner-commands';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import { PfV5Dropdown } from '@patternfly/elements/pf-v5-dropdown/pf-v5-dropdown.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-v5-dropdown>', function() {
  let element: PfV5Dropdown;

  const updateComplete = () => element.updateComplete;

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-dropdown')).to.be.an.instanceof(PfV5Dropdown);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfV5Dropdown>(html`<pf-v5-dropdown></pf-v5-dropdown>`);
      const klass = customElements.get('pf-v5-dropdown');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5Dropdown);
    });
  });

  describe('with default toggle button', function() {
    beforeEach(async function() {
      element = await createFixture<PfV5Dropdown>(html`
        <pf-v5-dropdown>
          <pf-v5-dropdown-item>item 1</pf-v5-dropdown-item>
          <pf-v5-dropdown-item>item 2</pf-v5-dropdown-item>
        </pf-v5-dropdown>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible({
        ignoredRules: [
          /** @see https://github.com/dequelabs/axe-core/issues/4259 */
          'aria-allowed-attr',
          /** false positive: the menuitem is projected into a menu in another shadow root */
          'aria-required-parent',
        ],
      });
    });

    it('should hide dropdown content from assistive technology', async function() {
      const snapshot = await a11ySnapshot();
      const menu = snapshot.children?.find(x => x.role === 'menu');
      expect(menu).to.not.be.ok;
    });

    describe('pressing Enter', function() {
      beforeEach(press('Tab'));
      beforeEach(press('Enter'));
      beforeEach(updateComplete);

      it('should show menu', async function() {
        const snapshot = await a11ySnapshot();
        const menu = snapshot?.children?.find(x => x.role === 'menu');
        expect(menu).to.be.ok;
        expect(menu?.children?.length).to.equal(2);
      });

      it('should focus on first menu item', async function() {
        const snapshot = await a11ySnapshot();
        const menu = snapshot?.children?.find(x => x.role === 'menu');
        const focused = menu?.children?.find(x => x.focused);
        expect(focused).to.deep.equal({ role: 'menuitem', name: 'item 1', focused: true });
      });

      describe('pressing ArrowDown', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'ArrowDown' });
          await element.updateComplete;
        });

        it('should focus on secondc menu item', async function() {
          const snapshot = await a11ySnapshot();
          const menu = snapshot?.children?.find(x => x.role === 'menu');
          const focused = menu?.children?.find(x => x.focused);
          expect(focused).to.deep.equal({ role: 'menuitem', name: 'item 2', focused: true });
        });

        describe('pressing Escape', function() {
          beforeEach(async function() {
            await sendKeys({ press: 'Escape' });
          });

          it('should close menu', async function() {
            const snapshot = await a11ySnapshot();
            const menu = snapshot?.children?.find(x => x.role === 'menu');
            expect(snapshot.children?.length).to.equal(1);
            expect(menu).to.not.be.ok;
          });
        });
      });
    });

    describe('disabled', function() {
      beforeEach(async function() {
        element.disabled = true;
        await element.updateComplete;
      });

      it('should disable toggle button', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.length).to.equal(1);
        expect(snapshot.children?.at(0)?.disabled).to.be.true;
      });

      describe('pressing Enter', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await sendKeys({ press: 'Enter' });
        });

        it('should show menu', async function() {
          const snapshot = await a11ySnapshot();
          const menu = snapshot?.children?.find(x => x.role === 'menu');
          expect(menu).to.be.ok;
          expect(menu?.children?.length).to.equal(2);
        });
      });

      describe('clicking toggle', function() {
        beforeEach(async function() {
          await clickElementAtCenter(element);
          await resetMouse();
        });

        it('should show menu', async function() {
          const snapshot = await a11ySnapshot();
          const menu = snapshot?.children?.find(x => x.role === 'menu');
          expect(menu).to.be.ok;
          expect(menu?.children?.length).to.equal(2);
        });
      });
    });
  });
});
