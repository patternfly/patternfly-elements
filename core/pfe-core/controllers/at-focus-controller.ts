import type { ReactiveControllerHost } from 'lit';

function isATFocusableItem(el: Element): el is HTMLElement {
  return !!el
      && !el.ariaHidden
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
    const direction = index > previousIndex ? 1 : -1;
    const { items, atFocusableItems, lastATFocusableItem } = this;
    const itemsIndexOfLastATFocusableItem = items.indexOf(lastATFocusableItem!);
    let itemToGainFocus = items.at(index);
    let itemToGainFocusIsFocusable = atFocusableItems.includes(itemToGainFocus!);
    if (items.length) {
      while (!itemToGainFocus || !itemToGainFocusIsFocusable) {
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
    }
    this.#atFocusedItemIndex = index;
  }

  /** Elements which control the items container e.g. a combobox input */
  get controlsElements(): HTMLElement[] {
    return this.options.getControlsElements?.() ?? [];
  }

  /** All items which are able to receive assistive technology focus */
  get atFocusableItems(): Item[] {
    return this._items.filter(isATFocusableItem);
  }

  /** First item which is able to receive assistive technology focus */
  get firstATFocusableItem(): Item | null {
    return this.atFocusableItems.at(0) ?? null;
  }

  /** Last item which is able to receive assistive technology focus */
  get lastATFocusableItem(): Item | null {
    return this.atFocusableItems.at(-1) ?? null;
  }

  /** Focusable item following the item which currently has assistive technology focus */
  get nextATFocusableItem(): Item | null {
    const index = this.atFocusedItemIndex;
    const outOfBounds = index >= this.atFocusableItems.length - 1;
    return outOfBounds ? this.firstATFocusableItem
                       : this.atFocusableItems.at(index + 1) ?? null;
  }

  /** Focusable item preceding the item which currently has assistive technology focus */
  get previousATFocusableItem(): Item | null {
    const index = this.atFocusedItemIndex;
    const outOfBounds = index > 0;
    return outOfBounds ? this.atFocusableItems.at(index - 1) ?? null
                       : this.lastATFocusableItem;
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
      ?? (this.host instanceof HTMLElement ? this.host : null);
  }

  /**
   * Implement this predicate to filter out keyboard events
   * which should not result in a focus change. If this predicate returns true, then
   * a focus change should occur.
   */
  protected abstract isRelevantKeyboardEvent(event: Event): event is KeyboardEvent;

  /**
   * DO NOT OVERRIDE
   * @param event keyboard event
   */
  protected onKeydown = (event: Event): void => {
    if (this.isRelevantKeyboardEvent(event)) {
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
          this.atFocusedItemIndex = 0;
          event.stopPropagation();
          event.preventDefault();
          break;
        case 'End':
          this.atFocusedItemIndex = this.items.length;
          event.stopPropagation();
          event.preventDefault();
          break;
        default:
          break;
      }
      this.host.requestUpdate();
    }
  };
}
