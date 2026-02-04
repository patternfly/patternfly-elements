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

  set atFocusedItemIndex(index: number) {
    const previousIndex = this.#atFocusedItemIndex;
    const { items, atFocusableItems } = this;
    // - Home (index=0): always search forward to find first focusable item
    // - End (index=last): always search backward to find last focusable item
    // - Other cases: use comparison to determine direction
    const direction = index === 0 ? 1
    : index >= items.length - 1 ? -1
    : index > previousIndex ? 1 : -1;
    const itemsIndexOfLastATFocusableItem = items.indexOf(this.atFocusableItems.at(-1)!);
    let itemToGainFocus = items.at(index);
    let itemToGainFocusIsFocusable = atFocusableItems.includes(itemToGainFocus!);
    if (atFocusableItems.length) {
      let count = 0;
      while (!itemToGainFocus || !itemToGainFocusIsFocusable && count++ <= 1000) {
        if (index < 0) {
          index = itemsIndexOfLastATFocusableItem;
        } else if (index >= itemsIndexOfLastATFocusableItem) {
          index = 0;
        } else {
          index = index + direction;
        }
        itemToGainFocus = items.at(index);
        itemToGainFocusIsFocusable = atFocusableItems.includes(itemToGainFocus!);
      }
      if (count >= 1000) {
        throw new Error('Could not atFocusedItemIndex');
      }
    }
    this.#atFocusedItemIndex = index;
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
      case 'Home':
        if (!(event.target instanceof HTMLElement
            && (event.target.hasAttribute('aria-activedescendant')
             || event.target.ariaActiveDescendantElement))) {
          this.atFocusedItemIndex = 0;
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      case 'End':
        if (!(event.target instanceof HTMLElement
            && (event.target.hasAttribute('aria-activedescendant')
             || event.target.ariaActiveDescendantElement))) {
          this.atFocusedItemIndex = this.items.length - 1;
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      default:
        break;
    }
    this.host.requestUpdate();
  };
}
