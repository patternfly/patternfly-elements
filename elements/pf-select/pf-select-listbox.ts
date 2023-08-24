import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import type { PropertyValueMap, PropertyValues } from 'lit';
import { ListboxController, type ListboxOptionElement, type ListboxValue } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { PfSelectGroup } from './pf-select-group.js';
import { PfSelectOption } from './pf-select-option.js';

import styles from './pf-select-listbox.css';
/**
 * Listbox for select options.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 *
 * @slot - insert `pf-select-option` and/or `pf-select-groups` here
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

  #listboxController?: ListboxController;

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
    return this.#listboxController?.selectedOptions;
  }

  set filter(filterText: string) {
    if (this.#listboxController) {
      this.#listboxController.filter = filterText;
    }
  }

  get filter() {
    return this.#listboxController?.filter || '';
  }

  set selected(optionsList: ListboxValue) {
    if (this.#listboxController) {
      this.#listboxController.value = optionsList;
    }
  }

  get selected() {
    return this.#listboxController?.value;
  }

  render() {
    return html`
        <slot 
          @slotchange="${this.#onSlotchange}">
        </slot>
    `;
  }

  firstUpdated(changed: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.#listboxController = new ListboxController(this, {
      caseSensitive: this.caseSensitive,
      disableFilter: this.disableFilter,
      matchAnywhere: this.matchAnywhere,
      multiSelectable: this.multiSelectable,
      orientation: 'vertical'
    });
    this.#listboxController.options = this.options as ListboxOptionElement[];
    super.firstUpdated(changed);
  }

  updated(changed: PropertyValues<this>) {
    if (this.#listboxController) {
      if (changed.has('caseSensitive')) {
        this.#listboxController.caseSensitive = this.caseSensitive;
      }
      if (changed.has('disableFilter')) {
        this.#listboxController.disableFilter = this.disableFilter;
      }
      if (changed.has('matchAnywhere')) {
        this.#listboxController.matchAnywhere = this.matchAnywhere;
      }
      if (changed.has('multiSelectable')) {
        this.#listboxController.multiSelectable = this.multiSelectable;
      }
      if (changed.has('disabled')) {
        this.#listboxController.disabled = this.disabled;
      }
    }
  }

  focus() {
    if (this.#listboxController) {
      this.#listboxController.focus();
    }
  }

  #onSlotchange() {
    if (this.#listboxController) {
      this.#listboxController.options = this.options as ListboxOptionElement[];
    }
    this.dispatchEvent(new Event('listboxoptions', { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select-listbox': PfSelectListbox;
  }
}
