import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import type { PropertyValueMap, PropertyValues } from 'lit';
import { ListboxController, type ListboxOptionElement, type ListboxValue } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { PfSelectGroup } from './pf-select-group.js';
import { PfSelectOption } from './pf-select-option.js';

import styles from './pf-select-listbox.css';
/**
 * List of selectable items
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 * @slot - Place element content here
 */
@customElement('pf-select-listbox')
export class PfSelectListbox extends LitElement {
  static readonly styles = [styles];

  /**
   * whether listbox is disabled
   */
  @property({ reflect: true, attribute: 'disabled', type: Boolean }) disabled = false;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  @property({ reflect: true, attribute: 'case-sensitive', type: Boolean }) caseSensitive = false;

  /**
   * whether option filtering is disabled
   */
  @property({ reflect: true, attribute: 'disable-filter', type: Boolean }) disableFilter = false;

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if the option starts with filter)
   */
  @property({ reflect: true, attribute: 'match-anywhere', type: Boolean }) matchAnywhere = false;

  /**
   * whether multiple items can be selected
   */
  @property({ reflect: true, attribute: 'multi-selectable', type: Boolean }) multiSelectable = false;

  #listbox?: ListboxController;

  get options() {
    const slotted = this.querySelector('slot')?.assignedElements() || [...this.querySelectorAll('pf-select-option')];
    const options = slotted?.map(element => {
      if (element instanceof PfSelectOption) {
        return element;
      } else if (element instanceof PfSelectGroup) {
        return [...element.querySelectorAll('pf-select-option')];
      }
    }).flat();
    return options;
  }

  get selectedOptions() {
    return this.#listbox?.selectedOptions;
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
        <slot 
          @slotchange="${this.#onSlotchange}">
        </slot>
    `;
  }

  firstUpdated(changed: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.#listbox = new ListboxController(this, {
      caseSensitive: this.caseSensitive,
      disableFilter: this.disableFilter,
      matchAnywhere: this.matchAnywhere,
      multiSelectable: this.multiSelectable,
      orientation: 'vertical'
    });
    this.#listbox.options = this.options as ListboxOptionElement[];
    super.firstUpdated(changed);
  }

  updated(changed: PropertyValues<this>) {
    if (this.#listbox) {
      if (changed.has('caseSensitive')) {
        this.#listbox.caseSensitive = this.caseSensitive;
      }
      if (changed.has('disableFilter')) {
        this.#listbox.disableFilter = this.disableFilter;
      }
      if (changed.has('matchAnywhere')) {
        this.#listbox.matchAnywhere = this.matchAnywhere;
      }
      if (changed.has('multiSelectable')) {
        this.#listbox.multiSelectable = this.multiSelectable;
      }
      if (changed.has('disabled')) {
        this.#listbox.disabled = this.disabled;
      }
    }
  }

  focus() {
    if (this.#listbox) {
      this.#listbox.focus();
    }
  }

  #onSlotchange() {
    if (this.#listbox) {
      this.#listbox.options = this.options as ListboxOptionElement[];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select-listbox': PfSelectListbox;
  }
}
