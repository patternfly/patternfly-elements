import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { classMap } from 'lit/directives/class-map.js';

import { ListboxController } from '@patternfly/pfe-core/controllers/listbox-controller.js';

import { PfOptionGroup } from './pf-option-group.js';
import { PfOption } from './pf-option.js';

import styles from './pf-listbox.css';

/**
 * event when slotted options are updated
 */
export class PfListboxRefreshEvent extends Event {
  constructor(public originalEvent: Event) {
    super('refresh', { bubbles: true });
  }
}

/**
 * Listbox for select options.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 *
 * @fires {PfListboxFilterEvent} filter - Fired when the filter value changes. Use to perform custom filtering
 * @fires {PfListboxRefreshEvent} refresh - Fired when slotted options are updated
 * @slot - insert `pf-option` and/or `pf-option-groups` here
 */
@customElement('pf-listbox')
export class PfListbox extends LitElement {
  static readonly styles = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** whether listbox is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** filter text */
  @property() filter = '';

  @property({ attribute: false }) customFilter?: (option: PfOption) => boolean;

  /**
   * whether multiple items can be selected
   */
  @property({ type: Boolean, reflect: true }) multi = false;

  /**
   * array of slotted options
   */
  get options(): PfOption[] {
    if (!this._slottedElements || this._slottedElements.length === 0) {
      return [];
    }
    const options = this._slottedElements.flatMap((element: HTMLElement) => {
      if (element instanceof PfOption) {
        return [element];
      } else if (element instanceof PfOptionGroup) {
        return [...element.querySelectorAll('pf-option')];
      } else {
        return [];
      }
    });
    return options;
  }

  /**
   * listbox value based by selecting option(s)
   */
  set selected(optionsList: PfOption | PfOption[]) {
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

  @queryAssignedElements({ flatten: true })
  private _slottedElements?: Array<HTMLElement>;

  #listboxController: ListboxController<PfOption> = ListboxController.of(this, {
    multi: false,
    orientation: 'vertical',
    isSelected(option) {
      return option.selected;
    },
    select(option, selected) {
      option.selected = !!selected;
    },
    optionAdded(option, index, options) {
      option.setSize = options.length;
      option.posInSet = index;
    },
    onFilterChanged: () => {
      if (this.customFilter) {
        const filter = this.customFilter;
        this.#listboxController.visibleOptions = this.options.filter(option => filter(option));
      }
    },
  });

  willUpdate(changed: PropertyValues<this>) {
    if (this.#listboxController) {
      if (changed.has('disabled')) {
        this.#listboxController.disabled = this.disabled;
      }
      if (changed.has('multi')) {
        this.#listboxController.multi = this.multi;
      }
      if (changed.has('filter')) {
        this.#listboxController.filter = this.filter;
      }
    }
  }

  render() {
    const { disabled } = this;
    return html`
      <slot class="${classMap({ disabled })}"
            @slotchange="${this.#onSlotchange}"></slot>
    `;
  }

  firstUpdated(changed: PropertyValues<this>): void {
    const options = this.options || [];
    this.#listboxController.options = options;
    this.#listboxController.filter = this.filter;
    super.firstUpdated(changed);
  }

  /**
   * handles slot change to indicate slotted listbox options have changed
   * @param event {Event}
   */
  #onSlotchange(event: Event) {
    this.#listboxController.options = this.options || [];
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
