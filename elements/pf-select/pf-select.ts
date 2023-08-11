import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { type ListboxFilterMode, type ListboxOrientation, type ListboxValue } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { PfSelectListbox } from './pf-select-listbox.js';

import styles from './pf-select.css';

/**
 * List of selectable items
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 * @slot - Place element content here
 */
@customElement('pf-select')
export class PfSelect extends LitElement {
  static readonly styles = [styles];
  /**
   * listbox button text when listbox selected option has no text
   */
  @property({ attribute: 'null-text', type: Boolean }) nullText = 'Select an option';

  /**
   * whether listbox is always open
   */
  @property({ attribute: 'always-open', type: Boolean }) alwaysOpen = false;

  /**
   * whether listbox is has checkboxes
   */
  @property({ attribute: 'has-checkboxes', type: Boolean }) hasCheckboxes = false;

  /**
   * whether listbox is always expanded
   */
  @property({ attribute: 'expanded', type: Boolean }) expanded = false;

  /**
   * whether listbox is a combobox that supports typing
   */
  @property({ attribute: 'typeahead', type: Boolean }) typeahead = false;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  @property({ attribute: 'case-sensitive', type: Boolean }) caseSensitive = false;

  /**
   * determines how filtering will be handled:
   * - "" (default): will show only options that match filter or in no options match will show all options
   * - "required": all listbox options are hidden _until_ option matches filter
   * - "disabled": all listbox options are visible; ignores filter
   */
  @property({ reflect: true, attribute: 'filter-mode', type: String }) filterMode: ListboxFilterMode = '';

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if the option starts with filter)
   */
  @property({ reflect: true, attribute: 'match-anywhere', type: Boolean }) matchAnywhere = false;

  /**
   * whether multiple items can be selected
   */
  @property({ reflect: true, attribute: 'multi-selectable', type: Boolean }) multiSelectable = false;

  /**
   * whether list items are arranged vertically or horizontally;
   * limits arrow keys based on orientation
   */
  @property({ reflect: true, attribute: 'orientation', type: String }) orientation: ListboxOrientation = '';

  #valueText = '';

  get options() {
    return this.#listbox?.options;
  }

  get #listbox(): PfSelectListbox | null | undefined {
    return this.shadowRoot?.querySelector('#listbox');
  }

  set filter(filterText: string) {
    if (this.#listbox) {
      this.#listbox.filter = filterText;
    }
  }

  get filter() {
    return this.#listbox?.filter || '';
  }

  set value(optionsList: ListboxValue) {
    if (this.#listbox) {
      this.#listbox.value = optionsList;
    }
  }

  get value() {
    return this.#listbox?.value;
  }

  render() {
    return html`
    ${this.typeahead ? '' : this.alwaysOpen ? '' : html`
      <button 
        id="toggle" 
        aria-expanded="${!this.expanded ? 'false' : 'true'}" 
        aria-controls="listbox" 
        aria-haspopup="listbox"
        @click="${this.#onToggleClick}">
        ${this.#valueText !== '' ? this.#valueText : this.nullText} 
        <svg viewBox="0 0 320 512" 
          fill="currentColor" 
          aria-hidden="true">
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
        </svg>
      </button>
    `}
      <pf-select-listbox 
        id="listbox" 
        class="${this.hasCheckboxes ? 'show-checkboxes' : ''}"
        ?hidden=${!this.alwaysOpen && !this.expanded}
        ?caseSensitive=${this.caseSensitive}
        filterMode="${this.filterMode}"
        ?matchAnywhere=${this.matchAnywhere}
        ?multiSelectable=${this.multiSelectable || this.hasCheckboxes}
        orientation="${this.orientation}"
        @input=${this.#onListboxInput}
        @change=${this.#onListboxChange}>
        <slot></slot>
      </pf-select-listbox>
    `;
  }

  focus() {
    const listbox = this.shadowRoot?.querySelector('pf-select-listbox');
    const toggle = this.shadowRoot?.querySelector('button');
    (toggle || listbox)?.focus();
  }

  #updateValueText() {
    const selectedOptions = this.#listbox?.selectedOptions || [];
    const [selectedOption] = selectedOptions;
    this.#valueText = selectedOption?.textContent || '';
    this.requestUpdate();
  }

  #onListboxInput() {
    this.#updateValueText();
  }

  #onListboxChange() {
    this.#updateValueText();
  }

  #onToggleClick() {
    this.expanded = !this.expanded;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}
