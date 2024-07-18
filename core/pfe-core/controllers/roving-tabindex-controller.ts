import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { ListboxAccessibilityController } from './listbox-controller.js';

const isFocusableElement = (el: Element): el is HTMLElement =>
  !!el
  && !el.ariaHidden
  && !el.hasAttribute('hidden');

export interface RovingTabindexControllerOptions<Item extends HTMLElement> {
  getItems: () => Item[];
  getItemsContainer?: () => HTMLElement | null;
  getOrientation?(): 'horizontal' | 'vertical' | 'undefined';
}

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving tabindex][rti]
 *
 * [rti]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export class RovingTabindexController<
  Item extends HTMLElement = HTMLElement
> implements ReactiveController, ListboxAccessibilityController<Item> {
  private static hosts = new WeakMap<ReactiveControllerHost, RovingTabindexController>();

  private static elements: WeakMap<Element, RovingTabindexController<HTMLElement>> =
    new WeakMap<Element, RovingTabindexController>();

  static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: RovingTabindexControllerOptions<Item>,
  ): RovingTabindexController<Item> {
    return new RovingTabindexController(host, options);
  }

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
  get items(): Item[] {
    return this.#items;
  }

  /**
   * all focusable items from array
   */
  get focusableItems(): Item[] {
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

  #options: Required<RovingTabindexControllerOptions<Item>>;

  private constructor(
    public host: ReactiveControllerHost,
    options: RovingTabindexControllerOptions<Item>,
  ) {
    this.#options = options as Required<RovingTabindexControllerOptions<Item>>;
    this.#options.getItemsContainer ??= () => host instanceof HTMLElement ? host : null;
    this.#options.getOrientation ??= () =>
      this.#options.getItemsContainer()?.getAttribute('aria-orientation') as
        'horizontal' | 'vertical' | 'undefined';
    const instance = RovingTabindexController.hosts.get(host);
    if (instance) {
      return instance as RovingTabindexController<Item>;
    }
    RovingTabindexController.hosts.set(host, this);
    this.host.addController(this);
    this.updateItems();
  }

  hostUpdated(): void {
    const oldContainer = this.#itemsContainer;
    const newContainer = this.#options.getItemsContainer();
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
  hostDisconnected(): void {
    this.#itemsContainer?.removeEventListener('keydown', this.#onKeydown);
    this.#itemsContainer = undefined;
    this.#gainedInitialFocus = false;
  }

  /**
   * Sets the focus of assistive technology to the item
   * In the case of Roving Tab Index, also sets the DOM Focus
   * @param item item
   */
  public setATFocus(item?: Item): void {
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
  public updateItems(items: Item[] = this.#options.getItems?.() ?? []): void {
    this.#items = items;
    const sequence = [
      ...this.#items.slice(this.#itemIndex - 1),
      ...this.#items.slice(0, this.#itemIndex - 1),
    ];
    const first = sequence.find(item => this.#focusableItems.includes(item));
    const [focusableItem] = this.#focusableItems;
    const activeItem = focusableItem ?? first ?? this.firstItem;
    this.setATFocus(activeItem);
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

    const orientation = this.#options.getOrientation?.();
    const verticalOnly = orientation === 'vertical';
    const item = this.activeItem;
    const horizontalOnly =
         orientation === 'horizontal'
      || item?.localName === 'select'
      || item?.getAttribute('role') === 'spinbutton';

    switch (event.key) {
      case 'ArrowLeft':
        if (verticalOnly) {
          return;
        }
        this.setATFocus(this.prevItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (verticalOnly) {
          return;
        }
        this.setATFocus(this.nextItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (horizontalOnly) {
          return;
        }
        this.setATFocus(this.prevItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.setATFocus(this.nextItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Home':
        this.setATFocus(this.firstItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'End':
        this.setATFocus(this.lastItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      default:
        break;
    }
  };
}
