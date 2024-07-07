import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

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
  setActiveItem(item: Item): void;
}

/**
 * Filtering, multiselect, and orientation options for listbox
 */
export interface ListboxConfigOptions<T extends HTMLElement> {
  multi?: boolean;
  a11yController: ListboxAccessibilityController<T>;
  getHTMLElement(): HTMLElement | null;
  requestSelect(option: T, force?: boolean): boolean;
  isSelected(option: T): boolean;
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
        && typeof _options.getHTMLElement !== 'function') {
      throw new Error(
        `ListboxController requires the host to be an HTMLElement, or for the initializer to include a \`getHTMLElement()\` function`,
      );
    }
    if (!_options.a11yController) {
      throw new Error(
        `ListboxController requires an additional keyboard accessibility controller. Provide either a RovingTabindexController or an ActiveDescendantController`,
      );
    }
    ListboxController.instances.set(host, this);
    this.host.addController(this);
    if (this.element?.isConnected) {
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

  /** Current active descendant in listbox */
  get activeItem() {
    return this.options.find(option =>
      option === this._options.a11yController.activeItem) || this._options.a11yController.firstItem;
  }

  get nextItem() {
    return this._options.a11yController.nextItem;
  }

  get options() {
    return this.#items;
  }

  /**
   * array of options which are selected
   */
  get selectedOptions() {
    return this.options.filter(option => this._options.isSelected(option));
  }

  get value() {
    const [firstItem] = this.selectedOptions;
    return this._options.multi ? this.selectedOptions : firstItem;
  }

  private get element() {
    return this._options.getHTMLElement();
  }

  async hostConnected() {
    if (!this.#listening) {
      await this.host.updateComplete;
      this.element?.addEventListener('click', this.#onClick);
      this.element?.addEventListener('focus', this.#onFocus);
      this.element?.addEventListener('keydown', this.#onKeydown);
      this.element?.addEventListener('keyup', this.#onKeyup);
      this.#listening = true;
    }
  }

  hostUpdated() {
    this.element?.setAttribute('role', 'listbox');
    this.element?.setAttribute('aria-disabled', String(!!this.disabled));
    this.element?.setAttribute('aria-multi-selectable', String(!!this._options.multi));
    for (const option of this._options.a11yController.items) {
      if (this._options.a11yController.activeItem === option) {
        option.setAttribute('aria-selected', 'true');
      } else {
        option.removeAttribute('aria-selected');
      }
    }
  }

  hostDisconnected() {
    this.element?.removeEventListener('click', this.#onClick);
    this.element?.removeEventListener('focus', this.#onFocus);
    this.element?.removeEventListener('keydown', this.#onKeydown);
    this.element?.removeEventListener('keyup', this.#onKeyup);
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
    if (target && target !== this._options.a11yController.activeItem) {
      this._options.a11yController.setActiveItem(target);
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
      if (target !== this._options.a11yController.activeItem) {
        this._options.a11yController.setActiveItem(target);
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

    const first = this._options.a11yController.firstItem;
    const last = this._options.a11yController.lastItem;

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
      this._options.a11yController.updateItems(this.options);
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
              option === this._options.a11yController.activeItem,
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
  setValue(value: Item | Item[]) {
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
  setOptions(options: Item[]) {
    const oldOptions = [...this.#items];
    this.#items = options;
    this.#optionsChanged(oldOptions);
  }
}
