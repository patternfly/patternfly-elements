import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { RequireProps } from '../core.ts';

import { isServer } from 'lit';
import { arraysAreEquivalent } from '../functions/arraysAreEquivalent.js';

/**
 * Filtering, multiselect, and orientation options for listbox
 */
export interface ListboxControllerOptions<Item extends HTMLElement> {
  /**
   * Whether the listbox supports multiple selections.
   */
  multi?: boolean;
  /**
   * Optional callback to control the selection behavior of items. By default, ListboxController
   * will set the `aria-selected` attribute. When overriding this option, it will call it on your
   * element with the selected state.
   * Callers **must** ensure that the correct ARIA state is set.
   */
  setItemSelected?(this: Item, selected: boolean): void;
  /**
   * Optional predicate to assertain whether a custom element item is disabled or not
   * By default, if the item matches any of these conditions, it is considered disabled:
   * 1. it has the `aria-disabled="true"` attribute
   * 2. it has the `disabled` attribute present
   * 3. it matches the `:disabled` pseudo selector
   */
  isItemDisabled?(this: Item): boolean;
  /**
   * Function returning the item which currently has assistive technology focus.
   * In most cases, this should be the `atFocusedItem` of an ATFocusController
   * i.e. RovingTabindexController or ActivedescendantController.
   *
   */
  getATFocusedItem(): Item | null;
  /**
   * Function returning the DOM node which is the direct parent of the item elements
   * Defaults to the controller host.
   * If the controller host is not an HTMLElement, this *must* be set
   */
  getItemsContainer?(): HTMLElement | null;
  /**
   * Optional function returning an additional DOM node which controls the listbox, e.g.
   * a combobox input.
   */
  getControlsElements?(): HTMLElement[];
}

/**
 * This is the default method for setting the selected state on an item element
 * @param selected is this item selected
 */
function setItemSelected<Item extends HTMLElement>(this: Item, selected: boolean) {
  if (selected) {
    this.setAttribute('aria-selected', 'true');
  } else {
    this.removeAttribute('aria-selected');
  }
}

/**
 * This is a fib. aria-disabled might not be present on an element that uses internals,
 * and the `disabled` attribute may not accurately represent the disabled state.
 * short of patching the `attachInternals` constructor, it may not be possible at
 * runtime to know with certainty that an arbitrary custom element is disabled or not.
 * @param item possibly disabled item
 */
