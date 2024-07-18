import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { isServer } from 'lit';

export interface ListboxAccessibilityController<
  Item extends HTMLElement
> extends ReactiveController {
  items: Item[];
  activeItem?: Item;
  nextItem?: Item;
  prevItem?: Item;
  firstItem?: Item;
  lastItem?: Item;
  updateItems(items: Item[]): void;
  setATFocus(item: Item): void;
}

/**
 * Filtering, multiselect, and orientation options for listbox
 */
export interface ListboxConfigOptions<T extends HTMLElement> {
  multi?: boolean;
  getA11yController(): ListboxAccessibilityController<T>;
  requestSelect(option: T, force?: boolean): boolean;
  isSelected(option: T): boolean;
  getItemsContainer?(): HTMLElement | null;
}

let constructingAllowed = false;

/**
 * Implements listbox semantics and accesibility. As there are two recognized
 * patterns for implementing keyboard interactions with listbox patterns,
 * provide a secondary controller (either RovingTabindexController or
 * ActiveDescendantController) to complete the implementation.
 */
export class ListboxController<Item extends HTMLElement> implements ReactiveController {
  private static instances = new WeakMap<ReactiveControllerHost, ListboxController<HTMLElement>>();

  public static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ListboxConfigOptions<Item>,
  ): ListboxController<Item> {
    constructingAllowed = true;
    const instance =
      ListboxController.instances.get(host) ?? new ListboxController<Item>(host, options);
    constructingAllowed = false;
    return instance as ListboxController<Item>;
  }

  private constructor(
    public host: ReactiveControllerHost,
    // this should ideally be ecma #private, but tsc/esbuild tooling isn't up to scratch yet
    // so for now we rely on the underscore convention to avoid compile-time errors
    // try refactoring after updating tooling dependencies
    private _options: ListboxConfigOptions<Item>,
  ) {
    if (!constructingAllowed) {
      throw new Error('ListboxController must be constructed with `ListboxController.of()`');
    }
    if (!isServer
        && !(host instanceof HTMLElement)
        && typeof _options.getItemsContainer !== 'function') {
      throw new Error([
        'ListboxController requires the host to be an HTMLElement',
        'or for the initializer to include a getItemsContainer() function',
      ].join(' '));
    }
    if (!_options.getA11yController) {
      throw new Error([
        'ListboxController requires an additional keyboard accessibility controller.',
        'Provide a getA11yController function which returns either a RovingTabindexController',
        'or an ActiveDescendantController',
      ].join(' '));
    }
    ListboxController.instances.set(host, this);
    this.host.addController(this);
    if (this.#itemsContainer?.isConnected) {
      this.hostConnected();
    }
  }

  /** Current active descendant when shift key is pressed */
  #shiftStartingItem: Item | null = null;

  /** All options that will not be hidden by a filter */
  #items: Item[] = [];

  #listening = false;

  /** Whether listbox is disabled */
  disabled = false;

  get #controller() {
    return this._options.getA11yController();
  }

  get multi(): boolean {
    return !!this._options.multi;
  }

  set multi(v: boolean) {
    this._options.multi = v;
  }

  /** Current active descendant in listbox */
  get activeItem(): Item | undefined {
    return this.options.find(option => option === this.#controller.activeItem)
      || this.#controller.firstItem;
  }

  get nextItem(): Item | undefined {
    return this.#controller.nextItem;
  }

  get options(): Item[] {
    return this.#items;
  }

  /**
   * array of options which are selected
   */
  get selectedOptions(): Item[] {
    return this.options.filter(option => this._options.isSelected(option));
  }

  get value(): Item | Item[] {
    const [firstItem] = this.selectedOptions;
    return this._options.multi ? this.selectedOptions : firstItem;
  }

  get #itemsContainer() {
    return this._options.getItemsContainer?.() ?? this.host as unknown as HTMLElement;
  }

  async hostConnected(): Promise<void> {
    if (!this.#listening) {
      await this.host.updateComplete;
      this.#itemsContainer?.addEventListener('click', this.#onClick);
      this.#itemsContainer?.addEventListener('focus', this.#onFocus);
      this.#itemsContainer?.addEventListener('keydown', this.#onKeydown);
      this.#itemsContainer?.addEventListener('keyup', this.#onKeyup);
      this.#listening = true;
    }
  }

  hostUpdated(): void {
    this.#itemsContainer?.setAttribute('role', 'listbox');
    this.#itemsContainer?.setAttribute('aria-disabled', String(!!this.disabled));
    this.#itemsContainer?.setAttribute('aria-multi-selectable', String(!!this._options.multi));
    for (const option of this.#controller.items) {
      if (this.#controller.activeItem === option) {
        option.setAttribute('aria-selected', 'true');
      } else {
        option?.removeAttribute('aria-selected');
      }
    }
  }

  hostDisconnected(): void {
    this.#itemsContainer?.removeEventListener('click', this.#onClick);
    this.#itemsContainer?.removeEventListener('focus', this.#onFocus);
    this.#itemsContainer?.removeEventListener('keydown', this.#onKeydown);
    this.#itemsContainer?.removeEventListener('keyup', this.#onKeyup);
    this.#listening = false;
  }

  #getEnabledOptions(options = this.options) {
    return options.filter(option => !option.ariaDisabled && !option.closest('[disabled]'));
  }

  #getEventOption(event: Event): Item | undefined {
    return event
        .composedPath()
        .find(node => this.#items.includes(node as Item)) as Item | undefined;
  }


  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   * @param event focus event
   */
  #onFocus = (event: FocusEvent) => {
    const target = this.#getEventOption(event);
    if (target && target !== this.#controller.activeItem) {
      this.#controller.setATFocus(target);
    }
  };

  /**
   * handles clicking on a listbox option:
   * which selects an item by default
   * or toggles selection if multiselectable
   * @param event click event
   */
  #onClick = (event: MouseEvent) => {
    const target = this.#getEventOption(event);
    if (target) {
      const oldValue = this.value;
      if (this._options.multi) {
        if (!event.shiftKey) {
          this._options.requestSelect(target, !this._options.isSelected(target));
        } else if (this.#shiftStartingItem && target) {
          this.#updateMultiselect(target, this.#shiftStartingItem);
        }
      } else {
        // select target and deselect all other options
        this.options.forEach(option => this._options.requestSelect(option, option === target));
      }
      if (target !== this.#controller.activeItem) {
        this.#controller.setATFocus(target);
      }
      if (oldValue !== this.value) {
        this.host.requestUpdate();
      }
    }
  };

  /**
   * track whether shift key is being used for multiselectable listbox
   * @param event keyup event
   */
  #onKeyup = (event: KeyboardEvent) => {
    const target = this.#getEventOption(event);
    if (target && event.shiftKey && this._options.multi) {
      if (this.#shiftStartingItem && target) {
        this.#updateMultiselect(target, this.#shiftStartingItem);
      }
      if (event.key === 'Shift') {
        this.#shiftStartingItem = null;
      }
    }
  };

  /**
   * filters listbox by keyboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event keydown event
   */
  #onKeydown = (event: KeyboardEvent) => {
    const target = this.#getEventOption(event);

    if (!target || event.altKey || event.metaKey || !this.options.includes(target)) {
      return;
    }

    const first = this.#controller.firstItem;
    const last = this.#controller.lastItem;

    // need to set for keyboard support of multiselect
    if (event.key === 'Shift' && this._options.multi) {
      this.#shiftStartingItem = this.activeItem ?? null;
    }

    switch (event.key) {
      case 'a':
      case 'A':
        if (event.ctrlKey) {
          // ctrl+A selects all options
          this.#updateMultiselect(first, last, true);
          event.preventDefault();
        }
        break;
      case 'Enter':
      case ' ':
        // enter and space are only applicable if a listbox option is clicked
        // an external text input should not trigger multiselect
        if (this._options.multi) {
          if (event.shiftKey) {
            this.#updateMultiselect(target);
          } else if (!this.disabled) {
            this._options.requestSelect(target, !this._options.isSelected(target));
          }
        } else {
          this.#updateSingleselect();
        }
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  /**
   * handles change to options given previous options array
   * @param oldOptions previous options list
   */
  #optionsChanged(oldOptions: Item[]) {
    const setSize = this.#items.length;
    if (setSize !== oldOptions.length
     || !oldOptions.every((element, index) => element === this.#items[index])) {
      this.#controller.updateItems(this.options);
    }
  }

  /**
   * updates option selections for single select listbox
   */
  #updateSingleselect() {
    if (!this._options.multi && !this.disabled) {
      this.#getEnabledOptions()
          .forEach(option =>
            this._options.requestSelect(
              option,
              option === this.#controller.activeItem,
            ));
    }
  }

  /**
   * updates option selections for multiselectable listbox:
   * toggles all options between active descendant and target
   * @param currentItem item being added
   * @param referenceItem item already selected.
   * @param ctrlA is ctrl-a held down?
   */
  #updateMultiselect(
    currentItem?: Item,
    referenceItem = this.activeItem,
    ctrlA = false,
  ) {
    if (referenceItem && this._options.multi && !this.disabled && currentItem) {
      // select all options between active descendant and target
      const [start, end] = [
        this.options.indexOf(referenceItem),
        this.options.indexOf(currentItem),
      ].sort();
      const options = [...this.options].slice(start, end + 1);

      // by default CTRL+A will select all options
      // if all options are selected, CTRL+A will deselect all options
      const allSelected = this.#getEnabledOptions(options)
          .filter(option => !this._options.isSelected(option))?.length === 0;

      // whether options will be selected (true) or deselected (false)
      const selected = ctrlA ? !allSelected : this._options.isSelected(referenceItem);
      this.#getEnabledOptions(options).forEach(option =>
        this._options.requestSelect(option, selected));

      // update starting item for other multiselect
      this.#shiftStartingItem = currentItem;
    }
  }

  /**
   * sets the listbox value based on selected options
   * @param value item or items
   */
  setValue(value: Item | Item[]): void {
    const selected = Array.isArray(value) ? value : [value];
    const [firstItem = null] = selected;
    for (const option of this.options) {
      this._options.requestSelect(option, (
          !!this._options.multi && Array.isArray(value) ? value?.includes(option)
        : firstItem === option
      ));
    }
  }

  /**
   * register's the host's Item elements as listbox controller items
   * @param options items
   */
  setOptions(options: Item[]): void {
    const oldOptions = [...this.#items];
    this.#items = options;
    this.#optionsChanged(oldOptions);
  }
}
