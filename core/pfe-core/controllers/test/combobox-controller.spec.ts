import { expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { LitElement, ReactiveElement, html, render, type PropertyValues, type TemplateResult } from 'lit';

import { ComboboxController } from '../combobox-controller.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

abstract class TestCombobox extends ReactiveElement {
  declare static template: TemplateResult;

  static styles = new CSSStyleSheet();

  static {
    this.styles.replaceSync(/* css */`
      option {
        &.active {
          outline: 1px solid black;
        }
        &[selected] {
          background: lightblue;
        }
      }
    `);
  }

  controller = ComboboxController.of(this, {
    multi: false,
    getItems: () => this.options,
    isItem: item => item instanceof HTMLOptionElement,
    getFallbackLabel: () => 'options',
    getListboxElement: () => this.listbox ?? null,
    getToggleButton: () => this.button ?? null,
    getComboboxInput: () => this.combobox ?? null,
    isExpanded: () => !this.listbox.hidden,
    requestShowListbox: () => void (this.listbox.hidden = false),
    requestHideListbox: () => void (this.listbox.hidden = true),
    setItemActive: (item, active) => item.classList.toggle('active', active),
    setItemSelected: (item, selected) => item.selected = selected,
  });

  @query('#listbox') listbox!: HTMLElement;
  @query('#button') button!: HTMLButtonElement;
  @query('#combobox') combobox!: HTMLInputElement;
  @query('#placeholder') placeholder!: HTMLOptionElement;

  /** List of options */
  get options(): HTMLOptionElement[] {
    return [
      ...new Set([
        this.placeholder,
        ...this.querySelectorAll('option'),
        ...this.renderRoot.querySelectorAll('option'),
      ]),
    ].filter(x => !!x);
  }

  get selected() {
    return this.options.filter(x => x.selected);
  }

  get activeOption() {
    return this.options.find(x => x.classList.contains('active'));
  }

  abstract render(): TemplateResult;

  override update(changed: PropertyValues<this>) {
    render(this.render(), this.renderRoot);
    super.update(changed);
    this.placeholder.inert = !!this.controller.selected.length;
  }

  connectedCallback(): void {
    super.connectedCallback();
    const root = this.renderRoot.getRootNode() as Document | ShadowRoot;
    root.adoptedStyleSheets = [...root.adoptedStyleSheets ?? [], TestCombobox.styles];
  }

  static async test() {
    let element: TestCombobox;

    const updateComplete = () => element.updateComplete;

    const { template } = this;

    if (!template) {
      throw new Error(`${this.constructor.name} must implement template`);
    }

    beforeEach(async function() {
      element = await fixture<TestCombobox>(template);
    });

    describe('Tab', function() {
      beforeEach(press('Tab'));
      beforeEach(updateComplete);

      it('focuses the combobox', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
      });

      // describe('Tab', function() {
      //   beforeEach(press('Tab'));
      //   beforeEach(updateComplete);
      //   beforeEach(nextFrame);

      //   it('does not focus the toggle button', async function() {
      //     expect(await a11ySnapshot()).to.not.axContainQuery({ focused: true });
      //   });
      // });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('expands the listbox', async function() {
          expect(await a11ySnapshot())
              .to.axContainRole('listbox')
              .and
              .to.axContainQuery({ role: 'combobox', expanded: true });
        });

        it('maintains DOM focus on the combobox', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
        });

        it('sets active state on the placeholder', function() {
          expect(element.activeOption).to.equal(element.placeholder);
        });

        describe('Enter', function() {
          beforeEach(press('Enter'));
          beforeEach(updateComplete);

          it('maintains DOM focus on the combobox', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
          });

          it('selects nothing', function() {
            expect(element.selected).to.have.length(0);
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);

          it('maintains DOM focus on the combobox', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
          });

          it('sets active state on the 1st option', function() {
            expect(element.activeOption).to.have.text('1');
          });

          describe('Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);

            it('maintains DOM focus on the combobox', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
            });

            it('selects the first option', function() {
              expect(element.selected).to.have.length(1);
              expect(element.selected.at(0)).to.have.text('1');
            });

            it('collapses the listbox', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot).to.not.axContainRole('listbox');
              expect(snapshot).to.axContainQuery({ role: 'combobox', expanded: false });
            });
          });
        });

        describe('Escape', function() {
          beforeEach(press('Escape'));
          beforeEach(updateComplete);

          it('collapses the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot).to.not.axContainRole('listbox');
            expect(snapshot).to.axContainQuery({ role: 'combobox', expanded: false });
          });

          it('maintains DOM focus on the combobox', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
          });
        });
      });
    });
  };
}

