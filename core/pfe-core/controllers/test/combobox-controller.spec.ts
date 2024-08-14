/* eslint-disable lit-a11y/accessible-name */
import { expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot, querySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { state } from 'lit/decorators/state.js';
import { LitElement, html } from 'lit';

import { ComboboxController } from '../combobox-controller.js';
import { SlotController } from '../slot-controller.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}


describe('ComboboxController', function() {
  describe('With toggle and combobox in shadow root but items in light DOM', function() {
    let element: XComboboxShadow;

    @customElement('x-combobox-shadow')
    class XComboboxShadow extends LitElement {
      @query('#listbox') private _listbox?: HTMLElement;
      @query('#button') private _button?: HTMLElement;
      @query('#combobox') private _combobox?: HTMLInputElement;
      @query('#placeholder') private _placeholder?: HTMLOptionElement;

      @state() expanded = false;

      /** List of options */
      get options(): HTMLOptionElement[] {
        return [this._placeholder, ...Array.from(this.querySelectorAll('option'))].filter(x => !!x);
      }

      #combobox = ComboboxController.of(this, {
        multi: false,
        getItems: () => this.options,
        isItem: item => item instanceof HTMLOptionElement,
        getFallbackLabel: () => 'options',
        getListboxElement: () => this._listbox ?? null,
        getToggleButton: () => this._button ?? null,
        getComboboxInput: () => this._combobox ?? null,
        isExpanded: () => this.expanded,
        requestShowListbox: () => this.expanded ||= true,
        requestHideListbox: () => ((this.expanded &&= false), true),
        setItemActive(active) {
          this.classList.toggle('active', !!active);
        },
        setItemSelected(selected) {
          this.selected = selected;
        },
      });

      override render() {
        const { canControlLightDom } = ComboboxController;
        return html`
            <div id="toggle">
              <input id="combobox">
              <button id="button">Show Options</button>
            </div>
            <div id="listbox" ?hidden="${!this.expanded}">
              <option id="placeholder"
                      aria-disabled="true"
                      aria-hidden="${String(!!(this.#combobox.selected.length)) as 'true' | 'false'}">
                Select an Option
              </option>
              ${this.#combobox.renderItemsToShadowRoot()}
              <div ?hidden=${!canControlLightDom}>
                <slot></slot>
              </div>
            </div>
          `;
      }
    }

    beforeEach(async function() {
      element = await fixture<XComboboxShadow>(html`
        <x-combobox-shadow>${Array.from({ length: 10 }, (_, i) => html`
          <option>${i + 1}</option>`)}
        </x-combobox-shadow>
      `);
      await element.updateComplete;
    });

    describe('tabbing to the combobox', function() {
      beforeEach(press('Tab'));
      it('focuses the combobox', async function() {
        const snapshot = await a11ySnapshot();
        expect(querySnapshot(snapshot, { focused: true })?.role).to.equal('combobox');
      });
      describe('tabbing out of the combobox', function() {
        beforeEach(press('Tab'));
        it('does not focus the toggle button', async function() {
          const snapshot = await a11ySnapshot();
          expect(querySnapshot(snapshot, { focused: true })).to.equal(null);
        });
      });
      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));

        it('expands the listbox', async function() {
          const snapshot = await a11ySnapshot();
          expect(querySnapshot(snapshot, { role: 'listbox' })?.children, 'listbox children').to.have.length(11);
          expect(querySnapshot(snapshot, { role: 'combobox' })?.expanded, 'expanded').to.equal(true);
        });

        it('maintains DOM focus on the combobox', async function() {
          const snapshot = await a11ySnapshot();
          expect(querySnapshot(snapshot, { focused: true })?.role).to.equal('combobox');
        });

        it.skip('sets active state on the first option', async function() {
          // maybe this is a problem with the demo element
          await element.updateComplete;
          expect(element.querySelector('option')?.classList.contains('active')).to.equal(true);
        });

        describe('pressing Escape', function() {
          beforeEach(press('Escape'));
          it('collapses the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(querySnapshot(snapshot, { role: 'combobox' })?.expanded, 'expanded').to.equal(undefined);
          });
          it('maintains DOM focus on the combobox', async function() {
            const snapshot = await a11ySnapshot();
            expect(querySnapshot(snapshot, { focused: true })?.role).to.equal('combobox');
          });
        });
      });
    });
  });

  describe('With input, listbox, and options in the lightdom', function() {
    let element: XComboboxLight;

    @customElement('x-combobox-light')
    class XComboboxLight extends LitElement {
      #slots = new SlotController(this, null, 'input', 'button');

      /** List of options */
      get options(): HTMLOptionElement[] {
        return [...Array.from(this.querySelectorAll('option'))].filter(x => !!x);
      }

      #canControlLightDom = ComboboxController.canControlLightDom;

      #combobox = ComboboxController.of(this, {
        multi: false,
        isExpanded: () => this.expanded,
        requestShowListbox: () => this.expanded ||= true,
        requestHideListbox: () => ((this.expanded &&= false), true),
        getListboxElement: () => this.#canControlLightDom ? this._listbox as HTMLElement : [...this.#slots.getSlotted()].shift() as HTMLElement,
        getToggleButton: () => [...this.#slots.getSlotted('button')].shift() as HTMLElement,
        getComboboxInput: () => [...this.#slots.getSlotted('input')].shift() as HTMLElement,
        getFallbackLabel: () => 'options',
        getItems: () => this.options,
      });

      @query('#listbox') private _listbox?: HTMLElement;

      @state() expanded = false;

      override render() {
        return html`
            <div id="toggle">
              <slot name="input"></slot>
              <slot name="button"></slot>
            </div>
            <div ?hidden=${this.#canControlLightDom} id="listbox" role="listbox">
              <option id="placeholder"
                      aria-disabled="true"
                      aria-hidden="${String(!!(this.#combobox.selected.length)) as 'true' | 'false'}">
                Select an Option
              </option>
              ${this.#combobox.renderItemsToShadowRoot()}
            </div>
          </div>
            <div ?hidden=${!this.#canControlLightDom}>
              <slot></slot>
            </div>
          `;
      }
    }

    beforeEach(async function() {
      element = await fixture<XComboboxLight>(html`
        <x-combobox-light>
          <input slot="input">
          <button slot="button">Show Options</button>
          ${Array.from({ length: 10 }, (_, i) => html`<option>${i + 1}</option>`)}å
        </x-combobox-light>
      `);
      await element.updateComplete;
    });

    describe('tabbing to the combobox', function() {
      beforeEach(press('Tab'));
      it('focuses the combobox', async function() {
        const snapshot = await a11ySnapshot();
        expect(querySnapshot(snapshot, { focused: true })?.role).to.equal('combobox');
      });
      describe('tabbing out of the combobox', function() {
        beforeEach(press('Tab'));
        it('does not focus the toggle button', async function() {
          const snapshot = await a11ySnapshot();
          expect(querySnapshot(snapshot, { focused: true })).to.equal(null);
        });
      });
      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        it('expands the listbox', async function() {
          const snapshot = await a11ySnapshot();
          expect(querySnapshot(snapshot, { role: 'listbox' })?.children, 'listbox children').to.have.length(11);
          expect(querySnapshot(snapshot, { role: 'combobox' })?.expanded, 'expanded').to.equal(true);
        });
        it('maintains DOM focus on the combobox', async function() {
          const snapshot = await a11ySnapshot();
          expect(querySnapshot(snapshot, { focused: true })?.role).to.equal('combobox');
        });
        it.skip('sets active state on the first option', async function() {
          // maybe this is a problem with the demo element
          await element.updateComplete;
          expect(element.querySelector('option')?.classList.contains('active')).to.equal(true);
        });
        describe('pressing Escape', function() {
          beforeEach(press('Escape'));
          it('collapses the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(querySnapshot(snapshot, { role: 'combobox' })?.expanded, 'expanded').to.equal(undefined);
          });
          it('maintains DOM focus on the combobox', async function() {
            const snapshot = await a11ySnapshot();
            expect(querySnapshot(snapshot, { focused: true })?.role).to.equal('combobox');
          });
        });
      });
    });
  });

  describe('All options are in the shadowdom', function() {
    /* test here */
  });
});
