import type { ReactiveController, ReactiveControllerHost } from 'lit';

const isFocusableElement = (el: Element): el is HTMLElement =>
  !!el &&
  !el.hasAttribute('disabled') &&
  !el.ariaHidden &&
  !el.hasAttribute('hidden');

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving
 * tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
 */
export class RovingTabindexController<
  ItemType extends HTMLElement = HTMLElement,
> implements ReactiveController {
  /** active focusable element */
  #activeItem?: ItemType;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  #caseSensitive = false;

  /** closest ancestor containing items */
  #itemsContainer?: HTMLElement;

  /** array of all focusable elements */
  #items: ItemType[] = [];

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

  /**
   * finds focusable items from a group of items
   */
  get #focusableItems(): ItemType[] {
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
  get activeItem(): ItemType | undefined {
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
  get firstItem(): ItemType | undefined {
    return this.#focusableItems[0];
  }

  /**
   * last item in array of focusable items
   */
  get lastItem(): ItemType | undefined {
    return this.#focusableItems.at(-1);
  }

  /**
   * next item  after active item in array of focusable items
   */
  get nextItem(): ItemType | undefined {
    return (
      this.#activeIndex >= this.#focusableItems.length - 1 ? this.firstItem
        : this.#focusableItems[this.#activeIndex + 1]
    );
  }

  /**
   * previous item  after active item in array of focusable items
   */
  get prevItem(): ItemType | undefined {
    return (
      this.#activeIndex > 0 ? this.#focusableItems[this.#activeIndex - 1]
        : this.lastItem
    );
  }

  constructor(public host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  #nextMatchingItem(key: string) {
    const items = [...this.#focusableItems];
    const sequence = [...items.slice(this.#itemIndex - 1), ...items.slice(0, this.#itemIndex - 1)];
    const regex = new RegExp(`^${key}`, this.#caseSensitive ? '' : 'i');
    const first = sequence.find(item => {
      const option = item as HTMLElement;
      return !option.hasAttribute('disabled') && !option.hidden && option.textContent?.match(regex);
    });
    return first || undefined;
  }

  /**
   * handles keyboard navigation
   */
  #onKeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      !this.#focusableItems.length ||
      !event.composedPath().some(x =>
        this.#focusableItems.includes(x as ItemType))) {
      return;
    }

    const orientation = this.host.getAttribute('aria-orientation');

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
  updateActiveItem(item?: ItemType): void {
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
  focusOnItem(item?: ItemType): void {
    this.updateActiveItem(item || this.firstItem);
    this.#activeItem?.focus();
    this.host.requestUpdate();
  }

  /**
   * Focuses next focusable item
   */
  updateItems(items: ItemType[]) {
    const hasActive = document.activeElement && this.host.contains(document.activeElement);
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
   */
  initItems(items: ItemType[], itemsContainer: HTMLElement = this.host) {
    this.#items = items ?? [];
    const focusableItems = this.#focusableItems;
    const [focusableItem] = focusableItems;
    this.#activeItem = focusableItem;
    this.#updateTabindex();
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