@customElement('x-combobox-cross-root')
class XComboboxCrossRoot extends TestCombobox {
  static template = html`
    <x-combobox-cross-root>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </x-combobox-cross-root>
  `;


  /** List of options */
  override get options(): HTMLOptionElement[] {
    return [
      ...new Set([
        this.placeholder,
        ...this.querySelectorAll('option'),
      ]),
    ].filter(x => !!x);
  }

  render() {
    return html`
      <div id="toggle">
        <input id="combobox">
        <button id="button">Show Options</button>
      </div>
      <div id="listbox">
        <option id="placeholder" aria-disabled="true">Select an Option</option>
        ${this.controller.renderItemsToShadowRoot()}
        <div ?hidden=${!ComboboxController.supportsCrossRootActiveDescendant}>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

@customElement('x-combobox-light')
class XComboboxLight extends TestCombobox {
  static template = html`
    <x-combobox-light></x-combobox-light>
  `;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render() {
    return html`
      <input id="combobox">
      <button id="button">Show Options</button>
      <div id="listbox">
        <option id="placeholder" aria-disabled="true">Select an Option</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </div>`;
  }
}

@customElement('x-combobox-shadow')
class XComboboxShadow extends TestCombobox {
  static template = html`
    <x-combobox-shadow></x-combobox-shadow>
  `;

  render() {
    return html`
      <input id="combobox">
      <button id="button">Show Options</button>
      <div id="listbox">
        <option id="placeholder" aria-disabled="true">Select an Option</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </div>`;
  }
}

/**
 * Toggle-button-only combobox (no text input): listbox items receive DOM focus.
 */
@customElement('x-combobox-toggle')
class XComboboxToggle extends LitElement {
  static template = html`
    <x-combobox-toggle>
      <div class="opt" tabindex="0">1</div>
      <div class="opt" tabindex="0">2</div>
      <div class="opt" tabindex="0">3</div>
    </x-combobox-toggle>
  `;

  hideCount = 0;

  controller = ComboboxController.of(this, {
    getItems: () => [...this.querySelectorAll<HTMLElement>('.opt')],
    isItem: (item): item is HTMLElement =>
      item instanceof HTMLElement && item.classList.contains('opt'),
    getFallbackLabel: () => 'options',
    getListboxElement: () => this.listbox ?? null,
    getToggleButton: () => this.button ?? null,
    getComboboxInput: () => null,
    isExpanded: () => !this.listbox.hidden,
    requestShowListbox: () => void (this.listbox.hidden = false),
    requestHideListbox: () => void (this.hideCount += 1, this.listbox.hidden = true),
  });

  @query('#listbox') listbox!: HTMLElement;
  @query('#button') button!: HTMLButtonElement;

  get options(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>('.opt')];
  }

  override render(): TemplateResult {
    return html`
      <button id="button">Show Options</button>
      <div id="listbox" hidden><slot></slot></div>`;
  }
}

describe('ComboboxController', function() {
  describe('Cross-root ARIA', XComboboxCrossRoot.test.bind(XComboboxCrossRoot));
  describe('Light-DOM only', XComboboxLight.test.bind(XComboboxLight));
  describe('Shadow-DOM only', XComboboxShadow.test.bind(XComboboxShadow));

  describe('listbox focusout', function() {
    let element: XComboboxToggle;

    beforeEach(async function() {
      element = await fixture<XComboboxToggle>(XComboboxToggle.template);
      // open the listbox and focus the first option
      element.button.click();
      await element.updateComplete;
      element.options[0]!.focus();
    });

    function nextFrame() {
      return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }

    it('hides the listbox one frame after focus leaves it', async function() {
      expect(element.listbox.hidden, 'listbox starts expanded').to.be.false;
      await sendKeys({ press: 'Tab' });
      await nextFrame();
      expect(element.listbox.hidden, 'listbox hides after the frame').to.be.true;
      expect(element.hideCount).to.equal(1);
    });

    it('does not hide when focus returns to an item within the frame', async function() {
      expect(element.listbox.hidden, 'listbox starts expanded').to.be.false;
      // focusout with focus headed outside the element ...
      element.options[0]!.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      // ... but focus lands on another item before the pending frame resolves
      element.options[1]!.focus();
      await nextFrame();
      expect(element.listbox.hidden, 'listbox stays expanded').to.be.false;
      expect(element.hideCount).to.equal(0);
    });

    it('does not throw or hide when the host disconnects during the pending frame', async function() {
      expect(element.listbox.hidden, 'listbox starts expanded').to.be.false;
      element.options[0]!.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      element.remove();
      await nextFrame();
      expect(element.hideCount, 'no hide after disconnect').to.equal(0);
      expect(element.listbox.hidden, 'listbox stays expanded').to.be.false;
    });
  });
});