function isItemDisabled<Item extends HTMLElement>(this: Item): boolean {
  return this.getAttribute('aria-disabled') === 'true'
      || this.hasAttribute('disabled')
      || this.matches(':disabled');
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
  private static instances = new WeakMap<ReactiveControllerHost, ListboxController<HTMLElement>>();

  public static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ListboxControllerOptions<Item>,
  ): ListboxController<Item> {
    constructingAllowed = true;
    const instance = new ListboxController<Item>(host, options);
    constructingAllowed = false;
    return instance as ListboxController<Item>;
  }

  /** Current active descendant when shift key is pressed */
  #shiftStartingItem: Item | null = null;

  #options: RequireProps<ListboxControllerOptions<Item>, 'setItemSelected' | 'isItemDisabled'>;

  /** All items */
  #items: Item[] = [];

  #selectedItems = new Set<Item>;

  #listening = false;

  /** Whether listbox is disabled */
  disabled = false;

  get container(): HTMLElement {
    return this.#options.getItemsContainer?.() ?? this.host as unknown as HTMLElement;
  }

  get controlsElements(): HTMLElement[] {
    const elementOrElements = this.#options.getControlsElements?.();
    return [elementOrElements].filter(x => !!x).flat();
  }

  get multi(): boolean {
    return !!this.#options.multi;
  }

  set multi(v: boolean) {
    this.#options.multi = v;
    this.host.requestUpdate();
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
   * sets the listbox value based on selected options
   * @param selected item or items
   */
  set selected(selected: Item[]) {
    this.#selectedItems = new Set(selected == null ? selected
                                : Array.isArray(selected) ? selected
                                : [selected]);
    for (const item of this.items) {
      this.#options.setItemSelected.call(item, this.#selectedItems.has(item));
    }
    this.host.requestUpdate();
  }

  /**
   * array of options which are selected
   */
  get selected(): Item[] {
    return [...this.#selectedItems];
  }

  private constructor(
    public host: ReactiveControllerHost,
    options: ListboxControllerOptions<Item>,
  ) {
    this.#options = { setItemSelected, isItemDisabled, ...options };
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
    const instance = ListboxController.instances.get(host) as unknown as ListboxController<Item>;
    if (instance) {
      return instance as ListboxController<Item>;
    }
    ListboxController.instances.set(host, this as unknown as ListboxController<HTMLElement>);
    this.host.addController(this);
    this.multi = this.#options.multi ?? false;
    if (this.container?.isConnected) {
      this.hostConnected();
    }
  }

  async hostConnected(): Promise<void> {
    if (!this.#listening) {
      await this.host.updateComplete;
      this.container?.addEventListener('click', this.#onClick);
      this.container?.addEventListener('keydown', this.#onKeydown);
      this.container?.addEventListener('keyup', this.#onKeyup);
      this.controlsElements.forEach(el => el.addEventListener('keydown', this.#onKeydown));
      this.controlsElements.forEach(el => el.addEventListener('keyup', this.#onKeyup));
      this.#listening = true;
    }
  }

  hostUpdated(): void {
    this.container?.setAttribute('role', 'listbox');
    this.container?.setAttribute('aria-disabled', String(!!this.disabled));
    this.container?.setAttribute('aria-multi-selectable', String(!!this.#options.multi));
  }

  hostDisconnected(): void {
    this.container?.removeEventListener('click', this.#onClick);
    this.container?.removeEventListener('keydown', this.#onKeydown);
    this.container?.removeEventListener('keyup', this.#onKeyup);
    this.controlsElements.forEach(el => el.removeEventListener('keydown', this.#onKeydown));
    this.controlsElements.forEach(el => el.removeEventListener('keyup', this.#onKeyup));
    this.#listening = false;
  }

  public isSelected(item: Item): boolean {
    return this.#selectedItems.has(item);
  }

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
      if (!this.multi) {
        // select target and deselect all other options
        this.selected = [target];
      } else if (!event.shiftKey) {
        this.selected = this.items // todo: improve this intercalation
            .map(item => item === target || this.isSelected(item) ? item : null)
            .filter(x => !!x);
      } else if (this.#shiftStartingItem && target) {
        this.selected = this.#getMultiSelection(target, this.#shiftStartingItem);
        this.#shiftStartingItem = target;
      }
    }
    this.host.requestUpdate();
  };

  /**
   * track whether shift key is being used for multiselectable listbox
   * @param event keyup event
   */
  #onKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Shift') {
      this.#shiftStartingItem = null;
    }
  };

  /**
   * filters listbox by keyboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event keydown event
   */
  #onKeydown = (event: KeyboardEvent) => {
    const target = this.#getItemFromEvent(event);
    const item = target ?? this.#options.getATFocusedItem();

    if (this.disabled || !item || event.altKey || event.metaKey) {
      return;
    }

    // need to set for keyboard support of multiselect
    if (event.key === 'Shift' && this.multi) {
      this.#shiftStartingItem = this.#options.getATFocusedItem() ?? null;
    }

    switch (event.key) {
      // ctrl+A de/selects all options
      case 'a':
      case 'A':
        if (event.ctrlKey && event.target === this.container) {
          const selectableItems = this.items.filter(item =>
            !this.#options.isItemDisabled.call(item));
          if (!arraysAreEquivalent(this.selected, selectableItems)) {
            this.selected = [];
          } else {
            this.selected = selectableItems;
          }
          event.preventDefault();
        }
        break;
      case 'Enter':
      case ' ':
        // enter and space are only applicable if a listbox option is clicked
        // an external text input should not trigger multiselect
        if (event.target === this.container) {
          this.#selectItem(item, event.shiftKey);
          event.preventDefault();
        }
        break;
      default:
        break;
    }
    this.host.requestUpdate();
  };

  #selectItem(item: Item, multiSelection = false) {
    if (!this.multi && !this.#options.isItemDisabled.call(item)) {
      this.selected = [item];
    } else if (this.multi && multiSelection) {
      // update starting item for other multiselect
      this.selected = this.#getMultiSelection(item, this.#options.getATFocusedItem());
      this.#shiftStartingItem = item;
    }
  }

  /**
   * updates option selections for multiselectable listbox:
   * toggles all options between active descendant and target
   * @param to item being added
   * @param from item already selected.
   */
  #getMultiSelection(to?: Item, from = this.#options.getATFocusedItem()) {
    if (from && to && this.#options.multi) {
      // whether options will be selected (true) or deselected (false)
      const selecting = this.isSelected(from);

      // select all options between active descendant and target
      // todo: flatten loops here, but be careful of off-by-one errors
      // maybe use the new set methods difference/union
      const [start, end] = [this.items.indexOf(from), this.items.indexOf(to)].sort();
      const itemsInRange = new Set(this.items
          .slice(start, end + 1)
          .filter(item => !this.#options.isItemDisabled.call(item)));
      return this.items
          .filter(item => selecting ? itemsInRange.has(item) : !itemsInRange.has(item));
    } else {
      return this.selected;
    }
  }
}
