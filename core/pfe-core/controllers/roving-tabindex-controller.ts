import { isServer, type ReactiveControllerHost } from 'lit';
import { ATFocusController, type ATFocusControllerOptions } from './at-focus-controller.js';
import { Logger } from './logger.js';
import { bound } from '../decorators/bound.js';

export type RovingTabindexControllerOptions<Item extends HTMLElement> =
  ATFocusControllerOptions<Item>;

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving tabindex][rti]
 *
 * [rti]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export class RovingTabindexController<
  Item extends HTMLElement = HTMLElement
> extends ATFocusController<Item> {
  static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: RovingTabindexControllerOptions<Item>,
  ): RovingTabindexController<Item> {
    return new RovingTabindexController(host, options);
  }

  #logger = new Logger(this.host);

  #gainedInitialFocus = false;

  #itemsSet = new Set<Item>();

  get atFocusedItemIndex(): number {
    return super.atFocusedItemIndex;
  }

  /**
   * Sets the DOM Focus on the item with assistive technology focus
   * @param item item
   */
  set atFocusedItemIndex(index: number) {
    super.atFocusedItemIndex = index;
    const item = this.items.at(this.atFocusedItemIndex);
    for (const i of this.items) {
      i.tabIndex = item === i ? 0 : -1;
    }
    if (this.#gainedInitialFocus) {
      item?.focus();
    }
    this.host.requestUpdate();
  }

  get items() {
    return this._items;
  }

  public set items(items: Item[]) {
    this._items = items;
    this.#itemsSet = new Set(items);
    const pivot = Math.max(0, this.atFocusedItemIndex);
    const [firstFocusable] = this.atFocusableItems;
    const firstFocusableIndex = firstFocusable ? items.indexOf(firstFocusable) : -1;
    const pivotFocusableIndex = items.indexOf(this.items
        .slice(pivot)
        .concat(this.items.slice(0, pivot))
        .find(item => this.atFocusableItems.includes(item))!);
    this.atFocusedItemIndex = Math.max(firstFocusableIndex, pivotFocusableIndex);
    this.host.requestUpdate();
  }

  private constructor(
    public host: ReactiveControllerHost,
    options: RovingTabindexControllerOptions<Item>,
  ) {
    super(host, options);
    this.initItems();
    const container = options.getItemsContainer?.() ?? this.host;
    if (!isServer) {
      if (container instanceof HTMLElement) {
        container.addEventListener('focusin', () =>
          this.#gainedInitialFocus = true, { once: true });
      } else {
        this.#logger.warn('RovingTabindexController requires a getItemsContainer function');
      }
    }
  }

  @bound
  protected override onKeydown(event: KeyboardEvent): void {
    if (!event.ctrlKey
        && !event.altKey
        && !event.metaKey
        && !!this.atFocusableItems.length
        && !!event.composedPath().some(node => this.#itemsSet.has(node as Item))) {
      super.onKeydown(event);
    }
  }
}
