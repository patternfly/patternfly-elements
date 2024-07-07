import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { RequireProps } from '../core.js';

const isFocusableElement = (el: Element): el is HTMLElement =>
  !!el
  && !el.ariaHidden
  && !el.hasAttribute('hidden');

export interface RovingTabindexControllerOptions<Item extends HTMLElement> {
  /** @deprecated use getHTMLElement */
  getElement?: () => Element | null;
  getHTMLElement?: () => HTMLElement | null;
  getItems?: () => Item[];
  getItemContainer?: () => HTMLElement;
}

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving tabindex][rti]
 *
 * [rti]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export class RovingTabindexController<
  Item extends HTMLElement = HTMLElement
> implements ReactiveController {
  private static hosts = new WeakMap<ReactiveControllerHost, RovingTabindexController>();

  static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: RovingTabindexControllerOptions<Item> & { getItems(): Item[] },
  ) {
    return new RovingTabindexController(host, options);
  }

  /** @internal */
  static elements = new WeakMap<Element, RovingTabindexController>();

  /** active focusable element */
  #activeItem?: Item;

  /** closest ancestor containing items */
  #itemsContainer?: Element;

  /** array of all focusable elements */
  #items: Item[] = [];

  /** flags whether the host's element has gained focus at least once */
  #gainedInitialFocus = false;

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
    return !!this.#focusableItems
      && !!this.activeItem ? this.#focusableItems.indexOf(this.activeItem) : -1;
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

  #options: RequireProps<RovingTabindexControllerOptions<Item>, 'getHTMLElement'>;

  constructor(
    public host: ReactiveControllerHost,
    options?: RovingTabindexControllerOptions<Item>,
  ) {
    this.#options = {
      getHTMLElement: options?.getHTMLElement
        ?? (options?.getElement as (() => HTMLElement | null))
        ?? (() => host instanceof HTMLElement ? host : null),
      getItems: options?.getItems,
      getItemContainer: options?.getItemContainer,
    };
    const instance = RovingTabindexController.hosts.get(host);
    if (instance) {
      return instance as RovingTabindexController<Item>;
    }
    RovingTabindexController.hosts.set(host, this);
    this.host.addController(this);
    this.updateItems();
  }

  hostUpdated() {
    const oldContainer = this.#itemsContainer;
    const newContainer = this.#options.getHTMLElement();
    if (oldContainer !== newContainer) {
      oldContainer?.removeEventListener('keydown', this.#onKeydown);
      RovingTabindexController.elements.delete(oldContainer!);
      this.updateItems();
    }
    if (newContainer) {
      this.#initContainer(newContainer);
    }
  }

  /**
   * removes event listeners from items container
   */
  hostDisconnected() {
    this.#itemsContainer?.removeEventListener('keydown', this.#onKeydown);
    this.#itemsContainer = undefined;
    this.#gainedInitialFocus = false;
  }

  #initContainer(container: Element) {
    RovingTabindexController.elements.set(container, this);
    this.#itemsContainer = container;
    this.#itemsContainer.addEventListener('keydown', this.#onKeydown);
    this.#itemsContainer.addEventListener('focusin', () => {
      this.#gainedInitialFocus = true;
    }, { once: true });
  }

  /**
   * handles keyboard navigation
   * @param event keydown event
   */
  #onKeydown = (event: Event) => {
    if (!(event instanceof KeyboardEvent)
        || event.ctrlKey
        || event.altKey
        || event.metaKey
        || !this.#focusableItems.length
        || !event.composedPath().some(x =>
          this.#focusableItems.includes(x as Item))) {
      return;
    }

    const orientation = this.#options.getHTMLElement()?.getAttribute('aria-orientation');

    const item = this.activeItem;
    let shouldPreventDefault = false;
    const horizontalOnly =
      !item ? false
        : item.tagName === 'SELECT'
        || item.getAttribute('role') === 'spinbutton' || orientation === 'horizontal';
    const verticalOnly = orientation === 'vertical';
    switch (event.key) {
      case 'ArrowLeft':
        if (verticalOnly) {
          return;
        }
        this.setActiveItem(this.prevItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowRight':
        if (verticalOnly) {
          return;
        }

        this.setActiveItem(this.nextItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowUp':
        if (horizontalOnly) {
          return;
        }
        this.setActiveItem(this.prevItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.setActiveItem(this.nextItem);
        shouldPreventDefault = true;
        break;
      case 'Home':
        this.setActiveItem(this.firstItem);
        shouldPreventDefault = true;
        break;
      case 'End':
        this.setActiveItem(this.lastItem);
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
   * Sets the active item and focuses it
   * @param item tabindex item
   */
  setActiveItem(item?: Item): void {
    this.#activeItem = item;
    for (const item of this.#focusableItems) {
      item.tabIndex = this.#activeItem === item ? 0 : -1;
    }
    this.host.requestUpdate();
    if (this.#gainedInitialFocus) {
      this.#activeItem?.focus();
    }
  }

  /**
   * Focuses next focusable item
   * @param items tabindex items
   */
  updateItems(items: Item[] = this.#options.getItems?.() ?? []) {
    this.#items = items;
    const sequence = [
      ...this.#items.slice(this.#itemIndex - 1),
      ...this.#items.slice(0, this.#itemIndex - 1),
    ];
    const first = sequence.find(item => this.#focusableItems.includes(item));
    const [focusableItem] = this.#focusableItems;
    const activeItem = focusableItem ?? first ?? this.firstItem;
    this.setActiveItem(activeItem);
  }

  /**
   * @deprecated use setActiveItem
   * @param item tabindex item
   */
  focusOnItem(item?: Item): void {
    this.setActiveItem(item);
  }

  /**
   * from array of HTML items, and sets active items
   * @deprecated use getItems and getItemContainer option functions
   * @param items tabindex items
   * @param itemsContainer
   */
  initItems(items: Item[], itemsContainer?: Element) {
    const element = itemsContainer
      ?? this.#options?.getItemContainer?.()
      ?? this.#options.getHTMLElement();
    if (element) {
      this.#initContainer(element);
    }
    this.updateItems(items);
  }
}
