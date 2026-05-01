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
      expect(await a11ySnapshot()).to.not.axContainRole('menu');
    });

    describe('pressing Enter', function() {
      beforeEach(press('Tab'));
      beforeEach(press('Enter'));
      beforeEach(updateComplete);

      it('should show menu', async function() {
        expect(await a11ySnapshot()).to.axContainRole('menu');
      });

      it('should focus on first menu item', async function() {
        expect(await a11ySnapshot())
            .axTreeFocusedNode.to.have
            .axRole('menuitem')
            .and.axName('item 1');
      });

      describe('pressing ArrowDown', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'ArrowDown' });
          await element.updateComplete;
        });

        it('should focus on second menu item', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode.to.have
              .axRole('menuitem')
              .and.axName('item 2');
        });

        describe('pressing Escape', function() {
          beforeEach(async function() {
            await sendKeys({ press: 'Escape' });
          });

          it('should close menu', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('menu');
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
        expect(await a11ySnapshot())
            .to.axContainQuery({ disabled: true });
      });

      describe('pressing Enter', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await sendKeys({ press: 'Enter' });
        });

        it('should show menu', async function() {
          expect(await a11ySnapshot()).to.axContainRole('menu');
        });
      });

      describe('clicking toggle', function() {
        beforeEach(async function() {
          await clickElementAtCenter(element);
          await resetMouse();
        });

        it('should show menu', async function() {
          expect(await a11ySnapshot()).to.axContainRole('menu');
        });
      });
    });
  });
});
