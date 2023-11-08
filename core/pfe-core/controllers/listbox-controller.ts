import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

/**
 * Whether list items are arranged vertically or horizontally;
 * limits arrow keys based on orientation
 */
export type ListboxOrientation = 'undefined' | 'horizontal' | 'vertical';

/**
 * Filtering, multiselect, and orientation options for listbox
 */
export interface ListboxConfigOptions {
  caseSensitive?: boolean;
  matchAnywhere?: boolean;
  multi?: boolean;
  orientation?: ListboxOrientation;
  getHTMLElement?(): HTMLElement;
}

export interface ListboxOptionElement extends HTMLElement {
  value: unknown;
  selected?: boolean;
  posInSet?: number;
  setSize?: number;
  active?: boolean;
}

type FilterPropKey = 'filter' | 'caseSensitive' | 'matchAnywhere';
type FilterPropValue = ListboxController<any>[FilterPropKey];

let constructingAllowed = false;

/**
 * Implements roving tabindex, as described in WAI-ARIA practices,
 * [Managing Focus Within Components Using a Roving tabindex][rti]
 *
 * [rti]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 *
 * @fires change
 * @fires input
 */
export class ListboxController<Item extends ListboxOptionElement> implements ReactiveController {
  private static instances = new WeakMap<ReactiveControllerHost, ListboxController<any>>();

  private static filter<T extends ListboxOptionElement>(
    target: ListboxController<T>,
    key: FilterPropKey,
  ) {
    // typescript experimental decorator
    Object.defineProperty(target, key, {
      get(this: ListboxController<T>) {
        return this.#filterStorage.get(key);
      },
      set(this: ListboxController<T>, value: FilterPropValue) {
        if (this.#filterStorage.get(key) !== value) {
          this.#filterStorage.set(key, value);
          if (this.internals) {
            this.#onFilterChange();
          }
        }
      }
    });
  }

  #filterStorage = new Map<FilterPropKey, FilterPropValue>();

  /** Whether `*` has been pressed to show all options */
  #showAllOptions = false;

