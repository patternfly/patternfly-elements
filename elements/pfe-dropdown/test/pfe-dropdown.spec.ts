import type { ActionOption, PfeDropdownOption, DropdownChangeEvent } from '@patternfly/pfe-dropdown';
import type { PfeDropdownItem } from '@patternfly/pfe-dropdown/pfe-dropdown-item.js';

import { expect, html, oneEvent } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfeDropdown } from '@patternfly/pfe-dropdown';

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

    function childIsActive(nthChild: number | string): boolean {
      return document.activeElement === element.querySelector(`pfe-dropdown-item:nth-of-type(${nthChild})`);
    }

    function press(press: string) {
      return async function() {
        await sendKeys({ press });
        await element.updateComplete;
      };
    }

    const options: PfeDropdownOption[] = [
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
          <pfe-dropdown-item item-type="link" disabled>
            <a href="#">Link 2</a>
          </pfe-dropdown-item>
          <pfe-dropdown-item item-type="link">
            <a href="#">Link 3</a>
          </pfe-dropdown-item>
          <pfe-dropdown-item item-type="separator"></pfe-dropdown-item>
          <pfe-dropdown-item item-type="action">
            <button>Action 1</button>
          </pfe-dropdown-item>
          <pfe-dropdown-item item-type="action" id="disabledItem" disabled>
            <button>Action 2</button>
          </pfe-dropdown-item>
        </pfe-dropdown>
      `);

      list = element.shadowRoot!.querySelector('ul')!;
      toggle = element.shadowRoot!.querySelector('button')!;
      toggleText = toggle.textContent!.trim();
    });

    it('should set the toggle text to the value of the label attribute', function() {
      expect(toggleText).to.equal('Test dropdown');
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

    it('should set a11y attributes when the disabled attribute is present on a dropdown item', async function() {
      const disabledItem = element.querySelector<PfeDropdownItem>('#disabledItem')!;

      expect(disabledItem.getAttribute('aria-disabled')).to.equal('true');

      disabledItem.removeAttribute('disabled');
      await disabledItem.updateComplete;

      expect(disabledItem.getAttribute('aria-disabled')).to.equal('false');
    });

    it('should not have event.preventDefault called on elements outside of the dropdown', async function() {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      element.parentElement!.appendChild(checkbox);
      await element.updateComplete;
      checkbox.click();
      expect(checkbox.checked).to.be.true;
      checkbox.remove();
    });

    it('should fire the change event when an item is selected', async function() {
      setTimeout(() => element.querySelector('button')?.click());
      const event = await oneEvent(element, 'change') as unknown as DropdownChangeEvent;
      expect(event.action).to.not.be.empty;

      /** @deprecated */
      setTimeout(() => element.querySelector('button')?.click());
      const depEvent = await oneEvent(element, 'pfe-dropdown:change') as unknown as CustomEvent;
      expect(depEvent.detail.action).to.not.be.empty;
    });

    describe('when clicked', function() {
      beforeEach(async function() {
        toggle.click();
        await element.updateComplete;
      });

      it('should open the menu', function() {
        expect(toggle.getAttribute('aria-expanded')).to.equal('true');
        expect(list.classList.contains('open'), 'has open class').to.be.true;
      });

      describe('then clicked again', function() {
        beforeEach(async function() {
          toggle.click();
          await element.updateComplete;
        });
        it('should close the menu', async function() {
          expect(toggle.getAttribute('aria-expanded')).to.equal('false');
          expect(list.classList[1]).to.not.equal('open');
        });
      });

      describe('then clicking outside the element', function() {
        beforeEach(async function() {
          document.body.click();
          await element.updateComplete;
        });

        it('should close the menu', function() {
          expect(toggle.getAttribute('aria-expanded')).to.equal('false');
          expect(list.classList[1]).to.not.equal('open');
        });
      });
    });

    describe('setting the options property', function() {
      beforeEach(async function() {
        element.options = options;
        await element.updateComplete;
      });

      it('should replace previous dropdown items', function() {
        expect(element.children.length).to.equal(options.length);
      });
    });

    describe('addDropdownOptions(...options)', function() {
      let initialChildrenLength: number;
      beforeEach(async function() {
        initialChildrenLength = element.children.length;
        element.addDropdownOptions(options);
        await element.updateComplete;
      });

      it('should add dropdown items', function() {
        expect([...element.children].pop()?.textContent).to.equal(([...options].pop() as ActionOption)?.text);
      });

      it('should preserve existing items', function() {
        expect(element.children.length).to.equal(initialChildrenLength + options.length);
      });
    });

    /** https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html */
    describe('when focused', function() {
      let menu: HTMLElement | null | undefined;
      beforeEach(async function() {
        menu = element.shadowRoot?.querySelector('#pfe-dropdown-menu');
        await sendKeys({ press: 'Tab' });
        await element.updateComplete;
      });

      it('focuses the button', function() {
        expect(document.activeElement, 'from light DOM').to.equal(element);
        expect(element.shadowRoot?.activeElement, 'from shadow DOM').to.equal(element.shadowRoot?.querySelector('button'));
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        it('should open dialog and focus first item.', function() {
          expect(element.querySelector('pfe-dropdown-item:focus')).to.be.visible;
        });
      });

      describe('Space', function() {
        beforeEach(press(' '));
        it('should open dialog and focus first item.', function() {
          expect(element.querySelector('pfe-dropdown-item:focus')).to.be.visible;
        });
      });

      describe('Enter', function() {
        beforeEach(press('Enter'));

        it('opens the menu', function() {
          expect(menu).to.be.visible;
        });

        it('should focus the first item', function() {
          expect(element.querySelector('pfe-dropdown-item:focus')).to.be.visible;
        });

        describe('then ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          describe('then Enter', function() {
            beforeEach(press('Enter'));
            it('should exit open dialog and move focus to the dropdown.', function() {
              expect(element.querySelector('pfe-dropdown-item:focus')).to.be.null;
              expect(element.matches(':focus')).to.be.true;
            });
          });
        });

        describe('then Tab', function() {
          beforeEach(press('Tab'));
          it('should exit open dialog and move focus elsewhere.', function() {
            expect(element.querySelector('pfe-dropdown-item:focus')).to.be.null;
            expect(element.matches(':focus')).to.be.false;
          });
        });

        describe('then Escape', function() {
          beforeEach(press('Escape'));
          it('should exit open dialog and return focus to the dropdown.', function() {
            expect(element.querySelector('pfe-dropdown-item:focus')).to.be.null;
            expect(element.matches(':focus')).to.be.true;
          });
        });

        describe('then ArrowDown', function() {
          beforeEach(press('ArrowDown'));

          it('should focus the 3rd item, skipping the first disabled item', function() {
            expect(childIsActive(3)).to.be.true;
          });

          describe('then ArrowDown', function() {
            beforeEach(async function() {
              await sendKeys({ press: 'ArrowDown' });
              await element.updateComplete;
            });

            it('should focus the 5th item, skipping the second disabled item and the separator', function() {
              expect(childIsActive(5)).to.be.true;
            });

            describe('then ArrowUp', function() {
              beforeEach(async function() {
                await sendKeys({ press: 'ArrowUp' });
              });

              it('should focus the third item, skipping the second disabled item and the separator', function() {
                expect(childIsActive(3)).to.be.true;
              });

              describe('then ArrowUp', function() {
                beforeEach(async function() {
                  await sendKeys({ press: 'ArrowUp' });
                });

                it('should focus the 1st item, skipping the disabled item', function() {
                  expect(childIsActive(1)).to.be.true;
                });

                describe('then ArrowUp', function() {
                  beforeEach(async function() {
                    await sendKeys({ press: 'ArrowUp' });
                  });

                  it('should focus the 5th item, wrapping around the first item to the end of the list', function() {
                    expect(childIsActive(5)).to.be.true;
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('when disabled', function() {
      let element: PfeDropdown;
      beforeEach(async function() {
        element = await createFixture<PfeDropdown>(html`
          <pfe-dropdown label="Test disabled dropdown" id="disabledDropdown" disabled>
            <pfe-dropdown-item item-type="link">
              <a href="#">Link 1</a>
            </pfe-dropdown-item>
          </pfe-dropdown>
        `);
      });
      it('sets aria-disabled attribute to true', function() {
        expect(element.getAttribute('aria-disabled')).to.equal('true');
      });

      describe('toggling `disabled`', function() {
        beforeEach(async function() {
          element.toggleAttribute('disabled');
          await element.updateComplete;
        });
        it('falsifies aria-disabled attribute', function() {
          expect(element.getAttribute('aria-disabled')).to.equal('false');
        });
      });
    });
  });
});
