import { expect, html, fixture, fixtureCleanup } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { PfDropdown } from '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';

describe('<pf-dropdown>', function() {
  let element: PfDropdown;
  let snapshot: A11yTreeSnapshot;
  beforeEach(async function() {
    element = await fixture<PfDropdown>(html`
      <pf-dropdown>
        <pf-dropdown-item>item 1</pf-dropdown-item>
        <pf-dropdown-group label="Group">
          <pf-dropdown-item>item 2</pf-dropdown-item>
          <hrå>
          <pf-dropdown-item disabled>disabled item</pf-dropdown-item>
        </pf-dropdown-group>
      </pf-dropdown>
    `);
    snapshot = await a11ySnapshot();
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-dropdown');
    expect(element).to.be.an.instanceOf(klass).and.to.be.an.instanceOf(PfDropdown);
  });

  it('should be accessible', async function() {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should hide dropdown content from assistive technology', function() {
    expect(snapshot.children).to.deep.equal([{ role: 'button', name: 'Dropdown' }]);
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
          expect(snapshot.children).to.deep.equal([
            {
              name: 'Dropdown',
              role: 'button'
            }
          ]);
        });
      });
    });
  });

  it.skip('should be closeable on select focusable item', async function() {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ focused: true, name: 'Toggle dropdown', role: 'button' }]);
  });

  it.skip('should not disable trigger button', async function() {
    fixtureCleanup();
    await fixture(html`
      <div>
        <pf-dropdown disabled>
            <pf-button slot="trigger">Toggle dropdown</pf-button>
            <pf-dropdown-item>item1</pf-dropdown-item>
            <pf-dropdown-item>item2</pf-dropdown-item>
        </pf-dropdown>
      </div>
    `);
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ role: 'button', name: 'Toggle dropdown' }]);
  });

  it.skip('should show default trigger button', async function() {
    fixtureCleanup();
    await fixture(html`
      <div>
        <pf-dropdown>
            <pf-dropdown-item>item1</pf-dropdown-item>
            <pf-dropdown-item>item2</pf-dropdown-item>
        </pf-dropdown>
      </div>
    `);
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ role: 'button', name: 'Dropdown' }]);
  });

  it.skip('should be focusable first list for default trigger button', async function() {
    fixtureCleanup();
    await fixture(html`
      <div>
        <pf-dropdown>
            <pf-dropdown-item>item1</pf-dropdown-item>
            <pf-dropdown-item>item2</pf-dropdown-item>
        </pf-dropdown>
      </div>
    `);
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'ArrowDown' });
    snapshot = await a11ySnapshot();
    // eslint-disable-next-line prefer-destructuring
    const listItems = snapshot.children[1];
    expect(listItems.children[0]).to.deep.equal({ role: 'menuitem', name: 'item1', focused: true });
  });

  it.skip('should properly clean up event handlers', async function() {
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
    ]);/*
    // Close the second dropdown
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expectClose();*/
  });
});
