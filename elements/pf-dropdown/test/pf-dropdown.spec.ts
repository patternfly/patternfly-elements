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
        <button slot="trigger">Toggle</button>
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

      it('should focus on first menu item', async function() {
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
  let trigger1: HTMLElement | null;
  let trigger2: HTMLElement | null;
  beforeEach(async function() {
    fixtureCleanup();
    element = await fixture(html`
        <div>
          <pf-dropdown id="dropdown-1">
            <pf-button id="btn-1" slot="trigger">Toggle dropdown 1</pf-button>
            <pf-dropdown-item>item1</pf-dropdown-item>
            <pf-dropdown-item>item2</pf-dropdown-item>
          </pf-dropdown>
          <pf-dropdown id="dropdown-2">
            <pf-button id="btn-2" slot="trigger">Toggle dropdown 2</pf-button>
            <pf-dropdown-item>dropdown 2 item1</pf-dropdown-item>
            <pf-dropdown-item>dropdown 2 item2</pf-dropdown-item>
          </pf-dropdown>
        </div>
      `);
    trigger1 = document.getElementById('btn-1');
    trigger2 = document.getElementById('btn-2');
    snapshot = await a11ySnapshot();
  });

  it('should be closed', function() {
    expect(snapshot.children.length).to.equal(1);
  });

  describe('clicking first trigger button', function() {
    beforeEach(async function() {
      trigger1?.click();
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    it('should be open', function() {
      expect(snapshot.children.length).to.equal(3);
    });

    it('should properly clean up event handlers', async function() {
      const expectClose = (focused?: boolean) =>
        expect(snapshot.children).to.deep.equal([
          focused ? { role: 'button', name: 'Toggle dropdown 1', focused: true }
            : { role: 'button', name: 'Toggle dropdown 1' },
          { role: 'button', name: 'Toggle dropdown 2' }
        ]);
      const expectOpen = () =>
        expect(snapshot.children).to.deep.equal([
          {
            'role': 'button',
            'name': 'Toggle dropdown 1'
          },
          {
            'role': 'menu',
            'name': '',
            'orientation': 'vertical',
            'children': [
              {
                'role': 'menuitem',
                'name': 'item1'
              },
              {
                'role': 'menuitem',
                'name': 'item2'
              }
            ]
          },
          {
            'role': 'button',
            'name': 'Toggle dropdown 2'
          }
        ]);
      fixtureCleanup();
      const container = await fixture(html`
        <div>
          <pf-dropdown id="dropdown-1">
            <pf-button id="btn-1" slot="trigger">Toggle dropdown 1</pf-button>
            <pf-dropdown-item>item1</pf-dropdown-item>
            <pf-dropdown-item>item2</pf-dropdown-item>
          </pf-dropdown>
          <pf-dropdown id="dropdown-2">
            <pf-button id="btn-2" slot="trigger">Toggle dropdown 2</pf-button>
            <pf-dropdown-item>dropdown 2 item1</pf-dropdown-item>
            <pf-dropdown-item>dropdown 2 item2</pf-dropdown-item>
          </pf-dropdown>
        </div>
      `);
      snapshot = await a11ySnapshot();
      const triggerButton1: HTMLButtonElement | null = container.querySelector('#btn-1');
      const triggerButton2: HTMLButtonElement | null = container.querySelector('#btn-2');

      expectClose();
      triggerButton1?.click();
      snapshot = await a11ySnapshot();
      expectOpen();
      // Close the dropdown
      triggerButton1?.focus();
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      snapshot = await a11ySnapshot();
      expectClose(true);
      // click on second dropdown
      triggerButton2?.focus();
      triggerButton2?.click();
      snapshot = await a11ySnapshot();
      expect(snapshot.children).to.deep.equal([
        {
          'role': 'button',
          'name': 'Toggle dropdown 1'
        },
        {
          'role': 'button',
          'name': 'Toggle dropdown 2',
          'focused': true
        },
        {
          'role': 'menu',
          'name': '',
          'orientation': 'vertical',
          'children': [
            {
              'role': 'menuitem',
              'name': 'dropdown 2 item1'
            },
            {
              'role': 'menuitem',
              'name': 'dropdown 2 item2'
            }
          ]
        }
      ]);
      /*/
      // Close the second dropdown
      await sendKeys({ press: 'Enter' });
      snapshot = await a11ySnapshot();
      expectClose();*/
    });
  });
});

describe.skip('with default trigger button', function() {
  let snapshot: A11yTreeSnapshot;

  beforeEach(async function() {
    await fixture(html`
        <pf-dropdown>
            <pf-dropdown-item>item1</pf-dropdown-item>
            <pf-dropdown-item>item2</pf-dropdown-item>
        </pf-dropdown>
    `);
    snapshot = await a11ySnapshot();
  });

  it('should show default trigger button', function() {
    expect(snapshot.children).to.deep.equal([{ role: 'button', name: 'Dropdown' }]);
  });


  describe('with default trigger button', function() {
    beforeEach(async function() {
      await sendKeys({ press: 'Tab' });
      await sendKeys({ press: 'ArrowDown' });
      snapshot = await a11ySnapshot();
    });

    it('should be focusable first list for default trigger button', function() {
      // eslint-disable-next-line prefer-destructuring
      const menu = snapshot.children[1];
      expect(menu.children[0]).to.deep.equal({ role: 'menuitem', name: 'item 1', focused: true });
    });
  });
});
