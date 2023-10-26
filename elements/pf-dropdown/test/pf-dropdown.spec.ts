import { expect, html, fixture, fixtureCleanup } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { PfDropdown } from '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pf-dropdown>', function() {
  let element: PfDropdown;
  let snapshot: A11yTreeSnapshot;
  beforeEach(async function() {
    element = await fixture<PfDropdown>(html`
      <pf-dropdown>
        <button id="custom" slot="trigger">Toggle</button>
        <pf-dropdown-item>item 1</pf-dropdown-item>
        <pf-dropdown-group label="Group">
          <pf-dropdown-item>item 2</pf-dropdown-item>
          <hr>
          <pf-dropdown-item disabled>disabled item</pf-dropdown-item>
        </pf-dropdown-group>
      </pf-dropdown>
    `);
    snapshot = await a11ySnapshot();
  });

  it('imperatively instantiates', function() {
    const el = document.createElement('pf-dropdown');
    expect(el).to.be.an.instanceof(PfDropdown);
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-dropdown');
    expect(element).to.be.an.instanceOf(klass).and.to.be.an.instanceOf(PfDropdown);
  });

  it('should be accessible', async function() {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should hide dropdown content from assistive technology', function() {
    expect(snapshot.children.length).to.equal(1);
  });

  describe('pressing `Enter` key', function() {
    beforeEach(async function() {
      await sendKeys({ press: 'Tab' });
      await sendKeys({ press: 'Enter' });
      snapshot = await a11ySnapshot();
    });

    it('should show menu', function() {
      // eslint-disable-next-line prefer-destructuring
      const menu = snapshot.children[1];
      expect(menu.children?.length).to.equal(3);
    });

    describe('pressing `ArrowDown` key', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'ArrowDown' });
        snapshot = await a11ySnapshot();
      });

      it('should focus on first menu item', function() {
        // eslint-disable-next-line prefer-destructuring
        const menu = snapshot.children[1];
        const [first] = menu.children;
        expect(first).to.deep.equal({ role: 'menuitem', name: 'item 1', focused: true });
      });

      describe('pressing `Escape` key', function() {
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

  describe('pressing `Enter` to select an item', function() {
    beforeEach(async function() {
      await sendKeys({ press: 'Tab' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      snapshot = await a11ySnapshot();
    });
    it('should close menu', function() {
      expect(snapshot.children.length).to.equal(1);
    });
  });

  describe('with `disabled` attribute', function() {
    beforeEach(async function() {
      element.disabled = true;
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    it('should not disable trigger button', function() {
      expect(snapshot.children.length).to.deep.equal(1);
    });

    describe('pressing `Enter` key', function() {
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

describe('with default trigger button', function() {
  let snapshot: A11yTreeSnapshot;
  let element: HTMLElement;

  beforeEach(async function() {
    element = await fixture(html`
        <pf-dropdown>
            <pf-dropdown-item>item1</pf-dropdown-item>
            <pf-dropdown-item>item2</pf-dropdown-item>
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

  describe('pressing `Enter` key', function() {
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

    describe('pressing `ArrowDown` key', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'ArrowDown' });
        snapshot = await a11ySnapshot();
      });

      it('should focus on first menu item', function() {
        // eslint-disable-next-line prefer-destructuring
        const menu = snapshot.children[1];
        const [first] = menu.children;
        expect(first).to.deep.equal({ role: 'menuitem', name: 'item 1', focused: true });
      });

      describe('pressing `Escape` key', function() {
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
});
