import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Implements roving tabindex, as described in
 * [Managing Focus Within Components Using a Roving tabindex
]{@link https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex}
 */

export type FocusableElement = (HTMLFormElement | HTMLAnchorElement | HTMLSelectElement);
export type FocusableElements = Array<FocusableElement>;

export class RovingTabindexController implements ReactiveController {
  /** active focusable element */
  private _activeItem?:FocusableElement;
  /** array of all focusable elements */
  private _items?:FocusableElements = [];

  constructor(public host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  /**
   * active item of array of items
   */
  get activeItem():FocusableElement | undefined {
    return this._activeItem;
  }

  /**
   * finds focusable items from a group of items
   */
  get #focusableItems():FocusableElements {
    const items = this._items;
    const focusable = (item:FocusableElement) => !!item && !item.hasAttribute('disabled') && !item.hidden && !item.ariaHidden && !item.hasAttribute('hidden');
    return items ? items.filter(item=>focusable(item)) : [];
  }

  /**
   * index of active item in array of focusable items
   */
  get #activeIndex():number {
    return !!this.#focusableItems && !!this.activeItem ? this.#focusableItems.indexOf(this.activeItem) : -1;
  }

  /**
   * index of active item in array of items
   */
  get #itemIndex():number {
    return !!this._items && !!this.activeItem ? this._items.indexOf(this.activeItem) : -1;
  }

  /**
   * first item in array of focusable items
   */
  get firstItem():FocusableElement {
    return this.#focusableItems[0];
  }

  /**
   * last item in array of focusable items
   */
  get lastItem():FocusableElement {
    return this.#focusableItems[this.#focusableItems.length - 1];
  }

  /**
   * next item  after active item in array of focusable items
   */
  get nextItem():FocusableElement {
    return this.#activeIndex < this.#focusableItems.length - 1 ? this.#focusableItems[this.#activeIndex + 1] : this.firstItem;
  }

  /**
   * previous item  after active item in array of focusable items
   */
  get prevItem():FocusableElement {
    return this.#activeIndex > 0 ? this.#focusableItems[this.#activeIndex - 1] : this.lastItem;
  }

  /**
   * handles keyboard navigation
   * @param event
   */
  #handleKeys(event:KeyboardEvent):void {
    const item = this.activeItem;
    let flag = false;
    const horizontalOnly = !item ? false : item.tagName === 'SELECT' || item.getAttribute('aria-expanded') === 'true' || item.getAttribute('role') === 'spinbutton';

    if (event.ctrlKey || event.altKey || event.metaKey || this.#focusableItems.length < 1) {
      return;
    }
    switch (event.key) {
      case 'ArrowLeft':
        this.focusOnItem(this.prevItem);
        flag = true;
        break;
      case 'ArrowRight':
        this.focusOnItem(this.nextItem);
        flag = true;
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.prevItem);
        flag = true;
        break;
      case 'ArrowUp':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.nextItem);
        flag = true;
        break;
      case 'Home':
        this.focusOnItem(this.firstItem);
        flag = true;
        break;
      case 'PageUp':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.firstItem);
        flag = true;
        break;
      case 'End':
        this.focusOnItem(this.lastItem);
        flag = true;
        break;
      case 'PageDown':
        if (horizontalOnly) {
          return;
        }
        this.focusOnItem(this.lastItem);
        flag = true;
        break;
      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * sets tabindex of item based on whether or not it is active
   */
  #updateActiveItem(item:FocusableElement):void {
    if (item) {
      if (!!this._activeItem && item !== this._activeItem) {
        this._activeItem.tabIndex = -1;
      }
      item.tabIndex = 0;
      this._activeItem = item;
    }
  }

  /**
   * focuses on an item and sets it as active
   */
  focusOnItem(item:FocusableElement | undefined = undefined):void {
    const focusableItems = this.#focusableItems;
    this.#updateActiveItem(item || focusableItems[0]);
    if (this._activeItem) {
      this._activeItem?.focus();
    }
  }

  /**
   * will move move active item to next focusable item
   */
  updateItems() {
    const items = this._items || [];
    const sequence = [...items.slice(this.#itemIndex), ...items.slice(0, this.#itemIndex)];
    const filter = sequence.filter(item=>this.#focusableItems.includes(item));
    this.focusOnItem(filter[0] || this.#focusableItems[0]);
  }

  /**
   * from array of HTML items, and sets active items
   */
  initItems(items:FocusableElements) {
    this._items = items;

    const [focusableItem,] = this.#focusableItems;
    this._activeItem = focusableItem;
    this.#focusableItems.forEach(item=>item.tabIndex = this._activeItem === item ? 0 : -1);
  }

  async hostConnected() {
    this.host.addEventListener('keydown', this.#handleKeys.bind(this));
  }
}
