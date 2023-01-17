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
export class RovingTabindexController implements ReactiveController {
  /** active focusable element */
  #activeItem?: HTMLElement;

  /** array of all focusable elements */
  #items: HTMLElement[] = [];

  /**
   * finds focusable items from a group of items
   */
  get #focusableItems(): HTMLElement[] {
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
  get activeItem(): HTMLElement | undefined {
    return this.#activeItem;
  }

  /**
   * first item in array of focusable items
   */
  get firstItem(): HTMLElement | undefined {
    return this.#focusableItems[0];
  }

  /**
   * last item in array of focusable items
   */
  get lastItem(): HTMLElement | undefined {
    return this.#focusableItems.at(-1);
  }

  /**
   * next item  after active item in array of focusable items
   */
  get nextItem(): HTMLElement | undefined {
    return (
        this.#activeIndex < this.#focusableItems.length - 1 ? this.#focusableItems[this.#activeIndex + 1]
      : this.firstItem
    );
  }

  /**
   * previous item  after active item in array of focusable items
   */
  get prevItem(): HTMLElement | undefined {
    return (
        this.#activeIndex > 0 ? this.#focusableItems[this.#activeIndex - 1]
      : this.lastItem
    );
  }

  constructor(public host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  /**
   * handles keyboard navigation
   */
  #onKeydown(event: KeyboardEvent):void {
    if (event.ctrlKey || event.altKey || event.metaKey || this.#focusableItems.length < 1) {
      return;
    }

    const item = this.activeItem;
    let shouldPreventDefault = false;
    const horizontalOnly =
        !item ? false
      : item.tagName === 'SELECT' ||
        item.getAttribute('aria-expanded') === 'true' ||
        item.getAttribute('role') === 'spinbutton';

    switch (event.key) {
      case 'ArrowLeft':
        this.focusOnItem(this.prevItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowRight':
        this.focusOnItem(this.nextItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.prevItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowUp':
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
      case 'PageUp':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.firstItem);
        shouldPreventDefault = true;
        break;
      case 'End':
        this.focusOnItem(this.lastItem);
        shouldPreventDefault = true;
        break;
      case 'PageDown':
        if (horizontalOnly) {
          return;
        }
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
  }

  /**
   * sets tabindex of item based on whether or not it is active
   */
  #updateActiveItem(item?: HTMLElement):void {
    if (item) {
      if (!!this.#activeItem && item !== this.#activeItem) {
        this.#activeItem.tabIndex = -1;
      }
      item.tabIndex = 0;
      this.#activeItem = item;
    }
  }

  /**
   * focuses on an item and sets it as active
   */
  focusOnItem(item?: HTMLElement):void {
    this.#updateActiveItem(item || this.firstItem);
    this.#activeItem?.focus();
  }

  /**
   * Focuses next focusable item
   */
  updateItems(items: HTMLElement[]) {
    const sequence = [...items.slice(this.#itemIndex), ...items.slice(0, this.#itemIndex)];
    const first = sequence.find(item => this.#focusableItems.includes(item));
    this.focusOnItem(first || this.firstItem);
  }

  /**
   * from array of HTML items, and sets active items
   */
  initItems(items: HTMLElement[]) {
    this.#items = items ?? [];
    const focusableItems = this.#focusableItems;
    const [focusableItem] = focusableItems;
    this.#activeItem = focusableItem;
    for (const item of focusableItems) {
      item.tabIndex = this.#activeItem === item ? 0 : -1;
    }
  }

  hostConnected() {
    this.host.addEventListener('keydown', this.#onKeydown.bind(this));
  }
}
