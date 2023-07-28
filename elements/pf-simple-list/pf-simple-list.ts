import { LitElement, html } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ListboxController, type ListboxFilterMode, type ListboxOrientation } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import './pf-simple-list-option.js';
import './pf-simple-list-group.js';

import styles from './pf-simple-list.css';

/**
 * List of selectable items
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 * @slot - Place element content here
 */
@customElement('pf-simple-list')
export class PfSimpleList extends LitElement {
  static readonly styles = [styles];

  /**
   * filter options that start with a string (case-insensitive)
   */
  @property() filter = '';

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  @property({ reflect: true, attribute: 'case-sensitive', type: Boolean }) caseSensitive = false;

  /**
   * determines how filtering will be handled:
   * - "" (default): will show all options until filter text is not ""
   * - "required": will hide all options until filter text is not ""
   * - "disabled": will not hide options at all, regardless of filtering
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

  #listbox = new ListboxController(this, {
    caseSensitive: this.caseSensitive,
    filterMode: this.filterMode,
    matchAnywhere: this.matchAnywhere,
    multiSelectable: this.multiSelectable,
    orientation: this.orientation
  });

  get options() {
    return [...this.querySelectorAll('pf-simple-list-option')];
  }

  set value(optionsList: string | null) {
    this.#listbox.value = optionsList;
  }

  get value() {
    return this.#listbox.value;
  }

  render() {
    return html`
      <slot 
        class="${this.orientation}"
        @slotchange="${this.#onSlotchange}">
      </slot>
    `;
  }

  constructor() {
    super();
    this.#listbox.options = this.options;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('caseSensitive')) {
      this.#listbox.caseSensitive = this.caseSensitive;
    }
    if (changed.has('filterMode')) {
      this.#listbox.filterMode = this.filterMode;
    }
    if (changed.has('matchAnywhere')) {
      this.#listbox.matchAnywhere = this.matchAnywhere;
    }
    if (changed.has('multiSelectable')) {
      this.#listbox.multiSelectable = this.multiSelectable;
    }
    if (changed.has('orientation')) {
      this.#listbox.orientation = this.orientation;
    }
  }

  focus() {
    this.#listbox.focus();
  }

  #onSlotchange() {
    this.#listbox.options = this.options;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-simple-list': PfSimpleList;
  }
}
