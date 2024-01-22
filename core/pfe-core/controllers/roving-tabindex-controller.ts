import type { ReactiveController, ReactiveControllerHost } from 'lit';

const isFocusableElement = (el: Element): el is HTMLElement =>
  !!el &&
  !el.hasAttribute('disabled') &&
  !el.ariaHidden &&
  !el.hasAttribute('hidden');

export interface RovingTabindexControllerOptions<Item extends HTMLElement> {
  getElement?: () => Element;
  getItems?: () => Item[];
  getItemContainer?: () => HTMLElement;
}

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving
 * tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
 */
export class RovingTabindexController<
  Item extends HTMLElement = HTMLElement,
> implements ReactiveController {
  private static hosts = new WeakMap<ReactiveControllerHost, RovingTabindexController>();

  /** active focusable element */
  #activeItem?: Item;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  #caseSensitive = false;

  /** closest ancestor containing items */
  #itemsContainer?: Element;

  /** array of all focusable elements */
  #items: Item[] = [];

  /**
   * finds focusable items from a group of items
   */
  get #focusableItems(): Item[] {
    return this.#items.filter(isFocusableElement);
  }

  /**
   * index of active item in array of focusable items
   */
  get #activeIndex(): number {
    return !!this.#focusableItems && !!this.activeItem ? this.#focusableItems.indexOf(this.activeItem) : -1;
  }

  /**
   * index of active item in array of items
   */
  get #itemIndex(): number {
    return this.activeItem ? this.#items.indexOf(this.activeItem) : -1;
  }

  /**
   * active item of array of items
   */
  get activeItem(): Item | undefined {
    return this.#activeItem;
  }

  /**
   * all items from array
   */
  get items() {
    return this.#items;
  }

  /**
   * all focusable items from array
   */
  get focusableItems() {
    return this.#focusableItems;
  }

  /**
   * first item in array of focusable items
   */
  get firstItem(): Item | undefined {
    return this.#focusableItems[0];
  }

  /**
   * last item in array of focusable items
   */
  get lastItem(): Item | undefined {
    return this.#focusableItems.at(-1);
  }

  /**
   * next item  after active item in array of focusable items
   */
  get nextItem(): Item | undefined {
    return (
      this.#activeIndex >= this.#focusableItems.length - 1 ? this.firstItem
        : this.#focusableItems[this.#activeIndex + 1]
    );
  }

  /**
   * previous item  after active item in array of focusable items
   */
  get prevItem(): Item | undefined {
    return (
      this.#activeIndex > 0 ? this.#focusableItems[this.#activeIndex - 1]
        : this.lastItem
    );
  }

  /**
   * whether filtering is case sensitive
   */
  set caseSensitive(caseSensitive: boolean) {
    if (this.#caseSensitive !== caseSensitive) {
      this.#caseSensitive = caseSensitive;
    }
  }

  get caseSensitive() {
    return this.#caseSensitive;
  }

  #options: {
    getElement(): Element | null;
    getItems?(): Item[];
    getItemContainer?(): HTMLElement;
  };

  constructor(
    public host: ReactiveControllerHost,
    options?: RovingTabindexControllerOptions<Item>,
  ) {
    this.#options = {
      getElement: options?.getElement ?? (() => host instanceof HTMLElement ? host : null),
      getItems: options?.getItems,
      getItemContainer: options?.getItemContainer,
    };
    const instance = RovingTabindexController.hosts.get(host);
    if (instance) {
      return instance as RovingTabindexController<Item>;
    }
    RovingTabindexController.hosts.set(host, this);
    this.host.addController(this);
    if (typeof this.#options?.getItems === 'function') {
      this.initItems(this.#options.getItems(), this.#options.getItemContainer?.());
    }
  }

  #nextMatchingItem(key: string) {
    const items = [...this.#focusableItems];
    const sequence = [...items.slice(this.#itemIndex - 1), ...items.slice(0, this.#itemIndex - 1)];
    const regex = new RegExp(`^${key}`, this.#caseSensitive ? '' : 'i');
    const first = sequence.find(item => {
      const option = item;
      return !option.hasAttribute('disabled') && !option.hidden && option.textContent?.match(regex);
    });
    return first;
  }

  /**
   * handles keyboard navigation
   */
  #onKeydown = (event: Event) => {
    if (!(event instanceof KeyboardEvent) || event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      !this.#focusableItems.length ||
      !event.composedPath().some(x =>
        this.#focusableItems.includes(x as Item))) {
      return;
    }

    const orientation = this.#options.getElement()?.getAttribute('aria-orientation');

    const item = this.activeItem;
    let shouldPreventDefault = false;
    const horizontalOnly =
      !item ? false
        : item.tagName === 'SELECT' ||
        item.getAttribute('role') === 'spinbutton' || orientation === 'horizontal';
    const verticalOnly = orientation === 'vertical';
    switch (event.key) {
      case event.key?.match(/^[\w\d]$/)?.input:
        this.focusOnItem(this.#nextMatchingItem(event.key));
        shouldPreventDefault = true;
        break;
      case 'ArrowLeft':
        if (verticalOnly) {
          return;
        }
        this.focusOnItem(this.prevItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowRight':
        if (verticalOnly) {
          return;
        }
        this.focusOnItem(this.nextItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowUp':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.prevItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.nextItem);
        shouldPreventDefault = true;
        break;
      case 'Home':
        this.focusOnItem(this.firstItem);
        shouldPreventDefault = true;
        break;
      case 'End':
        this.focusOnItem(this.lastItem);
        shouldPreventDefault = true;
        break;
      default:
        break;
    }

    if (shouldPreventDefault) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  /**
   * sets tabindex on each item based on whether or not it is active
   */
  #updateTabindex() {
    for (const item of this.#focusableItems) {
      item.tabIndex = this.#activeItem === item ? 0 : -1;
    }
  }

  /**
   * sets tabindex of item based on whether or not it is active
   */
  updateActiveItem(item?: Item): void {
    if (item && item !== this.#activeItem) {
      if (this.#activeItem) {
        this.#activeItem.tabIndex = -1;
      }
      item.tabIndex = 0;
      this.#activeItem = item;
    }
    this.host.requestUpdate();
  }

  /**
   * focuses on an item and sets it as active
   */
  focusOnItem(item?: Item): void {
    this.updateActiveItem(item || this.firstItem);
    this.#activeItem?.focus();
    this.host.requestUpdate();
  }

  /**
   * Focuses next focusable item
   */
  updateItems(items: Item[] = this.#options.getItems?.() ?? []) {
    const hasActive = document.activeElement && this.#options.getElement()?.contains(document.activeElement);
    const sequence = [...items.slice(this.#itemIndex - 1), ...items.slice(0, this.#itemIndex - 1)];
    const first = sequence.find(item => this.#focusableItems.includes(item));
    this.#items = items ?? [];
    const activeItem = first || this.firstItem;
    if (hasActive) {
      this.focusOnItem(activeItem);
    } else {
      this.updateActiveItem(activeItem);
    }
    this.#updateTabindex();
  }

  /**
   * from array of HTML items, and sets active items
   * @deprecated: use getItems and getItemContainer option functions
   */
  initItems(items: Item[], itemsContainer?: Element) {
    this.#items = items ?? [];
    const focusableItems = this.#focusableItems;
    const [focusableItem] = focusableItems;
    this.#activeItem = focusableItem;
    this.#updateTabindex();

    itemsContainer ??= this.#options.getElement() ?? undefined;

    /**
     * removes listener on previous contained and applies it to new container
     */
    if (!this.#itemsContainer || itemsContainer !== this.#itemsContainer) {
      this.#itemsContainer?.removeEventListener('keydown', this.#onKeydown);
      this.#itemsContainer = itemsContainer;
      this.hostConnected();
    }
  }

  /**
   * adds event listeners to items container
   */
  hostConnected() {
    this.#itemsContainer?.addEventListener('keydown', this.#onKeydown);
  }

  /**
   * removes event listeners from items container
   */
  hostDisconnected() {
    this.#itemsContainer?.removeEventListener('keydown', this.#onKeydown);
  }
}
