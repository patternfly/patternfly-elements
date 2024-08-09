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
   * 1. it's `disabled` DOM property is `true`
   * 1. it has the `aria-disabled="true"` attribute
   * 2. it has the `disabled` attribute present
   * 3. it matches the `:disabled` pseudo selector
   */
  isItemDisabled?(this: Item): boolean;
  /**
   * Predicate which determines if a given element is in fact an item
   * instead of e.g a presentational divider. By default, elements must meet the following criteria
   * 1. element a child of a listbox role,
   * 2. element does not have role="presentation"
   * 2. element is not an `<hr>`
   * **NB**: When overriding, you must avoid outside references. This predicate must
   * only consider the element itself, without reference to the host element's items array.
   * @example ```js
   *          isItem: (item) => item instanceof MyCustomItem
   *          ```
   */
  isItem?(item: EventTarget | null): item is Item;
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
 * @param item possible disabled item
 * @package do not import this outside of `@patternfly/pfe-core`, it is subject to change at any time
 */
export function isItem<Item extends HTMLElement>(item: EventTarget | null): item is Item {
  return item instanceof Element
    && item?.parentElement?.role === 'listbox'
    && item?.role !== 'presentation'
    && item?.localName !== 'hr';
}

/**
 * This is a fib. aria-disabled might not be present on an element that uses internals,
 * and the `disabled` attribute may not accurately represent the disabled state.
 * short of patching the `attachInternals` constructor, it may not be possible at
 * runtime to know with certainty that an arbitrary custom element is disabled or not.
 * @param item possibly disabled item
 * @package do not import this outside of `@patternfly/pfe-core`, it is subject to change at any time
 */
