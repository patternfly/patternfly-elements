import { LitElement, html } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { ListboxController, type ListboxFilterMode, type ListboxOrientation } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { PfListboxOption } from './pf-listbox-option.js';
import { PfListboxGroup, type PfListboxGroupOrOption } from './pf-listbox-group.js';

import styles from './pf-listbox.css';

/**
 * List of selectable items
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 * @slot - Place element content here
 */
@customElement('pf-listbox')
export class PfListbox extends LitElement {
  static readonly styles = [styles];

  static isOption(element: PfListboxOption): element is PfListboxOption {
    return element instanceof PfListboxOption;
  }

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

  /**
   * value of listbox as a string
   */
  @property({ reflect: true, attribute: 'value' }) value?: string = undefined;

  /**
   * all slotted listbox options and/or groups of options
   */
  @queryAssignedElements() private groupsOrOptions!: PfListboxGroupOrOption[];

  #listbox = new ListboxController(this, {
    caseSensitive: this.caseSensitive,
    filterMode: this.filterMode,
    matchAnywhere: this.matchAnywhere,
    multiSelectable: this.multiSelectable,
    orientation: this.orientation
  });

  updated(changed: PropertyValues<this>) {
    // console.log(changed);
  }

  render() {
    return html`
      <slot 
        class="${this.orientation}"
        @slotchange="${this.#onSlotchange}">
      </slot>
    `;
  }

  focus() {
    this.#listbox.focus();
  }

  get options() {
    const extractItems = (group: PfListboxGroupOrOption[]) => group.flatMap((item: PfListboxGroupOrOption) => {
      let options: PfListboxOption[];
      if (item instanceof PfListboxGroup) {
        const group = item as PfListboxGroup;
        options = extractItems(group.options);
      } else {
        options = [item];
      }
      return options;
    });
    // console.log(this.querySelectorAll('pf-listbox-option'), extractItems(this.groupsOrOptions));
    return extractItems(this.groupsOrOptions);
  }

  #onSlotchange() {
    this.#listbox.options = this.options;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox': PfListbox;
  }
}