  /** Event listeners for host element */
  #listeners = {
    'click': this.#onOptionClick.bind(this),
    'focus': this.#onOptionFocus.bind(this),
    'keydown': this.#onOptionKeydown.bind(this),
    'keyup': this.#onOptionKeyup.bind(this),
  };

  /** Current active descendant when shift key is pressed */
  #shiftStartingItem: Item | null = null;

  /** All options that will not be hidden by a filter */
  #options: Item[] = [];

  /** Whether or not focus should be updated after filtering */
  #updateFocus = false;

  /**
   * Whether filtering matches anywhere in option text;
   * default is only options starting with filter
   */
  @ListboxController.filter matchAnywhere = false;

  /** Filter options that start with this string (case-insensitive) */
  @ListboxController.filter filter = '';

  /** Whether filtering is case sensitive */
  @ListboxController.filter caseSensitive = false;

  /** Current active descendant in listbox */
  get activeItem() {
    const [active] = this.options.filter(option => option === this.internals.ariaActiveDescendantElement);
    return active || this.tabindex.firstItem;
  }

  /** Whether listbox is disabled */
  set disabled(disabled: boolean) {
    this.internals.ariaDisabled = String(!!disabled);
  }

  get disabled(): boolean {
    return this.internals.ariaDisabled === 'true';
  }

  /** Whether listbox is multiselectable. */
  set multi(multi: boolean) {
    this.internals.ariaMultiSelectable = multi ? 'true' : 'false';
  }

  get multi(): boolean {
    return this.internals.ariaMultiSelectable === 'true';
  }

  /**
   * listbox orientation;
   * default is vertical
   */
  set orientation(orientation: ListboxOrientation) {
    this.internals.ariaOrientation = orientation || 'undefined';
  }

  get orientation(): ListboxOrientation {
    const orientation = this.internals.ariaOrientation || 'undefined';
    return orientation as ListboxOrientation;
  }

  /**
   * array of listbox option elements
   */
  set options(options: Item[]) {
    const oldOptions = [...this.#options];
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
  set value(value: Item | Item[]) {
    // value is set by selecting matching options
    this.#selectOptions(value);
  }

  get value() {
    const [firstItem] = this.selectedOptions;
    return this.multi ? this.selectedOptions : firstItem;
  }

  /**
   * array of options that match filter;
   * (or all options if no options match or if no filter)
   */
  get visibleOptions(): Item[] {
    return this.#getMatchingOptions();
  }

  private get element() {
    return this.host instanceof HTMLElement ? this.host : this.controllerOptions.getHTMLElement?.() as HTMLElement;
  }

  private internals: InternalsController;

  private tabindex = new RovingTabindexController<Item>(this.host);

  public static for<Item extends ListboxOptionElement = ListboxOptionElement>(
    host: ReactiveControllerHost,
    controllerOptions: ListboxConfigOptions,
  ): ListboxController<Item> {
    constructingAllowed = true;
    const instance: ListboxController<Item> =
      ListboxController.instances.get(host) ?? new ListboxController<Item>(host, controllerOptions);
    constructingAllowed = false;
    return instance;
  }

  private constructor(
    public host: ReactiveControllerHost,
    private controllerOptions: ListboxConfigOptions,
  ) {
    if (!constructingAllowed) {
      throw new Error('ListboxController must be constructed with `ListboxController.for()`');
    }
    if (!(host instanceof HTMLElement) && typeof controllerOptions.getHTMLElement !== 'function') {
      throw new Error('ListboxController requires the host to be an HTMLElement, or for the initializer to include a `getHTMLElement()` function');
    }
    ListboxController.instances.set(host, this);
    this.internals = InternalsController.for(this.host, { getHTMLElement: controllerOptions?.getHTMLElement });
    this.internals.role = 'listbox';
    this.host.addController(this);
    this.caseSensitive = controllerOptions.caseSensitive || false;
    this.#onFilterChange();
  }

  /**
   * adds event listeners to host
   */
  hostConnected() {
    this.#listeners;
  }

  #getEnabledOptions(options = this.options) {
    return options.filter(option => !option.ariaDisabled && !option.closest('[disabled]'));
  }

  /**
   * gets matching options by filter value
   */
  #getMatchingOptions() {
    let matchedOptions: Item[] = [];
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

  // TODO(bennypowers): create ActiveDescendantController if/when a third use case becomes apparent

  /**
   * updates active descendant when focus changes
   */
  #updateActiveDescendant() {
    this.options.forEach(option => {
      option.active = option === this.tabindex.activeItem &&
        this.visibleOptions.includes(option);
      if (option.active) {
        this.internals.ariaActiveDescendantElement = option;
      } else {
        if (this.internals.ariaActiveDescendantElement === option) {
          this.internals.ariaActiveDescendantElement = null;
        }
      }
    });
  }

  /**
   * handles user user selection change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   */
  #fireChange() {
    this.element.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /**
   * handles element value change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   */
  #fireInput() {
    this.element.dispatchEvent(new Event('input', { bubbles: true }));
  }

  /**
   * handles updates to filter text:
   * hides options that do not match filter settings
   * and updates active descendant based on which options are still visible
   */
  #onFilterChange() {
    if (this.disabled) {
      return;
    }
    const oldValue = this.value;

    if (this.#updateFocus) {
      this.tabindex.updateItems(this.visibleOptions);
      this.#updateFocus = false;
    } else {
      this.tabindex.initItems(this.visibleOptions);
    }
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   */
  #onOptionFocus(event: FocusEvent) {
    const target = event.target as Item;
    if (target !== this.tabindex.activeItem) {
      this.tabindex.updateActiveItem(target);
    }
    this.#updateActiveDescendant();
  }

  /**
   * handles clicking on a listbox option:
   * which selects an item by default
   * or toggles selection if multiselectable
   */
  #onOptionClick(event: MouseEvent) {
    const target = event.target as Item;
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
    if (target !== this.tabindex.activeItem) {
      this.tabindex.focusOnItem(target);
      this.#updateActiveDescendant();
    }
    if (oldValue !== this.value) {
      this.#fireChange();
    }
  }

  /**
   * handles keyup:
   * track whether shift key is being used for multiselectable listbox
   */
  #onOptionKeyup(event: KeyboardEvent) {
    const target = event.target as Item;
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
   * filters listbox by keyboard event when slotted option has focus,
   * or by external element such as a text field
   */
  #onOptionKeydown(event: KeyboardEvent) {
    this.#showAllOptions = false;
    const target = event.target ? event.target as Item : undefined;

    if (event.altKey || event.metaKey || !target || !this.options.includes(target)) {
      return;
    }

    const first = this.tabindex.firstItem;
    const last = this.tabindex.lastItem;

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
   */
  #optionsChanged(oldOptions: Item[]) {
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
      this.tabindex.initItems(this.visibleOptions);
    }
  }

  /**
   * handles change in value given a list of selected values
   */
  #selectOptions(value: Item | Item[]) {
    const oldValue = this.value;
    const [firstItem = null] = Array.isArray(value) ? value : [value];
    for (const option of this.options) {
      option.selected = (
          !!this.multi && Array.isArray(value) ? value?.includes(option)
        : firstItem === option
      );
    }
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  /**
   * updates option selections for single select listbox
   */
  #updateSingleselect() {
    if (!this.multi && !this.disabled) {
      this.#getEnabledOptions()
        .forEach(option =>
          option.selected = option === this.internals.ariaActiveDescendantElement);
      this.#fireChange();
    }
  }

  /**
   * updates option selections for multiselectable listbox:
   * toggles all options between active descendant and target
   */
  #updateMultiselect(currentItem?: Item, referenceItem = this.activeItem, ctrlA = false) {
    if (this.multi && !this.disabled && currentItem) {
      // select all options between active descendant and target
      const [start, end] = [this.options.indexOf(referenceItem), this.options.indexOf(currentItem)].sort();
      const options = [...this.options].slice(start, end + 1);

      // by default CTRL+A will select all options
      // if all options are selected, CTRL+A will deselect all options
      const allSelected = this.#getEnabledOptions(options).filter(option => !option.selected)?.length === 0;

      // whether options will be selected (true) or deselected (false)
      const selected = ctrlA ? !allSelected : referenceItem.selected;
      this.#getEnabledOptions(options).forEach(option => option.selected = selected);
      this.#fireChange();

      // update starting item for other multiselect
      this.#shiftStartingItem = currentItem;
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
   * Sets focus on last active item
   */
  focusActiveItem() {
    this.tabindex.focusOnItem(this.tabindex.activeItem);
  }
}
