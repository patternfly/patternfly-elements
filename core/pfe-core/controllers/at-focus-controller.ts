import type { ReactiveControllerHost } from 'lit';

function isATFocusableItem(el: Element): el is HTMLElement {
  return !!el
      && !el.ariaHidden
      && !el.hasAttribute('hidden');
}

export interface ATFocusControllerOptions<Item extends HTMLElement> {
  getItems(): Item[];
  getItemsContainer?(): HTMLElement | null;
  getOrientation?(): 'horizontal' | 'vertical' | 'grid' | 'undefined';
  /**
   * Function returning the DOM node which is the accessibility controller of item container
   * e.g. the button element in the combobox which is associated with the listbox.
   */
  getControlsElements?(): HTMLElement[];
}

export abstract class ATFocusController<Item extends HTMLElement> {
  #itemsContainerElement: HTMLElement | null = null;

  #atFocusedItemIndex = -1;

  protected _items: Item[] = [];

  /** All items */
  abstract items: Item[];

  /** Index of the Item which currently has assistive technology focus */
  get atFocusedItemIndex() {
    return this.#atFocusedItemIndex;
  }

  set atFocusedItemIndex(index: number) {
    const direction = this.atFocusedItemIndex < index ? -1 : 1;
    const { items } = this;
    let item = items.at(index);
    if (items.length) {
      while (!item || !this.atFocusableItems.includes(item)) {
        if (index <= 0) {
          index = items.indexOf(this.lastATFocusableItem!);
        } else if (index >= items.indexOf(this.lastATFocusableItem!)) {
          index = 0;
        } else {
          index = index + direction;
        }
        item = items.at(index);
      }
    }
    this.#atFocusedItemIndex = index;
  }

  get container(): HTMLElement {
    return this.options.getItemsContainer?.() ?? this.host as unknown as HTMLElement;
  }

  get controlsElements(): HTMLElement[] {
    const elementOrElements = this.options.getControlsElements?.();
    return [elementOrElements].filter(x => !!x).flat();
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
    // this.atFocusedItemIndex ??= this.firstATFocusableItem;
    this.itemsContainerElement ??= this.#initContainer();
  }

  #initContainer() {
    return this.options.getItemsContainer?.()
      ?? (this.host instanceof HTMLElement ? this.host : null);
  }

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
