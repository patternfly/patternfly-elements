import { expect, html, fixture, fixtureCleanup } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { PfDropdown } from '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';
import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pf-dropdown>', function() {
  let element: PfDropdown;
  let snapshot: A11yTreeSnapshot;
  beforeEach(async function() {
    element = await fixture<PfDropdown>(html`
      <pf-dropdown>
        <pf-button slot="trigger">Toggle dropdown</pf-button>
        <pf-dropdown-item value="value4">item4</pf-dropdown-item>
        <pf-dropdown-item value="value3">item3</pf-dropdown-item>
        <pf-dropdown-group label="Group 1">
          <pf-dropdown-item value="value1">item1</pf-dropdown-item>
          <pf-dropdown-item value="value2">item2</pf-dropdown-item>
          <pf-dropdown-item divider></pf-dropdown-item>
          <pf-dropdown-item value="value3">item3</pf-dropdown-item>
        </pf-dropdown-group>
        <pf-dropdown-group label="Group 2">
          <pf-dropdown-item value="value1">item1</pf-dropdown-item>
          <pf-dropdown-item value="value2">item2</pf-dropdown-item>
          <pf-dropdown-item disabled value="disabled"
            >disabled</pf-dropdown-item
          >
          <pf-dropdown-item value="value3">item3</pf-dropdown-item>
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
    expect(snapshot.children).to.deep.equal([{ name: 'Toggle dropdown', role: 'button' }]);
  });

  it('should show dropdown content to assistive technology', async function() {
    await sendKeys({ press: 'Tab' });
    expect(document.activeElement).to.be.an.instanceof(PfButton);
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([
      {
        'role': 'button',
        'name': 'Toggle dropdown'
      },
      {
        'role': 'listbox',
        'name': '',
        'orientation': 'vertical',
        'children': [
          {
            'role': 'listitem',
            'name': 'item4',
            'focused': true,
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          }
        ]
      }
    ]
    );
  });

  it('should be closeable on escape', async function() {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'Enter' });
    await sendKeys({ press: 'Escape' });
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ focused: true, name: 'Toggle dropdown', role: 'button' }]);
  });

  it('should be focusable first listitem on open', async function() {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    // eslint-disable-next-line prefer-destructuring
    const listItems = snapshot.children[1];
    expect(listItems.children[0]).to.deep.equal({ role: 'listitem', name: 'item4', focused: true, level: 1 });
  });

  it('should be closeable on select focusable item', async function() {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'Enter' });
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ focused: true, name: 'Toggle dropdown', role: 'button' }]);
  });

  it('should disable trigger button', async function() {
    fixtureCleanup();
    await fixture(html`
      <div>
        <pf-dropdown disabled>
            <pf-button slot="trigger">Toggle dropdown</pf-button>
            <pf-dropdown-item value="value1">item1</pf-dropdown-item>
            <pf-dropdown-item value="value2">item2</pf-dropdown-item>
        </pf-dropdown>
      </div>
    `);
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ role: 'button', name: 'Toggle dropdown', disabled: true }]);
  });

  it('should show default trigger button', async function() {
    fixtureCleanup();
    await fixture(html`
      <div>
        <pf-dropdown>
            <pf-dropdown-item value="value1">item1</pf-dropdown-item>
            <pf-dropdown-item value="value2">item2</pf-dropdown-item>
        </pf-dropdown>
      </div>
    `);
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ role: 'button', name: 'Dropdown' }]);
  });

  it('should be focusable first list for default trigger button', async function() {
    fixtureCleanup();
    await fixture(html`
      <div>
        <pf-dropdown>
            <pf-dropdown-item value="value1">item1</pf-dropdown-item>
            <pf-dropdown-item value="value2">item2</pf-dropdown-item>
        </pf-dropdown>
      </div>
    `);
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    // eslint-disable-next-line prefer-destructuring
    const listItems = snapshot.children[1];
    expect(listItems.children[0]).to.deep.equal({ role: 'listitem', name: 'item1', focused: true, level: 1 });
  });

  it('should properly clean up event handlers', async function() {
    const expectClose = () =>
      expect(snapshot.children).to.deep.equal([
        { role: 'button', name: 'Toggle dropdown 1' },
        { role: 'button', name: 'Toggle dropdown 2' }
      ]);
    const expectOpen = () =>
      expect(snapshot.children).to.deep.equal([
        {
          'role': 'button',
          'name': 'Toggle dropdown 1'
        },
        {
          'role': 'listbox',
          'name': '',
          'orientation': 'vertical',
          'children': [
            {
              'role': 'listitem',
              'name': 'item1',
              'focused': true,
              'level': 1
            },
            {
              'role': 'listitem',
              'name': '',
              'level': 1
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
          <pf-dropdown-item value="value1">item1</pf-dropdown-item>
          <pf-dropdown-item value="value2">item2</pf-dropdown-item>
        </pf-dropdown>
        <pf-dropdown id="dropdown-2">
          <pf-button id="btn-2" slot="trigger">Toggle dropdown 2</pf-button>
          <pf-dropdown-item value="value1">dropdown 2 item1</pf-dropdown-item>
          <pf-dropdown-item value="value2">dropdown 2 item2</pf-dropdown-item>
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
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expectClose();
    // click on second dropdown
    triggerButton2?.click();
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([
      {
        'role': 'button',
        'name': 'Toggle dropdown 1'
      },
      {
        'role': 'button',
        'name': 'Toggle dropdown 2'
      },
      {
        'role': 'listbox',
        'name': '',
        'orientation': 'vertical',
        'children': [
          {
            'role': 'listitem',
            'name': 'dropdown 2 item1',
            'focused': true,
            'level': 1
          },
          {
            'role': 'listitem',
            'name': '',
            'level': 1
          }
        ]
      }
    ]);
    // Close the second dropdown
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expectClose();
  });
});
