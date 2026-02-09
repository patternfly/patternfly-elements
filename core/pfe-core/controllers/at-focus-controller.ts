import { isServer, type ReactiveControllerHost } from 'lit';
import { bound } from '../decorators/bound.js';

function isATFocusableItem(el: Element): el is HTMLElement {
  return !!el
      && el.ariaHidden !== 'true'
      && !el.hasAttribute('inert')
      && !el.hasAttribute('hidden');
}

export interface ATFocusControllerOptions<Item extends HTMLElement> {
  /**
   * Callback to return the list of items
   */
  getItems(): Item[];
  /**
   * Callback to return the listbox container element
   */
  getItemsContainer?(): HTMLElement | null;
  /**
   * Callback to return the direction of navigation in the list box.
   */
  getOrientation?(): 'horizontal' | 'vertical' | 'both' | 'undefined';
  /**
   * Function returning the DOM nodes which are accessibility controllers of item container
   * e.g. the button toggle and combobox input which control a listbox.
   */
  getControlsElements?(): HTMLElement[];
}

export abstract class ATFocusController<Item extends HTMLElement> {
  #itemsContainerElement: HTMLElement | null = null;

  #atFocusedItemIndex = -1;

  protected _items: Item[] = [];

  /** All items */
  abstract items: Item[];

  /**
   * Index of the Item which currently has assistive technology focus
   * Set this to change focus. Setting to an out-of-bounds value will
   * wrap around to the other side of the list.
   */
  get atFocusedItemIndex() {
    return this.#atFocusedItemIndex;
  }

  set atFocusedItemIndex(requestedIndex: number) {
    const { items, atFocusableItems } = this;

    if (!atFocusableItems.length) {
      this.#atFocusedItemIndex = requestedIndex;
      return;
    }

    // Fast path: requested item is already focusable
    if (requestedIndex >= 0
      && requestedIndex < items.length
      && atFocusableItems.includes(items[requestedIndex])) {
      this.#atFocusedItemIndex = requestedIndex;
      return;
    }

    const lastFocusableIndex = items.indexOf(atFocusableItems.at(-1)!);

    // Navigated before start → wrap to last focusable
    if (requestedIndex < 0) {
      this.#atFocusedItemIndex = lastFocusableIndex;
      return;
    }

    const firstFocusableIndex = items.indexOf(atFocusableItems[0]);

    // Navigated past end or past last focusable → wrap to first focusable
    if (requestedIndex >= items.length
      || requestedIndex > lastFocusableIndex) {
      this.#atFocusedItemIndex = firstFocusableIndex;
      return;
    }

    // Before first focusable (e.g. disabled placeholder at index 0).
    // ArrowUp from first focusable → wrap to last; otherwise snap to first.
    if (requestedIndex < firstFocusableIndex) {
      this.#atFocusedItemIndex =
          this.#atFocusedItemIndex === firstFocusableIndex ? lastFocusableIndex
        : firstFocusableIndex;
      return;
    }

    // Mid-list non-focusable item: find nearest focusable in the navigation direction
    this.#atFocusedItemIndex =
      items.indexOf(this.#getNextFocusableItem(requestedIndex));
  }

  /** Elements which control the items container e.g. a combobox input */
  protected get controlsElements(): HTMLElement[] {
    return this.options.getControlsElements?.() ?? [];
  }

  /** All items which are able to receive assistive technology focus */
  get atFocusableItems(): Item[] {
    return this._items.filter(isATFocusableItem);
  }

  /** The element containing focusable items, e.g. a listbox */
  get itemsContainerElement() {
    return this.#itemsContainerElement ?? null;
  }

  set itemsContainerElement(container: HTMLElement | null) {
    if (container !== this.#itemsContainerElement) {
      this.#itemsContainerElement?.removeEventListener('keydown', this.onKeydown);
      this.#itemsContainerElement = container;
      this.#itemsContainerElement?.addEventListener('keydown', this.onKeydown);
      this.host.requestUpdate();
    }
  }

  constructor(
    public host: ReactiveControllerHost,
    protected options: ATFocusControllerOptions<Item>,
  ) {
    this.host.updateComplete.then(() => this.initItems());
  }

  /**
   * Initialize the items and itemsContainerElement fields
   */
  protected initItems(): void {
    this.items = this.options.getItems();
    this.itemsContainerElement ??= this.#initContainer();
  }

  /**
   * Refresh items from the getItems option. Call this when the list of items
   * has changed (e.g. when a parent controller sets items).
   */
  refreshItems(): void {
    this.initItems();
  }

  hostConnected(): void {
    this.hostUpdate();
  }

  hostDisconnected(): void {
    this.#itemsContainerElement?.removeEventListener('keydown', this.onKeydown);
  }

  hostUpdate(): void {
    this.itemsContainerElement ??= this.#initContainer();
  }

  #initContainer() {
    return this.options.getItemsContainer?.()
      ?? (!isServer && this.host instanceof HTMLElement ? this.host : null);
  }

  /**
   * When setting atFocusedItemIndex, and the current focus is on a
   * mid-list non-focusable item: find nearest focusable in the navigation direction.
   * disabled items will be skipped, and out of bounds items will be wrapped
   *
   * @param requestedIndex the desired index
   */
  #getNextFocusableItem(requestedIndex: number) {
    const { items, atFocusableItems } = this;
    if (requestedIndex > this.#atFocusedItemIndex) {
      return atFocusableItems.find(item => items.indexOf(item) > requestedIndex)!;
    } else {
      return atFocusableItems.findLast(item => items.indexOf(item) < requestedIndex)!;
    }
  }

  /**
   * Override and conditionally call `super.onKeydown` to filter out keyboard events
   * which should not result in a focus change. Ensure that subclass' method is bound
   * @param event keyboard event
   */
  protected onKeydown(event: KeyboardEvent): void {
    const orientation = this.options.getOrientation?.() ?? this
        .#itemsContainerElement
        ?.getAttribute('aria-orientation') as
            'horizontal' | 'vertical' | 'grid' | 'undefined';

    const item = this._items.at(this.atFocusedItemIndex);

    const horizontalOnly =
        orientation === 'horizontal'
        || item?.tagName === 'SELECT'
        || item?.getAttribute('role') === 'spinbutton';

    const verticalOnly = orientation === 'vertical';

    switch (event.key) {
      case 'ArrowLeft':
        if (verticalOnly) {
          return;
        }
        this.atFocusedItemIndex--;
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (verticalOnly) {
          return;
        }
        this.atFocusedItemIndex++;
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (horizontalOnly) {
          return;
        }
        this.atFocusedItemIndex--;
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.atFocusedItemIndex++;
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Home': {
        if (!(event.target instanceof HTMLElement
            && (event.target.hasAttribute('aria-activedescendant')
             || event.target.ariaActiveDescendantElement))) {
          // Use first focusable index so the setter doesn't see 0 (reserved for Up-from-first wrap).
          const first = this.atFocusableItems.at(0);
          this.atFocusedItemIndex = first != null ? this.items.indexOf(first) : 0;
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      }
      case 'End': {
        if (!(event.target instanceof HTMLElement
            && (event.target.hasAttribute('aria-activedescendant')
             || event.target.ariaActiveDescendantElement))) {
          // Use last focusable index for consistency with lists that have non-focusable items.
          const last = this.atFocusableItems.at(-1);
          this.atFocusedItemIndex = last != null ? this.items.indexOf(last) : this.items.length - 1;
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      }
      default:
        break;
    }
    this.host.requestUpdate();
  };
}
