import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';
import { PfDropdown } from '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';


function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-dropdown>', function() {
  let element: PfDropdown;

  const updateComplete = () => element.updateComplete;

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-dropdown')).to.be.an.instanceof(PfDropdown);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfDropdown>(html`<pf-dropdown></pf-dropdown>`);
      const klass = customElements.get('pf-dropdown');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfDropdown);
    });
  });

  describe('with default trigger button', function() {
    beforeEach(async function() {
      element = await createFixture<PfDropdown>(html`
        <pf-dropdown>
          <pf-dropdown-item>item 1</pf-dropdown-item>
          <pf-dropdown-item>item 2</pf-dropdown-item>
        </pf-dropdown>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible({
        // suspected false positive
        //       Error: Accessibility Violations
        // ---
        // Rule: aria-required-parent
        // Impact: critical
        // Certain ARIA roles must be contained by particular parents (https://dequeuniversity.com/rules/axe/4.7/aria-required-parent?application=axeAPI)
        //
        // Issue target: pf-dropdown-item:nth-child(1),#item
        // Context: <div id="item" role="menuitem" tabindex="0">
        //           <slot name="icon"></slot>
        //           <slot></slot>
        //         </div>
        // Fix any of the following:
        //   Required ARIA parents role not present: menu, menubar, group
        //
        // Issue target: pf-dropdown-item:nth-child(2),#item
        // Context: <div id="item" role="menuitem" tabindex="-1">
        //           <slot name="icon"></slot>
        //           <slot></slot>
        //         </div>
        // Fix any of the following:
        //   Required ARIA parents role not present: menu, menubar, group
        // ---
        ignoredRules: ['aria-required-parent'],
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

      it('should disable trigger button', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.length).to.equal(1);
        expect(snapshot.children?.at(0)?.disabled).to.be.true;
      });

      describe('pressing Enter', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await sendKeys({ press: 'Enter' });
        });

        it('should not show menu', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.length).to.equal(1);
        });
      });
    });
  });
});
