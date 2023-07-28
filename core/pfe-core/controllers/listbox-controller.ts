import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

/**
 * how filtering will be handled:
 * - "" (default): will show all options until filter text is not ""
 * - "required": will hide all options until filter text is not ""
 * - "disabled": will not hide options at all, regardless of filtering
 */
export type ListboxFilterMode = '' | 'required' | 'disabled';

/**
 * whether list items are arranged vertically or horizontally;
 * limits arrow keys based on orientation
 */
export type ListboxOrientation = '' | 'horizontal' | 'vertical';

export interface ListboxOptions {
  caseSensitive?: boolean;
  filterMode?: ListboxFilterMode;
  matchAnywhere?: boolean;
  multiSelectable?: boolean;
  orientation?: ListboxOrientation;
}

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving
 * tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
 */
export class ListboxController<
  ItemType extends HTMLElement = HTMLElement,
> implements ReactiveController {
  /**
   * filter options that start with a string (case-insensitive)
   */
  #filter = '';

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  #caseSensitive = false;

  /**
   * determines how filtering will be handled:
   * - "" (default): will show all options until filter text is not ""
   * - "required": will hide all options until filter text is not ""
   * - "disabled": will not hide options at all, regardless of filtering
   */
  #filterMode: ListboxFilterMode = '';

  #internals: InternalsController;

  /** event listeners for host element */
  #listeners = {
    'keydown': this.#onOptionKeydown.bind(this),
    'keyup': this.#onOptionKeyup.bind(this),
    'optionfocus': this.#onOptionFocus.bind(this),
    'click': this.#onOptionClick.bind(this),
  };

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if the option starts with filter)
   */
  #matchAnywhere = false;

  #shiftStartingItem: HTMLElement | null = null;

  #tabindex: RovingTabindexController;

  /**
   * all options that will not be hidden by a filter
   * */
  #options: HTMLElement[] = [];

  /**
   * all options that will not be hidden by a filter
   * */
  #visibleOptions: HTMLElement[] = [];

  get activeItem() {
    const [active] = this.options.filter(option => option.getAttribute('id') === this.#internals.ariaActivedescendant);
    return active || this.#tabindex.firstItem;
  }

  set filter(str: string) {
    this.filter = str;
    this.#onFilterChange();
  }

  get filter() {
    return this.#filter;
  }

  set caseSensitive(caseSensitive: boolean) {
    this.#caseSensitive = caseSensitive;
    this.#onFilterChange();
  }

  get caseSensitive() {
    return this.#caseSensitive;
  }

  set filterMode(str: ListboxFilterMode) {
    this.#filterMode = str;
    this.#onFilterChange();
  }

  get filterMode(): ListboxFilterMode {
    return this.#filterMode || '';
  }

  set multiSelectable(multiSelectable: boolean) {
    this.#internals.ariaMultiSelectable = multiSelectable ? 'true' : 'false';
  }

  get multiSelectable(): boolean {
    return this.#internals.ariaMultiSelectable === 'true';
  }

  set matchAnywhere(matchAnywhere: boolean) {
    this.#matchAnywhere = matchAnywhere;
    this.#onFilterChange();
  }

  get matchAnywhere() {
    return this.#matchAnywhere;
  }

  set orientation(orientation: ListboxOrientation) {
    this.#internals.ariaOrientation = orientation;
  }

  get orientation(): ListboxOrientation {
    const orientation = this.#internals.ariaOrientation || '';
    return orientation as ListboxOrientation;
  }

  get options() {
    return this.#options;
  }

  set options(options: HTMLElement[]) {
    const setSize = options.length;
    const filterOptions = (option: HTMLElement, posInSet: number) => {
      option.ariaSetSize = setSize !== null ? `${setSize}` : null;
      option.ariaPosInSet = posInSet !== null ? `${posInSet}` : null;
      if (this.#filterMode === 'required' && this.#filter === '') {
        return false;
      } else if (this.#filterMode === 'disabled') {
        return true;
      } else {
        const search = this.#matchAnywhere ? '' : '^';
        const text = option.textContent || '';
        const regex = new RegExp(`${search}${this.#filter}`, this.#caseSensitive ? 'i' : '');
        if (search === '' || text.match(regex)) {
          option.removeAttribute('hidden-by-filter');
        } else {
          option.setAttribute('hidden-by-filter', 'hidden-by-filter');
        }
        return !option.hasAttribute('hidden-by-filter');
      }
    };
    this.#tabindex.initItems(this.#visibleOptions, this.host);
    this.#visibleOptions = options.filter((option, i) => filterOptions(option, i));
    this.#options = options;
  }

  get value() {
    const selectedItems = this.options.filter(option=>option.ariaSelected === 'true').map(option => option.textContent?.replace(',', '\\,'));
    return selectedItems.join(',');
  }

  set value(items: string | null) {
    const oldValue = this.value;
    const selectedItems = items?.toLowerCase().split(',');
    const [firstItem] = selectedItems || [null];
    this.options.forEach(option => {
      const textContent = (option.textContent || '').replace('\\,', ',').toLowerCase();
      const selected = this.multiSelectable ? selectedItems?.includes(textContent) : firstItem === textContent;
      option.ariaSelected = `${selected}`;
    });
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  get visibleOptions() {
    return this.#visibleOptions;
  }

  constructor(public host: ReactiveControllerHost & HTMLElement, options: ListboxOptions) {
    this.host.addController(this);
    this.#internals = new InternalsController(this.host, {
      role: 'listbox'
    });
    this.#tabindex = new RovingTabindexController<HTMLElement>(this.host);
    this.#caseSensitive = options.caseSensitive || false;
    this.#filterMode = options.filterMode || '';
  }

  /**
   * adds event listeners to host
   */
  hostConnected() {
    for (const [event, listener] of Object.entries(this.#listeners)) {
      this.host?.addEventListener(event, listener as (event: Event | null) => void);
    }
  }

  /**
   * removes event listeners from host
   */
  hostDisconnected() {
    for (const [event, listener] of Object.entries(this.#listeners)) {
      this.host?.removeEventListener(event, listener as (event: Event | null) => void);
    }
  }

  isValid(val: string | null) {
    const vals = val?.split(',') || [];
    const options = this.options.map(option => option.textContent);
    return vals.every(val => {
      return options.includes(val);
    });
  }

  #updateOption(option: HTMLElement) {
    const search = this.#caseSensitive ? this.#filter : this.#filter.toLowerCase();
    const text = this.#caseSensitive ? (option.textContent || '') : (option.textContent || '');
    if (search === '' || text.match(search)) {
      option.removeAttribute('hidden-by-filter');
    } else {
      option.setAttribute('hidden-by-filter', 'hidden-by-filter');
    }
    return !option.hasAttribute('hidden-by-filter');
  }

  /**
   * filters listbox by keboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event
   * @returns { void }
   */
  filterByKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
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
          this.#filter = this.#filter.slice(0, this.#filter.length - 2);
          stopEvent = true;
          break;
        case event.key?.match(/^[\w]$/)?.input:
          this.#filter += event.key?.toLowerCase();
          stopEvent = true;
          break;
        case 'Enter':
        case ' ':
          // enter and space are only applicable if a listbox option is clicked
          // an external text input should not trigger multiselect
          if (target) {
            if (this.multiSelectable) {
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
    this.options.forEach(option => {
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
    if (!this.multiSelectable) {
      this.options.forEach(option => option.ariaSelected = `${option.id === this.#internals.ariaActivedescendant}`);
      this.#fireChange();
    }
  }

  #updateMultiselect(currentItem: HTMLElement, referenceItem = this.activeItem, ctrlKey = false) {
    if (this.multiSelectable) {
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

  #onFilterChange() {
    const oldValue = this.value;
    this.#tabindex.updateItems(this.#visibleOptions);
    this.#updateActiveDescendant();
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  #onOptionFocus(event: FocusEvent) {
    const target = event.target as HTMLElement;
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.updateActiveItem(target);
    }
    this.#updateActiveDescendant();
  }

  #onOptionClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const oldValue = this.value;
    if (this.multiSelectable) {
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
    const target = event.target as HTMLElement;
    if (event.shiftKey && this.multiSelectable) {
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
    if (event.key === 'Shift' && this.multiSelectable) {
      this.#shiftStartingItem = this.activeItem;
    }
    this.filterByKeyboardEvent(event);
    // only change focus if keydown occurred when option has focus
    // (as opposed to an external text input and if filter has changed
    if (filter !== this.#filter) {
      this.#tabindex.focusOnItem(this.activeItem);
    }
  }
}
