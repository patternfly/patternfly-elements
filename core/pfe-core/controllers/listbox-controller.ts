import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

/**
 * whether list items are arranged vertically or horizontally;
 * limits arrow keys based on orientation
 */
export type ListboxOrientation = 'undefined' | 'horizontal' | 'vertical';

/**
 * filtering, multiselect, and orientation options for listbox
 */
export interface ListboxConfigOptions {
  caseSensitive?: boolean;
  matchAnywhere?: boolean;
  multi?: boolean;
  orientation?: ListboxOrientation;
}

/**
 * properties for listbox option elements
 */
export interface ListboxOptionElement extends HTMLElement {
  value: unknown;
  selected?: boolean;
  posInSet?: number;
  setSize?: number;
  active?: boolean;
}

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving
 * tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
 */
export class ListboxController<
Item extends HTMLElement = HTMLElement,
> implements ReactiveController {
  /**
   * filter options that start with a string (case-insensitive)
   */
  #filter = '';

  /**
   * whether `*` has been pressed to show all options
   */
  #showAllOptions = false;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  #caseSensitive = false;

  /** event listeners for host element */
  #listeners = {
    'click': this.#onOptionClick.bind(this),
    'focus': this.#onOptionFocus.bind(this),
    'keydown': this.#onOptionKeydown.bind(this),
    'keyup': this.#onOptionKeyup.bind(this),
  };

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if option starts with filter)
   */
  #matchAnywhere = false;

  /**
   * current active descendant when shift key is pressed
   */
  #shiftStartingItem: ListboxOptionElement | null = null;

  /**
   * all options that will not be hidden by a filter
   * */
  #options: ListboxOptionElement[] = [];

  /**
   * whether or not focus should be updated after filtering
   */
  #updateFocus = false;

  #tabindex: RovingTabindexController;
  #internals: InternalsController;

  /**
   * current active descendant in listbox
   */
  get activeItem() {
    const [active] = this.options.filter(option => option.id === this.#internals.ariaActivedescendant);
    return active || this.#tabindex.firstItem;
  }

  /**
   * text for filtering options
   */
  set filter(filterText: string) {
    if (this.#filter !== filterText) {
      this.#filter = filterText;
      this.#onFilterChange();
    }
  }

  get filter() {
    return this.#filter;
  }

  /**
   * whether filtering is case sensitive
   */
  set caseSensitive(caseSensitive: boolean) {
    if (this.#caseSensitive !== caseSensitive) {
      this.#caseSensitive = caseSensitive;
      this.#onFilterChange();
    }
  }

  get caseSensitive() {
    return this.#caseSensitive;
  }

  /**
   * whether listbox is disabled
   */
  set disabled(disabled: boolean) {
    this.#internals.ariaDisabled = String(!!disabled);
  }

  get disabled(): boolean {
    return this.#internals.ariaDisabled === 'true';
  }

  /**
   * whether listbox is multiselectable;
   * default is single-select
   */
  set multi(multi: boolean) {
    this.#internals.ariaMultiSelectable = multi ? 'true' : 'false';
  }

  get multi(): boolean {
    return this.#internals.ariaMultiSelectable === 'true';
  }

  /**
   * whether filtering matches anywhere in option text;
   * default is only options starting with filter
  */
  set matchAnywhere(matchAnywhere: boolean) {
    if (this.#matchAnywhere !== matchAnywhere) {
      this.#matchAnywhere = matchAnywhere;
      this.#onFilterChange();
    }
  }

  get matchAnywhere() {
    return this.#matchAnywhere;
  }

  /**
   * listbox orientation;
   * default is vertical
   */
  set orientation(orientation: ListboxOrientation) {
    this.#internals.ariaOrientation = orientation || 'undefined';
  }

  get orientation(): ListboxOrientation {
    const orientation = this.#internals.ariaOrientation || 'undefined';
    return orientation as ListboxOrientation;
  }

  /**
   * array of listbox option elements
   */
  set options(options: ListboxOptionElement[]) {
    const oldOptions: ListboxOptionElement[] = [...this.#options];
    this.#options = options;
    this.#optionsChanged(oldOptions);
  }

  get options() {
    return this.#options;
  }

  /**
   * array of options which are selected
   */
  get selectedOptions() {
    return this.options.filter(option => option.selected);
  }

  /**
   * listbox value based on selected options
   */
  set value(optionsList: unknown | unknown[]) {
    // value is set by selecting matching options
    this.#selectOptions(optionsList);
  }

  get value() {
    const [firstItem] = this.selectedOptions;
    return this.multi ? this.selectedOptions : firstItem;
  }

  /**
   * array of options that match filter;
   * (or all options if no options match or if no filter)
   */
  get visibleOptions(): ListboxOptionElement[] {
    return this.#getMatchingOptions();
  }

  private static hosts = new WeakMap<ReactiveControllerHost & HTMLElement, ListboxController>();

  constructor(public host: ReactiveControllerHost & HTMLElement, options: ListboxConfigOptions) {
    this.#internals = new InternalsController(this.host, {
      role: 'listbox'
    });
    this.#tabindex = new RovingTabindexController(this.host);
    const instance = ListboxController.hosts.get(host);
    if (instance) {
      return instance;
    }
    ListboxController.hosts.set(host, this);
    this.host.addController(this);
    this.caseSensitive = options.caseSensitive || false;
  }

  /**
   * adds event listeners to host
   */
  hostConnected() {
    this.#listeners;
  }

  /**
   * gets matching options by filter value
   * @returns {ListboxOptionElement[]}
   */
  #getMatchingOptions() {
    let matchedOptions: ListboxOptionElement[] = [];
    if (!(this.filter === '' || this.filter === '*' || this.#showAllOptions)) {
      matchedOptions = this.options.filter(option => {
        const search = this.matchAnywhere ? '' : '^';
        const text = option.textContent || '';
        const regex = new RegExp(`${search}${this.filter}`, this.caseSensitive ? '' : 'i');
        if (text.match(regex)) {
          return true;
        } else {
          return false;
        }
      });
    }

    // ensure there is at least one option showing,
    // regardless of matches
    if (matchedOptions.length < 1) {
      matchedOptions = this.options;
    }
    this.options.forEach(option => {
      if (matchedOptions.includes(option)) {
        option.removeAttribute('hidden');
      } else {
        if (document.activeElement === option) {
          this.#updateFocus = true;
        }
        option.setAttribute('hidden', 'hidden');
      }
    });
    return matchedOptions;
  }

  /**
   * updates active descendant when focus changes
   */
  #updateActiveDescendant() {
    this.options.forEach(option => {
      option.active = option === this.#tabindex.activeItem && this.visibleOptions.includes(option);
      if (option.active) {
        this.#internals.ariaActivedescendant = option.id;
      } else {
        if (this.#internals.ariaActivedescendant === option.id) {
          this.#internals.ariaActivedescendant = null;
        }
      }
    });
  }

  /**
   * updates option selections for single select listbox
   */
  #updateSingleselect() {
    if (!this.multi && !this.disabled) {
      this.options.forEach(option => option.selected = option.id === this.#internals.ariaActivedescendant);
      this.#fireChange();
    }
  }

  /**
   * updates option selections for multiselectable listbox:
   * toggles all options between active descendant and target
   * @param currentItem
   * @param referenceItem
   * @param ctrlKey
   */
  #updateMultiselect(currentItem: ListboxOptionElement, referenceItem = this.activeItem, ctrlA = false) {
    if (this.multi && !this.disabled) {
      // select all options between active descendant and target
      const [start, end] = [this.options.indexOf(referenceItem), this.options.indexOf(currentItem)].sort();
      const options = [...this.options].slice(start, end + 1);

      // by default CTRL+A will select all options
      // if all options are selected, CTRL+A will deselect all options
      const allSelected = options.filter(option => !option.selected)?.length === 0;

      // whether options will be selected (true) or deselected (false)
      const selected = ctrlA ? !allSelected : referenceItem.selected;
      options.forEach(option => option.selected = selected);
      this.#fireChange();

      // update starting item for other multiselect
      this.#shiftStartingItem = currentItem;
    }
  }

  /**
   * handles user user selection change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   * @fires change
   */
  #fireChange() {
    this.host.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /**
   * handles element value change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   * @fires input
   */
  #fireInput() {
    this.host.dispatchEvent(new Event('input', { bubbles: true }));
  }

  /**
   * handles updates to filter text:
   * hides options that do not match filter settings
   * and updates active descendant based on which options are still visible
   * @returns void
   */
  #onFilterChange() {
    if (this.disabled) {
      return;
    }
    const oldValue = this.value;

    if (this.#updateFocus) {
      this.#tabindex.updateItems(this.visibleOptions);
      this.#updateFocus = false;
    } else {
      this.#tabindex.initItems(this.visibleOptions);
    }
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   * @param event {FocusEvent}
   * @returns void
   */
  #onOptionFocus(event: FocusEvent) {
    const target = event.target as ListboxOptionElement;
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.updateActiveItem(target);
    }
    this.#updateActiveDescendant();
  }

  /**
   * handles clicking on a listbox option:
   * which selects an item by default
   * or toggles selection if multiselectable
   * @param event {MouseEvent}
   * @returns void
   */
  #onOptionClick(event: MouseEvent) {
    const target = event.target as ListboxOptionElement;
    const oldValue = this.value;
    if (this.multi) {
      if (!event.shiftKey) {
        target.selected = !target.selected;
      } else if (this.#shiftStartingItem && target) {
        this.#updateMultiselect(target, this.#shiftStartingItem);
        this.#fireChange();
      }
    } else {
      // select target and deselect all other options
      this.options.forEach(option => option.selected = option === target);
    }
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.focusOnItem(target);
      this.#updateActiveDescendant();
    }
    if (oldValue !== this.value) {
      this.#fireChange();
    }
  }

  /**
   * handles keyup:
   * track whether shift key is being used for multiselectable listbox
   * @param event {KeyboardEvent}
   * @returns void
   */
  #onOptionKeyup(event: KeyboardEvent) {
    const target = event.target as ListboxOptionElement;
    if (event.shiftKey && this.multi) {
      if (this.#shiftStartingItem && target) {
        this.#updateMultiselect(target, this.#shiftStartingItem);
        this.#fireChange();
      }
      if (event.key === 'Shift') {
        this.#shiftStartingItem = null;
      }
    }
  }

  /**
   * handles keydown:
   * filters listbox by keboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event {KeyboardEvent}
   * @returns void
   */
  #onOptionKeydown(event: KeyboardEvent) {
    this.#showAllOptions = false;
    const target = event.target ? event.target as ListboxOptionElement : undefined;

    if (event.altKey || event.metaKey || !target || !this.options.includes(target)) {
      return;
    }

    const first = this.#tabindex.firstItem as ListboxOptionElement;
    const last = this.#tabindex.lastItem as ListboxOptionElement;

    // need to set for keyboard support of multiselect
    if (event.key === 'Shift' && this.multi) {
      this.#shiftStartingItem = this.activeItem;
    }

    switch (event.key) {
      case 'a':
      case 'A':
        if (event.ctrlKey) {
          // ctrl+A selects all options
          this.#updateMultiselect(first, last, true);
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      case 'Enter':
      case ' ':
        // enter and space are only applicable if a listbox option is clicked
        // an external text input should not trigger multiselect
        if (this.multi) {
          if (event.shiftKey) {
            this.#updateMultiselect(target);
          } else if (!this.disabled) {
            target.selected = !target.selected;
          }
        } else {
          this.#updateSingleselect();
        }
        event.stopPropagation();
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  /**
   * handles change to options given previous options array
   * @param oldOptions {ListboxOptionElement[]}
   */
  #optionsChanged(oldOptions: ListboxOptionElement[]) {
    const setSize = this.#options.length;
    if (setSize !== oldOptions.length || !oldOptions.every((element, index) => element === this.#options[index])) {
      this.#options.forEach((option, posInSet) => {
        if (!oldOptions.includes(option)) {
          option.setSize = setSize;
          option.posInSet = posInSet;
          for (const [event, listener] of Object.entries(this.#listeners)) {
            option?.addEventListener(event, listener as (event: Event | null) => void);
          }
        }
      });
      this.#tabindex.initItems(this.visibleOptions);
    }
  }

  /**
   * handles change in value given a list of selected values
   * @param optionsList {unknown | unknown[]}
   */
  #selectOptions(optionsList: unknown | unknown[]) {
    const oldValue = this.value;
    let firstItem: unknown;
    if (Array.isArray(optionsList)) {
      [firstItem] = optionsList || [null];
    } else {
      firstItem = optionsList;
    }
    this.options.forEach(option => {
      const selected = this.multi && Array.isArray(optionsList) ? optionsList?.includes(option.value) : firstItem === option;
      option.selected = selected;
    });
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  /**
   * verfies that selected options are limited to existing listbox options
   */
  hasValue(val: string | null) {
    const vals = val?.split(',') || [];
    const options = this.options.map(option => option.textContent);
    return vals.every(val => {
      return options.includes(val);
    });
  }

  /**
   * sets focus on last active item
   */
  focusActiveItem() {
    this.#tabindex.focusOnItem(this.#tabindex.activeItem);
  }
}
