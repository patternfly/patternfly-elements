import type { ReactiveControllerHost } from 'lit';
import { ATFocusController, type ATFocusControllerOptions } from './at-focus-controller.js';

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
    for (const focusable of this.atFocusableItems) {
      focusable.tabIndex = item === focusable ? 0 : -1;
    }
    item?.focus();
    this.host.requestUpdate();
  }


  get items() {
    return this._items;
  }

  public set items(items: Item[]) {
    this._items = items;
    const pivot = Math.max(0, this.atFocusedItemIndex);
    const firstFocusableIndex = items.indexOf(this.atFocusableItems.at(0)!);
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
  }

  protected override isRelevantKeyboardEvent(event: Event): event is KeyboardEvent {
    return ((event instanceof KeyboardEvent)
            && !event.ctrlKey
            && !event.altKey
            && !event.metaKey
            && !!this.atFocusableItems.length
            && !!event.composedPath().includes(this.itemsContainerElement!));
  }
}
