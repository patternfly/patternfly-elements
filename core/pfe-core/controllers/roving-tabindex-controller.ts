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

  /** Whether the host's element has gained focus at least once */
  private gainedInitialFocus = false;

  override set itemsContainerElement(container: HTMLElement) {
    super.itemsContainerElement = container;
    container?.addEventListener('focusin', () => {
      this.gainedInitialFocus = true;
    }, { once: true });
  }

  private constructor(
    public host: ReactiveControllerHost,
    options: RovingTabindexControllerOptions<Item>,
  ) {
    super(host, options);
    this.items = options.getItems();
  }

  protected override isRelevantKeyboardEvent(event: Event): event is KeyboardEvent {
    return ((event instanceof KeyboardEvent)
            && !event.ctrlKey
            && !event.altKey
            && !event.metaKey
            && !!this.atFocusableItems.length
            && !!event.composedPath().some(x =>
              this.atFocusableItems.includes(x as Item)));
  }

  /** Resets initial focus */
  hostDisconnected(): void {
    this.gainedInitialFocus = false;
  }

  override get atFocusedItem() {
    return super.atFocusedItem;
  }

  /**
   * Sets the DOM Focus on the item with assistive technology focus
   * @param item item
   */
  override set atFocusedItem(item: Item | null) {
    for (const focusable of this.atFocusableItems) {
      focusable.tabIndex = item === focusable ? 0 : -1;
    }
    if (this.gainedInitialFocus) {
      item?.focus();
    }
    super.atFocusedItem = item;
  }

  public set items(items: Item[]) {
    super.items = items;
    const pivot = this.atFocusableItems.indexOf(this.atFocusedItem!) - 1;
    this.atFocusedItem =
         this.atFocusableItems.at(0)
      ?? this.items
          .slice(pivot)
          .concat(this.items.slice(0, pivot))
          .find(item => this.atFocusableItems.includes(item))
      ?? this.firstATFocusableItem
      ?? null;
  }
}
