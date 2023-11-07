import { LitElement, html, type PropertyValueMap, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { classMap } from 'lit/directives/class-map.js';

import { ListboxController, type ListboxOptionElement } from '@patternfly/pfe-core/controllers/listbox-controller.js';

import { PfOptionGroup } from './pf-option-group.js';
import { PfOption } from './pf-option.js';


import styles from './pf-listbox.css';

/**
 * event when slotted options are updated
 * @first refresh
 */
export class PfListboxRefreshEvent extends Event {
  constructor(public originalEvent: Event) {
    super('refresh', { bubbles: true, composed: true });
  }
}

/**
 * Listbox for select options.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 *
 * @fires { PfListboxRefreshEvent } refresh - Fired when slotted options are updated
 * @slot - insert `pf-option` and/or `pf-option-groups` here
 */
@customElement('pf-listbox')
export class PfListbox extends LitElement {
  static readonly styles = [styles];
  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * whether listbox is disabled
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  @property({ attribute: 'case-sensitive', type: Boolean }) caseSensitive = false;

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if option starts with filter)
   */
  @property({ attribute: 'match-anywhere', type: Boolean }) matchAnywhere = false;

  /**
   * filter text
   */
  @property({ attribute: 'filter', type: String }) filter = '';


  /**
   * whether multiple items can be selected
   */
  @property({ reflect: true, attribute: 'multi', type: Boolean }) multi = false;

  @queryAssignedElements({ flatten: true }) private _slottedElements?: Array<HTMLElement>;

  #listboxController = ListboxController.for(this, {
    caseSensitive: this.caseSensitive,
    matchAnywhere: this.matchAnywhere,
    multi: false,
    orientation: 'vertical',
  });

  /**
     * array of slotted options
     */
  get options() {
    if (!this._slottedElements || this._slottedElements.length === 0) {
      return;
    }
    const options = this._slottedElements.flatMap((element: HTMLElement) => {
      if (element instanceof PfOption) {
        return element;
      } else if (element instanceof PfOptionGroup) {
        return [...element.querySelectorAll('pf-option')];
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
    return this.#listboxController.value;
  }

  /**
   * array of selected options
   */
  get selectedOptions() {
    return this.#listboxController.selectedOptions;
  }

  /**
   * array of visible options
   */
  get visibleOptions() {
    return this.#listboxController.visibleOptions;
  }

  render() {
    const { disabled } = this;
    return html`
        <slot
          class="${classMap({ disabled })}"
          @slotchange="${this.#onSlotchange}">
        </slot>
    `;
  }

  firstUpdated(changed: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const options: unknown[] = this.options || [];
    this.#listboxController.options = options as ListboxOptionElement[];
    this.#listboxController.filter = this.filter;
    super.firstUpdated(changed);
  }

  willUpdate(changed: PropertyValues<this>) {
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
      if (changed.has('multi')) {
        this.#listboxController.multi = this.multi;
      }
      if (changed.has('filter')) {
        this.#listboxController.filter = this.filter;
      }
    }
  }

  /**
   * handles slot change to indicate slotted listbox options have changed
   * @param event {Event}
   */
  #onSlotchange(event: Event) {
    if (this.#listboxController) {
      const options: unknown[] = this.options || [];
      this.#listboxController.options = options as ListboxOptionElement[];
    }
    this.dispatchEvent(new PfListboxRefreshEvent(event));
  }

  /**
   * allows new options to be inserted
   * @param option option to be inserted
   * @param insertBefore optional: reference option before which new will be inserted; if blank new option inserted at end of list
   */
  insertOption(option: PfOption, insertBefore?: PfOption) {
    if (insertBefore) {
      this.insertBefore(option, insertBefore);
    } else {
      this.appendChild(option);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox': PfListbox;
  }
}
