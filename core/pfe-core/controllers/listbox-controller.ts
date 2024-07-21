import type { ATFocusController } from './at-focus-controller';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { isServer } from 'lit';

/**
 * Filtering, multiselect, and orientation options for listbox
 */
export interface ListboxControllerOptions<T extends HTMLElement> {
  multi?: boolean;
  getATFocusController(): ATFocusController<T>;
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
 *
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_vs_selection
 *
 * > Occasionally, it may appear as if two elements on the page have focus at the same time.
 * > For example, in a multi-select list box, when an option is selected it may be greyed.
 * > Yet, the focus indicator can still be moved to other options, which may also be selected.
 * > Similarly, when a user activates a tab in a tablist, the selected state is set on the tab
 * > and its visual appearance changes. However, the user can still navigate, moving the focus
 * > indicator elsewhere on the page while the tab retains its selected appearance and state.
 * >
 * > Focus and selection are quite different. From the keyboard user's perspective,
 * > focus is a pointer, like a mouse pointer; it tracks the path of navigation.
 * > There is only one point of focus at any time and all operations take place at the
 * > point of focus. On the other hand, selection is an operation that can be performed in
 * > some widgets, such as list boxes, trees, and tablists. If a widget supports only single
 * > selection, then only one item can be selected and very often the selected state will simply
 * > follow the focus when focus is moved inside of the widget.
 * > That is, in some widgets, moving focus may also perform the select operation.
 * > However, if the widget supports multiple selection, then more than one item can be in a
 * > selected state, and keys for moving focus do not perform selection. Some multi-select widgets
 * > do support key commands that both move focus and change selection, but those keys are
 * > different from the normal navigation keys. Finally, when focus leaves a widget that includes
 * > a selected element, the selected state persists.
 * >
 * > From the developer's perspective, the difference is simple -- the focused element is the
 * > active element (document.activeElement). Selected elements are elements that have
 * > aria-selected="true".
 * >
 * > With respect to focus and the selected state, the most important considerations for designers
 * > and developers are:
 * >
 * > - The visual focus indicator must always be visible.
 * > - The selected state must be visually distinct from the focus indicator.
 */
export class ListboxController<Item extends HTMLElement> implements ReactiveController {
  private static instances = new WeakMap<
    ReactiveControllerHost,
    ListboxController<any>
  >();

  public static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ListboxControllerOptions<Item>,
  ): ListboxController<Item> {
    constructingAllowed = true;
    const instance = new ListboxController<Item>(host, options);
    constructingAllowed = false;
    return instance as ListboxController<Item>;
  }

  private constructor(
    public host: ReactiveControllerHost,
    options: ListboxControllerOptions<Item>,
  ) {
    this.#options = options;
    if (!constructingAllowed) {
      throw new Error('ListboxController must be constructed with `ListboxController.of()`');
    }
    if (!isServer
        && !(host instanceof HTMLElement)
        && typeof options.getItemsContainer !== 'function') {
      throw new Error([
        'ListboxController requires the host to be an HTMLElement',
        'or for the initializer to include a getItemsContainer() function',
      ].join(' '));
    }
    if (!this.#controller) {
      throw new Error([
        'ListboxController requires an additional keyboard accessibility controller.',
        'Provide a getA11yController function which returns either a RovingTabindexController',
        'or an ActiveDescendantController',
      ].join(' '));
    }
    const instance = ListboxController.instances.get(host);
    if (instance) {
      return instance as ListboxController<Item>;
    }
    ListboxController.instances.set(host, this);
    this.host.addController(this);
    if (this.#itemsContainer?.isConnected) {
      this.hostConnected();
    }
  }

  /** Current active descendant when shift key is pressed */
  #shiftStartingItem: Item | null = null;

  #options: ListboxControllerOptions<Item>;

  /** All options that will not be hidden by a filter */
  #items: Item[] = [];

  #listening = false;

  #lastATFocusedItem?: Item | null;

