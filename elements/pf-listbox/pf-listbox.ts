import { LitElement, html } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
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
   * whetehr filtering (if enabled) will be case-sensitive
   */
  @property({ reflect: true, attribute: 'case-sensitive' }) caseSensitive = false;

  /**
   * determines how filtering will be handled:
   * - "" (default): will show all options until filter text is not ""
   * - "required": will hide all options until filter text is not ""
   * - "disabled": will not hide options at all, regardless of filtering
   */
  @property({ reflect: true, attribute: 'filter-mode' }) filterMode: '' | 'required' | 'disabled' = '';

  /**
   * whether list items are arranged vertically or horizontally;
   * limits arrow keys based on orientation
   */
  @property({ reflect: true, attribute: 'orientation', type: String }) orientation = '';

  /**
   * whether multiple items can be selected
   */
  @property({ reflect: true, attribute: 'multiple', type: Boolean }) multiple = false;

  /**
   * all slotted listbox options and/or groups of options
   */
  @queryAssignedElements() private groupsOrOptions!: PfListboxGroupOrOption[];

  #internals = new InternalsController(this, {
    role: 'listbox'
  });

  #tabindex = new RovingTabindexController<PfListboxOption>(this);

  /**
   * all options that will not be hidden by a filter
   * */
  #_allOptions: PfListboxOption[] = [];

  #shiftStartingItem: PfListboxOption | null = null;

  get isHorizontal(): boolean {
    return this.#internals.ariaOrientation === 'horizontal';
  }

  get isMultiselectable(): boolean {
    return this.#internals.ariaMultiSelectable === 'true';
  }

  get activeItem() {
    const [active] = this.#allOptions.filter(option => option.getAttribute('id') === this.#internals.ariaActivedescendant);
    return active || this.#tabindex.firstItem;
  }

  get #allOptions() {
    return this.#_allOptions;
  }

  set #allOptions(options: PfListboxOption[]) {
    this.#_allOptions = this.filterMode === 'required' && this.filter === '' ? [] : options.filter(option => (this.constructor as typeof PfListbox).isOption(option) && (this.filterMode === 'disabled' || option.getUpdateByFilter(this.filter, this.caseSensitive)));
  }

  set value(items: string | null) {
    const oldValue = this.value;
    const selectedItems = items?.toLowerCase().split(',');
    const [firstItem] = selectedItems || [null];
    this.options.forEach(option => {
      const textContent = (option.textContent || '').toLowerCase();
      const selected = this.isMultiselectable ? selectedItems?.includes(textContent) : firstItem === textContent;
      option.ariaSelected = `${selected}`;
    });
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  get value() {
    const selectedItems = this.options.filter(option=>option.ariaSelected === 'true').map(option => option.textContent);
    return selectedItems.join(',');
  }

  get validOptions() {
    return this.options;
  }

  isValid(val: string | null) {
    const vals = val?.split(',') || [];
    const options = this.options.map(option => option.textContent);
    return vals.every(val => {
      return options.includes(val);
    });
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('filter') || changed.has('caseSensitive') || changed.has('filterMode') || changed.has('filterMode')) {
      this.#onFilterChange();
    }
    if (changed.has('orientation')) {
      this.#internals.ariaOrientation = ['vertical', 'horizontal'].includes(this.orientation) ? this.orientation : null;
    }
    if (changed.has('multiple')) {
      this.#internals.ariaMultiSelectable = this.multiple ? 'true' : 'false';
    }
  }

  render() {
    return html`
      <slot 
        class="${this.isHorizontal ? 'horizontal' : 'vertical'}"
        @slotchange="${this.#onSlotchange}" 
        @optionfocus="${this.#onOptionFocus}"
        @click="${this.#onOptionClick}"
        @keydown="${this.#onOptionKeydown}"
        @keyup="${this.#onOptionKeyup}">
      </slot>
    `;
  }

  /**
   * filters listbox by keboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event
   * @returns { void }
   */
  filterByKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as PfListboxOption;
    const oldValue = this.value;
    let stopEvent = false;
    if (event.altKey ||
        event.metaKey) {
      return;
    } else if (event.ctrlKey) {
      if (event.key?.match(/^[aA]$/)?.input && this.#tabindex.firstItem) {
        this.#updateMultiselect(this.#tabindex.firstItem, this.#tabindex.lastItem, true);
        stopEvent = true;
      } else {
        return;
      }
    } else {
      switch (event.key) {
        case 'Backspace':
        case 'Delete':
          this.filter = this.filter.slice(0, this.filter.length - 2);
          stopEvent = true;
          break;
        case event.key?.match(/^[\w]$/)?.input:
          this.filter += event.key?.toLowerCase();
          stopEvent = true;
          break;
        case 'Enter':
        case ' ':
          // enter and space are only applicable if a listbox option is clicked
          // an external text input should not trigger multiselect
          if (target) {
            if (this.isMultiselectable) {
              if (event.shiftKey) {
                this.#updateMultiselect(target);
              } else {
                target.ariaSelected = `${target.ariaSelected !== 'true'}`;
              }
              stopEvent = true;
            }
          }
          break;
        default:
          break;
      }
    }
    if (stopEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (oldValue !== this.value) {
      this.#fireChange();
    }
  }

  focus() {
    this.#tabindex.focusOnItem(this.activeItem);
  }

  #updateActiveDescendant() {
    let found = false;
    this.#allOptions.forEach(option => {
      if (option === this.#tabindex.activeItem) {
        this.#internals.ariaActivedescendant = option.id;
        option.setAttribute('active-descendant', 'active-descendant');
        found = true;
      } else {
        option.removeAttribute('active-descendant');
      }
    });
    if (!found) {
      this.#tabindex.updateActiveItem(this.#tabindex.firstItem);
      this.#internals.ariaActivedescendant = this.#tabindex.firstItem?.id || null;
    }
    this.#updateSingleselect();
  }

  #updateSingleselect() {
    if (!this.isMultiselectable) {
      this.options.forEach(option => option.ariaSelected = `${option.id === this.#internals.ariaActivedescendant}`);
      this.#fireChange();
    }
  }

  #updateMultiselect(currentItem: PfListboxOption, referenceItem = this.activeItem, ctrlKey = false) {
    if (this.isMultiselectable) {
      // select all options between active descendant and target
      const [start, end] = [this.options.indexOf(referenceItem), this.options.indexOf(currentItem)].sort();
      const options = [...this.options].slice(start, end + 1);
      // if all items in range are toggled, remove toggle
      const allSelected = ctrlKey && options.filter(option => option.ariaSelected !== 'true')?.length === 0;
      const toggle = ctrlKey && allSelected ? false : ctrlKey ? true : referenceItem.ariaSelected === 'true';
      options.forEach(option => option.ariaSelected = `${toggle}`);
      this.#shiftStartingItem = currentItem;
    }
  }

  /**
   * handles user user selection change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   * @fires change
   */
  #fireChange() {
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /**
   * handles element value change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   * @fires input
   */
  #fireInput() {
    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #onFilterChange() {
    const oldValue = this.value;
    this.#allOptions = this.options;
    const all = this.#allOptions;
    this.#tabindex.updateItems(all);
    this.#updateActiveDescendant();
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  #onOptionFocus(event: FocusEvent) {
    const target = event.target as PfListboxOption;
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.updateActiveItem(target);
    }
    this.#updateActiveDescendant();
  }

  #onOptionClick(event: MouseEvent) {
    const target = event.target as PfListboxOption;
    const oldValue = this.value;
    if (this.isMultiselectable) {
      if (!event.shiftKey) {
        target.ariaSelected = `${target.ariaSelected !== 'true'}`;
      } else {
        if (this.#shiftStartingItem && target) {
          this.#updateMultiselect(target, this.#shiftStartingItem);
          this.#fireChange();
        }
      }
    } else {
      // select target and deselect all other options
      this.options.forEach(option => option.ariaSelected = `${option === target}`);
    }
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.focusOnItem(target);
      this.#updateActiveDescendant();
    }
    if (oldValue !== this.value) {
      this.#fireChange();
    }
  }

  #onOptionKeyup(event: KeyboardEvent) {
    const target = event.target as PfListboxOption;
    if (event.shiftKey && this.isMultiselectable) {
      if (this.#shiftStartingItem && target) {
        this.#updateMultiselect(target, this.#shiftStartingItem);
        this.#fireChange();
      }
      if (event.key === 'Shift') {
        this.#shiftStartingItem = null;
      }
    }
  }

  #onOptionKeydown(event: KeyboardEvent) {
    const { filter } = this;
    // need to set for keyboard support of multiselect
    if (event.key === 'Shift' && this.isMultiselectable) {
      this.#shiftStartingItem = this.activeItem;
    }
    this.filterByKeyboardEvent(event);
    // only change focus if keydown occurred when option has focus
    // (as opposed to an external text input and if filter has changed
    if (filter !== this.filter) {
      this.#tabindex.focusOnItem(this.activeItem);
    }
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
    return extractItems(this.groupsOrOptions);
  }

  #onSlotchange() {
    this.#allOptions = this.options;
    const all = this.#allOptions;
    const setSize = this.options.length;
    this.options.forEach((option, i) => option.updateSetSizeAndPosition(setSize, i));
    this.#tabindex.initItems(all, this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox': PfListbox;
  }
}
