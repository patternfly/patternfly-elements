import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';
import { PfDropdown } from '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pf-dropdown>', function() {
  let element: PfDropdown;
  let snapshot: A11yTreeSnapshot;

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
      snapshot = await a11ySnapshot();
    });

    it('should be accessible', async function() {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should hide dropdown content from assistive technology', function() {
      expect(snapshot.children.length).to.equal(1);
    });

    describe('pressing Enter', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Enter' });
        snapshot = await a11ySnapshot();
      });

      it('should show menu', function() {
        // eslint-disable-next-line prefer-destructuring
        const menu = snapshot.children[1];
        expect(menu.children?.length).to.equal(2);
      });

      describe('pressing ArrowDown', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'ArrowDown' });
          await element.updateComplete;
          snapshot = await a11ySnapshot();
        });

        it('should focus on first menu item', function() {
          // eslint-disable-next-line prefer-destructuring
          const menu = snapshot.children[1];
          const [first] = menu.children;
          expect(first).to.deep.equal({ role: 'menuitem', name: 'item 1', focused: true });
        });

        describe('pressing Escape', function() {
          beforeEach(async function() {
            await sendKeys({ press: 'Escape' });
            snapshot = await a11ySnapshot();
          });

          it('should close menu', function() {
            expect(snapshot.children.length).to.deep.equal(1);
          });
        });
      });
    });

    describe('disabled', function() {
      beforeEach(async function() {
        element.disabled = true;
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('should not disable trigger button', function() {
        expect(snapshot.children.length).to.deep.equal(1);
      });

      describe('pressing Enter', function() {
        let menu: A11yTreeSnapshot;
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await sendKeys({ press: 'Enter' });
          snapshot = await a11ySnapshot();
          // eslint-disable-next-line prefer-destructuring
          menu = snapshot.children[1];
        });

        it('should show menu', function() {
          expect(menu.children?.length).to.equal(2);
        });

        it('should be disabled menu', function() {
          expect(menu.disabled).to.be.true;
        });
      });
    });
  });

  describe('with slotted trigger', function() {
    beforeEach(async function() {
      element = await createFixture<PfDropdown>(html`
        <pf-dropdown>
          <button id="custom" slot="trigger">Toggle</button>
          <pf-dropdown-item>item 1</pf-dropdown-item>
          <pf-dropdown-group label="Group">
            <pf-dropdown-item>item 2</pf-dropdown-item>
            <pf-dropdown-item disabled>disabled item</pf-dropdown-item>
          </pf-dropdown-group>
        </pf-dropdown>
      `);
      snapshot = await a11ySnapshot();
    });

    it('should be accessible', async function() {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should hide dropdown content from assistive technology', function() {
      expect(snapshot.children.length).to.equal(1);
    });

    describe('pressing Enter', function() {
      let menu: A11yTreeSnapshot;

      beforeEach(async function() {
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Enter' });
        snapshot = await a11ySnapshot();
        // eslint-disable-next-line prefer-destructuring
        menu = snapshot.children[1];
      });

      it('should show menu', function() {
        expect(menu.children?.length).to.equal(3);
      });

      describe('pressing ArrowDown', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'ArrowDown' });
          await element.updateComplete;
          snapshot = await a11ySnapshot();
        });

        it('should focus on first menu item', function() {
          // eslint-disable-next-line prefer-destructuring
          const menu = snapshot.children[1];
          const [first] = menu.children;
          expect(first).to.deep.equal({ role: 'menuitem', name: 'item 1', focused: true });
        });

        describe('pressing Escape', function() {
          beforeEach(async function() {
            await sendKeys({ press: 'Escape' });
            snapshot = await a11ySnapshot();
          });

          it('should close menu', function() {
            expect(snapshot.children.length).to.deep.equal(1);
          });
        });
      });
    });

    describe('disabled', function() {
      beforeEach(async function() {
        element.disabled = true;
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('should not disable trigger button', function() {
        expect(snapshot.children.length).to.deep.equal(1);
      });

      describe('pressing Enter', function() {
        let menu: A11yTreeSnapshot;
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await sendKeys({ press: 'Enter' });
          snapshot = await a11ySnapshot();
          // eslint-disable-next-line prefer-destructuring
          menu = snapshot.children[1];
        });

        it('should show menu', function() {
          expect(menu.children?.length).to.equal(3);
        });

        it('should be disabled menu', function() {
          expect(menu.disabled).to.be.true;
        });
      });
    });
  });
});

