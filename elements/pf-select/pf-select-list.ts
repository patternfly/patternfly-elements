import { LitElement, html, type PropertyValueMap, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';

import { ListboxController, type ListboxOptionElement } from '@patternfly/pfe-core/controllers/listbox-controller.js';

import { PfSelectGroup } from './pf-select-group.js';
import { PfSelectOption } from './pf-select-option.js';

import styles from './pf-select-list.css';
/**
 * Listbox for select options.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 *
 * @slot - insert `pf-select-option` and/or `pf-select-groups` here
 */
@customElement('pf-select-list')
export class PfSelectList extends LitElement {
  static readonly styles = [styles];

  /**
   * whether listbox is disabled
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  @property({ reflect: true, attribute: 'case-sensitive', type: Boolean }) caseSensitive = false;

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if option starts with filter)
   */
  @property({ reflect: true, attribute: 'match-anywhere', type: Boolean }) matchAnywhere = false;

  /**
   * whether multiple items can be selected
   */
  @property({ reflect: true, attribute: 'multi-selectable', type: Boolean }) multiSelectable = false;

  @queryAssignedElements({ flatten: true }) private _slottedElements?: Array<HTMLElement>;

  #listboxController?: ListboxController;

  /**
   * filter string for visible options
   */
  set filter(filterText: string) {
    if (this.#listboxController) {
      this.#listboxController.filter = filterText;
    }
  }

  get filter() {
    return this.#listboxController?.filter || '';
  }

  /**
     * array of slotted options
     */
  get options() {
    if (!this._slottedElements || this._slottedElements.length === 0) {
      return;
    }
    const options = this._slottedElements.flatMap((element: HTMLElement) => {
      if (element instanceof PfSelectOption) {
        return element;
      } else if (element instanceof PfSelectGroup) {
        return [...element.querySelectorAll('pf-select-option')];
      }
    });
    return options;
  }

  /**
   * listbox value based by selecting option(s)
   */
  set selected(optionsList: unknown | unknown[]) {
    if (this.#listboxController) {
      this.#listboxController.value = optionsList;
    }
  }

  get selected() {
    return this.#listboxController?.value;
  }

  /**
   * array of selected options
   */
  get selectedOptions() {
    return this.#listboxController?.selectedOptions;
  }

  /**
   * array of visible options
   */
  get visibleOptions() {
    return this.#listboxController?.visibleOptions;
  }

  render() {
    return html`
        <slot
          class="${this.disabled ? 'disabled' : ''}" 
          @slotchange="${this.#onSlotchange}">
        </slot>
    `;
  }

  firstUpdated(changed: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.#listboxController = new ListboxController(this, {
      caseSensitive: this.caseSensitive,
      matchAnywhere: this.matchAnywhere,
      multi: this.multiSelectable,
      orientation: 'vertical'
    });
    this.#listboxController.options = this.options as ListboxOptionElement[];
    super.firstUpdated(changed);
  }

  updated(changed: PropertyValues<this>) {
    if (this.#listboxController) {
      if (changed.has('disabled')) {
        this.#listboxController.disabled = this.disabled;
      }
      if (changed.has('caseSensitive')) {
        this.#listboxController.caseSensitive = this.caseSensitive;
      }
      if (changed.has('matchAnywhere')) {
        this.#listboxController.matchAnywhere = this.matchAnywhere;
      }
      if (changed.has('multiSelectable')) {
        this.#listboxController.multi = this.multiSelectable;
      }
    }
  }

  /**
   * sets focus on active item
   */
  focus() {
    if (this.#listboxController) {
      this.#listboxController.focusActiveItem();
    }
  }

  /**
   * allows new options to be inserted
   * @param option option to be inserted
   * @param insertBefore optional: reference option before which new will be inserted; if blank new option inserted at end of list
   */
  insertOption(option: PfSelectOption, insertBefore?: PfSelectOption) {
    if (insertBefore) {
      this.insertBefore(option, insertBefore);
    } else {
      this.appendChild(option);
    }
  }

  /**
   * @fires listboxoptions to indicate slotted listbox options ahve changed
   */
  #onSlotchange() {
    if (this.#listboxController) {
      this.#listboxController.options = this.options as ListboxOptionElement[];
    }
    this.dispatchEvent(new Event('listboxoptions', { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select-list': PfSelectList;
  }
}
