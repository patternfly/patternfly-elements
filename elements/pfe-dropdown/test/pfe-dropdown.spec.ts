import { expect, html, oneEvent} from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfeDropdown, PfeDropdownOption, DropdownChangeEvent } from '@patternfly/pfe-dropdown';
import { PfeDropdownItem } from '@patternfly/pfe-dropdown/pfe-dropdown-item.js';

describe('<pfe-dropdown>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfeDropdown>(html`<pfe-dropdown></pfe-dropdown>`);
    expect(element, 'the <pfe-dropdown> should be an instance of PfeDropdown')
      .to.be.an.instanceof(customElements.get('pfe-dropdown'))
      .and
      .to.be.an.instanceof(PfeDropdown);
  });

  describe('with 2 links, a separator, and 2 actions (one disabled)', function() {
    let element: PfeDropdown;
    let toggleText: string;
    let toggle: HTMLButtonElement;
    let list: HTMLUListElement;
    let options: PfeDropdownOption[] = [
      { href: 'https://bit.ly/3b9wvWg', text: 'Dynamic 1', type: 'link', disabled: false },
      { href: 'https://bit.ly/3b9wvWg', text: 'Dynamic 2', type: 'link', disabled: false },
      { href: 'https://bit.ly/3b9wvWg', text: 'Dynamic 3', type: 'link', disabled: true },
      { type: 'separator' },
      { text: 'Action 1', type: 'action', disabled: false },
      { text: 'Action 2', type: 'action', disabled: true },
    ];

    afterEach(function() {
      // @ts-expect-error: cleanup. it's fine in a test file
      element = void 0;
      // @ts-expect-error: cleanup. it's fine in a test file
      toggleText = void 0;
      // @ts-expect-error: cleanup. it's fine in a test file
      toggle = void 0;
      // @ts-expect-error: cleanup. it's fine in a test file
      list = void 0;
    });

    beforeEach(async function() {
      element = await createFixture<PfeDropdown>(html`
        <pfe-dropdown label="Test dropdown">
          <pfe-dropdown-item item-type="link">
            <a href="#">Link 1</a>
          </pfe-dropdown-item>
          <pfe-dropdown-item item-type="link">
            <a href="#">Link 2</a>
          </pfe-dropdown-item>
          <pfe-dropdown-item item-type="separator"></pfe-dropdown-item>
          <pfe-dropdown-item item-type="action">
            <button>Action 1</button>
          </pfe-dropdown-item>
          <pfe-dropdown-item item-type="action" id="disabledItem" disabled>
            <button>Action 2</button>
          </pfe-dropdown-item>
        </pfe-dropdown>`);

      list = element.shadowRoot!.querySelector('ul')!;
      toggle = element.shadowRoot!.querySelector('button')!;
      toggleText = toggle.textContent!.trim();
    });

    it('should set the toggle text to the value of the label attribute', function() {
      expect(toggleText).to.equal('Test dropdown');
    });

    it('should toggle the menu open and closed when clicked', async function() {
      // open
      toggle.click();
      await element.updateComplete;

      expect(toggle.getAttribute('aria-expanded')).to.equal('true');
      expect(list.classList.contains('open'), 'has open class').to.be.true;

      // close
      toggle.click();
      await element.updateComplete;

      expect(toggle.getAttribute('aria-expanded')).to.equal('false');
      expect(list.classList[1]).to.not.equal('open');
    });

    it('should close the menu when clicked outside the component', async function() {
      // click anywhere outside the pfe-dropdown component
      element.click();
      await element.updateComplete;

      expect(toggle.getAttribute('aria-expanded')).to.equal('false');
      expect(list.classList[1]).to.not.equal('open');
    });

    it('should set the appropriate a11y attributes when item-type is "link"', async function() {
      const listItem = element.querySelector('[item-type=link]')!.shadowRoot!.querySelector('li')!;
      const listItemRole = listItem.getAttribute('role');
      const [link] = listItem.querySelector('slot')!.assignedElements();
      const linkRole = link.getAttribute('role');
      await element.updateComplete;
      expect(listItemRole).to.equal('none');
      expect(linkRole).to.equal('menuitem');
    });

    it('should set the appropriate a11y attributes when item-type is "action"', async function() {
      const listItem =
        element.querySelector('[item-type=action]')!.shadowRoot!.querySelector('li')!;
      const listItemRole = listItem.getAttribute('role');

      expect(listItemRole).to.equal('menuitem');
    });

    it('should set a11y attributes when item-type is "separator"', async function() {
      const listItem =
        element.querySelector('[item-type=separator]')!.shadowRoot!.querySelector('li')!;
      const listItemRole = listItem.getAttribute('role');

      expect(listItemRole).to.equal('separator');
    });

    it(`should set a11y attributes when the disabled attribute is present on a dropdown item`, async function() {
      const disabledItem = element.querySelector<PfeDropdownItem>('#disabledItem')!;

      expect(disabledItem.getAttribute('aria-disabled')).to.equal('true');

      disabledItem.removeAttribute('disabled');
      await disabledItem.updateComplete;

      expect(disabledItem.getAttribute('aria-disabled')).to.equal('false');
    });

    it(`should not have event.preventDefault called on elements outside of the dropdown`, async function() {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      element.parentElement!.appendChild(checkbox);
      await element.updateComplete;
      checkbox.click();
      expect(checkbox.checked).to.be.true;
      checkbox.remove();
    });

    it('should create dropdown options through the options property', async function() {
      element.options = options;
      await element.updateComplete;
      expect(element.children.length).to.equal(options.length);
    });

    it('should add dropdown options through addDropdownOptions API, this should be additive', async function() {
      const childrenLength = element.children.length;
      element.addDropdownOptions(options);
      await element.updateComplete;
      expect(element.children.length).to.equal(options.length + childrenLength);
    });

    it('should fire the change event when an item is selected', async function() {
      setTimeout(() => element.querySelector('button')?.click());
      const event = await oneEvent(element, 'change') as unknown as DropdownactionChangeEvent;
      expect(event.action).to.not.be.empty;

      /** @deprecated */
      setTimeout(() => element.querySelector('button')?.click());
      const depEvent = await oneEvent(element, 'pfe-dropdown:change') as unknown as DropdownactionChangeEvent;
      expect(depEvent.detail.action).to.not.be.empty;
    });
  });

  it(`should set a11y attributes when the disabled attribute is present on the dropdown`, async function() {
    const element = await createFixture<PfeDropdown>(html`
      <pfe-dropdown label="Test disabled dropdown" id="disabledDropdown" disabled>
        <pfe-dropdown-item item-type="link">
          <a href="#">Link 1</a>
        </pfe-dropdown-item>
      </pfe-dropdown>`);

    expect(element.getAttribute('aria-disabled')).to.equal('true');

    element.removeAttribute('disabled');
    await element.updateComplete;

    expect(element.getAttribute('aria-disabled')).to.equal('false');
  });
});
