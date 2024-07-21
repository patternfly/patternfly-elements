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
}

export abstract class ATFocusController<Item extends HTMLElement> {
  // funny name to prevent transpiled private access errors
  #optionz: ATFocusControllerOptions<Item>;

  #itemsContainerElement: HTMLElement | null = null;

  #atFocusedItem: Item | null = null;

  #items: Item[] = [];

  get #atFocusedItemIndex() {
    return this.atFocusableItems.indexOf(this.#atFocusedItem!);
  }

  /** All items */
  get items(): Item[] {
    return this.#items;
  }

  set items(items: Item[]) {
    this.#items = items;
  }

  /** All items which are able to receive assistive technology focus */
  get atFocusableItems(): Item[] {
    return this.#items.filter(isATFocusableItem);
  }

  /** Item which currently has assistive technology focus */
  get atFocusedItem(): Item | null {
    return this.#atFocusedItem;
  }

  set atFocusedItem(item: Item | null) {
    this.#atFocusedItem = item;
    this.host.requestUpdate();
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
    const index = this.#atFocusedItemIndex;
    const outOfBounds = index >= this.atFocusableItems.length - 1;
    return outOfBounds ? this.firstATFocusableItem
                       : this.atFocusableItems.at(index + 1) ?? null;
  }

  /** Focusable item preceding the item which currently has assistive technology focus */
  get previousATFocusableItem(): Item | null {
    const index = this.#atFocusedItemIndex;
    const outOfBounds = index > 0;
    return outOfBounds ? this.atFocusableItems.at(index - 1) ?? null
                       : this.lastATFocusableItem;
  }

  get itemsContainerElement() {
    return this.#itemsContainerElement ?? null;
  }

  set itemsContainerElement(container: HTMLElement | null) {
    if (container !== this.#itemsContainerElement) {
      this.#itemsContainerElement?.removeEventListener('keydown', this.#onKeydown);
      this.#itemsContainerElement = container;
      this.#itemsContainerElement?.addEventListener('keydown', this.#onKeydown);
      this.items = this.#optionz.getItems();
      this.host.requestUpdate();
    }
  }

  constructor(public host: ReactiveControllerHost, options: ATFocusControllerOptions<Item>) {
    this.#optionz = options;
    if (host instanceof HTMLElement && host.isConnected) {
      this.hostConnected();
    }
  }

  hostConnected(): void {
    this.hostUpdate();
  }

  hostUpdate(): void {
    this.atFocusedItem ??= this.firstATFocusableItem;
    this.itemsContainerElement
      ??= this.#optionz.getItemsContainer?.()
      ?? (this.host instanceof HTMLElement ? this.host : null);
  }

  protected abstract isRelevantKeyboardEvent(event: Event): event is KeyboardEvent;

  /** DO NOT OVERRIDE */
  protected onKeydown(event: Event): void {
    this.#onKeydown(event);
  }

  #onKeydown = (event: Event) => {
    if (this.isRelevantKeyboardEvent(event)) {
      const orientation = this.#optionz.getOrientation?.() ?? this
          .#itemsContainerElement
          ?.getAttribute('aria-orientation') as
            'horizontal' | 'vertical' | 'grid' | 'undefined';

      const item = this.atFocusedItem;

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
          this.atFocusedItem = this.previousATFocusableItem ?? null;
          event.stopPropagation();
          event.preventDefault();
          break;
        case 'ArrowRight':
          if (verticalOnly) {
            return;
          }
          this.atFocusedItem = this.nextATFocusableItem ?? null;
          event.stopPropagation();
          event.preventDefault();
          break;
        case 'ArrowUp':
          if (horizontalOnly) {
            return;
          }
          this.atFocusedItem = this.previousATFocusableItem ?? null;
          event.stopPropagation();
          event.preventDefault();
          break;
        case 'ArrowDown':
          if (horizontalOnly) {
            return;
          }
          this.atFocusedItem = this.nextATFocusableItem ?? null;
          event.stopPropagation();
          event.preventDefault();
          break;
        case 'Home':
          this.atFocusedItem = this.firstATFocusableItem ?? null;
          event.stopPropagation();
          event.preventDefault();
          break;
        case 'End':
          this.atFocusedItem = this.lastATFocusableItem ?? null;
          event.stopPropagation();
          event.preventDefault();
          break;
        default:
          break;
      }
    }
  };
}