  get #itemsContainer() {
    return this.#options.getItemsContainer?.() ?? this.host as unknown as HTMLElement;
  }

  get #controller() {
    return this.#options.getATFocusController();
  }

  /** Whether listbox is disabled */
  disabled = false;

  get multi(): boolean {
    return !!this.#options.multi;
  }

  set multi(v: boolean) {
    this.#options.multi = v;
  }

  get items(): Item[] {
    return this.#items;
  }

  /**
   * register's the host's Item elements as listbox controller items
   * @param items items
   */
  set items(items: Item[]) {
    this.#items = items;
  }

  /**
   * array of options which are selected
   */
  get selectedItems(): Item[] {
    return this.items.filter(option => this.#options.isSelected(option));
  }

  get value(): Item | Item[] {
    const [firstItem] = this.selectedItems;
    return this.#options.multi ? this.selectedItems : firstItem;
  }

  async hostConnected(): Promise<void> {
    if (!this.#listening) {
      await this.host.updateComplete;
      this.#itemsContainer?.addEventListener('click', this.#onClick);
      this.#itemsContainer?.addEventListener('keydown', this.#onKeydown);
      this.#itemsContainer?.addEventListener('keyup', this.#onKeyup);
      this.#listening = true;
    }
  }

  hostUpdate(): void {
    const { atFocusedItem } = this.#controller;
    if (atFocusedItem && atFocusedItem !== this.#lastATFocusedItem) {
      this.#options.requestSelect(atFocusedItem);
    }
    this.#lastATFocusedItem = atFocusedItem;
  }

  hostUpdated(): void {
    this.#itemsContainer?.setAttribute('role', 'listbox');
    this.#itemsContainer?.setAttribute('aria-disabled', String(!!this.disabled));
    this.#itemsContainer?.setAttribute('aria-multi-selectable', String(!!this.#options.multi));
    for (const option of this.#controller.items) {
      if (this.#controller.atFocusedItem === option) {
        option.setAttribute('aria-selected', 'true');
      } else {
        option?.removeAttribute('aria-selected');
      }
    }
  }

  hostDisconnected(): void {
    this.#itemsContainer?.removeEventListener('click', this.#onClick);
    this.#itemsContainer?.removeEventListener('keydown', this.#onKeydown);
    this.#itemsContainer?.removeEventListener('keyup', this.#onKeyup);
    this.#listening = false;
  }

  #isSelectableItem = (item: Item) => !item.ariaDisabled && !item.closest('[disabled]');

  #getItemFromEvent(event: Event): Item | undefined {
    return event
        .composedPath()
        .find(node => this.#items.includes(node as Item)) as Item | undefined;
  }

  /**
   * handles clicking on a listbox option:
   * which selects an item by default
   * or toggles selection if multiselectable
   * @param event click event
   */
  #onClick = (event: MouseEvent) => {
    const target = this.#getItemFromEvent(event);
    if (target) {
      const oldValue = this.value;
      if (this.multi) {
        if (!event.shiftKey) {
          this.#options.requestSelect(target, !this.#options.isSelected(target));
        } else if (this.#shiftStartingItem && target) {
          this.#updateMultiselect(target, this.#shiftStartingItem);
        }
      } else {
        // select target and deselect all other options
        this.items.forEach(option => this.#options.requestSelect(option, option === target));
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
    const target = this.#getItemFromEvent(event);
    if (target && event.shiftKey && this.multi) {
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
    const target = this.#getItemFromEvent(event);

    if (!target || event.altKey || event.metaKey || !this.items.includes(target)) {
      return;
    }

    const first = this.#controller.firstATFocusableItem;
    const last = this.#controller.lastATFocusableItem;

    // need to set for keyboard support of multiselect
    if (event.key === 'Shift' && this.multi) {
      this.#shiftStartingItem = this.#controller.atFocusedItem ?? null;
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
        if (!this.multi) {
          this.#updateSingleselect();
        } else if (event.shiftKey) {
          this.#updateMultiselect(target);
        } else if (!this.disabled) {
          this.#options.requestSelect(target, !this.#options.isSelected(target));
        }
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  /**
   * updates option selections for single select listbox
   */
  #updateSingleselect() {
    if (!this.multi && !this.disabled) {
      this.items
          .filter(this.#isSelectableItem)
          .forEach(option =>
            this.#options.requestSelect(
              option,
              option === this.#controller.atFocusedItem,
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
    referenceItem = this.#controller.atFocusedItem,
    ctrlA = false,
  ) {
    if (referenceItem && this.#options.multi && !this.disabled && currentItem) {
      // select all options between active descendant and target
      const [start, end] = [
        this.items.indexOf(referenceItem),
        this.items.indexOf(currentItem),
      ].sort();
      const items = [...this.items].slice(start, end + 1);

      // by default CTRL+A will select all options
      // if all options are selected, CTRL+A will deselect all options
      const allSelected = this.items
          .filter(this.#isSelectableItem)
          .filter(item => this.#isSelectableItem(item)
                      && !this.#options.isSelected(item))
          .length === 0;

      // whether options will be selected (true) or deselected (false)
      const selected = ctrlA ? !allSelected : this.#options.isSelected(referenceItem);
      for (const item of items.filter(this.#isSelectableItem)) {
        this.#options.requestSelect(item, selected);
      }

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
    for (const item of this.items) {
      this.#options.requestSelect(item, (
          !!this.multi && Array.isArray(value) ? value?.includes(item)
        : firstItem === item
      ));
    }
  }
}