export function isItemDisabled<Item extends HTMLElement>(this: Item): boolean {
  if ('disabled' in this && typeof this.disabled === 'boolean') {
    return this.disabled;
  } else {
    return this.getAttribute('aria-disabled') === 'true'
        || this.hasAttribute('disabled')
        || this.matches(':disabled');
  }
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

  #options: RequireProps<ListboxControllerOptions<Item>,
    | 'setItemSelected'
    | 'isItemDisabled'
    | 'isItem'
  >;

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
    if (!arraysAreEquivalent(selected, Array.from(this.#selectedItems))) {
      this.#selectedItems = new Set(selected);
      for (const item of this.items) {
        this.#options.setItemSelected.call(item, this.#selectedItems.has(item));
      }
      this.host.requestUpdate();
    }
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
    this.#options = { setItemSelected, isItemDisabled, isItem, ...options };
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

  /**
   * In the case where aria IDL attributes are not supported,
   * we need to correlate the item in the event path (i.e. the shadow dom clone)
   * with the item in listbox controller's root (i.e. the hidden light dom original)
   * XXX: as long as there is no DOM preceeding the shadow root clones, this will work
   * @param event click or keyboard event
   */
  #getItemFromEvent(event: Event): Item | null {
    // NOTE(bennypowers): I am aware that this function *sucks*
    // you're more than welcome to improve it.
    // make sure there are unit tests first
    const path = event.composedPath();
    const tabindexed = this.items.some(x => x.hasAttribute('tabindex'));
    if (tabindexed) {
      const item = path.find(this.#options.isItem);
      if (item) {
        return item;
      }
    }
    const element = event.target as HTMLElement;
    const root = element.getRootNode() as ShadowRoot | Document;
    const shadowRootListboxId = element?.getAttribute('aria-controls');
    const shadowRootListboxElement =
      shadowRootListboxId && root.getElementById(shadowRootListboxId ?? '');
    const shadowRootHasActiveDescendantElement =
      root.querySelector(`[aria-controls="${shadowRootListboxId}"][aria-activedescendant]`);
    const adId = shadowRootHasActiveDescendantElement?.getAttribute('aria-activedescendant');
    const shadowRootItem = adId && root.getElementById(adId ?? '') as Item | null;

    if (shadowRootItem && shadowRootListboxElement) {
      if (this.items.includes(shadowRootItem)) {
        return shadowRootItem;
      } else {
        const index =
          Array.from(shadowRootListboxElement?.children ?? [])
              .filter(this.#options.isItem)
              .indexOf(shadowRootItem);
        return this.#items[index];
      }
    }

    const itemFromEventContainer =
      shadowRootListboxId ? shadowRootListboxElement
    : path.find(x =>
      x instanceof HTMLElement && x.role === 'listbox') as HTMLElement;

    if (itemFromEventContainer) {
      const possiblyShadowRootContainerItems = Array.from(itemFromEventContainer.children)
          .filter(this.#options.isItem);

      const index = possiblyShadowRootContainerItems
          .findIndex(node => path.includes(node));

      if (index >= 0) {
        return this.items[index] ?? null;
      }
    }

    return null;
  }

  /**
   * handles clicking on a listbox option:
   * which selects an item by default
   * or toggles selection if multiselectable
   * @param event click event
   */
  #onClick = (event: MouseEvent) => {
    const target = this.#getItemFromEvent(event);
    this.#shiftStartingItem ??= target;
    if (target && !this.#options.isItemDisabled.call(target)) {
      // Case: single select?
      //       just reset the selected list.
      if (!this.multi) {
        // select target and deselect all other options
        this.selected = [target];
      // Case: multi select, but no shift key
      //       toggle target, keep all other previously selected
      } else if (!event.shiftKey) {
        this.selected = this.items.filter(item =>
          this.#selectedItems.has(item) ? item !== target : item === target);
      // Case: multi select, with shift key
      //       find all items between previously selected and target,
      //       and select them (if reference item is selected) or deselect them (if reference item is deselected)
      //       Do not wrap around from end to start, rather, only select withing the range of 0-end
      } else {
        const startingItem = this.#shiftStartingItem!;
        // whether options will be selected (true) or deselected (false)
        const selecting = this.#selectedItems.has(startingItem);
        const [start, end] = [this.items.indexOf(startingItem), this.items.indexOf(target)].sort();
        // de/select all options between active descendant and target
        this.selected = this.items.filter((item, i) => {
          if (i >= start && i <= end) {
            return selecting;
          } else {
            return this.#selectedItems.has(item);
          }
        });
      }
    }
    this.#shiftStartingItem = target;
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
    const item = this.#getItemFromEvent(event) ?? this.#options.getATFocusedItem();

    if (this.disabled || !item || event.altKey || event.metaKey) {
      return;
    }

    // need to set for keyboard support of multiselect
    if (event.key === 'Shift' && this.multi) {
      this.#shiftStartingItem ??= this.#options.getATFocusedItem() ?? null;
    }

    switch (event.key) {
      // ctrl+A de/selects all options
      case 'a':
      case 'A':
        if (event.ctrlKey
            && (event.target === this.container
                || this.#options.isItem(event.target))) {
          const selectableItems = this.items.filter(item =>
            !this.#options.isItemDisabled.call(item));
          if (arraysAreEquivalent(this.selected, selectableItems)) {
            this.selected = [];
          } else {
            this.selected = selectableItems;
          }
          event.preventDefault();
        }
        break;
      case 'Enter':
        // enter and space are only applicable if a listbox option is clicked
        // an external text input should not trigger multiselect
        if (this.#options.isItem(event.target)
            || (event.target as HTMLElement).getAttribute?.('aria-controls') === this.container.id
            && !event.shiftKey
        ) {
          this.#selectItem(item, event.shiftKey);
          event.preventDefault();
        }
        break;
      case 'ArrowUp':
        if (this.multi && event.shiftKey && this.#options.isItem(event.target)) {
          const item = event.target;
          this.selected = this.items.filter((x, i) =>
            this.#selectedItems.has(x)
            || i === this.items.indexOf(item) - 1)
              .filter(x => !this.#options.isItemDisabled.call(x));
        }
        break;
      case 'ArrowDown':
        if (this.multi && event.shiftKey && this.#options.isItem(event.target)) {
          const item = event.target;
          this.selected = this.items.filter((x, i) =>
            this.#selectedItems.has(x)
            || i === this.items.indexOf(item) + 1)
              .filter(x => !this.#options.isItemDisabled.call(x));
        }
        break;
      case ' ':
        // enter and space are only applicable if a listbox option is clicked
        // an external text input should not trigger multiselect
        if (event.target === this.container || this.#options.isItem(event.target)) {
          this.#selectItem(item, event.shiftKey);
          event.preventDefault();
        }
        break;
      default:
        break;
    }
    this.host.requestUpdate();
  };

  #selectItem(item: Item, shiftDown = false) {
    if (this.#options.isItemDisabled.call(item)) {
      return;
    } else if (this.multi && shiftDown) {
      // update starting item for other multiselect
      this.selected = [...this.selected, item];
    } else if (this.multi && this.#selectedItems.has(item)) {
      this.selected = this.selected.filter(x => x !== item);
    } else if (this.multi) {
      this.selected = this.selected.concat(item);
    } else {
      this.selected = [item];
    }
  }
}
