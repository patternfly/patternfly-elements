import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { ComboboxController } from '@patternfly/pfe-core/controllers/combobox-controller.js';
import { query } from 'lit/decorators/query.js';
import { property } from 'lit/decorators/property.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import {
  FloatingDOMController,
  type Placement,
} from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import '@patternfly/elements/pf-text-input/pf-text-input.js';
import { arraysAreEquivalent } from '@patternfly/pfe-core/functions/arraysAreEquivalent.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import styles from './pf-search-input.css';

/**
 * Search Input
 * @slot - Place element content here
 */
@customElement('pf-search-input')
export class PfSearchInput extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ reflect: true }) position: Placement = 'bottom';
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

  @query('#listbox') listbox!: HTMLElement;
  @query('#button') button!: HTMLButtonElement;
  @query('#combobox') combobox!: HTMLInputElement;
  @query('#placeholder') placeholder!: HTMLOptionElement;
  @query('#listbox-container') private _listboxContainer?: HTMLElement;


  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });


  // static template: TemplateResult<1> = html`
  //   <pf-text-input-autocomplete></pf-text-input-autocomplete>`;

  #combobox: ComboboxController<HTMLOptionElement> = ComboboxController.of(this, {
    multi: false,
    getItems: () => this.options,
    isItem: item => item instanceof HTMLOptionElement,
    getFallbackLabel: () => 'options',
    getListboxElement: () => this.listbox ?? null,
    getToggleButton: () => this.combobox ?? null,
    getComboboxInput: () => this.combobox ?? null,
    isExpanded: () => this.expanded,
    requestShowListbox: () => void (this.expanded ||= true),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemActive: (item, active) => item.classList.toggle('active', active),
    setItemSelected: (item, selected) => item.selected = selected,
  });

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(selected: any) {
    const list = Array.isArray(selected) ? selected : [selected];
    this.#combobox.selected = list;
  }

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

  get selected(): HTMLOptionElement[] {
    return this.options.filter(x => x.selected);
  }

  get activeOption(): HTMLOptionElement | undefined {
    return this.options.find(x => x.classList.contains('active'));
  }

  //<input id="combobox">
  render(): TemplateResult<1> {
    return html`
      <pf-text-input id="combobox" type="text" placeholder="Placeholder"></pf-text-input> 
        <pf-button disabled plain label="Close">
          <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 
            0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 
            189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 
            0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 
            356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 
            12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 
            44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
            </path>
        </svg>
      </pf-button>
      <pf-button disabled plain label="Search">
        <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512">
          <path d="M256.233,5.756c-71.07,15.793-141.44,
          87.863-155.834,159.233c-11.495,57.076,0.3,111.153,
          27.688,154.335L6.339,441.172c-8.596,8.596-8.596,
          22.391,0,30.987l33.286,33.286c8.596,8.596,22.391,
          8.596,30.987,0L192.26,383.796c43.282,
          27.688,97.559,39.683,154.734,28.188c79.167-15.893,142.04-77.067,
          159.632-155.934C540.212,104.314,407.968-27.93,256.233,
          5.756z M435.857,208.37c0,72.869-59.075,131.944-131.944,131.944
          S171.969,281.239,171.969,208.37S231.043,76.426,303.913,
          76.426S435.857,135.501,435.857,208.37z">
          </path>
        </svg>
      </pf-button>
      <div id="listbox-container">
        <div id="listbox" ?hidden="${!this.expanded}">
          <option id="placeholder" aria-disabled="true">Select an Option</option>
          <optgroup label="Swedish Cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </optgroup>
          <optgroup label="German Cars">
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </optgroup>
        </div>
      </div>
    `;
  }

  @observes('expanded')
  private async expandedChanged(old: boolean, expanded: boolean) {
    if (this.dispatchEvent(new Event(this.expanded ? 'close' : 'open'))) {
      if (expanded) {
        this.#doExpand();
      } else {
        this.#doCollapse();
      }
    }
  }

  async #doExpand() {
    try {
      await this.#float.show({ placement: this.position || 'bottom', flip: !!this.enableFlip });
      return true;
    } catch {
      return false;
    }
  }

  async #doCollapse() {
    try {
      await this.#float.hide();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Opens the dropdown
   */
  async show(): Promise<void> {
    this.expanded = true;
    await this.updateComplete;
  }

  /**
   * Closes listbox
   */
  async hide(): Promise<void> {
    this.expanded = false;
    await this.updateComplete;
  }

  /**
   * toggles popup based on current state
   */
  async toggle(): Promise<void> {
    if (this.expanded) {
      await this.hide();
    } else {
      await this.show();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-search-input': PfSearchInput;
  }
}
