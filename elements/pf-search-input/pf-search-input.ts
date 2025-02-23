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


  static template: TemplateResult<1> = html`
    <pf-text-input-autocomplete></pf-text-input-autocomplete>`;

  controller: ComboboxController<HTMLOptionElement> = ComboboxController.of(this, {
    multi: false,
    getItems: () => this.options,
    isItem: item => item instanceof HTMLOptionElement,
    getFallbackLabel: () => 'options',
    getListboxElement: () => this.listbox ?? null,
    getToggleButton: () => this.button ?? null,
    getComboboxInput: () => this.combobox ?? null,
    isExpanded: () => this.expanded,
    requestShowListbox: () => void (this.expanded ||= true),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemActive: (item, active) => item.classList.toggle('active', active),
    setItemSelected: (item, selected) => item.selected = selected,
  });


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


  render(): TemplateResult<1> {
    return html`
      <input id="combobox">
      <button id="button">Show Options</button>
      <div id="listbox" ?hidden="${!this.expanded}">
        <option id="placeholder" aria-disabled="true">Select an Option</option>
        <option>1</option>
        <option>2</option>
        <option>31</option>
        <option>41</option>
        <option>52</option>
        <option>63</option>
        <option>74</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
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
